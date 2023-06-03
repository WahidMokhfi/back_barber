const { Op, UniqueConstraintError, ValidationError } = require('sequelize');
const { UserModel } = require('../db/sequelize');
const jwt = require('jsonwebtoken');
const privateKey = require('../auth/private_key');

exports.findAllUsers = (req, res) => {
    UserModel.scope('withoutPassword')
        .findAll()
        .then((users) => {
            const msg = "La liste des utilisateurs a bien été récupérée en base de données.";
            res.json({ message: msg, data: users });
        })
        .catch((error) => {
            const msg = "Une erreur est survenue.";
            res.status(500).json({ message: msg });
        });
};

exports.logout = (req, res) => {
    // Supprimer le jeton d'authentification stocké dans le localStorage
    // ou effectuer toute autre action de déconnexion nécessaire

    // Exemple de suppression du jeton dans le localStorage
    localStorage.removeItem('token');

    const msg = "Déconnexion réussie.";
    res.json({ message: msg });
};
