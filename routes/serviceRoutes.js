const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/serviceController')
const authController = require('../controllers/authController')

router
    .route('/')
    .get(serviceController.findAllServices)
    .post(authController.protect, serviceController.createService)

router
    .route('/withReview')
    .get(serviceController.findAllServicesByReviewSQL)

router
    .route('/:id')
    .get(serviceController.findServiceByPk)
    .put(authController.protect, serviceController.updateService)
    .delete(authController.protect, authController.restrictTo('user', 'admin'), serviceController.deleteService)

module.exports = router; 






