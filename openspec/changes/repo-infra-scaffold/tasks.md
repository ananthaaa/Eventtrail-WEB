## 1. Repository Skeleton

- [x] 1.1 Create `PROGRESS.md` at repo root with all 19 modules listed as `- [ ]` checkboxes (exact list from `project.md`)
- [x] 1.2 Create `README.md` at repo root with project name, one-line description, and a "Getting Started" section documenting the CDK bootstrap prerequisite and the GitHub Actions variable names to set
- [x] 1.3 Create `docs/modules/README.md` placeholder explaining the mandatory module documentation policy
- [x] 1.4 Create stub `README.md` files inside each Lambda directory: `lambdas/auth-fn/`, `lambdas/events-fn/`, `lambdas/rsvp-fn/`, `lambdas/maps-fn/`, `lambdas/notifier-fn/`
- [x] 1.5 Create `openspec/specs/` directory (empty, with a `.gitkeep`) as the canonical spec accumulator

## 2. Frontend Shell (Vite + React 19 + TypeScript)

- [x] 2.1 Scaffold Vite + React 19 + TypeScript project in `frontend/` using `npm create vite@latest frontend -- --template react-ts` (run from repo root)
- [x] 2.2 Install Tailwind CSS v3 in `frontend/`: `npm install -D tailwindcss@3 postcss autoprefixer` and run `npx tailwindcss init -p`; configure `content` glob in `tailwind.config.ts` to include `./src/**/*.{ts,tsx}`; add Tailwind layers to `src/index.css`; add placeholder comment block marking where Module 2 tokens will be injected
- [x] 2.3 Install ESLint + Oxlint: add `eslint`, `@typescript-eslint/eslint-plugin`, `@typescript-eslint/parser`, `eslint-plugin-react-hooks`, and `oxlint` as devDependencies; create `.eslintrc.cjs` and `oxlint.json` with sensible defaults; add `"lint": "oxlint ./src && eslint ./src"` script to `package.json`
- [x] 2.4 Replace the default `src/App.tsx` with a minimal placeholder page component: renders `<h1>EventTrail</h1>` and a subtitle, updates `<title>` via React `<Helmet>` or inline document title hook; uses only `bg-white text-black` Tailwind classes (no design tokens yet)
- [x] 2.5 Update `index.html` `<title>` to `EventTrail — Coming Soon`
- [x] 2.6 Verify locally: `npm ci && npm run lint && npm run build` all exit 0 inside `frontend/`

## 3. AWS CDK Base Stack

- [x] 3.1 Initialize CDK app in `infra/` using `npx cdk init app --language typescript` (run from `infra/`)
- [x] 3.2 Install additional CDK dependencies in `infra/`: `aws-cdk-lib`, `constructs` (already scaffolded by init); confirm `package.json` lists them
- [x] 3.3 Rename the default generated stack file to `lib/eventtrail-base-stack.ts`; set `stackName: 'EventTrailBaseStack'` and `env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: 'ap-south-1' }`
- [x] 3.4 Add S3 bucket construct for `campuspulse-frontend`: `BlockPublicAccess.BLOCK_ALL`, `RemovalPolicy.RETAIN`, no versioning, bucket name `campuspulse-frontend-${this.account}`
- [x] 3.5 Add S3 bucket construct for `campuspulse-media`: `BlockPublicAccess.BLOCK_ALL`, `RemovalPolicy.RETAIN`, CORS rule allowing `PUT`/`GET` from any origin (tightened in Module 5 when Lambda upload URLs are wired), no versioning
- [x] 3.6 Add S3 bucket construct for `campuspulse-maps`: `BlockPublicAccess.BLOCK_ALL`, `RemovalPolicy.RETAIN`, versioning enabled, bucket name `campuspulse-maps-${this.account}`
- [x] 3.7 Add CloudFront Origin Access Control construct; add CloudFront Distribution with: origin = `campuspulse-frontend` via OAC, `defaultRootObject: 'index.html'`, viewer protocol policy REDIRECT_TO_HTTPS, cache policy `CachePolicy.CACHING_OPTIMIZED`, custom error response (404 → `index.html`, HTTP 200)
- [x] 3.8 Update `campuspulse-frontend` bucket policy to grant `s3:GetObject` to the CloudFront service principal with OAC condition (`AWS:SourceArn` = distribution ARN)
- [x] 3.9 Add IAM OIDC identity provider for `token.actions.githubusercontent.com` with thumbprint list; add IAM role `EventTrailGitHubActionsRole` with trust policy scoped to `repo:ananthaaa/EventTrial:ref:refs/heads/main`; attach inline policy granting `s3:PutObject`/`s3:DeleteObject`/`s3:GetObject` on `campuspulse-frontend-${account}/*` and `cloudfront:CreateInvalidation` on the distribution ARN only
- [x] 3.10 Add AWS Budgets L1 construct (`CfnBudget`) for monthly USD 10.00 budget named `EventTrail-MonthlyBudget` with an 80% actual threshold notification to the account root email
- [x] 3.11 Add `CfnOutput` for: CloudFront distribution domain, CloudFront distribution ID, S3 frontend bucket name, GitHub Actions role ARN — so values are readable after `cdk deploy`
- [x] 3.12 Run `npm run build` inside `infra/` (TypeScript compile) and `npx cdk synth` to verify the stack synthesizes without errors; commit the `cdk.out/` directory to `.gitignore`

## 4. GitHub Actions CI/CD Pipeline

- [x] 4.1 Create `.github/workflows/deploy.yml` with trigger `on: push: branches: [main]`
- [x] 4.2 Add `permissions: id-token: write; contents: read` to the workflow (required for OIDC)
- [x] 4.3 Add job steps: `actions/checkout@v4` → `actions/setup-node@v4` (Node 20) → `npm ci` (in `frontend/`) → `npm run lint` → `npm run build` → `aws-actions/configure-aws-credentials@v4` (role-to-assume from `vars.AWS_OIDC_ROLE_ARN`, region `ap-south-1`) → `aws s3 sync frontend/dist/ s3://${{ vars.S3_BUCKET_NAME }} --delete` → `aws cloudfront create-invalidation --distribution-id ${{ vars.CLOUDFRONT_DISTRIBUTION_ID }} --paths "/*"`
- [x] 4.4 Verify workflow YAML does NOT contain strings `AWS_ACCESS_KEY_ID` or `AWS_SECRET_ACCESS_KEY`
- [x] 4.5 Add `.github/workflows/README.md` documenting the three GitHub Actions variables (`AWS_OIDC_ROLE_ARN`, `S3_BUCKET_NAME`, `CLOUDFRONT_DISTRIBUTION_ID`) that must be set in repository settings before the workflow runs

## 5. Verification & Commit

- [x] 5.1 Confirm all spec scenarios pass: (a) `PROGRESS.md` has all 19 unchecked modules, (b) `npm ci && npm run lint && npm run build` exits 0 in `frontend/`, (c) `npx cdk synth` exits 0 in `infra/`, (d) `deploy.yml` has no static key references
- [ ] 5.2 Commit all changes with message: `feat(module-01): repo scaffold, CDK base stack, GitHub Actions CI/CD`
