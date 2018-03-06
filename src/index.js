'use strict';

const app = require('./app');
const corsHandler = require("cors-handler");

/**
 * handler is a Lambda function.  The AWS Lambda service will invoke this function when a given event and runtime.
 * According to the AWS ASAP training, you need to invoke the 'callback'.  If not, the Lambda will wait for five
 * minutes then finish.   That means we need to pay for the full five minutes processing time.
 *
 * @param {Object} event an event data is passed by AWS Lambda service
 * @param {Object} context a runtime information is passed by AWS Lambda service
 * @param {callback} callback a callback function
 */
function handler(event, context, callback) {

    const done = (err, res) => callback(null, {
        statusCode: err ? '400' : '200',
        body: err ? err.message : JSON.stringify(res),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    let sortKey = event.queryStringParameters.sortKey;
    let id = event.pathParameters.id;
    let item = JSON.parse(event.body);


    if (event) {
        switch (event.httpMethod) {
            case 'POST':
                app.post(item)
                    .then((data) => { done(null, data)})
                    .catch((err) => { done({"message": err}, null)});
                break;
            case 'GET':
                app.get(id, sortKey)
                    .then((data) => { done(null, data)})
                    .catch((err) => { done({"message": err}, null)});
                break;
            case 'DELETE':
                app.remove(id, sortKey)
                    .then((skus) => { done(null, data)})
                    .catch((err) => { done({"message": err}, null)});
                break;
            default:
                done(new Error(`Unsupported method "${event.httpMethod}"`));
        }
    } else {
        done(new Error(`Invalid Event "${event}"`));
    }
}


module.exports = {
    handler: corsHandler.cors(handler)
};