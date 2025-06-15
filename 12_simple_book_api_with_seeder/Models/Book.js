const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },    yearPublished: {
        type: Number,
        required: false,
        min: [1000, 'Year must be 1000 or later'],
        max: [new Date().getFullYear(), 'Year cannot be in the future'],
        validate: {
            validator: function(v) {
                return !v || (v >= 1000 && v <= new Date().getFullYear());
            },
            message: props => `${props.value} is not a valid year!`
        }
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Book', bookSchema);
