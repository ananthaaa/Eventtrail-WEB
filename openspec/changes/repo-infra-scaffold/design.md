## Context

EventTrail is a greenfield serverless campus event platform. Nothing exists yet in this repository except the four specification documents (`eventtrail-overview.md`, `project.md`, `database.md`, `design-system.md`). This module creates every structural foundation that all 18 subsequent modules depend on: the repository layout, the frontend shell, the cloud infrastructure base, and the automated delivery pipeline.

IaC tool decision: **AWS CDK v2 (TypeScript)** (chosen over Terraform — rationale below). Region: **ap-south-1** (Mumbai — closest free-tier region for the campus user base).

## Goals / Non-Goals

**Goals:**
- Produce a compilable, lint-clean Vite + React 19 + TypeScript frontend that builds to a static bundle
- Provision three S3 buckets, one CloudFront distribution (with Origin Access Control), and a Budgets alarm via CDK
- Stand up a GitHub Actions workflow that deploys the frontend to S3 and invalidates CloudFront on every push to `main`, using OIDC (no long-lived AWS keys)
- Create the full directory skeleton (`frontend/`, `infra/`, `lambdas/*/`, `docs/modules/`, `openspec/specs/`, `PROGRESS.md`) so later modules can drop files in without restructuring
- Grant the CI/CD IAM role the minimum permissions required — nothing more

**Non-Goals:**
- Cognito User Pool, API Gateway, RDS, DynamoDB, Lambda functions — those belong to Modules 3–9
- Tailwind design tokens and the component library — Module 2
- Custom domain / SSL certificate — post-MVP
- Multi-account AWS organization or separate staging/prod AWS accounts — not in scope for this project size
- VPC, NAT gateways, or private subnets — added in Module 4 (RDS) when required

## Decisions

### D1: IaC — CDK v2 (TypeScript) over Terraform
**Chosen:** AWS CDK v2 with TypeScript  
**Alternatives:** Terraform HCL, CloudFormation raw YAML, SST  
**Rationale:** CDK is first-party AWS, ships the same language as Lambda handlers (TypeScript), compiles to CloudFormation, and gives type-safe constructs. Terraform would add an HCL context switch and requires a state backend. SST adds framework opinions that would conflict with the explicit module structure in `project.md`. CDK synth output (CloudFormation JSON) also serves as an auditable IaC artifact.

### D2: CloudFront OAC over OAI
**Chosen:** Origin Access Control (OAC) — the modern replacement  
**Rationale:** AWS deprecated Origin Access Identity for new distributions in 2022. OAC supports more S3 features (SSE-KMS, POST) and is the documented best practice. The S3 bucket policy grants `s3:GetObject` only to the CloudFront distribution's service principal with OAC condition.

### D3: GitHub Actions OIDC over long-lived IAM access keys
**Chosen:** OIDC federation — IAM role assumed via `AssumeRoleWithWebIdentity`  
**Rationale:** Long-lived keys in GitHub secrets are a common credential-leak vector. OIDC tokens are short-lived (≤1 hour), tied to a specific repo + branch, and leave no stored secret. The IAM OIDC provider for `token.actions.githubusercontent.com` is created once in the CDK stack; the role trust policy restricts `sub` to `repo:<owner>/EventTrial:ref:refs/heads/main`.

### D4: Separate S3 buckets for frontend, media, and maps
**Chosen:** Three discrete buckets as specified in `database.md` §4  
**Rationale:** Separation of concerns for IAM policies (CI/CD role only touches `campuspulse-frontend`; Lambda media-upload role only touches `campuspulse-media`) and lifecycle rules (media bucket can add expiry; maps bucket can add versioning). Mixing all assets in one bucket would require complex prefix-based policies.

### D5: Vite + React 19 + TypeScript (not CRA or Next.js)
**Chosen:** Vite + React 19  
**Rationale:** `project.md` explicitly specifies Vite. React 19 is the current stable release. TypeScript is chosen over plain JS for type-safety across Lambda handler contracts and frontend API client — catches schema mismatches at compile time rather than runtime. Next.js is SSR-first and would complicate S3+CloudFront static hosting.

### D6: CDK stack region and account — explicit, not environment-resolved
**Chosen:** Hardcode `env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: 'ap-south-1' }`  
**Rationale:** Avoids environment-agnostic stack pitfalls (Fn::Sub cross-account refs, S3 bucket naming collisions). Account ID is read from the deploying principal's environment at synth time — no secret, no hardcoded account number in source.

## Risks / Trade-offs

| Risk | Mitigation |
|---|---|
| CDK bootstrap not run in the AWS account | Document `cdk bootstrap aws://ACCOUNT/ap-south-1` as a one-time manual prerequisite; add a check in the README |
| OIDC provider already exists in account (duplicate resource) | Set `createNewOidcProvider: false` in CDK construct if provider already exists; document this edge case |
| CloudFront cold-invalidation cost ($0.005/path after 1000/month free) | Invalidate `/*` (single path = 1 path charge) on each deploy; monitor with Budgets alarm |
| S3 bucket names must be globally unique | Append AWS account ID suffix to bucket names: `campuspulse-frontend-<account>`, etc. |
| Vite default port 5173 conflicts with other dev tools | Document and leave as default; not a production concern |
| Free-tier Budgets alarm requires a verified email | Note in docs; alarm is best-effort, not a hard block |

## Migration Plan

1. Run `cdk bootstrap` once (manual, one-time, documented in README)
2. `cdk deploy EventTrailBaseStack` — creates all AWS resources (~3 min)
3. Note outputs: CloudFront distribution ID, S3 bucket names
4. Set GitHub repository secrets/vars: `AWS_ACCOUNT_ID`, `AWS_REGION`, `CLOUDFRONT_DISTRIBUTION_ID`, `S3_BUCKET_NAME`; the OIDC role ARN is derived from account ID (no separate secret needed)
5. Push to `main` — GitHub Actions runs, builds frontend, syncs to S3, invalidates CloudFront
6. Verify: visit CloudFront URL, confirm placeholder React app loads

**Rollback:** Delete the CDK stack (`cdk destroy`) — all three S3 buckets are empty at this stage so deletion proceeds without the "bucket not empty" guard.

## Open Questions

- **Q1:** What GitHub owner/org name should the OIDC trust policy use in `sub`? → Resolved: User confirmed GitHub username is `ananthaaa`. The IAM trust policy will scope `sub` strictly to `repo:ananthaaa/EventTrial:ref:refs/heads/main`.
- **Q2:** Should the Budgets alarm notify via SNS email or just the Budgets console? → Use Budgets console alert for now (no SNS topic needed in this module, keeping it minimal).
- **Q3:** `campuspulse-maps` bucket — should versioning be enabled immediately? → Enable versioning; the campus graph JSON is referenced by later modules and accidental overwrites should be recoverable.
