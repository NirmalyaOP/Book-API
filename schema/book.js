const mongoose = require("mongoose")

//Creating a book schema(use pascal casing)
const BookSchema = mongoose.Schema({
    ISBN: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    authors: [Number],
    language: String,
    pubDate: String,
    numOfPage: Number,
    category: [String],
    publication: Number
    /*
        authors: {
            type: Array,
            required: true
        }
    */ 
});

// Creating Book model
const BookModel = mongoose.model("books", BookSchema);

module.exports = BookModel;