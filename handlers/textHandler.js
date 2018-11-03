var logger = require('tracer').console();

module.exports = function (message) {
    logger.info(`received message: ${message.body}`);
    message.reply(message.body)
        .then(res => {
            logger.info("response sent successfully!");
        })
        .catch(error => {
            logger.error("error occurrend while sending the respone: ", error.error.message);
        });
}