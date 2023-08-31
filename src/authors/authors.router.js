const Router = require('express').Router()
const Hub = require('./authors.hub')
const Middlewares = require('../middlewares')

Router.post('/authors', Middlewares.auth, Hub.createAuthor)

Router.get('/authors/:authorId', Middlewares.auth, Hub.getAuthor)

Router.get('/authors', Middlewares.auth, Hub.getAuthors)

Router.put('/authors/:authorId', Middlewares.auth, Hub.updateAuthor)

Router.delete('/authors/:authorId', Middlewares.auth, Hub.deleteAuthor)

module.exports = Router