const Validator = require('../validator')

module.exports = class Fields {

    constructor(request) {

        this.props = {
            ...request.headers,
            ...request.params,
            ...request.query,
            ...request.body,
        }

        this.bookId = new Validator({
            type: 'objectId',
            name: 'identificador',
            prop: 'bookId',
            value: this.props.bookId,
        })

        this.name = new Validator({
            type: 'string',
            name: 'nombre',
            prop: 'name',
            value: this.props.name,
        })

        this.authorId = new Validator({
            type: 'objectId',
            name: 'identificador autor',
            prop: 'authorId',
            value: this.props.authorId,
        })

        this.author = new Validator({
            type: 'objectId',
            name: 'referencia a modelo author',
            prop: 'author',
            value: this.props.author,
        })

        this.year = new Validator({
            type: 'integer',
            name: 'anio de publicacion',
            prop: 'year',
            value: this.props.year,
        })

        this.publisher = new Validator({
            type: 'string',
            name: 'editorial',
            prop: 'publisher',
            value: this.props.publisher,
            size: 64
        })
    }
}