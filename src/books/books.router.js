const Router = require('express').Router()
const Hub = require('./books.hub')
const Middlewares = require('../middlewares')

Router.post('/books', Middlewares.auth, Hub.createBook)

Router.get('/books/:bookId', Middlewares.auth, Hub.getBook)

Router.get('/books', Middlewares.auth, Hub.getBooks)

Router.put('/books/:bookId', Middlewares.auth, Hub.updateBook)

Router.delete('/books/:bookId', Middlewares.auth, Hub.deleteBook)

module.exports = Router