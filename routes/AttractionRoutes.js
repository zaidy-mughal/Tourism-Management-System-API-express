const express = require('express');
const router = express.Router();
const {
  createAttraction,
  getAttractions,
  getAttraction,
  updateAttraction,
  deleteAttraction,
  getTopRatedAttractions
} = require('../controllers/AttractionController');

router.route('/')
  .post(createAttraction)
  .get(getAttractions);

router.route('/:id')
  .get(getAttraction)
  .put(updateAttraction)
  .delete(deleteAttraction);

router.route('/top-rated')
  .get(getTopRatedAttractions);

module.exports = router;