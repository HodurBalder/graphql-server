const Express = require('express')
const Morgan = require('morgan')

const Path = require('path')

const Middlewares = require('./src/middlewares')
const Database = require('./src/database')
const Config = require('./src/config')
const Router = require('./src/router')

const App = Express()

App.use(Morgan('dev'))
App.use(Express.static('public'))
App.use(Express.json())

App.use(Middlewares.responseType)
App.use(Router)
App.use(Middlewares.serverNotFound)
App.use(Middlewares.serverError)

Database.then(() => {
    App.listen(Config.port, () => {
        console.info(`[HOST] ${ Config.host }`)
        console.info(`[PORT] ${ Config.port }`)
        console.info(`[TZ] ${ new Date() }`)
    })
}).catch(() => {
    process.exit(0)
})