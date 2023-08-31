const Router = require('express').Router()
const expressGraphQL = require('express-graphql').graphqlHTTP
const { schemaGraphql } = require('./graphql.schemas')

// https://graphql-server-production-793f.up.railway.app/graphql

Router.use('/graphql', expressGraphQL({
    schema: schemaGraphql,
    graphiql: true
}))

module.exports = Router
