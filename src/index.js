'use strict';

const app = require('./app');
const nsAwsUtils = require("ns-aws-utils");
const cors = nsAwsUtils.cors;
const log = nsAwsUtils.logger;
const eidify = nsAwsUtils.eidify;

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

    if (event) {
        switch (event.httpMethod) {
            case 'POST':
                app.post(JSON.parse(event.body))
                    .then((data) => { done(null, data)})
                    .catch((err) => { done({"message": err}, null)});
                break;
            case 'GET':
                app.get(event.pathParameters.id, event.queryStringParameters.sortKey)
                    .then((data) => { done(null, data)})
                    .catch((err) => { done({"message": err}, null)});
                break;
            case 'DELETE':
                app.remove(event.pathParameters.id, event.queryStringParameters.sortKey)
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

/**
 * xrayHandler is a workaround function for solving a problem with xray not compatible with node8.
 * https://github.com/aws/aws-xray-sdk-node/issues/27 (Rich has found out this problem)
 *
 * @param {object} event an event data is passed by AWS Lambda service
 * @param {object} context a runtime information is passed by AWS Lambda service
 * @param {function} callback a callback function
 */
function xrayHandler(event, context, callback) {
  handler(event, context)
      .then((res) => callback(null, res))
      .catch((err) => callback(err));
}

module.exports = {
  handler: cors(eidify(handler)),
  xrayHandler: cors(eidify(xrayHandler))
};