const { StatusCodes } = require('http-status-codes');
const { UserService } = require('../services');
const { internalServerErrorResponse, customErrorResponse } = require('../utils/common/response-objects');
class UserController {
    constructor() {
        this.userService = new UserService();
    }

    signup = async (req, res) => {
        try {
            const user = await this.userService.signup({
                email: req.body.email,
                password: req.body.password,
                username: req.body.username
            });
            return res.status(StatusCodes.CREATED).json({
                message: 'Successfully created the user',
                err: {},
                data: user,
                success: true
            });
        } catch(error) {
            console.log(error);
            if(error.statusCode) {
                return res
                        .status(error.statusCode)
                        .json(customErrorResponse(error));
            }
            return res
                    .status(StatusCodes.INTERNAL_SERVER_ERROR)
                    .json(internalServerErrorResponse(error));
        }
    }

    signin = async(req, res) => {
        try {
            const response = await this.userService.signin({
                email: req.body.email,
                password: req.body.password
            });
            return res.status(StatusCodes.OK).json({
                data: response,
                success: true,
                error: {},
                message: 'Successfully signin the user'
            });
        } catch(error) {
            if(error.statusCode) {
                return res
                        .status(error.statusCode)
                        .json(customErrorResponse(error));
            }
            return res
                    .status(StatusCodes.INTERNAL_SERVER_ERROR)
                    .json(internalServerErrorResponse(error));
        }
    }
}

module.exports = new UserController();