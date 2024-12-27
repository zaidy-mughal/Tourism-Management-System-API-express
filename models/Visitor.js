const mongoose = require('mongoose');

const VisitorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'User cannot be blank']
    },
    email: {
        type: String,
        required: [true, 'Email cannot be blank'],
        unique: true,
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email']
    },
    attractions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Attraction'
    }]
});


module.exports = mongoose.model('Visitor', VisitorSchema);