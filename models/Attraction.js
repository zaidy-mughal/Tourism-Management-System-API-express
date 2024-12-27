const mongoose = require('mongoose');

const AttractionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'User cannot be blank']
    },
    location:{
        type:String,
        required: [true, 'Password cannot be bland']
    },
    entryFee: {
        type: Number,
        required: [true, 'Entry fee is required'],
        min: [0, 'Entry fee must be a positive number']
    },
    rating:{
        type: Number,
        default: 0,
        min: [0, 'Rating must be at least 0'],
        max: [5, 'Rating must be at most 5']
    }
});


module.exports = mongoose.model('Attraction', AttractionSchema);