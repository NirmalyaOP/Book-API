/*
Requirements
Book
 - ISBN             - String
 - Title            - String
 - Author           - [Number]
 - Language         - String
 - Publications     - Number
 - NumOfPages       - Number
 - Categories       - [String]

Author
 - id               - Number
 - name             - String
 - books            - [String]

Publications
 - id               - Number
 - name             - String
 - books            - [String]
---- APIs ------
Book
 - GET
    - to get all books ✅
    - to get specific books ✅
    - to get a list of books based on category ✅
    - to get a list of books based on author -> ✅ 
 - POST
    - to add new book ✅
 - PUT
    - to update book title ✅
    - to update/add new author ✅
 - DELETE
    - delete a book ✅
    - delete an author from the book ✅

-------------------------------------------------

Authors
 - GET
    - to get all authors ✅
    - to get specific author based on ID ✅
    - to get list of author based on a book ✅
 - POST
    - to add new author ✅
 - PUT
    - update author details ✅
    - to update/add new book ✅
 - DELETE
    - delete an author ✅

-------------------------------------------------

Publication
 - GET
    - to get all publications ✅
    - to get specific publication based on id ✅
    - to get a list of publication based on a book ✅
 - POST
    - Add new publication ✅
 - PUT
    - update publication name ✅
    - to update/add new book ✅
 - DELETE
    - delete a publication ✅
    - delete a book from publication ✅
*/


/*
Routes Needed in production
    /author/                                 getting all authors
    /author/:isbn                            get a list of authors based on a book's ISBN
    /author/new                              add new author
    /book/                                   get all books
    /book/is/:isbn                           get specific book based on ISBN
    /book/c/:category                        get specific books based on a category
    /book/new                                add new books
    /book/update/:isbn                       update title of a book
    /book/author/update/:isbn                update/add new author
    /book/delete/:isbn                       delete a book
    /book/delete/author/:isbn/:authorId      delete a author from a book
    /publications                            get all publications
    /publication/update/book/:isbn           update/add new book to a publication
    /publication/delete/book/:isbn/:pubId    delete a book from publication
*/