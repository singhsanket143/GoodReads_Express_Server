const { StatusCodes } = require('http-status-codes');
const { internalServerErrorResponse } = require('../utils/common/response-objects');

const validateCreateRequest = async (req, res, next) => {
    if(!req.body.name) {
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(internalServerErrorResponse({
                    explanation: 'name of the author is not preent'
                }))
    }
    
    next();
}

module.exports = {
    validateCreateRequest
}