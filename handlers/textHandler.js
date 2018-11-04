let logger = require('tracer').console();
let apiai = require("../services/apiapi");
let botResponseBuilder = require("../helpers/botResponseBuilder");

module.exports = function (message) {
    logger.info(`received message: ${message.body}`);
    apiai.getResponse(message)
        .then(nlpResposne => {
            return botResponseBuilder(nlpResposne.intent);
        })
        .then(response => {
            // Do other stuff if you want
            return sendRespone(message, response);
        })
        .then(res => {
            // Do custom analytics, logging etc.
            logger.info("response sent successfully!");
        })
        .catch(error => {
            logger.error("error occurrend while sending the respone: ", error.error.message);
        });;
}

function sendRespone(message, response){
    return message.reply(response);
}
