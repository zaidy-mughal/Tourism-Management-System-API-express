const express = require('express');
const router = express.Router();
const {
  createReview,
  getReviews,
  getReview,
  updateReview,
  deleteReview
} = require('../controllers/ReviewController');

router.route('/')
  .post(createReview)
  .get(getReviews);

router.route('/:id')
  .get(getReview)
  .put(updateReview)
  .delete(deleteReview);

module.exports = router;