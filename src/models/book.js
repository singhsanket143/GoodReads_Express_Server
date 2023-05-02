const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "can't be blank"],
    },
    description: {
        type: String,
        required: [true, "can't be blank"],
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Author'
    },
    genred: [
        {
            type:  mongoose.Schema.Types.ObjectId,
            ref: 'Genre'
        }
    ],
    pages: {
        type: Number,
        required: true
    },
    pages: {
        type: Number,
        required: true
    },
    rating: {
        type: Number,
        required: true
    }
}, {timestamps: true});

const Book = mongoose.model('Book', bookSchema);
module.exports = Book;