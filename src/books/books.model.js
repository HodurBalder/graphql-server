const Schema = require('mongoose').Schema
const Model = require('mongoose').model
const ObjectId = require('mongoose').Types.ObjectId
const Messages = require('./books.messages')

const schema = new Schema({

    name: {
        type: String
    },

    authorId: {
        type: ObjectId,
    },

    author: {
        type: ObjectId,
        ref: 'Author',
    },

    year: {
        type: Number
    },

    publisher: {
        type: String
    },

    updated: {
        type: Date
    },

    created: {
        type: Date,
        default: Date.now
    }
})

schema.pre('save', function(next) {
    this.updated = new Date()
    next()
})

schema.post('save', function(err, doc, next) {
    if(err) return next(new Messages(err).bookSaveError)
    next()
})

schema.post('remove', function(err, doc, next) {
    if(err) return next(new Messages(err).bookDeleteError)
    next()
})

schema.post('findOne', function(err, doc, next) {
    if(err) return next(new Messages(err).bookGetError)
    next()
})

schema.post('find', function(err, doc, next) {
    if(err) return next(new Messages(err).bookGetError)
    next()
})

module.exports = Model('Books', schema)