const userBookSchema = new mongoose.Schema({
    bookName: String,
    author: String
});
module.exports = mongoose.model('Book', userBookSchema);