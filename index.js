//Import dotenv and run config function
require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")


//Database
const Database = require("./database")


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



/* --------------Books----------- */

/* --------------GET----------- */

//Route         - /book
//Description   - To get all the books
//Access        - Public
//Method        - GET
//Params        - none
//Body          - none

OurApp.get("/book", (req,res) => {
    return res.json({Books : Database.Book});
})

//Route         - /book/:bookID
//Description   - To get a specific book based on isbn
//Access        - Public
//Method        - GET
//Params        - isbn
//Body          - none

OurApp.get("/book/:bookID", (req, res) => {
    const getBook = Database.Book.filter(
        (book) => book.ISBN === req.params.bookID
    )

    if(getBook.length === 0) {
        return res.json({error: `No book found having id ${req.params.bookID}`})
    }

    return res.json({ book:getBook });
})

//Route         - /book/c/:category
//Description   - To get a list of books based on category
//Access        - Public
//Method        - GET
//Params        - category
//Body          - none

OurApp.get("/book/c/:category", (req, res) => {
    const getBook = Database.Book.filter(
        (book) => book.category.includes(req.params.category)
    )

    if(getBook.length === 0) {
        return res.json({error: `No book found for the category of ${req.params.category}`})
    }

    return res.json({ book:getBook });
})

//Route         - /book/a/:authorID
//Description   - To get a list of books based on authorID
//Access        - Public
//Method        - GET
//Params        - authorID
//Body          - none

OurApp.get("/book/a/:authorID", (req, res) => {
    const author = parseInt(req.params.authorID)

    const getBook = Database.Book.filter(
        (book) => book.authors.includes(author)
    )

    if(getBook.length === 0) {
        return res.json({error: `No book found for the author with id ${req.params.authorID}`})
    }

    return res.json({ book:getBook });
})

/* --------------POST----------- */
//Route         - /book/new
//Description   - To add new Book
//Access        - Public
//Method        - POST
//Params        - none
//Body          - none
OurApp.post("/book/new", (req,res) => {
    const { newBook } = req.body 

    Database.Book.push(newBook)

    return res.json({ Books: Database.Book })
})

/* --------------PUT----------- */
//Route         - /book/updateTitle/:isbn
//Description   - To update book title
//Access        - Public
//Method        - PUT
//Params        - isbn
//Body          - none
OurApp.put("/book/updateTitle/:isbn", (req,res) => {
    const { updateBook } = req.body 
    const { isbn } = req.params

    Database.Book.forEach((book) => {
        if(book.ISBN === isbn) {
            book.title = updateBook.title
            return book;
        }
        return book;
    })

    return res.json({ Books: Database.Book })
})

//Route         - /book/updateAuthor/:isbn
//Description   - To update author of a Book(also edit author object)
//Access        - Public
//Method        - PUT
//Params        - isbn
//Body          - none
OurApp.put("/book/updateAuthor/:isbn", (req,res) => {
    const { newAuthor } = req.body 
    const { isbn } = req.params

    Database.Book.forEach((book) => {
        if(book.ISBN === isbn) {
            if(!book.authors.includes(newAuthor)){
                book.authors.push(newAuthor)
            }
            return book;
        }
        return book;
    })

    Database.Author.forEach((author) => {
        if(author.id === newAuthor) {
            if(!author.books.includes(isbn)){
                author.books.push(isbn)
            }
            return author;
        }
        return author;
    })

    return res.json({ Books: Database.Book, Authors: Database.Author })
})

/* --------------DELETE----------- */
//Route         - /book/delete/author/:isbn/:id
//Description   - To delete an author from book
//Access        - Public
//Method        - PUT
//Params        - isbn,id
//Body          - none




/* --------------Authors----------- */

//Route         - /author
//Description   - To get all the authors
//Access        - Public
//Method        - GET
//Params        - none
//Body          - none

OurApp.get("/author", (req,res) => {
    return res.json({Authors : Database.Author});
})

