const Visitor = require('../models/Visitor');

exports.createVisitor = async (req, res) => {
  try {
    console.log('Request body:', req.body); // Log the request body

    // Check if required fields are present
    if (!req.body.name || !req.body.email) {
      return res.status(400).json({
        success: false,
        error: 'Please provide name, email,'
      });
    }

    const visitor = await Visitor.create({
      name: req.body.name,
      email: req.body.email,
      visitedAttractions: req.body.visitedAttractions || []
    });

    res.status(201).json({
      success: true,
      data: visitor
    });
  } catch (error) {
    console.error('Error creating visitor:', error); // Log the full error

    // Handle specific MongoDB errors
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        error: 'A visitor with this email already exists'
      });
    }

    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

exports.getVisitors = async (req, res) => {
  try {
    const visitors = await Visitor.find()
      .populate('visitedAttractions.attraction', 'name');
    res.status(200).json({
      success: true,
      count: visitors.length,
      data: visitors
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

exports.getVisitor = async (req, res) => {
  try {
    const visitor = await Visitor.findById(req.params.id)
      .populate('visitedAttractions.attraction', 'name');
    if (!visitor) {
      return res.status(404).json({
        success: false,
        error: 'Visitor not found'
      });
    }
    res.status(200).json({
      success: true,
      data: visitor
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

exports.updateVisitor = async (req, res) => {
  try {
    const visitor = await Visitor.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );
    if (!visitor) {
      return res.status(404).json({
        success: false,
        error: 'Visitor not found'
      });
    }
    res.status(200).json({
      success: true,
      data: visitor
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

exports.deleteVisitor = async (req, res) => {
  try {
    const visitor = await Visitor.findByIdAndDelete(req.params.id);
    if (!visitor) {
      return res.status(404).json({
        success: false,
        error: 'Visitor not found'
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



exports.getVisitorsWithReviewCount = async (req, res) => {
  try {
    const visitors = await Visitor.aggregate([
      {
        $lookup: {
          from: 'reviews',
          localField: '_id',
          foreignField: 'visitor',
          as: 'reviews'
        }
      },
      {
        $addFields: {
          reviewCount: { $size: '$reviews' }
        }
      },
      {
        $project: {
          _id: 1,
          name: 1,
          email: 1,
          nationality: 1,
          reviewCount: 1
        }
      }
    ]);

    res.status(200).json({
      success: true,
      count: visitors.length,
      data: visitors
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};



