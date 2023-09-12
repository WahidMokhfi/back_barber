const { UniqueConstraintError, ValidationError } = require('sequelize');
const { User, Review } = require('../db/sequelize'); 

exports.findAllUsers = (req, res) => {
    // Vérifiez si l'utilisateur est authentifié en utilisant le jeton ici
    const token = req.header("Authorization");
    if (!token) {
        return res.status(401).json({ message: "Accès non autorisé. Veuillez vous connecter." });
    }

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
    // Vérifiez si l'utilisateur est authentifié en utilisant le jeton ici
    const token = req.header("Authorization");
    if (!token) {
        return res.status(401).json({ message: "Accès non autorisé. Veuillez vous connecter." });
    }

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
    // Vérifiez si l'utilisateur est authentifié en utilisant le jeton ici
    const token = req.header("Authorization");
    if (!token) {
        return res.status(401).json({ message: "Accès non autorisé. Veuillez vous connecter." });
    }

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
    // Vérifiez si l'utilisateur est authentifié en utilisant le jeton ici
    const token = req.header("Authorization");
    if (!token) {
        return res.status(401).json({ message: "Accès non autorisé. Veuillez vous connecter." });
    }

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

















































