const { BookRepository } = require('../repositories');
const { Logger } = require('../config');
const { ValidationError, ClientError } = require('../utils/errors');

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

    updateRating = async (userId, bookId, rating) => {
        try {
            if(rating > 5 || rating < 0) {
                throw new ClientError({
                    message: ' invalid data sent',
                    explanation: 'Invlid rating value'
                });
            }
            const book = await this.bookRepository.get(bookId);
            if(!book) {
                throw new ClientError({
                    message: ' invalid data sent',
                    explanation: 'no book found for the given id'
                });
            }
            let totalBookRatingsCount = await this.bookRepository.getTotalBookRating(bookId);
            totalBookRatingsCount = totalBookRatingsCount.length;
            const userBookRating = await this.bookRepository.getBookRatingByUser(bookId, userId);
            const currentBookRating = book.rating;
            if(userBookRating) {
                var newRating = ((totalBookRatingsCount * currentBookRating) - userBookRating.rating + rating) / totalBookRatingsCount;
                await this.bookRepository.updateUserRating(bookId, userId, rating);
                await this.bookRepository.update(bookId, {rating: newRating});
            } else {
                var newRating = ((totalBookRatingsCount * currentBookRating) + rating) / (totalBookRatingsCount + 1);
                await this.bookRepository.addUserRating(bookId, userId, rating);
                await this.bookRepository.update(bookId, {rating: newRating});
            }
            return newRating;
        } catch(error) {
            console.log(error);
            throw error; 
        }
    }
}

module.exports = BookService;