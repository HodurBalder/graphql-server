const Schema = require('mongoose').Schema
const Model = require('mongoose').model
const ObjectId = require('mongoose').Types.ObjectId
const Messages = require('./authors.messages')

const schema = new Schema({

    name: {
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
    if(err) return next(new Messages(err).authorSaveError)
    next()
})

schema.post('remove', function(err, doc, next) {
    if(err) return next(new Messages(err).authorDeleteError)
    next()
})

schema.post('findOne', function(err, doc, next) {
    if(err) return next(new Messages(err).authorGetError)
    next()
})

schema.post('find', function(err, doc, next) {
    if(err) return next(new Messages(err).authorGetError)
    next()
})

module.exports = Model('Authors', schema)