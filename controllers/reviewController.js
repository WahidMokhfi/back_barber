const { Op, UniqueConstraintError, ValidationError } = require('sequelize');
const { ReviewModel, UserModel } = require('../db/sequelize');

exports.findAllReviews = (req, res) => {
    ReviewModel.findAll({
        include: [UserModel.scope('withoutPassword')]
    })
        .then(results => {
            const message = "La liste des avis a bien été récupérée";
            res.json({ message, data: results });
        })
        .catch(error => {
            const message = "La liste des avis n'a pas pu être récupérée";
            res.status(500).json({ message, data: error });
        });
};

exports.createReview = (req, res) => {
    ReviewModel.create({
        content: req.body.content,
        rating: req.body.rating,
        userId: req.userId
    })
        .then(result => {
            const message = "L'avis a bien été créé";
            res.json({ message, data: result });
        })
        .catch(error => {
            if (error instanceof UniqueConstraintError || error instanceof ValidationError) {
                return res.status(400).json({ message: error.message, data: error });
            }
            const message = "L'avis n'a pas pu être créé";
            res.status(500).json({ message, data: error });
        });
};

exports.updateReview = (req, res) => {
    ReviewModel.update(req.body, {
        where: {
            id: req.params.id,
            userId: req.userId
        }
    })
        .then(([rowsUpdated]) => {
            if (rowsUpdated === 0) {
                const message = "Le commentaire demandé n'existe pas ou n'appartient pas à l'utilisateur connecté";
                res.status(404).json({ message });
            } else {
                const message = "Le commentaire a bien été modifié";
                res.json({ message });
            }
        })
        .catch(error => {
            if (error instanceof UniqueConstraintError || error instanceof ValidationError) {
                return res.status(400).json({ message: error.message, data: error });
            }
            const message = "Impossible de mettre à jour le commentaire";
            res.status(500).json({ message });
        });
};
