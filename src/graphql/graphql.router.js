const Router = require('express').Router()
const expressGraphQL = require('express-graphql').graphqlHTTP
const { schemaGraphql } = require('./graphql.schemas');



Router.use('/graphql', expressGraphQL({
    schema: schemaGraphql,
    graphiql: true
}))

module.exports = Router
