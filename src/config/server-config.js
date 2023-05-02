const dotenv = require('dotenv');

dotenv.config(); // after calling config function, it loads the ENV variables

module.exports = {
    PORT: process.env.PORT,
    DB_URL: process.env.DB_URL
}