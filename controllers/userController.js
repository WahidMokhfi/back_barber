const bcrypt = require('bcrypt');
const { UniqueConstraintError, ValidationError } = require('sequelize');
const { User, Review } = require('../db/sequelize'); 

exports.findAllUsers = (req, res) => {
    User.scope('withoutPassword')
        .findAll({
            include: Review
        })
        .then((users) => {
            const msg = "La liste des utilisateurs a bien été récupérée en base de données.";
            res.json({ message: msg, data: users });
        })
        .catch((error) => {
            const msg = "Une erreur est survenue.";
            res.status(500).json({ message: msg });
        });
};

exports.findUserByPk = (req, res) => {
    User.findByPk(req.params.id, {
        include: Review
    })
        .then(user => {
            if (user === null) {
                const message = `L'utilisateur demandé n'existe pas.`;
                res.status(404).json({ message });
            } else {
                const message = "Un utilisateur a bien été trouvé.";
                res.json({ message, data: user });
            }
        })
        .catch(error => {
            const message = `La liste des utilisateurs n'a pas pu se charger. Réessayez ultérieurement.`;
            res.status(500).json({ message, data: error });
        });
};


exports.updateUser = (req, res) => {
    User.update(req.body, {
        where: {
            id: req.params.id
        }
    }).then((result) => {
        if (result[0] === 0) {
            const msg = "L'utilisateur demandé n'existe pas.";
            res.json({ message: msg });
        } else {
            const msg = "L'utilisateur a bien été modifié.";
            res.json({ message: msg, data: result });
        }
    }).catch((error) => {
        if (error instanceof UniqueConstraintError || error instanceof ValidationError) {
            return res.status(400).json({ message: error.message, data: error });
        }
        const msg = "Impossible de mettre à jour l'utilisateur.";
        res.status(500).json({ message: msg });
    });
};

exports.deleteUser = (req, res) => {
    User.findByPk(req.params.id)
        .then(user => {
            if (user === null) {
                const message = `L'utilisateur demandé n'existe pas.`;
                return res.status(404).json({ message });
            }
            return User.destroy({
                where: {
                    id: req.params.id
                }
            }).then(() => {
                const message = `L'utilisateur ${user.username} a bien été supprimé.`;
                res.json({ message, data: user });
            });
        })
        .catch(error => {
            const message = `Impossible de supprimer l'utilisateur.`;
            res.status(500).json({ message, data: error });
        });
};

exports.signup = (req, res) => {
    bcrypt.hash(req.body.password, 10)
      .then(hash => {
        let roles = ["user"];
  
        if (req.body.role === "admin") {
          roles.push("admin");
        }
  
        return User.create({
          username: req.body.username,
          password: hash,
          email: req.body.email,
          phone_number: req.body.phone_number,
          roles: roles,
        }).then((userCreated) => {
          const message = `L'utilisateur ${userCreated.username} a bien été créé`;
          userCreated.password = 'hidden';
          return res.json({ message, data: userCreated });
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
    req.session.destroy();

    const msg = "Déconnexion réussie.";
    res.json({ message: msg });
};
























