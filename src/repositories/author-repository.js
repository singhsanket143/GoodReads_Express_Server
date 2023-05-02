const CrudRepository = require("./crud-repository");
const Author = require('../models/author');

class AuthorRepository extends CrudRepository {
    constructor() {
        super(Author);
    }
}

module.exports = AuthorRepository;