const Model = require('./books.model')
const Messages = require('./books.messages')
const Services = require('../services')
const Utils = require('../utils')

module.exports = {
    createBook,
    getBooks,
    getBook,
    updateBook,
    deleteBook,
    Model,
    Messages
}

async function createBook(data) {
    try {

        const book = new Model(data)

        return await book.save()

    } catch(error) {
        throw error
    }
}

async function getBooks(query) {
    try {

        const options = {}
        const limit = 100
        const page = query.page

        if(query.find) {
            const regexp = new RegExp(query.find, 'i')
            options.$or = []
        }

        const books = await Model.find(options)
            .skip(page * limit)
            .limit(limit)
            .sort({created: -1})

        const total = await Model.countDocuments(options)

        return {
            books,
            metadata: Utils.metadata(page, limit, total, books.length, query),
        }

    } catch(error) {
        throw error
    }
}

async function getBook(bookId) {
    try {

        const book = await Model.findOne({_id: bookId})

        if(!book)
            throw new Messages(bookId).bookNotFound

        return book

    } catch(error) {
        throw error
    }
}

async function updateBook(bookId, data) {
    try {

        const book = await getBook(bookId)
        const keys = Object.keys(data)

        keys.forEach(key => {
            book[key] = data[key]
        })

        return await book.save()

    } catch(error) {
        throw error
    }
}

async function deleteBook(bookId) {
    try {

        await getBook(bookId)
        await Model.deleteOne({_id: bookId})

        return bookId

    } catch(error) {
        throw error
    }
}