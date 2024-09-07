const mongoose = require('mongoose');

const userBookSchema = new mongoose.Schema({
    bookName: String,
    cover: {
        type: Number,
        required: [true, 'Cover is required'],
        validate: {
            validator: Number.isInteger,
            message: value => `${value} is not an integer`
        }
    }
});
module.exports = mongoose.model('Book', userBookSchema);