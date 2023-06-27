const bcrypt = require('bcrypt');
const { Sequelize, DataTypes } = require('sequelize');
const { Op, UniqueConstraintError, ValidationError } = require('sequelize');
const { UserModel } = require('../db/sequelize');
const jwt = require('jsonwebtoken');
const privateKey = require('../auth/private_key');
const user = require('../models/user');

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

exports.findUserByPk = (req, res) => {
    // Afficher le user correspondant à l'id en params, en le récupérant dans la bdd findByPk()
    UserModel.findByPk(req.params.id, {})
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
    // Modifier l'utilisateur en base de données qui correspond à l'id spécifié dans les params
    UserModel.update(req.body, {
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
    UserModel.findByPk(req.params.id)
        .then(user => {
            if (user === null) {
                const message = `L'utilisateur demandé n'existe pas.`;
                return res.status(404).json({ message });
            }
            return UserModel.destroy({
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

exports.logout = (req, res) => {
    // Supprimez le token du localStorage
    req.session.destroy();

    const msg = "Déconnexion réussie.";
    res.json({ message: msg });
};





