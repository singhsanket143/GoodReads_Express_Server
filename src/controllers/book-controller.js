const { StatusCodes } = require('http-status-codes');
const { BookService } = require('../services');
const { internalServerErrorResponse, customErrorResponse } = require('../utils/common/response-objects');
class BookController {
    constructor() {
        this.bookService = new BookService();
    }

    create = async (req, res) => {
        try {
            const book = await this.bookService.create({
                title: req.body.title,
                description: req.body.description,
                author: req.body.author,
                genres: req.body.genres,
                pages: req.body.pages,
                publishDate: req.body.publishDate
                
            });
            return res.status(StatusCodes.CREATED).json({
                message: 'Successfully created the book',
                err: {},
                data: book,
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

    getAll = async (req, res) => {
        try {
            const books = await this.bookService.getAll();
            return res.status(StatusCodes.CREATED).json({
                message: 'Successfully fetched the books',
                err: {},
                data: books,
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

    get = async (req, res) => {
        try {
            const book = await this.bookService.get(req.params.id);
            return res.status(StatusCodes.CREATED).json({
                message: 'Successfully fetched the book',
                err: {},
                data: book,
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

    updateUserRating = async (req, res) => {
        try {
            const response = await this.bookService.updateRating(req.user, req.params.id, Number(req.params.rating));
            return res.status(StatusCodes.CREATED).json({
                message: 'Successfully rated the book',
                err: {},
                data: response,
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

module.exports = new BookController();