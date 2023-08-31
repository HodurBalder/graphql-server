const Services = require('../services')
const Messages = require('../messages')

const protectedResolver = (resolverFunction) => {
    return async (parent, args, context) => {
        try {
            const token = context.headers.token

            if (!token) {
                throw new Messages().tokenNotFound
            }

            const session = await Services.Sessions.verifySession(token)
            
            context.userId = session.userId

            return resolverFunction(parent, args, context)
        } catch (error) {
            throw error
        }
    }
}

module.exports = {
    protectedResolver
}