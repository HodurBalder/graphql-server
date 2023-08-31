const Validator = require('../validator')

module.exports = class Fields {

    constructor(request) {

        this.props = {
            ...request.headers,
            ...request.params,
            ...request.query,
            ...request.body,
        }

        this.authorId = new Validator({
            type: 'objectId',
            name: 'identificador',
            prop: 'authorId',
            value: this.props.authorId,
        })

        this.name = new Validator({
            type: 'string',
            name: 'nombre',
            prop: 'name',
            value: this.props.name,
        })
    }
}