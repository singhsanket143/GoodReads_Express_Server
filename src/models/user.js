const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { ServerConfig } = require('../config/index')

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        lowercase: true,
        uniqueCaseInsensitive: true,
        required: [true, "can't be blank"],
        match: [/\S+@\S+\.\S+/, 'is invalid'],
        index: {
            unique: true
        }
    },
    password: {
        type: String, 
        required: [true, "can't be blank"],
        minLength: [3, "Password cannot be less than 3 characters"]
    },
    username: {
        type: String,
        lowercase: true,
        uniqueCaseInsensitive: true,
        required: [true, "can't be blank"],
        match: [/^[a-zA-Z0-9]+$/, 'is invalid'],
        index: {
            unique: true
        }
    }
}, {timestamps: true});

userSchema.plugin(uniqueValidator, {message: 'is already taken'});

userSchema.pre('save', function (next) {
    const user = this;
    const SALT = bcrypt.genSaltSync(9);
    const encryptedPassword = bcrypt.hashSync(user.password, SALT);
    user.password = encryptedPassword;
    next();
});

userSchema.methods.generateJWT = function generate() {
    return jwt.sign({id: this._id, email: this.email}, ServerConfig.JWT_SECRET, {
        expiresIn: ServerConfig.JWT_EXPIRY
    });
}

userSchema.methods.comparePassword = function compare(password) {
    return bcrypt.compareSync(this.password, password);
}

const User = mongoose.model('User', userSchema);

module.exports = User;
