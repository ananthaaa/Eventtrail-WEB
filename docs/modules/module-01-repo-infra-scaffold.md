# Module 1.1 — Repo & Infra Scaffold

## What was built
- **Repository Skeleton**: Root directory structure with `frontend/`, `infra/`, `lambdas/`, `docs/`, and `openspec/`. Created root `README.md`, `PROGRESS.md`, and module doc policy.
- **Frontend Shell**: React 19 + TypeScript + Vite application in `frontend/` with Tailwind CSS v3, ESLint, Oxlint, and a minimal landing page placeholder (`EventTrail — Coming Soon`).
- **CDK Base Stack (`EventTrailBaseStack`)**: CDK v2 TypeScript app in `infra/` defining 3 S3 buckets (`campuspulse-frontend`, `campuspulse-media`, `campuspulse-maps`), CloudFront distribution with Origin Access Control (OAC), GitHub Actions IAM OIDC provider & role, and an AWS Budgets L1 construct ($10/mo limit).
- **CI/CD Pipeline**: GitHub Actions workflow (`.github/workflows/deploy.yml`) for automated, passwordless OIDC deployments to S3 and CloudFront on push to `main`.

## Key Decisions & Rationale
- **CDK v2 over Terraform**: Native TypeScript support allows sharing types and constants between backend infrastructure and Lambda handlers.
- **Origin Access Control (OAC)**: Replaced legacy OAI with OAC for secure, modern CloudFront-to-S3 access without exposing public bucket endpoints.
- **GitHub OIDC Federation**: Eliminates long-lived AWS IAM access keys in GitHub Secrets, adhering to least-privilege security best practices.

## AWS Resources Touched/Created
- `AWS::S3::Bucket`: `campuspulse-frontend-<account>`, `campuspulse-media-<account>`, `campuspulse-maps-<account>`
- `AWS::CloudFront::Distribution`: HTTPS distribution with OAC pointing to frontend bucket
- `AWS::IAM::OpenIdConnectProvider`: `token.actions.githubusercontent.com`
- `AWS::IAM::Role`: `EventTrailGitHubActionsRole` scoped to repository `main` branch
- `AWS::Budgets::Budget`: `EventTrail-MonthlyBudget` ($10 limit, 80% email alert)

## Database Changes
- None in this module.

## Known Gaps / TODO for Next Sprint
- Module 1.2: Implement Neo-brutalism design tokens in `tailwind.config.ts` and build core UI components.
- Wire CORS upload URLs and tighten media bucket policy in Module 5 when Lambda upload handlers are implemented.

## How to Test Locally
1. **Frontend**:
   ```bash
   cd frontend
   npm ci
   npm run lint
   npm run build
   ```
2. **Infrastructure (CDK Synth)**:
   ```bash
   cd infra
   npm run build
   npx cdk synth
   ```
