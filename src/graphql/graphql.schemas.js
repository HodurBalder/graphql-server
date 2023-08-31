const { GraphQLSchema } = require("graphql")

const { RootQueryType } = require('./graphql.querys')
const { RootMutationType } = require('./graphql.mutations')

const schemaGraphql = new GraphQLSchema({
    query: RootQueryType,
    mutation: RootMutationType,
})

module.exports = {
    schemaGraphql
}