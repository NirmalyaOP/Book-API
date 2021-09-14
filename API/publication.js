const PublicationModel = require("../schema/publication");
const express = require("express");
const Router = express.Router()


/* --------------Publications----------- */

//Route         - /publication
//Description   - To get all the publications
//Access        - Public
//Method        - GET
//Params        - none
//Body          - none
Router.get("/publication", async (req,res) => {
    const getAllPublications = await PublicationModel.find()

    return res.json({Publications : getAllPublications});
})

//Route         - /publication/:publicationID
//Description   - To get a specific /publication based on       publicationID
//Access        - Public
//Method        - GET
//Params        - publicationID
//Body          - none

Router.get("/publication/:publicationID", async (req, res) => {
    const getSpecificPublication = await PublicationModel.findOne({
        id: req.params.publicationID
    })

    if(!getSpecificPublication) {
        return res.json({error: `No Publication found for the id: ${req.params.publicationID}`})
    }

    return res.json({ Publication : getSpecificPublication });
})

//Route         - /publication/b/:isbn
//Description   - To get a list of authors based on a book
//Access        - Public
//Method        - GET
//Params        - isbn
//Body          - none

Router.get("/publication/b/:isbn", async (req, res) => {
    const getSpecificPublication = await PublicationModel.find({
        books: req.params.isbn
    })

    if(getSpecificPublication.length === 0) {
        return res.json({error: `No Publication found for the book with isbn ${req.params.isbn}`})
      }

      return res.json({ Publication : getSpecificPublication });
})



/* --------------POST----------- */
//Route         - /publication/new
//Description   - To add new Publication
//Access        - Public
//Method        - DELETE
//Params        - none
//Body          - none
Router.post("/publication/new", async (req,res) => {
    try {
        const { newPublication } = req.body 

        await PublicationModel.create(newPublication)

        return res.json({ message:"Publication added successfully" })
    }
    catch(error) {
        return res.json({error: error.message})
    }
})



/* --------------PUT----------- */
//Route         - /publication/updateName/:id
//Description   - To update publication name
//Access        - Public
//Method        - PUT
//Params        - id
//Body          - none
Router.put("/publication/updateName/:id", async (req,res) => {
    const { newName } = req.body 
    const publicationID = req.params.id

    const updatedPublication = await PublicationModel.findOneAndUpdate(
        {
            id: publicationID 
        },
        {
            name: newName
        },
        {
            new: true
        }
    )

    return res.json({ Publications: updatedPublication })
})

//Route         - /publication/updateBook/:id
//Description   - To update/add new book
//Access        - Public
//Method        - PUT
//Params        - id
//Body          - new book ISBN number
Router.put("/publication/updateBook/:id", async (req,res) => {
    const { newBook } = req.body 
    const publicationID = req.params.id

    const updatedPublication = await PublicationModel.findOneAndUpdate(
        {
            id: publicationID 
        },
        {
            $addToSet: {
                books: newBook
            }
        },
        {
            new: true
        }
    )    

    return res.json({ Publications: updatedPublication })
})

/* --------------DELETE----------- */
//Route         - /publication/delete/:id
//Description   - To delete a publication
//Access        - Public
//Method        - DELETE
//Params        - id
//Body          - none
Router.delete("/publication/delete/:id", async (req,res) => {
    const publicationID = req.params.id
    const updatePublicationDatabase = await PublicationModel.findOneAndDelete({
        id: publicationID
    })

    return res.json({message: "Deleted Publication successfully"})
})


module.exports = Router