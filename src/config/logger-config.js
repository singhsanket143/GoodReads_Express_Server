const { createLogger, format, transports, config } = require('winston');
const { combine, timestamp, printf } = format;

const customFormat = printf(({level, message, format}) => {
    return `${timestamp} : ${level} : ${message}`;
});

const logger = createLogger({
    format: combine(
        timestamp({format: 'YYYY-MM-DD HH:mm:ss'}),
        customFormat
    ),
    transports: [
        new transports.Console(),
        new transports.File({filename: 'combined.log'})
    ]
});

module.exports = logger;