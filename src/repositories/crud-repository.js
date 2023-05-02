const { Logger } = require('../config/index');
class CrudRepository {
    constructor(model) {
        this.model = model;
    }

    create = async (data) => {
        try {
            const result = await this.model.create(data);
            return result;
        } catch(error) {
            Logger.error('Something went wrong in Crud Repository : Create');
            throw error;
        }
    }

    destroy = async (id) => {
        try {
            const result = await this.model.findByIdAndDelete(id);
            return result;
        } catch(error) {
            Logger.error('Something went wrong in Crud Repository : Destroy');
            throw error;
        }
    }

    get = async (id) => {
        try {
            const result = await this.model.findById(id);
            return result;
        } catch(error) {
            Logger.error('Something went wrong in Crud Repository : Get');
            throw error;
        }
    }

    getAll = async () => {
        try {
            const result = await this.model.find({});
            return result;
        } catch(error) {
            Logger.error('Something went wrong in Crud Repository : Get All');
            throw error;
        }
    }

    update = async (id, data) => {
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