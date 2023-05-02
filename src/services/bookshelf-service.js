const { BookShelfRepository } = require('../repositories/index');
const logger = require('../config/logger');
const ValidationError = require('../utils/errors/validation-error');
const { ClientError } = require('../utils/errors');

class BookShelfService {
    constructor() {
        this.bookShelfRepository = new BookShelfRepository();
    }

    create = async (data) => {
        try {
            const shelf = await this.bookShelfRepository.create(data);
            return shelf;
        } catch(error) {
            logger.error("Something went wrong in Book Shelf Service : Create", error);
            if(error.name == 'ValidationError') {
                throw new ValidationError({
                    errors: error.errors,
                    message: error.message,
                });
            }
            throw error;
        }
    } 

    getAllShelvesForAUser = async (userId) => {
        try {
            const shelves = await this.bookShelfRepository.getAllShelvesForAUser(userId);
            return shelves;
        } catch(error) {
            logger.error("Something went wrong in Book Shelf Service : getAllShelvesForAUser", error);
            throw error;
        }
    }

    addBookToShelf = async (userId, shelfName, bookId) => {
        try {
            let shelf = await this.bookShelfRepository.getUserShelf(userId, shelfName);
            if(!shelf) {
                throw new ClientError({
                    message: 'No Shelf found for the user',
                    explanation: 'Book Shelf not found for hte given user'
                })
            }
            if(shelf.books.indexOf(bookId) == -1) {
                shelf = await this.bookShelfRepository.addBookToShelf(userId, shelfName, bookId);
            } else {
                throw new ClientError({
                    message: 'Book already in the shelf',
                    explanation: 'Book id already present in the user shelf provided'
                })
            }
            return shelf;
        } catch(error) {
            logger.error("Something went wrong in Book Shelf Service : addBookToShelf", error);
            throw error;
        }
    }

    getAllBooksForAShelf = async (userId, shelfName) => {
        try {
            const books = await this.bookShelfRepository.getUserShelf(userId, shelfName);
            return books;
        } catch(error) {
            logger.error("Something went wrong in Book Shelf Service : getAllShelvesForAUser", error);
            throw error;
        }
    }
}

module.exports = BookShelfService;