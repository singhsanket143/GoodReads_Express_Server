const { BookRepository } = require('../repositories');
const { Logger } = require('../config');
const { ValidationError } = require('../utils/errors');

class BookService {
    constructor() {
        this.bookRepository = new BookRepository();
    }

    create = async (data) => {
        try {
            const book = await this.bookRepository.create(data);
            return book;
        } catch(error) {
            Logger.error('Something went wrong in book service : create');
            if(Error.name == 'ValidationError') {
                throw new ValidationError({
                    error: error.errors,
                });
                
            }
            throw error;
        }
    }

    getAll = async () => {
        try {
            const books = await this.bookRepository.getAll();
            return books;
        } catch(error) {
            Logger.error('Something went wrong in books service : getall');
            throw error; 
        }
    }

    get = async (id) => {
        try {
            const book = await this.bookRepository.get(id);
            return book;
        } catch(error) {
            Logger.error('Something went wrong in books service : get');
            throw error; 
        }
    }
}

module.exports = BookService;