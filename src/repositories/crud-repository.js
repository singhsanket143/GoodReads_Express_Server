const { Logger } = require('../config/index');
class CrudRepository {
    constructor(model) {
        this.model = model;
    }

    async create(data) {
        try {
            const result = await this.model.create(data);
            return result;
        } catch(error) {
            Logger.error('Something went wrong in Crud Repository : Create');
            throw error;
        }
    }

    async destroy(id) {
        try {
            const result = await this.model.findByIdAndDelete(id);
            return result;
        } catch(error) {
            Logger.error('Something went wrong in Crud Repository : Destroy');
            throw error;
        }
    }

    async get(id) {
        try {
            const result = await this.model.findById(id);
            return result;
        } catch(error) {
            Logger.error('Something went wrong in Crud Repository : Get');
            throw error;
        }
    }

    async getAll() {
        try {
            const result = await this.model.find({});
            return result;
        } catch(error) {
            Logger.error('Something went wrong in Crud Repository : Get All');
            throw error;
        }
    }

    async create(id, data) {
        try {
            const result = await this.model.findByIdAndUpdate(id, data, {new: true});
            return result;
        } catch(error) {
            Logger.error('Something went wrong in Crud Repository : Update');
            throw error;
        }
    }
}

module.exports = CrudRepository;