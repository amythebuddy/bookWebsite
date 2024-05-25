const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    genre: String,
    title: String,
    releaseDate: String,
    author: String
});

module.exports = mongoose.model('Book', bookSchema);