const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const authController = require('../controllers/authController');

router
  .route('/')
  .get( authController.protect, authController.restrictTo('admin'), categoryController.findAllCategories)
  .post(authController.protect, authController.restrictTo('admin'), categoryController.createCategory);

  router
  .route('/:id')
  .get(categoryController.getCategoryDetails)
  .put(authController.protect, authController.restrictTo('admin'), categoryController.updateCategory)
  .delete(authController.protect, authController.restrictTo('admin'), categoryController.deleteCategory);


module.exports = router;


















