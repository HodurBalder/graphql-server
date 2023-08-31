module.exports = class Messages {

    constructor($details, $message) {

        this.authorSaveError = {
            code: 503,
            key: 'authorSaveError',
            message: $message || 'Error al guardar la información del autor',
            $details
        }

        this.authorGetError = {
            code: 503,
            key: 'authorGetError',
            message: $message || 'Error al obtener la información del autor',
            $details
        }

        this.authorNotFound = {
            code: 404,
            key: 'authorNotFound',
            message: $message || 'El registro del autor no fue encontrado',
            $details
        }

        this.authorDeleteError = {
            code: 503,
            key: 'authorDeleteError',
            message: $message || 'Error al borrar la información del autor',
            $details
        }
    }
}