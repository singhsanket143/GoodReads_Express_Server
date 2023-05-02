const {StatusCodes} = require('http-status-codes');
const mongoose = require('mongoose');
const { internalServerErrorResponse } = require('../utils/common/response-objects');

const validateGetRequest = async (req, res, next) => {
    if(!mongoose.isValidObjectId(req.params.id)) {
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(internalServerErrorResponse({
                    explanation: 'invalid book id'
                }))
    }
    next();
}

module.exports = {
    validateGetRequest
}