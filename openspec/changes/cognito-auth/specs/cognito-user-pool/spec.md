## ADDED Requirements

### Requirement: CDK defines Amazon Cognito User Pool with email verification and custom role attributes
The AWS CDK stack in `infra/` SHALL create an Amazon Cognito User Pool that requires email as the username attribute and enables auto-verification of emails. The User Pool SHALL define custom schema attributes: `custom:role` (string, mutable, supporting values `student`, `club_admin`, and `campus_staff`) and `custom:faculty` (string, mutable).

#### Scenario: User Pool is synthesized with required schema attributes
- **WHEN** a developer runs `npx cdk synth` in the `infra/` directory
- **THEN** the CloudFormation template SHALL contain an `AWS::Cognito::UserPool` resource with email verification and custom schema attributes `role` and `faculty`

### Requirement: CDK defines Cognito User Pool Client for SPA authentication
The AWS CDK stack SHALL create an `AWS::Cognito::UserPoolClient` associated with the User Pool, configured without a client secret (for SPA browser usage), supporting SRP (Secure Remote Password) auth flows (`USER_SRP_AUTH`) and refresh token flows (`REFRESH_TOKEN_AUTH`).

#### Scenario: SPA Client is configured without client secret
- **WHEN** the CloudFormation template is synthesized
- **THEN** the `AWS::Cognito::UserPoolClient` resource SHALL have `GenerateSecret` set to `false` and include `USER_SRP_AUTH` in explicit auth flows
