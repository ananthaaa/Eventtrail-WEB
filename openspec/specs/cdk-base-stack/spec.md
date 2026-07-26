# Capability: AWS CDK Base Stack

## Purpose
Defines the core AWS CDK infrastructure stacks, S3 buckets, CloudFront distribution with Origin Access Control (OAC), IAM OIDC GitHub Actions federation, and AWS Budgets cost alerts.

## Requirements

### Requirement: CDK stack provisions three S3 buckets with correct access controls
The `EventTrailBaseStack` CDK stack SHALL create:
- `campuspulse-frontend-<account>` — website content origin; public access blocked; accessed only by CloudFront OAC
- `campuspulse-media-<account>` — event/club/user media; public access blocked; CORS and lifecycle rules configured for future Lambda uploads
- `campuspulse-maps-<account>` — campus graph JSON and floor plans; public access blocked; versioning enabled

#### Scenario: S3 buckets are created after cdk deploy
- **WHEN** `cdk deploy EventTrailBaseStack` completes successfully
- **THEN** all three buckets SHALL exist in `ap-south-1` with `BlockPublicAcls`, `BlockPublicPolicy`, `IgnorePublicAcls`, and `RestrictPublicBuckets` all set to `true`

#### Scenario: campuspulse-maps bucket has versioning enabled
- **WHEN** the CDK stack is deployed
- **THEN** `campuspulse-maps-<account>` bucket versioning status SHALL be `Enabled`

### Requirement: CloudFront distribution serves campuspulse-frontend via OAC
The CDK stack SHALL create a CloudFront distribution with:
- Origin: `campuspulse-frontend-<account>` S3 bucket via Origin Access Control (OAC), NOT legacy OAI
- Default root object: `index.html`
- Custom error response: 404 → `index.html` with HTTP 200 (for React client-side routing)
- HTTPS-only viewer protocol policy
- Cache policy: CachingOptimized for static assets

#### Scenario: CloudFront serves the React placeholder page over HTTPS
- **WHEN** the frontend bundle is uploaded to `campuspulse-frontend-<account>` and the distribution is accessed
- **THEN** the CloudFront domain SHALL return HTTP 200 with the React placeholder page over HTTPS

#### Scenario: S3 bucket denies direct access without CloudFront
- **WHEN** a client attempts a direct HTTP request to the S3 bucket REST endpoint (not via CloudFront)
- **THEN** S3 SHALL return HTTP 403 (AccessDenied)

#### Scenario: React client-side routes return 200 via custom error response
- **WHEN** a user navigates directly to a non-root path (e.g., `/events`) via the CloudFront URL
- **THEN** CloudFront SHALL serve `index.html` with HTTP 200 (not 404)

### Requirement: AWS Budgets alarm is configured
The CDK stack SHALL create an AWS Budgets monthly cost budget of USD 10.00 that alerts when actual cost exceeds 80% of the limit (USD 8.00), sending an alert to the account root email address.

#### Scenario: Budget alarm is created and visible in AWS Budgets console
- **WHEN** the CDK stack is deployed
- **THEN** a budget named `EventTrail-MonthlyBudget` SHALL be visible in the AWS Budgets console with a limit of USD 10.00

### Requirement: IAM OIDC role is created with least-privilege permissions
The CDK stack SHALL create:
- An IAM OIDC identity provider for `token.actions.githubusercontent.com` (if not already present)
- An IAM role `EventTrailGitHubActionsRole` with a trust policy scoped to `repo:ananthaaa/Eventtrail-WEB:ref:refs/heads/main`
- An inline policy granting ONLY: `s3:PutObject`, `s3:DeleteObject`, `s3:GetObject` on `campuspulse-frontend-<account>/*` AND `cloudfront:CreateInvalidation` on the specific distribution ARN

#### Scenario: Role cannot perform actions outside its policy
- **WHEN** the GitHub Actions role attempts to call `s3:DeleteBucket` or `ec2:*` or any action not in its inline policy
- **THEN** IAM SHALL deny the request with `AccessDenied`

#### Scenario: Role trust policy is scoped to main branch only
- **WHEN** a GitHub Actions workflow on a non-`main` branch (e.g., `feature/x`) attempts to assume the role
- **THEN** the `AssumeRoleWithWebIdentity` call SHALL fail with `AccessDenied`
