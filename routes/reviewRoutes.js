const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const authController = require('../controllers/authController');

router
  .route('/')
  .get(reviewController.findAllReviews) // récupérer tous les avis et les afficher en public
  .post( authController.protect, authController.restrictTo('user'), reviewController.createReviewForService); 
  //seul un user authentifié peut créer un avis


router
  .route('/:id') // mise à jour et suppression d'avis
  .put(authController.protect, authController.restrictTo('admin'), reviewController.updateReview)
  .delete(authController.protect, authController.restrictTo('admin'), reviewController.deleteReview);


module.exports = router








