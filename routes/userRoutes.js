const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

router
  .route('/')
  .get(authController.protect, authController.restrictTo('admin'), userController.findAllUsers);

router
  .route('/:id')
  .get(authController.protect, authController.restrictTo('admin'), userController.findUserByPk)
  .put(authController.protect, userController.updateUser)
  .delete(authController.protect, authController.restrictTo('admin'), userController.deleteUser);

router
  .route('/login')
  .post(authController.login);

router
  .route('/signup')
  .post(authController.signup);

router
  .route('/logout')
  .get(authController.logout);

module.exports = router;












