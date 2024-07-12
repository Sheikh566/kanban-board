const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    text: { // allow empty string
        type: String,
        required: false,
        default: ''
    },
    status: {
        type: String,
        enum: ['todo', 'in-progress', 'done'],
        required: true
    },
    color: {
        type: String,
        required: true,
        default: '#ffffcc',  // cream
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

module.exports = mongoose.model('Task', taskSchema);