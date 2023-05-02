const CrudRepository = require("./crud-repository");
const Genre = require("../models/genre");

class GenreRepository extends CrudRepository {
    constructor() {
        super(Genre);
    }
}

module.exports = GenreRepository;