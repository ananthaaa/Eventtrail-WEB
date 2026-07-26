## ADDED Requirements

### Requirement: Lambda handler processes Cognito PostConfirmation events
The `auth-fn` Lambda handler in `lambdas/auth-fn/index.ts` SHALL export an async handler that receives Amazon Cognito `PostConfirmation_ConfirmSignUp` events. It SHALL extract the user's `sub`, `email`, `name`, `custom:role`, and `custom:faculty` attributes from `event.request.userAttributes`, log the confirmation, and return the event object to Cognito unchanged to allow user sign-in to complete.

#### Scenario: PostConfirmation event completes successfully
- **WHEN** Cognito invokes the Lambda function with a `PostConfirmation_ConfirmSignUp` trigger event
- **THEN** the handler SHALL process the user attributes without error and return the input `event` object

### Requirement: CDK connects auth-fn Lambda as PostConfirmation trigger on User Pool
The AWS CDK stack in `infra/` SHALL define a Node.js Lambda function resource pointing to `lambdas/auth-fn/index.ts` and attach it to the Cognito User Pool under `lambdaTriggers.postConfirmation`.

#### Scenario: User Pool references Lambda in postConfirmation trigger
- **WHEN** `npx cdk synth` is executed in `infra/`
- **THEN** the `AWS::Cognito::UserPool` resource SHALL include a `LambdaConfig` property linking `PostConfirmation` to the `auth-fn` Lambda ARN
