const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLNonNull } = require("graphql")
const { BookType, AuthorType } = require('./graphql.types')
const Services = require('../services')

const RootMutationType = new GraphQLObjectType({
    name: "Mutation",
    description: "Root Mutation",
    fields: () => ({
        addBook: {
            type: BookType,
            description: "Add a book",
            args: {
                name:       { type: GraphQLNonNull(GraphQLString) },
                year:       { type: GraphQLNonNull(GraphQLInt) },
                publisher:  { type: GraphQLNonNull(GraphQLString) },
                authorId:   { type: GraphQLNonNull(GraphQLString) },
                author:     { type: GraphQLNonNull(GraphQLString) },
            },
            resolve: async (parent, args) => {
                const book = Services.Authors.Model({...args})
                return await book.save()
            },
        },
        addAuthor: {
            type: AuthorType,
            description: "Add an author",
            args: {
                name:       { type: GraphQLNonNull(GraphQLString) },
            },
            resolve: async (parent, args) => {
                const author = Services.Authors.Model({...args})
                return await author.save()
            },
        },
    }),
})

module.exports = {
    RootMutationType
}