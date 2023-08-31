const Fields = require('./authors.fields')
const Service = require('./authors.service')

module.exports = {
    createAuthor,
    getAuthors,
    getAuthor,
    updateAuthor,
    deleteAuthor
}

async function createAuthor(request, response) {
    try {

        const fields = new Fields(request)

        const data = {
            name: fields.name.get(),
        }

        response.$data(await Service.createAuthor(data))

    } catch(error) {
        response.$error(error)
    }
}

async function getAuthors(request, response) {
    try {

        const query = {
            page: parseInt(request.query.page || 0),
            find: request.query.find
        }

        response.$data(await Service.getAuthors(query))

    } catch(error) {
        response.$error(error)
    }
}

async function getAuthor(request, response) {
    try {

        const fields = new Fields(request)

        const data = {
            authorId: fields.authorId.get()
        }

        response.$data(await Service.getAuthor(data.authorId))

    } catch(error) {
        response.$error(error)
    }
}

async function updateAuthor(request, response) {
    try {

        const fields = new Fields(request)

        let data = {
            authorId: fields.authorId.get()
        }

        const props = [
            'name'
        ]

        props.forEach(prop => request.body[prop] != undefined && (data[prop] = fields[prop].get()))

        response.$data(await Service.updateAuthor(data.authorId, data))

    } catch(error) {
        response.$error(error)
    }
}

async function deleteAuthor(request, response) {
    try {

        const fields = new Fields(request)

        const data = {
            authorId: fields.authorId.get()
        }

        response.$data(await Service.deleteAuthor(data.authorId))

    } catch(error) {
        response.$error(error)
    }
}