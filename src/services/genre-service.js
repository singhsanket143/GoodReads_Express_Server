const { GenreRepository } = require('../repositories');
const { Logger } = require('../config');
const { ValidationError } = require('../utils/errors');

class GenreService {
    constructor() {
        this.genreRepository = new GenreRepository();
    }

    create = async (data) => {
        try {
            const genre = await this.genreRepository.create(data);
            return genre;
        } catch(error) {
            Logger.error('Something went wrong in genre service : create');
            if(Error.name == 'ValidationError') {
                throw new ValidationError({
                    error: error.errors,
                });
                
            }
            throw error;
        }
    }
}

module.exports = GenreService;