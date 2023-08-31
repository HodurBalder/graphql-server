const Model = require('./authors.model')
const Messages = require('./authors.messages')
const Services = require('../services')
const Utils = require('../utils')

module.exports = {
    createAuthor,
    getAuthors,
    getAuthor,
    updateAuthor,
    deleteAuthor,
    Model,
    Messages
}

async function createAuthor(data) {
    try {

        const author = new Model(data)

        return await author.save()

    } catch(error) {
        throw error
    }
}

async function getAuthors(query) {
    try {

        const options = {}
        const limit = 100
        const page = query.page

        if(query.find) {
            const regexp = new RegExp(query.find, 'i')
            options.$or = []
        }

        const authors = await Model.find(options)
            .skip(page * limit)
            .limit(limit)
            .sort({created: -1})

        const total = await Model.countDocuments(options)

        return {
            authors,
            metadata: Utils.metadata(page, limit, total, authors.length, query),
        }

    } catch(error) {
        throw error
    }
}

async function getAuthor(authorId) {
    try {

        const author = await Model.findOne({_id: authorId})

        if(!author)
            throw new Messages(authorId).authorNotFound

        return author

    } catch(error) {
        throw error
    }
}

async function updateAuthor(authorId, data) {
    try {

        const author = await getAuthor(authorId)
        const keys = Object.keys(data)

        keys.forEach(key => {
            author[key] = data[key]
        })

        return await author.save()

    } catch(error) {
        throw error
    }
}

async function deleteAuthor(authorId) {
    try {

        await getAuthor(authorId)
        await Model.deleteOne({_id: authorId})

        return authorId

    } catch(error) {
        throw error
    }
}   