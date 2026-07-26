#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { EventTrailBaseStack } from '../lib/eventtrail-base-stack';

const app = new cdk.App();
new EventTrailBaseStack(app, 'EventTrailBaseStack', {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: 'ap-south-1',
  },
});
