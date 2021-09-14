const Router =  require("express").Router()

const BookModel = require("../schema/book");
const AuthorModel = require("../schema/author");


/* --------------Books----------- */
/* --------------GET----------- */

//Route         - /book
//Description   - To get all the books
//Access        - Public
//Method        - GET
//Params        - none
//Body          - none
Router.get("/book", async (req,res) => {
    const getAllBooks = await BookModel.find(); //find() function might take time hence we use async await
    return res.json(getAllBooks); 
})

//Route         - /book/is/:bookID
//Description   - To get a specific book based on isbn
//Access        - Public
//Method        - GET
//Params        - isbn
//Body          - none
Router.get("/book/is/:bookID", async (req, res) => {
    const getSpecificBook = await BookModel.findOne({
        ISBN: req.params.bookID
    })

    if(!getSpecificBook) {
        return res.json({
            error: `No book found having id ${req.params.bookID}`
        })
    }

    return res.json({ book:getSpecificBook });
})

//Route         - /book/c/:category
//Description   - To get a list of books based on category
//Access        - Public
//Method        - GET
//Params        - category
//Body          - none
Router.get("/book/c/:category", async (req, res) => {
    const getSpecificBooks = await BookModel.find({
        category: req.params.category //mongodb is smart eough to loop through array and find the books if any
    })

    if(getSpecificBooks.length===0) {
        return res.json({
            error: `No book found for the category of ${req.params.category}`
        })
    }

    return res.json(getSpecificBooks);
})

//Route         - /book/a/:authorID
//Description   - To get a list of books based on authorID
//Access        - Public
//Method        - GET
//Params        - authorID
//Body          - none
Router.get("/book/a/:authorID", async (req, res) => {
    const authorID_int = parseInt(req.params.authorID)

    const getSpecificBooks = await BookModel.find({
        authors: authorID_int
    })

    if(getSpecificBooks.length === 0) {
        return res.json({error: `No book found for the author with id ${req.params.authorID}`})
    }

    return res.json(getSpecificBooks);
})


/* --------------POST----------- */
//Route         - /book/new
//Description   - To add new Book
//Access        - Public
//Method        - POST
//Params        - none
//Body          - none
Router.post("/book/new", async (req,res) => {
    try {
        const { newBook } = req.body

        await BookModel.create(newBook)
        return res.json({message: "Book added successfully"})

    }  catch(error) {
        return res.json({ error: error.message })
    }   
})


/* --------------PUT----------- */
//Route         - /book/updateTitle/:isbn
//Description   - To update book title
//Access        - Public
//Method        - PUT
//Params        - isbn
//Body          - none
Router.put("/book/updateTitle/:isbn", async (req,res) => {
    const updatedTitle = req.body.title 

    const updatedBook = await BookModel.findOneAndUpdate(
        {
            ISBN: req.params.isbn //How to find
        },
        {
            title: updatedTitle //What to update
        },
        {
            new: true //This will return updated object
        }
    )

    return res.json(updatedBook)
})

//Route         - /book/updateAuthor/:isbn
//Description   - To update author of a Book(also edit author object)
//Access        - Public
//Method        - PUT
//Params        - isbn
//Body          - new author ID
Router.put("/book/updateAuthor/:isbn", async (req,res) => {
    const { newAuthor } = req.body 
    const { isbn } = req.params

    const updatedBook = await BookModel.findOneAndUpdate(
        {
            ISBN: isbn
        },
        {
            $addToSet: {
                authors: newAuthor
            }
        },
        {
            new: true
        }
    ) 
    
    const updatedAuthor = await AuthorModel.findOneAndUpdate(
        {
            id: newAuthor
        },
        {
            $addToSet: {
                books: isbn
            }
        },
        {
            new: true
        }
    )

    return res.json({ Books: updatedBook, Authors: updatedAuthor })
})


/* --------------DELETE----------- */
//Route         - /book/delete/:isbn
//Description   - To delete a book
//Access        - Public
//Method        - DELETE
//Params        - isbn
//Body          - none
Router.delete("/book/delete/:isbn", async (req,res) => {
    const { isbn } = req.params
    const updateBookDatabase = await BookModel.findOneAndDelete({
        ISBN: isbn
    })

    return res.json({message: "Deleted book successfully"})
})

//Route         - /book/delete/author/:isbn/:id
//Description   - To delete an author from book (and book from author)
//Access        - Public
//Method        - PUT
//Params        - isbn,id
//Body          - none
Router.delete("/book/delete/author/:isbn/:id", async (req,res) => {
    const { isbn,id } = req.params

    const updatedBook = await BookModel.findOneAndUpdate(
        {
            ISBN: isbn
        },
        {
            $pull: {
                authors: parseInt(id)
            }
        },
        {
            new: true
        }
    )

    const updatedAuthor = await AuthorModel.findOneAndUpdate(
        {
            id: parseInt(id)
        },
        {
            $pull: {
                books: isbn
            }
        },
        {
            new: true
        }
    )

    return res.json({ message: "Author was deleted", Books: updatedBook, Authors: updatedAuthor})
});

module.exports = Router;
