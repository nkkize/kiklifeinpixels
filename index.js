let http = require('http');
let Bot = require('@kikinteractive/kik');
var logger = require('tracer').console();
let handler = require('./handlers');

let bot = new Bot({
    username: process.env.username,
    apiKey: process.env.apiKey,
    baseUrl: process.env.baseUrl,
});

// Send the configuration to kik
bot.updateBotConfiguration();

// use handlers to serve the user requests
bot.use(handler)

// TODO: move to handlers
// start chatting message handler. This message is only sent once. 
bot.onStartChattingMessage((message) => {
    bot.getUserProfile(message.from)
        .then((user) => {
            message.reply(`Hey ${user.firstName}! How can I help you?`);
        });
});

// Set up your server
http.createServer(bot.incoming())
    .listen(process.env.serverPort || 8080, (err) => {
        if (err) {
            logger.error('something bad happened', err);
            return;
        }
        logger.info(`server is listening on port ${process.env.serverPort || 8080}`)
    });