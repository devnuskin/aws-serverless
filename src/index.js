// @ts-check
'use strict';

/**
 * @typedef { import("aws-lambda") } AWSLambda
 */

// pull in nsAwsUtils and set up the logger
const nsAwsUtils = require('ns-aws-utils');
const log = nsAwsUtils.logger;
log.setLevel(process.env.LOG_LEVEL);

const awsXRay = require('aws-xray-sdk-core');
let AWS;
if (process.env._X_AMZN_TRACE_ID) {
    /* istanbul ignore next */
    AWS = awsXRay.captureAWS(require('aws-sdk'));
} else {
    log.info('Serverless Offline detected; skipping AWS X-Ray setup');
    AWS = require('aws-sdk');
}
const REGION = process.env.AWS_REGION || 'us-west-2';
AWS.config.update({
    region: REGION
});

const app = require('./app');
const cors = nsAwsUtils.cors;
const eidify = nsAwsUtils.eidify;

/**
 * handler is a Lambda function.  The AWS Lambda service will invoke this function when a given event and runtime.
 * According to the AWS ASAP training, you need to invoke the 'callback'.  If not, the Lambda will wait for five
 * minutes then finish.   That means we need to pay for the full five minutes processing time.
 *
 * @param {AWSLambda.APIGatewayEvent} event event object passed by the AWS Lambda service
 */
async function handler(event) {
    log.setTag(); // clear previous tags
    log.info({
        event: event
    });
    let response = {};

    // process HTTP traffic
    if (event.httpMethod) {
        // handle the cors headers and EID
        response = await cors(eidify(processHTTP))(event);
    } else if (event.Records) { // process SNS traffic
        await processEventRecords(event);
    } else { // process lambda traffic
        response = await app.get(event);
    }

    log.info({
        response: response
    });
    return response;
}

/**
 * Processes HTTP request to GET, POST, PUT, and DELETE paymentProfile records.
 * @param {AWSLambda.APIGatewayEvent} event the event object passed from the handler
 * @return {Promise.<void>}
 */
async function processHTTP(event) {
    let response = {};

    try {
        switch (event.httpMethod) {
            case 'PUT':
            case 'POST':
                const body = JSON.parse(event.body);
                response = await app.put(body);
                break;
            case 'GET':
                response = await app.get(event.pathParameters.accountId);
                break;
            case 'DELETE':
                response = await app.remove(event.pathParameters.accountId);
                break;
            default:
                throw new Error({
                    status: 405,
                    message: `httpMethod: ${event.httpMethod} is not supported`
                });
        }
        response = formatResponse(response);
    } catch (error) {
        log.error(err);
        response = formatErrorResponse(err.status || 400, [await msg.error(err.stringName || 'unknown', err.message)]);
    }

    return response;
}


/**
 * Processes SNS messages that will CREATE/UPDATE productInventory records.
 *
 * @param {AWSLambda.SNSEvent} event the SNS event to be processed
 */
async function processEventRecords(event) {
    event.Records.forEach((record) => {
        // todo: implementation
    });
}


/**
 * getResponse - builds a response base on data passed back from the app code.
 *
 * @param {Object} response - contains: status code, array of messages, and list of payments
 * @return {{statusCode: *, body}}
 */
function formatResponse(response) {
    return {
        statusCode: 200,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            status: 200,
            messages: [],
            data: response
        })
    };
}


/**
 * Builds an error response object.
 *
 * @param {string} status
 * @param {string} messages
 * @return {Object}
 */
function formatErrorResponse(status, messages) {
    return {
        statusCode: status,
        body: JSON.stringify({
            status: status,
            messages: messages
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    };
}


/**
 * xrayHandler is a workaround function for solving a problem with xray not compatible with node8.
 * https://github.com/aws/aws-xray-sdk-node/issues/27 (Rich has found out this problem)
 *
 * @param {AWSLambda.APIGatewayEvent} event event object passed by the AWS Lambda service
 * @param {AWSLambda.Context} context a runtime information is passed by AWS Lambda service
 * @param {function} callback a callback function
 */
function xrayHandler(event, context, callback) {
    handler(event, context)
        .then((res) => callback(null, res))
        .catch((err) => callback(err));
}

module.exports = {
    handler: handler,
    xrayHandler: xrayHandler
};
