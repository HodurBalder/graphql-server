const Services = require('../services')
const { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLInt, GraphQLNonNull } = require("graphql")

const BookType = new GraphQLObjectType({
    name: "Book",
    description: "This represents a book written by an author",
    fields: () => ({
        _id: { type: GraphQLNonNull(GraphQLString) },
        name: { type: GraphQLNonNull(GraphQLString) },
        year: { type: GraphQLNonNull(GraphQLInt) },
        publisher: { type: GraphQLNonNull(GraphQLString) },
        authorId: { type: GraphQLNonNull(GraphQLString) },
        author: {
            type: AuthorType,
            resolve: (book) => {
                return Services.Authors.Model.findById(book.authorId)
            },
        },
    }),
})

const AuthorType = new GraphQLObjectType({
    name: "Author",
    description: "This represents a author of a book",
    fields: () => ({
        _id: { type: GraphQLNonNull(GraphQLString) },
        name: { type: GraphQLNonNull(GraphQLString) },
        books: {
            type: new GraphQLList(BookType),
            resolve: (author) => {
                return Services.Books.Model.find({ authorId: author._id })
            },
        },
    }),
})

const UserType = new GraphQLObjectType({
    name: "User",
    description: "This represents a User",
    fields: () => ({
        _id: { type: GraphQLNonNull(GraphQLString) },
        name: { type: GraphQLNonNull(GraphQLString) },
        role: { type: GraphQLNonNull(GraphQLString) },    
        email: { type: GraphQLNonNull(GraphQLString) },
        phone: { type: GraphQLNonNull(GraphQLString) },
    }),
})

const SessionType = new GraphQLObjectType({
    name: "Session",
    description: "This represents a Session",
    fields: () => ({
        _id: { type: GraphQLNonNull(GraphQLString) },
        token: { type: GraphQLNonNull(GraphQLString) },
        userId: { type: GraphQLNonNull(GraphQLString) },    
        expired: { type: GraphQLNonNull(GraphQLString) },
        user: {
            type: UserType,
            resolve: (session) => {
                return Services.Users.Model.findById( session.userId )
            },
        },
    }),
})
module.exports = {
    BookType,
    AuthorType,
    UserType,
    SessionType
}