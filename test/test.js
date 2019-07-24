const assert = require('assert');
const index = require('../src/index');

describe('Handler Tests', function() {
    it('POST success', async () => {
        const event = {
            'path': '/aws-serverless-template/v1',
            'pathParameters': {
                'accountId': '12345'
            },
            'requestContext': {
                'accountId': 'offlineContext_accountId',
                'resourceId': 'offlineContext_resourceId',
                'apiId': 'offlineContext_apiId',
                'stage': 'dev',
                'requestId': 'offlineContext_requestId_32612684918639556',
                'identity': {
                    'cognitoIdentityPoolId': 'offlineContext_cognitoIdentityPoolId',
                    'accountId': 'offlineContext_accountId',
                    'cognitoIdentityId': 'offlineContext_cognitoIdentityId',
                    'caller': 'offlineContext_caller',
                    'apiKey': 'offlineContext_apiKey',
                    'sourceIp': '127.0.0.1',
                    'cognitoAuthenticationType': 'offlineContext_cognitoAuthenticationType',
                    'cognitoAuthenticationProvider': 'offlineContext_cognitoAuthenticationProvider',
                    'userArn': 'offlineContext_userArn',
                    'userAgent': 'PostmanRuntime/6.4.1',
                    'user': 'offlineContext_user'
                },
                'authorizer': {
                    'principalId': 'offlineContext_authorizer_principalId'
                },
                'resourcePath': '/product-inventory/v1',
                'httpMethod': 'GET'
            },
            'resource': '/product-inventory/v1',
            'httpMethod': 'POST',
            'queryStringParameters': null,
            'stageVariables': null,
            'body': '{"testKey": "testValue"}',
            'isOffline': true
        };
        try {
            const response = await index.handler(event);
            assert.deepEqual(response, {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Methods': '*',
                    'Access-Control-Allow-Credentials': 'false',
                    'Access-Control-Allow-Headers': '*',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': '{"status":200,"messages":[],"data":{}}'
            }, 'expected response');
        } catch (err) {
            assert.fail(err);
        } finally {}
    });
});
