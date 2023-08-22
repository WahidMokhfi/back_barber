const { Op, UniqueConstraintError, ValidationError } = require('sequelize');
const { Review, User } = require('../db/sequelize');

exports.findAllReviews = (req, res) => {
  Review.findAll({
    include: [
      {
        model: User,
        attributes: { exclude: ['password'] }
      }
    ]
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

exports.updateReview = (req, res) => {
  Review.update(req.body, {
    where: {
      id: req.params.id,
      user_id: req.userId
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

exports.deleteReview = (req, res) => {
  Review.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(() => {
      const message = "Le commentaire a bien été supprimé";
      res.json({ message });
    })
    .catch(error => {
      const message = "Impossible de supprimer le commentaire";
      res.status(500).json({ message });
    });
};

exports.createReviewForService = (req, res) => {
  Review.create({
    content: req.body.content,
    user_id: req.userId,
    service_id: req.params.service_id,
    service_name: service.service_name,
    rating: req.body.rating,
    username: req.body.username
  })
    .then(result => {
      const message = "L'avis a bien été créé pour le service spécifié";
      res.json({ message, data: result });
    })
    .catch(error => {
      if (error instanceof UniqueConstraintError || error instanceof ValidationError) {
        return res.status(400).json({ message: error.message, data: error });
      }
      const message = "L'avis n'a pas pu être créé pour le service spécifié";
      res.status(500).json({ message, data: error });
    });
};




