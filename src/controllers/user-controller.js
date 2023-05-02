const { StatusCodes } = require('http-status-codes');
const { UserService } = require('../services');
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
                return res.status(error.statusCode).json({
                    message: 'Something went wrong',
                    err: error,
                    data: {},
                    success: false
                });
            }
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: 'Something went wrong',
                err: error,
                data: {},
                success: false
            });
        }
    }
}

module.exports = new UserController();