const express = require('express');

const { UserController } = require('../../controllers');
const { AuthMiddlewares } = require('../../middlewares');

const router = express.Router();

router.post('/signup', AuthMiddlewares.validateSignUpRequest, UserController.signup);
router.post('/signin', AuthMiddlewares.validateSignInRequest,UserController.signin);

router.get('/home', AuthMiddlewares.isAuthenticated, (req, res) => {
    return res.json({nsg: 'ok'})
})

module.exports = router;
