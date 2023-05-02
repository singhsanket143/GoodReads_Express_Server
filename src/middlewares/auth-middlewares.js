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

const validateSignUpRequest = async (req, res, next) => {
    if(!req.body.username) {
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(internalServerErrorResponse({
                    explanation: 'Name of the user is not preent'
                }))
    }
    if(!req.body.email) {
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(internalServerErrorResponse({
                    explanation: 'email of the user is not preent'
                }))
    }
    if(!req.body.password) {
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(internalServerErrorResponse({
                    explanation: 'password of the user is not preent'
                }))
    }
    next();
}

const validateSignInRequest = async (req, res, next) => {
    if(!req.body.email) {
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(internalServerErrorResponse({
                    explanation: 'email of the user is not preent'
                }))
    }
    if(!req.body.password) {
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(internalServerErrorResponse({
                    explanation: 'password of the user is not preent'
                }))
    }
    next();
}

module.exports = {
    isAuthenticated,
    validateSignInRequest,
    validateSignUpRequest
}