const express = require('express');

const { UserController, AuthorController, GenreController, BookController } = require('../../controllers');
const { AuthMiddlewares, AuthorMiddleware, BookMiddleware } = require('../../middlewares');

const router = express.Router();

router.post('/signup', AuthMiddlewares.validateSignUpRequest, UserController.signup);
router.post('/signin', AuthMiddlewares.validateSignInRequest,UserController.signin);

router.post('/authors',AuthorMiddleware.validateCreateRequest, AuthorController.create);
router.get('/authors', AuthorController.getAll);

router.post('/genres', GenreController.create);

router.post('/books', BookController.create);
router.get('/books', BookController.getAll);
router.get('/books/:id', BookMiddleware.validateGetRequest, BookController.get);


router.get('/home', AuthMiddlewares.isAuthenticated, (req, res) => {
    return res.json({nsg: 'ok'})
})

module.exports = router;
