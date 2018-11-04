let textHandler = require('./textHandler');
let pictureHandler = require('./pictureHandler');
let videoHandler = require('./videoHandler');
let logger = require('tracer').console();

const handlers = {
    "text": textHandler,
    "picture": pictureHandler,
    "video": videoHandler
}

module.exports = function (incoming, next) {
    logger.info(`received incoming message of type: ${incoming.type}`);
    handlers[incoming.type](incoming, next);
};
