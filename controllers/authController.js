const { UniqueConstraintError, ValidationError } = require('sequelize');
const { User, Review } = require('../db/sequelize');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const privateKey = require('../auth/private_key');

exports.login = (req, res) => {
  if (!req.body.username || !req.body.password) {
    const msg = "Veuillez fournir un nom d'utilisateur et un mot de passe.";
    return res.status(400).json({ message: msg });
  }

  User.findOne({ where: { username: req.body.username } })
    .then(user => {
      if (!user) {
        const msg = "L'utilisateur demandé n'existe pas.";
        return res.status(404).json({ message: msg });
      }

      bcrypt.compare(req.body.password, user.password)
        .then(isValid => {
          if (!isValid) {
            const msg = "Le mot de passe est incorrect.";
            return res.status(404).json({ message: msg });
          }

          const token = jwt.sign({ data: user.id }, privateKey, { expiresIn: '24h' });


          const msg = "L'utilisateur a été connecté avec succès.";
          user.password = "hidden";
          return res.json({ message: msg, user, token });
        })
        .catch(error => {
          const msg = "Une erreur s'est produite lors de la comparaison des mots de passe.";
          return res.status(500).json({ message: msg, error });
        });
    })
    .catch(error => {
      const msg = "Une erreur s'est produite lors de la recherche de l'utilisateur.";
      return res.status(500).json({ message: msg, error });
    });
};

exports.signup = (req, res) => {
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      let roles = ['user'];

      if (req.body.roles === "admin") {
        roles = ['admin'];
      }

      return User.create({
        username: req.body.username,
        password: hash,
        email: req.body.email,
        phone_number: req.body.phone_number,
        roles: roles.join(','),
      }).then((userCreated) => {
        const message = `L'utilisateur ${userCreated.username} a bien été créé`;
        userCreated.password = 'hidden';
        return res.json({ message, data: userCreated, roles: roles, id: userCreated.id }); 
      });
    })
    .catch(error => {
      if (error instanceof UniqueConstraintError || error instanceof ValidationError) {
        return res.status(400).json({ message: error.message, data: error });
      }
      const message = "Un problème est survenu lors de la création du profil";
      return res.status(500).json({ message, data: error });
    });
};


exports.logout = (req, res) => {
  res.clearCookie('token');

  const msg = "Déconnexion réussie.";
  res.json({ message: msg });
};


exports.protect = (req, res, next) => {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader) {
    const message = "Un jeton est nécessaire pour accéder à la ressource";
    return res.status(401).json({ message });
  }

  try {
    const token = authorizationHeader.split(' ')[1];
    const decoded = jwt.verify(token, privateKey);
    req.userId = decoded.data;
    next();
  } catch (err) {
    const message = "Jeton invalide";
    return res.status(403).json({ message, data: err });
  }
};

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    User.findByPk(req.userId)
      .then(user => {
        console.log(user.username, user.id, roles);
        if (!user || !roles.every(role => user.roles.includes(role))) {
          const message = "Droits insuffisants";
          return res.status(403).json({ message });
        }
        next();
      })
      .catch(err => {
        const message = "Erreur lors de l'autorisation";
        res.status(500).json({ message, data: err });
      });
  };
};

exports.restrictToOwnUser = (req, res, next) => {
  Review.findByPk(req.params.id)
    .then(review => {
      if (!review) {
        const message = `Le commentaire n°${req.params.id} n'existe pas`;
        return res.status(404).json({ message });
      }
      if (review.UserId !== req.userId) {
        const message = "Tu n'es pas le créateur de cette ressource";
        return res.status(403).json({ message });
      }
      next();
    })
    .catch(err => {
      const message = "Erreur lors de l'autorisation";
      res.status(500).json({ message, data: err });
    });
};
































































