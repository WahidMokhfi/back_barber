const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController')
const authController = require('../controllers/authController')

router
    .route('/')
    .get(categoryController.findAllCategorys)
    .post(authController.protect, categoryController.createCategory)

router
    .route('/:id')
    .get(categoryController.findCategoryByPk)
    .put(authController.protect, categoryController.updateCategory)
    .delete(authController.protect, authController.restrictTo('user', 'admin'), categoryController.deleteCategory)

module.exports = router; 