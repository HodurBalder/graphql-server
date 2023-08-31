const Fields = require('./books.fields')
const Service = require('./books.service')

module.exports = {
    createBook,
    getBooks,
    getBook,
    updateBook,
    deleteBook
}

async function createBook(request, response) {
    try {

        const fields = new Fields(request)

        const data = {
            name: fields.name.get(),
            authorId: fields.authorId.get(),
            author: fields.author.get(),
            year: fields.year.get(),
            publisher: fields.publisher.get(),
        }

        response.$data(await Service.createBook(data))

    } catch(error) {
        response.$error(error)
    }
}

async function getBooks(request, response) {
    try {

        const query = {
            page: parseInt(request.query.page || 0),
            find: request.query.find
        }

        response.$data(await Service.getBooks(query))

    } catch(error) {
        response.$error(error)
    }
}

async function getBook(request, response) {
    try {

        const fields = new Fields(request)

        const data = {
            bookId: fields.bookId.get()
        }

        response.$data(await Service.getBook(data.bookId))

    } catch(error) {
        response.$error(error)
    }
}

async function updateBook(request, response) {
    try {

        const fields = new Fields(request)

        let data = {
            bookId: fields.bookId.get()
        }

        const props = [
            'name',
            'year',
            'publisher'
        ]

        props.forEach(prop => request.body[prop] != undefined && (data[prop] = fields[prop].get()))

        response.$data(await Service.updateBook(data.bookId, data))

    } catch(error) {
        response.$error(error)
    }
}

async function deleteBook(request, response) {
    try {

        const fields = new Fields(request)

        const data = {
            bookId: fields.bookId.get()
        }

        response.$data(await Service.deleteBook(data.bookId))

    } catch(error) {
        response.$error(error)
    }
}