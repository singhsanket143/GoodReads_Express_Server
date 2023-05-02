const { StatusCodes } = require('http-status-codes');

class ValidationError extends Error {
    constructor(error) {
        super(error);
        let explanation = [];
        Object.keys(error.error).forEach(err => {
            explanation.push(error.error[err]);
        });
        this.name = 'ValidationError';
        this.message = 'Not able to validate the data sent in the request',
        this.explanation = explanation;
        this.statusCode = StatusCodes.BAD_REQUEST
    }
}

module.exports = ValidationError;