const express = require('express');

const { UserController, AuthorController } = require('../../controllers');
const { AuthMiddlewares, AuthorMiddleware } = require('../../middlewares');

const router = express.Router();

router.post('/signup', AuthMiddlewares.validateSignUpRequest, UserController.signup);
router.post('/signin', AuthMiddlewares.validateSignInRequest,UserController.signin);

router.post('/authors',AuthorMiddleware.validateCreateRequest, AuthorController.create);

router.get('/home', AuthMiddlewares.isAuthenticated, (req, res) => {
    return res.json({nsg: 'ok'})
})

module.exports = router;
