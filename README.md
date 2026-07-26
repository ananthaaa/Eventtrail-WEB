# EventTrail (CampusPulse)

A full-stack, serverless campus event and RSVP platform built on AWS from scratch.

## Overview
EventTrail centralizes campus event discovery, thread-safe RSVPs with automatic waitlisting, and dual-phase (outdoor + indoor) navigation into a single responsive web application built with a Neo-brutalist aesthetic.

## Directory Structure
- `frontend/` — React 19 + TypeScript + Vite + Tailwind CSS application
- `infra/` — AWS CDK v2 TypeScript infrastructure stacks
- `lambdas/` — AWS Lambda serverless function handlers
- `docs/modules/` — Mandatory per-module documentation write-ups
- `openspec/` — Canonical OpenSpec system specifications and change history

## Getting Started

### Prerequisites
- Node.js ≥ 20.x and npm
- AWS CLI v2 configured with appropriate credentials
- AWS CDK CLI (`npm install -g aws-cdk`)

### 1. One-Time AWS CDK Bootstrap
Before deploying CDK stacks to a new AWS account/region, bootstrap the environment:
```bash
cdk bootstrap aws://<AWS_ACCOUNT_ID>/ap-south-1
```

### 2. Local Frontend Development
```bash
cd frontend
npm ci
npm run dev
```

### 3. CI/CD Deployment (GitHub Actions)
The repository uses OpenID Connect (OIDC) with AWS for passwordless CI/CD deployments.
Before triggering the deployment workflow on `main`, configure the following Repository Variables under **Settings > Secrets and variables > Actions > Variables**:
- `AWS_OIDC_ROLE_ARN` — ARN of the CDK-provisioned IAM role (`EventTrailGitHubActionsRole`)
- `S3_BUCKET_NAME` — Name of the frontend hosting S3 bucket (`campuspulse-frontend-<account>`)
- `CLOUDFRONT_DISTRIBUTION_ID` — ID of the CloudFront distribution
