import { APIGatewayProxyEvent } from 'aws-lambda';

const proxyEvent = (
    method?: string,
    path?: string,
    body?: string,
): APIGatewayProxyEvent => ({
    resource: path ?? '',
    path: path ?? '',
    httpMethod: method ?? '',
    headers: {
        header1: 'value1',
        header2: 'value2',
    },
    multiValueHeaders: {
        header1: ['value1'],
        header2: ['value1', 'value2'],
    },
    queryStringParameters: {
        parameter1: 'value1',
        parameter2: 'value',
    },
    multiValueQueryStringParameters: {
        parameter1: ['value1', 'value2'],
        parameter2: ['value'],
    },
    requestContext: {
        accountId: '123456789012',
        apiId: 'id',
        authorizer: {
            claims: null,
            scopes: null,
        },
        domainName: 'id.execute-api.us-east-1.amazonaws.com',
        domainPrefix: 'id',
        extendedRequestId: 'request-id',
        httpMethod: method ?? '',
        identity: {
            apiKey: null,
            apiKeyId: null,
            accessKey: null,
            accountId: null,
            caller: null,
            cognitoAuthenticationProvider: null,
            cognitoAuthenticationType: null,
            cognitoIdentityId: null,
            cognitoIdentityPoolId: null,
            principalOrgId: null,
            sourceIp: 'IP',
            user: null,
            userAgent: 'user-agent',
            userArn: null,
            clientCert: {
                clientCertPem: 'CERT_CONTENT',
                subjectDN: 'www.example.com',
                issuerDN: 'Example issuer',
                serialNumber: 'a1:a1:a1:a1:a1:a1:a1:a1:a1:a1:a1:a1:a1:a1:a1:a1',
                validity: {
                    notBefore: 'May 28 12:30:02 2019 GMT',
                    notAfter: 'Aug  5 09:36:04 2021 GMT',
                },
            },
        },
        path: path ?? '',
        protocol: 'HTTP/1.1',
        requestId: 'id=',
        requestTime: '04/Mar/2020:19:15:17 +0000',
        requestTimeEpoch: 1583349317135,
        resourceId: '',
        resourcePath: path ?? '',
        stage: '$default',
    },
    pathParameters: null,
    stageVariables: null,
    body: body ?? '',
    isBase64Encoded: false,
});

export default proxyEvent;
