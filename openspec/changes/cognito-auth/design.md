## Context

EventTrail requires an authentication layer to differentiate between general campus students, club administrators, and campus staff. While Module 1.1 established the AWS CDK base infrastructure and Module 1.2 built the Neo-brutalist UI component library and layout shells, the application currently lacks live identity management, user onboarding workflows, and route protection. Implementing Amazon Cognito User Pools now ensures that subsequent backend data schemas (Module 2.1) and API endpoints (Module 2.2) can securely bind data to verified user identities and roles.

## Goals / Non-Goals

**Goals:**
- Provision an Amazon Cognito User Pool and SPA Client in AWS CDK with email verification and custom schema attributes (`custom:role` and `custom:faculty`).
- Implement the Node.js/TypeScript post-confirmation Lambda trigger (`auth-fn`) to log and process new registrations.
- Build Neo-brutalist `/login` and `/signup` screens utilizing Module 1.2 design tokens (`Card`, `Button`, 3px borders, flat shadows).
- Create a client authentication provider (`AuthProvider` / `useAuth`) supporting JWT identity claims, login/logout actions, and an offline local mock fallback mode for seamless UI testing.
- Secure administrative and authenticated routes in `App.tsx` and update `NavBar.tsx` to display active user identity and auth actions.

**Non-Goals:**
- Social identity providers (Google, Apple, SAML federation) — standard email/password authentication is sufficient for campus launch.
- Real RDS MySQL database insertion during post-confirmation — this database wiring is explicitly scheduled for Module 2.1 (RDS Schema).

## Decisions

### 1. CDK User Pool Schema and SPA Auth Flow
- **Decision**: Define mutable custom attributes `custom:role` (enum values: `student`, `club_admin`, `campus_staff`) and `custom:faculty` directly on the User Pool schema. Configure the User Pool Client with `GenerateSecret: false` and explicit auth flows `USER_SRP_AUTH` and `REFRESH_TOKEN_AUTH`.
- **Rationale**: SPA frontend applications running in browser environments cannot securely protect client secrets. Using SRP (Secure Remote Password) protocol ensures passwords are never transmitted over the wire in plaintext, while embedding role claims directly into the Cognito ID/Access JWT tokens allows API Gateway authorizers and client UI routing to make immediate authorization decisions without querying a database on every request.

### 2. Dual-Mode Client Authentication State (`AuthProvider`)
- **Decision**: Implement an authentication context (`AuthContext.tsx`) that checks for environmental AWS configuration (Cognito User Pool ID and Client ID). If live AWS credentials are not configured or when running in offline local dev mode, the provider activates a "Mock Dev Mode" with pre-seeded student (`student@campuspulse.edu`) and admin (`admin@campuspulse.edu`) test personas and an interactive toggle in the UI.
- **Rationale**: Allows frontend developers and UI visual QA testers to verify protected routing, admin layouts, and role-conditioned components instantly without needing live internet access or creating real AWS Cognito user accounts during local UI development.

### 3. Neo-Brutalist Auth Forms and Route Guarding
- **Decision**: Wrap `/login` and `/signup` page forms inside canonical `Card` components with 3px solid black borders, flat shadows, Epilogue headers, and interactive Framer Motion tap animations on primary submit buttons. Implement an `<AuthGuard allowedRoles={[...]} />` wrapper in `App.tsx` that intercepts unauthorized route access and redirects to `/login` with an automated Neo-brutalist warning toast notification.
- **Rationale**: Ensures the onboarding experience maintains strict visual consistency with `design-system.md` while preventing unauthorized students from viewing administrative control panels.

## Risks / Trade-offs

- **[Risk] Custom Attribute Immutability**: In AWS Cognito, standard attributes like `email` can be made required, but custom schema attributes once created cannot have their data types altered.  
  → **Mitigation**: Strictly define custom attributes as `String` and set mutable to `true` in CDK so user profiles can be updated later in the settings UI.
- **[Risk] Offline Fallback Security**: Mock dev mode could accidentally leak into production deployments if not properly fenced.  
  → **Mitigation**: Guard mock mode activation with strict environment checks (`import.meta.env.DEV && !import.meta.env.VITE_COGNITO_USER_POOL_ID`), ensuring production builds always enforce real AWS Cognito JWT verification.
