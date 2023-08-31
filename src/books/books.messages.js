module.exports = class Messages {

    constructor($details, $message) {

        this.bookSaveError = {
            code: 503,
            key: 'bookSaveError',
            message: $message || 'Error al guardar la información del libro',
            $details
        }

        this.bookGetError = {
            code: 503,
            key: 'bookGetError',
            message: $message || 'Error al obtener la información del libro',
            $details
        }

        this.bookNotFound = {
            code: 404,
            key: 'bookNotFound',
            message: $message || 'El registro del libro no fue encontrado',
            $details
        }

        this.bookDeleteError = {
            code: 503,
            key: 'bookDeleteError',
            message: $message || 'Error al borrar la información del libro',
            $details
        }
    }
}