# Capability: CI/CD Pipeline

## Purpose
Defines the automated GitHub Actions deployment workflows, OpenID Connect (OIDC) federation, and repository configuration variables for continuous integration and continuous deployment.

## Requirements

### Requirement: GitHub Actions workflow builds and deploys on push to main
The `.github/workflows/deploy.yml` workflow SHALL:
- Trigger on `push` to the `main` branch only
- Use OIDC (`aws-actions/configure-aws-credentials@v4`) to assume `EventTrailGitHubActionsRole` — no stored AWS access keys in GitHub secrets
- Run steps in order: checkout → Node.js setup → `npm ci` → `npm run lint` → `npm run build` → `aws s3 sync dist/ s3://<bucket> --delete` → `aws cloudfront create-invalidation --distribution-id <id> --paths "/*"`
- Fail the deployment if lint or build fails (no partial deploys)

#### Scenario: Push to main triggers a successful deployment
- **WHEN** a commit is pushed to the `main` branch
- **THEN** the GitHub Actions workflow SHALL run, build the frontend, sync it to S3, and create a CloudFront invalidation, completing with a green (success) status

#### Scenario: Push to a non-main branch does NOT trigger deployment
- **WHEN** a commit is pushed to any branch other than `main`
- **THEN** the deploy workflow SHALL NOT run (no S3 sync, no CloudFront invalidation)

#### Scenario: Lint failure prevents S3 sync
- **WHEN** the `npm run lint` step exits with a non-zero code
- **THEN** the workflow SHALL fail at that step and SHALL NOT proceed to `npm run build` or `aws s3 sync`

### Requirement: Workflow uses OIDC — no long-lived credentials stored in GitHub
The `deploy.yml` workflow SHALL NOT reference any `AWS_ACCESS_KEY_ID` or `AWS_SECRET_ACCESS_KEY` secrets. It SHALL use `role-to-assume` with the OIDC role ARN and `aws-region` inputs on `aws-actions/configure-aws-credentials`.

#### Scenario: Workflow config contains no static key references
- **WHEN** `.github/workflows/deploy.yml` is inspected
- **THEN** the file SHALL NOT contain the strings `AWS_ACCESS_KEY_ID` or `AWS_SECRET_ACCESS_KEY`

### Requirement: S3 bucket name and CloudFront distribution ID are passed as GitHub Actions variables
The workflow SHALL read the S3 bucket name from a GitHub Actions variable `S3_BUCKET_NAME` and the CloudFront distribution ID from `CLOUDFRONT_DISTRIBUTION_ID`, so no AWS resource identifiers are hardcoded in the workflow YAML.

#### Scenario: Workflow uses variables not hardcoded values
- **WHEN** the workflow YAML is inspected
- **THEN** the S3 sync command SHALL reference `${{ vars.S3_BUCKET_NAME }}` and the invalidation command SHALL reference `${{ vars.CLOUDFRONT_DISTRIBUTION_ID }}`
