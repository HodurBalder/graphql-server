const { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLInt } = require("graphql")
const { BookType, AuthorType, UserType, SessionType } = require('./graphql.types')
const Services = require('../services')
const { protectedResolver } = require('./graphql.protectedResolvers')

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
        users: {
            type: new GraphQLList(UserType),
            description: "List of All Users",
            resolve: () => Services.Users.Model.find({})
        },
        user: {
            type: UserType,
            description: "A Single User",
            args: {
                _id:    { type: GraphQLString },
                name:   { type: GraphQLString },
                role:   { type: GraphQLString },
                email:  { type: GraphQLString },
                phone:  { type: GraphQLString },
            },
            resolve: (parent, args) => Services.Users.findOne({...args}),
        },
        users: {
            type: new GraphQLList(UserType),
            description: "List of All Users",
            resolve: protectedResolver((parent, args, context) => Services.Users.Model.find({})),
        },
        session: {
            type: SessionType,
            description: "A Single Session",
            args: {
                _id:     { type: GraphQLString },
                token:   { type: GraphQLString },
                expired: { type: GraphQLString },
                user:    { type: GraphQLString },
            },
            resolve: (parent, args) => Services.Sessions.findOne({...args}),
        },
    }),
})

module.exports = {
    RootQueryType
}

