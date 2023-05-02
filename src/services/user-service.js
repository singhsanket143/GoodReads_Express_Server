const { StatusCodes } = require('http-status-codes');

const { UserRepository } = require('../repositories');
const { ValidationError, ClientError } = require('../utils/errors');
class UserService {
    constructor() {
        this.userRepository = new UserRepository();
    }

    signup = async (data) => {
        try {
            const response = await this.userRepository.create(data);
            return response;
        } catch(error) {
            
            if(error.name == 'ValidationError') {
                throw new ValidationError({
                    error: error.errors,
                });
            }
            throw error;
        }
    }

    signin = async (data) => {
        try {
            const user = await this.userRepository.getUserByEmail(data.email);
            if(!user) {
                throw new ClientError({
                    message: 'Invalid data sent from the client',
                    explanation: 'No registered user found for the given email',
                    statusCode: StatusCodes.NOT_FOUND
                });
            }
            const passwordMatch = user.comparePassword(data.password);
            if(!passwordMatch) {
                throw new ClientError({
                    message: 'Invalid data sent from the client',
                    explanation: 'pass word given is not correct',
                    statusCode: StatusCodes.BAD_REQUEST
                });
            }
            return user.generateJWT();
        } catch(error) {
            throw error;
        }
    }
}

module.exports = UserService;