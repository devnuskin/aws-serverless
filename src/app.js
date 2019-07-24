// @ts-check
'use strict';

/**
 * @typedef { import("aws-lambda") } AWSLambda
 */
const AWS = require('aws-sdk');
const nsAwsUtils = require('ns-aws-utils');
const log = nsAwsUtils.logger;

/**
 * Get an item by id.
 * @param {string} id the id to use to retrieve the item
 */
async function get(id) {
    return {};
}

/**
 * Update an item.
 * @param {object} item the item to be updated
 */
async function put(item) {
    return {};
}

/**
 * Remove an item by id.
 * @param {string} id the id of the item to be removed
 */
async function remove(id) {
    return {};
}

/**
 * Call another lambda
 * @param {*} lambdaPayload
 */
async function callLambda(lambdaPayload) {
    log.debug('Calling lambda');
    const lambdaCall = new AWS.Lambda();
    const lambdaParams = {
        FunctionName: `LambdaService-${process.env.NODE_ENV}-LambdaFunction`,
        Payload: JSON.stringify(lambdaPayload)
    };

    const lambdaResponse = await lambdaCall.invoke(lambdaParams).promise();
    return lambdaResponse;
}

module.exports = {
    get: get,
    put: put,
    remove: remove,
    callLambda: callLambda
};