//Route         - /author/:authorID
//Description   - To get a specific author based on authorID
//Access        - Public
//Method        - GET
//Params        - authorID
//Body          - none

OurApp.get("/author/:authorID", (req, res) => {
    const getAuthor = Database.Author.filter(
        (author) => author.id === parseInt(req.params.authorID)
    )

    if(getAuthor.length === 0) {
        return res.json({error: `No Author found for the id: ${req.params.authorID}`})
      }

    return res.json({ Author : getAuthor });
})

//Route         - /author/b/:isbn
//Description   - To get a list of authors based on a book
//Access        - Public
//Method        - GET
//Params        - isbn
//Body          - none

OurApp.get("/author/b/:isbn", (req, res) => {
    const getAuthor = Database.Author.filter(
        (author) => author.books.includes(req.params.isbn)
    )

    if(getAuthor.length === 0) {
        return res.json({error: `No Author found for the book with isbn ${req.params.isbn}`})
      }

    return res.json({ Author : getAuthor });
})

/* --------------POST----------- */
//Route         - /author/new
//Description   - To add new Author
//Access        - Public
//Method        - POST
//Params        - none
//Body          - none
OurApp.post("/author/new", (req,res) => {
    const { newAuthor } = req.body 

    Database.Author.push(newAuthor)

    return res.json({ Authors: Database.Author })
})

/* --------------PUT----------- */
//Route         - /author/updateName/:id
//Description   - To update author name
//Access        - Public
//Method        - PUT
//Params        - id
//Body          - none
OurApp.put("/author/updateName/:id", (req,res) => {
    const { updateAuthor } = req.body 
    const { id } = req.params

    Database.Author.forEach((author) => {
        if(author.id === parseInt(id)) {
            author.name = updateAuthor.name
        }
        return author;
    })

    return res.json({ Authors: Database.Author })
})






/* --------------Publications----------- */

//Route         - /publication
//Description   - To get all the publications
//Access        - Public
//Method        - GET
//Params        - none
//Body          - none

OurApp.get("/publication", (req,res) => {
    return res.json({Publications : Database.Publication});
})

//Route         - /publication/:publicationID
//Description   - To get a specific /publication based on       publicationID
//Access        - Public
//Method        - GET
//Params        - publicationID
//Body          - none

OurApp.get("/publication/:publicationID", (req, res) => {
    const getPublication = Database.Publication.filter(
        (publication) => publication.id === parseInt(req.params.publicationID)
    )

    if(getPublication.length === 0) {
        return res.json({error: `No Publication found for the id: ${req.params.publicationID}`})
      }

    return res.json({ Publication : getPublication });
})

//Route         - /publication/b/:isbn
//Description   - To get a list of authors based on a book
//Access        - Public
//Method        - GET
//Params        - isbn
//Body          - none

OurApp.get("/publication/b/:isbn", (req, res) => {
    const getPublication = Database.Publication.filter(
        (publication) => publication.books.includes(req.params.isbn)
    )

    if(getPublication.length === 0) {
        return res.json({error: `No Publication found for the book with isbn ${req.params.isbn}`})
      }

      return res.json({ Publication : getPublication });
})

/* --------------POST----------- */
//Route         - /publication/new
//Description   - To add new Publication
//Access        - Public
//Method        - POST
//Params        - none
//Body          - none
OurApp.post("/publication/new", (req,res) => {
    const { newPublication } = req.body 

    Database.Publication.push(newPublication)

    return res.json({ Publications: Database.Publication })
})

/* --------------PUT----------- */
//Route         - /publication/updateName/:id
//Description   - To update publication name
//Access        - Public
//Method        - PUT
//Params        - id
//Body          - none
OurApp.put("/publication/updateName/:id", (req,res) => {
    const { updatePublication } = req.body 
    const { id } = req.params

    Database.Publication.forEach((publication) => {
        if(publication.id === parseInt(id)) {
            publication.name = updatePublication.name
        }
        return publication;
    })

    return res.json({ Publications: Database.Publication })
})



OurApp.listen(4000, () => console.log("Server is up and running at port 4000"))