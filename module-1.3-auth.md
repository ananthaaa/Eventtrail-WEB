# Module 1.3 / 1.4 — Cognito Authentication & Route Protection

## What was built
- **AWS CDK Infrastructure (`infra/lib/eventtrail-base-stack.ts`)**:
  - `Cognito::UserPool`: Configured custom Cognito User Pool (`EventTrailUsers`) supporting email login, auto-verified attributes (`email`), and custom schema attributes (`custom:role` with values `student`, `club_admin`, `campus_staff`, and `custom:faculty`).
  - `Cognito::UserPoolClient`: Single-Page Application (SPA) client without client secret, supporting `USER_PASSWORD_AUTH` and `USER_SRP_AUTH`.
  - `Lambda::Function`: Created `auth-fn` NodejsFunction triggered by `POST_CONFIRMATION` pool operation to handle downstream synchronization of verified users to RDS MySQL.
- **Frontend Auth Context & State (`frontend/src/contexts/AuthContext.tsx`)**:
  - Implemented `AuthProvider` and `useAuth` hook managing user session state (`user`, `isAuthenticated`, `isLoading`, `token`).
  - Added Dev Mock Mode fallback when AWS Cognito environment variables are absent, allowing local development and evaluation without AWS credentials.
  - Implemented `toggleMockRole` to allow developer/evaluator role switching (`student` ↔ `club_admin` ↔ `campus_staff`) on the fly.
- **Neo-Brutalist Authentication UI (`frontend/src/pages/`)**:
  - `Login.tsx`: Tactile Neo-brutalist login card with email/password inputs, toast notification feedback, and Dev Mode quick-fill persona buttons.
  - `Signup.tsx`: Registration form with full name, email, password, faculty selector, and interactive role cards (`Student`, `Club Admin`, `Campus Staff`).
- **Route Protection & Navigation (`frontend/src/components/auth/AuthGuard.tsx` & `App.tsx`)**:
  - `AuthGuard`: Role-based route guard wrapping protected routes. Unauthenticated access redirects to `/login` with an error toast; unauthorized role access redirects to `/events` with an access denied toast.
  - `NavBar`: Integrated dynamic auth status, rendering Log In / Sign Up buttons for anonymous users, and user role badges with interactive Dev Mode role toggling for authenticated users.

## Why / Key Decisions
- **Custom Attributes for RBAC**: Stored `custom:role` and `custom:faculty` directly in Cognito user attributes to enable zero-latency role-based route protection on the frontend without requiring an extra database round-trip during initial session load.
- **Dev Mock Mode Fallback**: To ensure seamless local developer experience and evaluation without live AWS credentials, the authentication context automatically falls back to an interactive Dev Mode when `VITE_COGNITO_USER_POOL_ID` is not provided.
- **Explicit Bundler Asset Configuration**: In AWS CDK v2, explicit `projectRoot` and `depsLockFilePath` configuration was added to the `NodejsFunction` construct to ensure reliable bundling across Windows and CI environments.

## AWS Resources Touched/Created
- `AWS::Cognito::UserPool` (`EventTrailUsers`)
- `AWS::Cognito::UserPoolClient` (`EventTrailSPAClient`)
- `AWS::Lambda::Function` (`auth-fn` PostConfirmation trigger)
- `AWS::Lambda::Permission` (allowing Cognito to invoke `auth-fn`)

## Database Changes
- None in this module. In Module 2.1, the `auth-fn` Lambda trigger will be connected to AWS RDS MySQL to insert user profile records into the `users` table upon PostConfirmation.

## Known Gaps / TODO for Next Sprint
- Module 2.1: Implement RDS MySQL database schema provisioning and wire the `auth-fn` PostConfirmation Lambda to insert new user records into the database.
- Connect live AWS Cognito JWT bearer token headers to downstream API Gateway / AppSync endpoints.

## How to Test Locally
1. **Frontend Build & Verification**:
   ```bash
   cd frontend
   npm run build
   npm run dev
   ```
2. **Interactive Auth & Route Testing**:
   - Open `http://localhost:5173/`. Notice the `Log In` and `Sign Up` buttons in the navbar.
   - Click `Sign Up`, select `Club Admin`, enter test details, and register. Notice the toast notification and redirection to `/admin`.
   - In the navbar, click the role pill (`CLUB ADMIN ⚡`) to toggle between student and admin personas in Dev Mode.
   - Try accessing `/admin` as a `student` persona; verify that `AuthGuard` triggers an Access Restricted toast and redirects to `/events`.
