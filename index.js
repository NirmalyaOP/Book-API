//Import dotenv and run config function
require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")

//Importing the different models of BookAPI
// const BookModel = require("./schema/book")
// const AuthorModel = require("./schema/author")
// const PublicationModel = require("./schema/publication")

//Importing APIs
const Book = require("./API/book")
const Author = require("./API/author")
const Publication = require("./API/publication")


mongoose.connect(process.env.MONGO_URI, 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then( () => console.log("Connection established") )
    .catch( (err) => console.log(err))


//Initilisation
const OurApp = express();

//For Receiving JSON data
OurApp.use(express.json())




OurApp.get("/", (req, res) => {
    return res.json({message: "Server is working!!!"})
})

//Micro-Services
OurApp.use("/book", Book)
OurApp.use("/author", Author)
OurApp.use("/publication", Publication)

OurApp.listen(4000, () => console.log("Server is up and running at port 4000"))