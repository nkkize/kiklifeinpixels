var logger = require('tracer').console();

module.exports = function (message) {
    logger.info(`received a picture message with picUrl: ${message.picUrl}`);
    let response = [
        {
            "type": "picture",
            "picUrl": "https://homepages.cae.wisc.edu/~ece533/images/airplane.png",
            "attribution": "camera"
        }
    ];

    message.reply(response)
    .then(res => {
        logger.info("response sent successfully!");
    })
    .catch(error => {
        logger.error("error occurrend while sending the respone: ", error.error.message);
    });
}