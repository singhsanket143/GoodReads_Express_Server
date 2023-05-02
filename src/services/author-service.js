const { AuthorRepository } = require('../repositories');
const { Logger } = require('../config');
const { ValidationError } = require('../utils/errors');

class AuthorService {
    constructor() {
        this.authorRepository = new AuthorRepository();
    }

    create = async (data) => {
        try {
            const author = await this.authorRepository.create(data);
            return author;
        } catch(error) {
            Logger.error('Something went wrong in author service : create');
            if(Error.name == 'ValidationError') {
                throw new ValidationError({
                    error: error.errors,
                });
                throw error;
            }
        }
    }
}

module.exports = AuthorService;