const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLNonNull, GraphQLSchema, GraphQLScalarType } = require("graphql")
const Methods = require('../methods')
const Services = require('../services')
const { BookType, AuthorType, UserType, SessionType } = require('./graphql.types')
const { protectedResolver } = require('./graphql.protectedResolvers')

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
                const book = Services.Books.Model({...args})
                return await book.save()
            },
        },
        editBook: {
            type: BookType,
            description: "Edit a book",        
            args: {
                oldName:       { type: GraphQLNonNull(GraphQLString) },
                name:       { type: GraphQLNonNull(GraphQLString) },
                year:       { type: (GraphQLInt) },
                publisher:  { type: (GraphQLString) },
                authorId:   { type: (GraphQLString) },
                author:     { type: (GraphQLString) },
            },
            resolve: async (parent, args) => {
                const book = await Services.Books.Model.findOne({name: args.oldName})
                if (!book) return

                const { oldName, ...newData } = args;
                
                return await Services.Books.updateBook(book._id, newData)
            }
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
        editAuthor: {
            type: AuthorType,
            description: "Edit a author",        
            args: {
                oldName:    { type: GraphQLNonNull(GraphQLString) },
                name:       { type: GraphQLNonNull(GraphQLString) },
            },
            resolve: async (parent, args) => {
                const author = await Services.Authors.Model.findOne({name: args.oldName})
                if (!author) return

                const { oldName, ...newData } = args;
                
                return await Services.Authors.updateAuthor(author._id, newData)
            }
        },
        login: {
            type: SessionType,
            description: 'login users',
            args: {
                email:       { type: GraphQLNonNull(GraphQLString) },
                password:   { type: GraphQLNonNull(GraphQLString) }
            },
            resolve: async (parent, args) => {
                try {

                    const user = await Services.Users.Model.findOne({email: args.email}, '+password')
            
                    if(!user)
                        throw new Messages(args).userNotFound
            
                    if(!Methods.bcryptCompare(args.password, user.password))
                        throw new Messages(args).userPasswordError
            
                    return await Services.Sessions.createSession({userId: user._id})
            
                } catch(error) {
                    throw error
                }
            }
        },
        addUser: {
            type: UserType,
            description: "Agregar un nuevo usuario",
            args: {
                name:     { type: GraphQLString },
                role:     { type: GraphQLString },
                email:    { type: GraphQLString },
                phone:    { type: GraphQLString },
                password: { type: GraphQLString }
            },
            resolve: protectedResolver(async (parent, args, context) => {
                const newUser = await Services.Users.createUser(args)
                return newUser
            }),
        },


    }),
})

module.exports = {
    RootMutationType
}