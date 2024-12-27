const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
    attraction: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Attraction',
        required: true
      },
      visitor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Visitor',
        required: true
      },
      score: {
        type: Number,
        required: [true, 'Score is required'],
        min: [1, 'Score must be at least 1'],
        max: [5, 'Score cannot exceed 5']
      },
      comment: {
        type: String,
      },
});

// used to validate 1 review for 1 attraction
ReviewSchema.index({ attraction: 1, visitor: 1 }, { unique: true });

module.exports = mongoose.model('Review', ReviewSchema);