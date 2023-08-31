const { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLInt } = require("graphql")
const { BookType, AuthorType } = require('./graphql.types')
const Services = require('../services')

const RootQueryType = new GraphQLObjectType({
    name: "Query",
    description: "Root Query",
    fields: () => ({
        book: {
            type: BookType,
            description: "A Single Book",
            args: {
                _id:        { type: GraphQLString },
                name:       { type: GraphQLString },
                year:       { type: GraphQLInt },
                publisher:  { type: GraphQLString },
            },
            resolve: (parent, args) => Services.Books.Model.findOne({...args}),
        },
        books: {
            type: new GraphQLList(BookType),
            description: "List of All Books",
            resolve: () => Services.Books.Model.find({}),
        },
        authors: {
            type: new GraphQLList(AuthorType),
            description: "List of All Authors",
            resolve: () => Services.Authors.Model.find({})
        },
        author: {
            type: AuthorType,
            description: "A Single Author",
            args: {
                _id:    { type: GraphQLString },
                name:   { type: GraphQLString },
            },
            resolve: (parent, args) => Services.Authors.Model.findOne({...args}),
        },
    }),
})

module.exports = {
    RootQueryType
}

