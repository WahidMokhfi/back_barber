const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const authController = require('../controllers/authController');

router
  .route('/')
  .get(categoryController.findAllCategories)
  .post(authController.protect, authController.restrictTo('admin'), categoryController.createCategory);

router
  .route('/:id')
  .get(categoryController.findCategoryById)
  .put(authController.protect, authController.restrictTo('admin'), categoryController.updateCategory)
  .delete(authController.protect, authController.restrictTo('admin'), categoryController.deleteCategory);

module.exports = router;









