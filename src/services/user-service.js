const { UserRepository } = require('../repositories');
const { ValidationError } = require('../utils/errors');
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
}

module.exports = UserService;