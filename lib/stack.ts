import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import * as path from 'path';

import { config } from 'dotenv';
config();

class JubilanceStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        const table = new dynamodb.Table(this, 'table', {
            tableName: 'recipes',
            billingMode: dynamodb.BillingMode.PROVISIONED,
            removalPolicy: cdk.RemovalPolicy.DESTROY,
            partitionKey: { name: 'id', type: dynamodb.AttributeType.STRING },
        });

        const handler = new NodejsFunction(this, 'handler', {
            memorySize: 1024,
            timeout: cdk.Duration.seconds(5),
            runtime: lambda.Runtime.NODEJS_18_X,
            handler: 'main',
            functionName: 'jubilanceHandler',
            environment: {
                RECIPE_TABLE: table.tableName,
            },
            entry: path.join(__dirname, '/../src/index.ts'),
            bundling: {
                minify: true,
                externalModules: ['aws-sdk'],
            },
        });
        table.grantReadWriteData(handler);

        const api = new apigateway.RestApi(this, 'api', {
            restApiName: 'Recipe Api',
            deployOptions: {
                stageName: process.env.DEPLOYMENT_ENV,
            },
        });

        const domainName = apigateway.DomainName.fromDomainNameAttributes(
            this,
            'domainName',
            {
                domainName: process.env.DOMAIN_NAME,
                domainNameAliasHostedZoneId:
                    process.env.DOMAIN_NAME_ALIAS_HOSTED_ZONE_ID,
                domainNameAliasTarget: process.env.DOMAIN_NAME_ALIAS_TARGET,
            },
        );

        new apigateway.BasePathMapping(this, 'basePathMapping', {
            domainName: domainName,
            restApi: api,
        });

        const recipes = api.root.addResource('recipes');
        const recipesId = recipes.addResource('{id}');

        recipes.addMethod('POST');
        recipes.addMethod('GET');
        recipesId.addMethod('GET');
        recipesId.addMethod('PUT');
        recipesId.addMethod('DELETE');
    }
}

export default JubilanceStack;
