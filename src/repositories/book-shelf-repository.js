const CrudRepository = require("./crud-repository");
const BookShelf = require("../models/book-shelf");

class BookShelfRepository extends CrudRepository {
    constructor() {
        super(BookShelf);
    }
    bulkCreate = async (data) => {
        try {
            const bookShelves = await BookShelf.insertMany(data);
            return bookShelves
        } catch(error) {
            logger.error('Something went wrong in BookShelf Repository : bulkCreate', error);
            throw error;
        }
    }

    getAllShelvesForAUser = async (userId) => {
        try {
            const bookShelves = await BookShelf.find({userId: userId}).populate('books');
            return bookShelves
        } catch(error) {
            logger.error('Something went wrong in BookShelf Repository : bulkCreate', error);
            throw error;
        }
    } 

    addBookToShelf = async (userId, shelfName, bookId) => {
        try {
            const bookShelves = await BookShelf.findOne({userId: userId, name: shelfName});
            bookShelves.books.push(bookId);
            await bookShelves.save();
            return bookShelves
        } catch(error) {
            logger.error('Something went wrong in BookShelf Repository : bulkCreate', error);
            throw error;
        }
    }

    getUserShelf = async (userId, shelfName) => {
        try {
            const bookShelves = await BookShelf.findOne({userId: userId, name: shelfName}).populate('books');;
            return bookShelves
        } catch(error) {
            logger.error('Something went wrong in BookShelf Repository : bulkCreate', error);
            throw error;
        }
    }
}

module.exports = BookShelfRepository;