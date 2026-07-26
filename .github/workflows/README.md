# GitHub Actions CI/CD Configuration

This repository uses GitHub Actions with AWS OpenID Connect (OIDC) federation for passwordless, secure deployments to AWS.

## Required Repository Variables

Before running the `deploy.yml` workflow, configure the following **Repository Variables** in GitHub under **Settings > Secrets and variables > Actions > Variables**:

| Variable Name | Description | Example Value |
| :--- | :--- | :--- |
| `AWS_OIDC_ROLE_ARN` | ARN of the IAM role provisioned by CDK for GitHub Actions | `arn:aws:iam::123456789012:role/EventTrailGitHubActionsRole` |
| `S3_BUCKET_NAME` | S3 bucket name for hosting frontend static assets | `campuspulse-frontend-123456789012` |
| `CLOUDFRONT_DISTRIBUTION_ID` | CloudFront distribution ID for cache invalidation | `E1A2B3C4D5E6F7` |

## Security Note
Do **NOT** store static AWS access keys (`AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`) as secrets or variables. All AWS authentication is handled dynamically via temporary STS credentials using the GitHub OIDC provider.
