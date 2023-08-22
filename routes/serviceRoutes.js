const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/serviceController');
const authController = require('../controllers/authController');

router.route('/').get(serviceController.findAllServices);

router
  .route('/')
  .post(
    authController.protect,
    authController.restrictTo('admin'),
    serviceController.createService
  );

router
  .route('/:id')
  .get(serviceController.findServiceById) 
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






























































































































