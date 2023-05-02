const CrudRepository = require("./crud-repository");
const Book = require('../models/book');

class BookRepository extends CrudRepository {
    constructor() {
        super(Book);
    }
}

module.exports = BookRepository;