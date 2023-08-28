const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const authController = require('../controllers/authController');

router
  .route('/')
  .get(reviewController.findAllReviews)
  .post(authController.protect, reviewController.createReviewForService);

router
  .route('/:id') // mise à jour et suppression d'avis
  .put(authController.protect, authController.restrictTo('admin'), reviewController.updateReview)
  .delete(authController.protect, authController.restrictTo('admin'), reviewController.deleteReview);


module.exports = router





  
  
  // priorité :

  // modifier / supprimer un review si admin    = ok

  // pouvoir créer une review pour un service   = ok

  //sur le crud : sortir les boutons de modif / suppression de services / avis etc
  // et les afficher dans la liste des services / liste avis etc : !



  // ensuite : 

  // lister les reviews d'un service avec un fetch   = ok

  // lister les services avec un appel fetch en front  = ok 

  // globalement : 
  // sortir toutes les infos en durs et les mettre avec un appel fetch, donc créer tables si besoin   = ok

  // créer pages statiques pour cgv etc (avec contenu en dur type lorem ipsum)

  // rechecker responsive tablette

  // envoyer mail au contact form // ou alors afficher le mail, horaires etc
  // ajouter carte map eventuellement






