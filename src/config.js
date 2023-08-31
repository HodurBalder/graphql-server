require('dotenv').config()

module.exports = {
    mongodb: process.env.MONGODB,
    host: process.env.HOST,
    port: process.env.PORT,
    app: process.env.APP,
    cryp: process.env.CRYP,
}