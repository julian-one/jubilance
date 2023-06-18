#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import JubilanceStack from '../lib/stack';

const app = new cdk.App();
new JubilanceStack(app, 'JubilanceStack');
