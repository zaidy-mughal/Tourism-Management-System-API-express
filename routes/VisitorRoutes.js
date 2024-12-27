const express = require('express');
const router = express.Router();
const {
  createVisitor,
  getVisitors,
  getVisitor,
  updateVisitor,
  deleteVisitor,
  getVisitorsWithReviewCount
} = require('../controllers/VisitorController');

router.route('/')
  .post(createVisitor)
  .get(getVisitors);

router.route('/:id')
  .get(getVisitor)
  .put(updateVisitor)
  .delete(deleteVisitor);

router.route('/activity')
  .get(getVisitorsWithReviewCount);

module.exports = router;