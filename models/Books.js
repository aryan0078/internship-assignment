let mongoose = require("mongoose");

let booksSchema = new mongoose.Schema({
    bookName: String,
    bookAuthor: String,
    bookDescription: String,
    bookGenre: String,
});

module.exports=mongoose.model("Books", booksSchema);