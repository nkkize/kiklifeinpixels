let logger = require('tracer').console();
const apiai = require("apiai");
const uuid = require("uuid/v4");

const apiaiAccessToken = process.env.apiaiAccessToken;

const nlp = apiai(apiaiAccessToken);
const FALLBACK_INTENT = "fallback";

function sendTextRequest(text) {
    let session = {
        sessionId: uuid()
    };

    let req = nlp.textRequest(text, session);

    return new Promise((resolve, reject) => {
        req.on("response", (response) => {
            return resolve(response);
        });
        req.on("error", (error) => {
            return reject(error);
        });
        req.end();
    });
};

function buildResponse(response) {
    let res = {
        intent: FALLBACK_INTENT
    };
    logger.info("received apiai response")
    if (response) {
        if (response.result && response.result.metadata) {
            res.intent = response.result.metadata.intentName;
            res.entities = response.result.parameters;
        }
    }
    logger.info(`created nlp response, intent: ${res.intent}`)
    return res;
}

function buildDefaultResponse() {
    let res = {
        intent: FALLBACK_INTENT
    };
    logger.info("created fallback nlp response, intent: unknown")
    return res;
}

exports.getResponse = function (message) {
    return sendTextRequest(message.body)
        .then(buildResponse)
        .catch(err => {
            logger.error("error in apiai", err)
            return buildDefaultResponse();
        });
};
