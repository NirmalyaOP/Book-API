const Router = require("express").Router()

const AuthorModel = require("../schema/author");


/* --------------Authors----------- */
/* --------------GET----------- */
//Route         - /author
//Description   - To get all the authors
//Access        - Public
//Method        - GET
//Params        - none
//Body          - none
Router.get("/author", async (req,res) => {
    const getAllAuthors = await AuthorModel.find()
    
    return res.json({Authors : getAllAuthors});
})

//Route         - /author/:authorID
//Description   - To get a specific author based on authorID
//Access        - Public
//Method        - GET
//Params        - authorID
//Body          - none
Router.get("/author/:authorID", async (req, res) => {

    const getSpecificAuthor = await AuthorModel.findOne({
        id: req.params.authorID //mongodb is smart enough to convert authorID in string to int before comparison
    })

    if(!getSpecificAuthor) {
        return res.json({error: `No Author found for the id: ${req.params.authorID}`})
    }

    return res.json({ Author : getSpecificAuthor });
})

//Route         - /author/b/:isbn
//Description   - To get a list of authors based on a book
//Access        - Public
//Method        - GET
//Params        - isbn
//Body          - none
Router.get("/author/b/:isbn", async (req, res) => {
    const getSpecificAuthors = await AuthorModel.find({
        books: req.params.isbn
    })

    if(getSpecificAuthors.length === 0) {
        return res.json({error: `No Author found for the book with isbn ${req.params.isbn}`})
      }

    return res.json({ "Authors of the book is/are" : getSpecificAuthors });
})


/* --------------POST----------- */
//Route         - /author/new
//Description   - To add new Author
//Access        - Public
//Method        - POST
//Params        - none
//Body          - none
Router.post("/author/new", async (req,res) => {
    try {
        const { newAuthor } = req.body 

        await AuthorModel.create(newAuthor)

        return res.json({message: "Author added successfully"})
    } 
    catch(error) {
        return res.json({error: error.message})
    }
})


/* --------------PUT----------- */
//Route         - /author/updateName/:id
//Description   - To update author name
//Access        - Public
//Method        - PUT
//Params        - id
//Body          - name
Router.put("/author/updateName/:id", async (req,res) => {
    const updateAuthorName = req.body.name 
    const paramID = req.params.id

    const updatedAuthor = await AuthorModel.findOneAndUpdate(
        {
            id: paramID
        },
        {
            name: updateAuthorName
        },
        {
            new: true
        }
    )  

    return res.json({ Update: updatedAuthor })
})

//Route         - /author/updateBook/:id
//Description   - To update/add new book
//Access        - Public
//Method        - PUT
//Params        - id
//Body          - new book ISBN number
Router.put("/author/updateBook/:id", async (req,res) => {
    const { newBook } = req.body 
    const authorID  = req.params.id

    const updatedBook = await BookModel.findOneAndUpdate(
        {
            ISBN: newBook
        },
        {
            $addToSet: {
                authors: authorID
            }
        },
        {
            new: true
        }
    ) 
    
    const updatedAuthor = await AuthorModel.findOneAndUpdate(
        {
            id: authorID
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

    return res.json({ Books: updatedBook, Authors: updatedAuthor })
})

/* --------------DELETE----------- */
//Route         - /author/delete/:id
//Description   - To delete an author
//Access        - Public
//Method        - PUT
//Params        - id
//Body          - none
Router.delete("/author/delete/:id", async (req,res) => {
    const authorID = req.params.id
    const updateAuthorDatabase = await AuthorModel.findOneAndDelete({
        id: authorID
    })

    return res.json({message: "Deleted Author successfully"})
});

module.exports = Router;