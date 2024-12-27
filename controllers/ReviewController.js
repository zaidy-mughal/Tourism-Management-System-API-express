const Review = require('../models/Review');
const Visitor = require('../models/Visitor');

exports.createReview = async (req, res) => {
  try {
    const { attraction, visitor, rating, comment } = req.body;

    // Check if visitor has visited the attraction
    const visitorDoc = await Visitor.findById(visitor);
    if (!visitorDoc) {
      return res.status(404).json({
        success: false,
        error: 'Visitor not found'
      });
    }

    const hasVisited = visitorDoc.attractions.some(
      visit => visit.attraction.toString() === attraction
    );

    if (!hasVisited) {
      return res.status(400).json({
        success: false,
        error: 'Visitor must visit the attraction before posting a review'
      });
    }

    // Create review (the unique index will prevent multiple reviews)
    const review = await Review.create({
      attraction,
      visitor,
      rating,
      comment
    });

    await updateAttractionRating(attraction);

    res.status(201).json({
      success: true,
      data: review
    });
  
  
  } catch (error) {
    // Handle duplicate review error - 11000 code is used in MongoDB errors to give dublicate error
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        error: 'Visitor has already reviewed this attraction'
      });
    }
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

exports.getReviews = async (req, res) => {
  try {
    const reviews = await Review.find()
      .populate('attraction', 'name')
      .populate('visitor', 'name');
    res.status(200).json({
      success: true,
      count: reviews.length,
      data: reviews
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

exports.getReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id)
      .populate('attraction', 'name')
      .populate('visitor', 'name');
    if (!review) {
      return res.status(404).json({
        success: false,
        error: 'Review not found'
      });
    }
    res.status(200).json({
      success: true,
      data: review
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

exports.updateReview = async (req, res) => {
  try {
    const review = await Review.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );
    if (!review) {
      return res.status(404).json({
        success: false,
        error: 'Review not found'
      });
    }
    res.status(200).json({
      success: true,
      data: review
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

exports.deleteReview = async (req, res) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);
    if (!review) {
      return res.status(404).json({
        success: false,
        error: 'Review not found'
      });
    }
    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};