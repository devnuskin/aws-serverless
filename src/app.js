'use strict';

const awsXRay = require('aws-xray-sdk-core');
const AWS = awsXRay.captureAWS(require('aws-sdk'));
const REGION = process.env.AWS_REGION || 'us-west-2';
AWS.config.update({region: REGION});

async function get(id) {
    return {};
}

async function put(item) {
    return {};
}

async function remove(id) {
    return {};
}

module.exports = {
    get: get,
    put: put,
    remove: remove
};