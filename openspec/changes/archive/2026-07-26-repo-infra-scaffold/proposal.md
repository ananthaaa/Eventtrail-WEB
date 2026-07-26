## Why

EventTrail has no runnable codebase or cloud infrastructure yet. Before any feature work can begin, the project needs a version-controlled repository with a working frontend shell, a repeatable IaC stack, and an automated CI/CD pipeline so that every subsequent module can be built, tested, and deployed in isolation.

## What Changes

- **New**: Initialize Vite + React 19 + TypeScript frontend project under `frontend/`
- **New**: Configure Tailwind CSS v3 (tokens wired in Module 2) and ESLint/Oxlint
- **New**: Scaffold AWS infrastructure with AWS CDK v2 (TypeScript) under `infra/`
  - S3 bucket `campuspulse-frontend` (website hosting, private, OAC access)
  - S3 bucket `campuspulse-media` (event/club/user assets, private)
  - S3 bucket `campuspulse-maps` (campus graph JSON, floor plan assets, private)
  - CloudFront distribution (OAC → `campuspulse-frontend`, HTTPS, cache policies)
  - IAM scoped role for GitHub Actions OIDC deploy (least-privilege: `s3:PutObject`, `s3:DeleteObject` on `campuspulse-frontend/*` + `cloudfront:CreateInvalidation` on the distribution only)
  - AWS Budgets alarm at $10/month to guard free-tier spend
- **New**: GitHub Actions CI/CD pipeline (`.github/workflows/deploy.yml`)
  - Trigger: push to `main`
  - Steps: install → lint → build → sync to S3 → CloudFront invalidation
  - Uses OIDC (no long-lived keys) + least-privilege role above
- **New**: `PROGRESS.md` root checklist (19 modules, all unchecked at start)
- **New**: `docs/modules/` directory with placeholder README
- **New**: `lambdas/` stub directories (`auth-fn/`, `events-fn/`, `rsvp-fn/`, `maps-fn/`, `notifier-fn/`)
- **New**: `openspec/specs/` as the canonical spec accumulator (empty until Module 1 archive step)
- **No breaking changes** (greenfield — nothing exists yet)

## Capabilities

### New Capabilities

- `repo-structure`: Top-level repository layout matching `project.md` (`frontend/`, `infra/`, `lambdas/`, `docs/`, `PROGRESS.md`)
- `frontend-shell`: Vite + React 19 + TypeScript app that builds successfully and renders a placeholder `<App />` page; Tailwind configured but tokens deferred to Module 2
- `cdk-base-stack`: CDK v2 stack provisioning the three S3 buckets, CloudFront distribution with OAC, and AWS Budgets alarm
- `cicd-pipeline`: GitHub Actions workflow (OIDC-based, least-privilege) that builds and deploys the frontend on every push to `main` and invalidates the CloudFront cache

### Modified Capabilities

*(none — greenfield)*

## Impact

- **Code**: creates `frontend/`, `infra/`, `lambdas/`, `docs/`, `PROGRESS.md`, `.github/workflows/`
- **AWS resources created**: 3 S3 buckets, 1 CloudFront distribution, 1 OAC, 1 IAM OIDC role, 1 Budgets alarm
- **Dependencies introduced**: Node.js ≥ 20, AWS CDK v2, GitHub Actions, `aws-cdk-lib`, `constructs`, Vite, React 19, TypeScript, Tailwind CSS v3, ESLint, Oxlint
- **No Lambda, RDS, DynamoDB, or Cognito resources are created in this module** — those belong to Modules 3–9
