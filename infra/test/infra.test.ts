import * as cdk from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import * as Infra from '../lib/eventtrail-base-stack';

test('Base Stack Created with S3 Buckets and CloudFront', () => {
  const app = new cdk.App();
  // WHEN
  const stack = new Infra.EventTrailBaseStack(app, 'MyTestStack');
  // THEN
  const template = Template.fromStack(stack);
  template.resourceCountIs('AWS::S3::Bucket', 3);
  template.resourceCountIs('AWS::CloudFront::Distribution', 1);
});
