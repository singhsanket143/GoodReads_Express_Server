const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken');

const { internalServerErrorResponse, customErrorResponse } = require('../utils/common/response-objects');
const { ServerConfig } = require('../config');
const { UserRepository } = require('../repositories');

const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.headers['x-access-token'];
        if(!token) {
            return res
                    .status(StatusCodes.FORBIDDEN)
                    .json(customErrorResponse({
                        message: 'Something went wrong',
                        explanation: 'No auth token provided in the header'
                    }));
        }
        const response = jwt.verify(token, ServerConfig.JWT_SECRET);
        if(!response) {
            res
                    .status(StatusCodes.FORBIDDEN)
                    .json(customErrorResponse({
                        message: 'Something went wrong',
                        explanation: 'token not verified'
                    }));
        }
        const userRepository = new UserRepository();
        const user = await userRepository.get(response.id);
        req.user = user.id;
        next();
    } catch(error) {
        if(error.name == 'JsonWebTokenError') {
            return res
                    .status(StatusCodes.BAD_REQUEST)
                    .json(internalServerErrorResponse(error));
        }
        console.log(error);
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json(internalServerErrorResponse(error));
    }
}

module.exports = {
    isAuthenticated
}