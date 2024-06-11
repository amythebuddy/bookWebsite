const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    password: String
});
const userBookSchema = new mongoose.Schema({
    bookName: String,
    author: String
});
module.exports = mongoose.model('User', userSchema);
module.exports = mongoose.model('Book', userBookSchema);