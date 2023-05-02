const CrudRepository = require("./crud-repository");
const Book = require('../models/book');
const UserBookRating = require('../models/userBookRating')

class BookRepository extends CrudRepository {
    constructor() {
        super(Book);
    }

    get = async (id) => {
        try {
            const result = await this.model.findById(id).populate('author').lean();
            return result;
        } catch(error) {
            throw error;
        }
    }

    getBookRatingByUser = async (bookId, userId) => {
        try {
            const rating = await UserBookRating.findOne({
                bookId: bookId,
                userId: userId
            });
            return rating;
        } catch(error) {
            throw error;
        }
    }

    getTotalBookRating = async (bookId) => {
        try {
            const ratings = await UserBookRating.find({
                bookId: bookId,
            }).select('id');
            return ratings;
        } catch(error) {
            throw error;
        }
    }

    addUserRating = async (bookId, userId, rating) => {
        try {
            const userrating = await UserBookRating.create({
                bookId: bookId,
                userId: userId,
                rating: rating
            })
            return userrating;
        } catch(error) {
            throw error;
        }
    }

    updateUserRating = async (bookId, userId, rating) => {
        try {
            const userrating = await UserBookRating.findOneAndUpdate({
                bookId: bookId,
                userId: userId,
            }, {rating: rating});
            return userrating;
        } catch(error) {
            throw error;
        }
    }
}

module.exports = BookRepository;