const Services = require('../services')
const { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLInt, GraphQLNonNull } = require("graphql")

const BookType = new GraphQLObjectType({
    name: "Book",
    description: "This represents a book written by an author",
    fields: () => ({
        _id: { type: GraphQLNonNull(GraphQLInt) },
        name: { type: GraphQLNonNull(GraphQLString) },
        year: { type: GraphQLNonNull(GraphQLInt) },
        publisher: { type: GraphQLNonNull(GraphQLString) },
        authorId: { type: GraphQLNonNull(GraphQLString) },
        author: {
            type: AuthorType,
            resolve: (book) => {
                return Services.Authors.Model.findById(book.authorId); // Usar el método findById de Mongoose
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
                return Services.Books.Model.find({ authorId: author._id }); // Usar el método find de Mongoose
            },
        },
    }),
})

module.exports = {
    BookType,
    AuthorType
}