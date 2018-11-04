const data = require("../data/data.json");

function getBotResponses(intent) {
    return data.find(responseObj => responseObj.intent === intent);
};

module.exports = function (intent) {
    let botResponses = getBotResponses(intent).responses;
    return botResponses[Math.floor(Math.random()*botResponses.length)];
}
