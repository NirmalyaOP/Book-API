const mongoose = require("mongoose")

//Publication Schema
const PublicationSchema = mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    books: [String]
});

//Creating Publication model
const PublicationModel = mongoose.model("publications", PublicationSchema);

module.exports = PublicationModel;
