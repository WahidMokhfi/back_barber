const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/serviceController');
const authController = require('../controllers/authController');

router
  .route('/')
  .get(serviceController.findAllServices) // je récupère tous les services et je les rends publics
  .post(
    authController.protect,
    authController.restrictTo('admin'),
    serviceController.createService
  );

router
  .route('/:id')
  .get(serviceController.findServiceById) // je récupère un service par son id et je le rends public
  .put(
    authController.protect,
    authController.restrictTo('admin'),
    serviceController.updateService
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    serviceController.deleteService
  );

module.exports = router;































































































































