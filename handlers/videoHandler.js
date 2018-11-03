var logger = require('tracer').console();

module.exports = function (message) {
    logger.info(`received a video message with videoUrl: ${message.videoUrl}`);
    let response = [
        {
            "type": "video",
            "videoUrl": "http://techslides.com/demos/sample-videos/small.mp4",
            "muted": true,
            "autoplay": true,
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