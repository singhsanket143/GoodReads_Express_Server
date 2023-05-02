const { StatusCodes } = require('http-status-codes');
const { AuthorService } = require('../services');
const { internalServerErrorResponse, customErrorResponse } = require('../utils/common/response-objects');
class AuthorController {
    constructor() {
        this.authorService = new AuthorService();
    }

    create = async (req, res) => {
        try {
            const author = await this.authorService.create({
                name: req.body.name
            });
            return res.status(StatusCodes.CREATED).json({
                message: 'Successfully created the author',
                err: {},
                data: author,
                success: true
            });
        } catch(error) {
            if(error.statusCode) {
                return res
                        .status(error.statusCode)
                        .json(customErrorResponse(error));
            }
            return res
                    .status(StatusCodes.INTERNAL_SERVER_ERROR)
                    .json(internalServerErrorResponse(error));
        }
    }
}

module.exports = new AuthorController();