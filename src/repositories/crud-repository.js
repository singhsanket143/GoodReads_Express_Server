const { Logger } = require('../config/index');
const { ClientError } = require('../utils/errors');
class CrudRepository {
    constructor(model) {
        this.model = model;
    }

    create = async (data) => {
        try {
            const result = await this.model.create(data);
            return result;
        } catch(error) {
            console.log(error);
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
            if(!result) {
                throw new ClientError({
                    message: 'Invalid data sent from the client',
                    explanation: 'No resource found for the given id'
                });
            }
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