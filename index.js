let util = require('util'); 
let http = require('http');
let Bot  = require('@kikinteractive/kik');

let bot = new Bot({
    username: process.env.username, 
    apiKey: process.env.apiKey,
    baseUrl: process.env.baseUrl, 
});

// Send the configuration to kik
bot.updateBotConfiguration();

// The onTextMessage(message) handler
bot.onTextMessage((message) => {

    message.reply(message.body);
    console.log(message.body);
});

// start chatting message handler. This message is only sent once. 
bot.onStartChattingMessage((message) => {
    bot.getUserProfile(message.from)
        .then((user) => {
            message.reply(`Hey ${user.firstName}! How can I help you?`);
        });
});

// Set up your server
let server = http
    .createServer(bot.incoming())
    .listen(process.env.serverPort, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on port ${process.env.serverPort}`)
});