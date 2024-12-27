const Attraction = require('../models/Attraction');
const Review = require('../models/Review')

exports.createAttraction = async (req, res) => {
  try {
    const attraction = await Attraction.create(req.body);
    res.status(201).json({
      success: true,
      data: attraction
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

exports.getAttractions = async (req, res) => {
  try {
    const attractions = await Attraction.find();
    res.status(200).json({
      success: true,
      count: attractions.length,
      data: attractions
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

exports.getAttraction = async (req, res) => {
  try {
    const attraction = await Attraction.findById(req.params.id);
    if (!attraction) {
      return res.status(404).json({
        success: false,
        error: 'Attraction not found'
      });
    }
    res.status(200).json({
      success: true,
      data: attraction
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

exports.updateAttraction = async (req, res) => {
  try {
    const attraction = await Attraction.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );
    if (!attraction) {
      return res.status(404).json({
        success: false,
        error: 'Attraction not found'
      });
    }
    res.status(200).json({
      success: true,
      data: attraction
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

exports.deleteAttraction = async (req, res) => {
  try {
    const attraction = await Attraction.findByIdAndDelete(req.params.id);
    if (!attraction) {
      return res.status(404).json({
        success: false,
        error: 'Attraction not found'
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



exports.updateAttractionRating = async (attractionId) => {
  try {
    const reviews = await Review.find({ attraction: attractionId });
    const totalReviews = reviews.length;
    const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews;

    await Attraction.findByIdAndUpdate(attractionId, { rating: averageRating });
  } catch (error) {
    console.error('Error updating attraction rating:', error);
  }
};




exports.getTopRatedAttractions = async (req, res) => {
  try {
    const topAttractions = await Review.aggregate([
      // Group reviews by attraction and calculate average rating
      {
        $group: {
          _id: '$attraction',
          averageRating: { $avg: '$rating' },
          numberOfReviews: { $sum: 1 }
        }
      },
      // Only include attractions with at least 1 review
      {
        $match: {
          numberOfReviews: { $gt: 0 }
        }
      },
      {
        $sort: {
          averageRating: -1
        }
      },
      {
        $limit: 5
      },
      // Lookup attraction details
      {
        $lookup: {
          from: 'attractions',
          localField: '_id',
          foreignField: '_id',
          as: 'attraction'
        }
      },

      // Unwind the attraction array
      {
        $unwind: '$attraction'
      },

      // Shape the final output
      {
        $project: {
          _id: '$attraction._id',
          name: '$attraction.name',
          location: '$attraction.location',
          entryFee: '$attraction.entryFee',
          averageRating: { $round: ['$averageRating', 1] },
          numberOfReviews: 1
        }
      }
    ]);

    res.status(200).json({
      success: true,
      count: topAttractions.length,
      data: topAttractions
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};


