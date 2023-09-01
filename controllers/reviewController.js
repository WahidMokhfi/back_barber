const {  UniqueConstraintError, ValidationError } = require('sequelize');
const { Review, User, Service } = require('../db/sequelize');

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
      const filteredReviews = results.filter(review => review.rating >= 5);
      const message = "La liste des avis avec une note de 5 ou plus a bien été récupérée";

      // Ajouter la date au format ISO pour chaque avis
      const reviewsWithDate = filteredReviews.map(review => ({
        ...review.toJSON(),
        date: review.get('date').toISOString(),
      }));

      res.json({ message, data: reviewsWithDate });
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

exports.createReviewForService = async (req, res) => {
  try {
    const service = await Service.findOne({ where: { id: req.body.service_id } });

    if (!service) {
      return res.status(404).json({ message: "Le service spécifié n'a pas été trouvé" });
    }

    const review = await Review.create({
      content: req.body.content,
      user_id: req.body.user_id,
      service_id: req.body.service_id,
      rating: req.body.rating,
      service_name: req.body.service_name,
      username: req.body.username,
      date: new Date(), // Utilise la date actuelle lors de la création
    });

    const message = "L'avis a bien été créé pour le service spécifié";
    res.json({ message, data: review });
  } catch (error) {
    console.error("Erreur lors de la création de la review :", error);
    res.status(500).json({ message: "L'avis n'a pas pu être créé pour le service spécifié", data: error });
  }
};













