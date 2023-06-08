const express = require('express');
const router = express.Router();
const { UniqueConstraintError, ValidationError } = require('sequelize');
const reviewController = require('../controllers/reviewController');
const authController = require('../controllers/authController');

router.route('/')
  .get(reviewController.findAllReviews)
  .post(authController.protect, reviewController.createReview);

router.route('/:id')
  .put(authController.protect, authController.restrictToOwnUser, reviewController.updateReview);

router.use((err, req, res, next) => {
  if (err instanceof UniqueConstraintError || err instanceof ValidationError) {
    return res.status(400).json({ message: err.message, data: err });
  }
  next(err);
});

module.exports = router;







