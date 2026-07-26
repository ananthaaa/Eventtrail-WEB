## 1. CDK Infrastructure & User Pool

- [x] 1.1 Update `infra/lib/event_trail_base_stack-stack.ts` to instantiate an `AWS::Cognito::UserPool` (`CampusPulseUserPool`) requiring email verification, password policies, and mutable custom schema attributes (`custom:role` and `custom:faculty`)
- [x] 1.2 Add an `AWS::Cognito::UserPoolClient` (`CampusPulseSPAClient`) configured without a client secret (`GenerateSecret: false`) and supporting `USER_SRP_AUTH` and `REFRESH_TOKEN_AUTH` flows
- [x] 1.3 Add CfnOutput constructs in `infra/lib/event_trail_base_stack-stack.ts` to export the `UserPoolId` and `UserPoolClientId` after deployment

## 2. Post-Confirmation Lambda Handler (`auth-fn`)

- [x] 2.1 Initialize `lambdas/auth-fn/package.json`, `tsconfig.json`, and `@types/aws-lambda` dependency for TypeScript Lambda compilation
- [x] 2.2 Implement `lambdas/auth-fn/index.ts` to export an async handler that logs incoming `PostConfirmation_ConfirmSignUp` events, extracts user attributes (`sub`, `email`, `name`, `custom:role`, `custom:faculty`), and returns the unmodified event object
- [x] 2.3 Wire the `auth-fn` Lambda function in `infra/lib/event_trail_base_stack-stack.ts` as the `postConfirmation` trigger on `CampusPulseUserPool`
- [x] 2.4 Run `npx cdk synth` in `infra/` to verify zero TypeScript errors and clean CloudFormation template synthesis

## 3. Client Authentication State & Hooks (`useAuth`)

- [x] 3.1 Install `@aws-sdk/client-cognito-identity-provider` (or lightweight JWT decoding utilities) in `frontend/package.json`
- [x] 3.2 Create `frontend/src/contexts/AuthContext.tsx` implementing `AuthProvider` and `useAuth` hook exporting `user`, `isAuthenticated`, `isLoading`, `login`, `signup`, and `logout` methods
- [x] 3.3 Implement "Mock Dev Mode" fallback in `AuthContext.tsx` when offline or without live AWS keys, allowing interactive UI toggling between test student (`student@campuspulse.edu`) and test admin (`admin@campuspulse.edu`) identities
- [x] 3.4 Export `AuthProvider` and `useAuth` in `frontend/src/components/ui/index.ts` (or `contexts/index.ts`)

## 4. Neo-Brutalist UI Screens & Route Protection

- [x] 4.1 Create `frontend/src/pages/Login.tsx` rendering a Neo-brutalist login form (`Card`, `Button`, 3px borders, Epilogue headers) with email/password inputs and interactive toast error/success notifications
- [x] 4.2 Create `frontend/src/pages/Signup.tsx` rendering a Neo-brutalist registration form with full name, email, password, faculty text/dropdown, and interactive role selection cards (`Student`, `Club Admin`, `Campus Staff`)
- [x] 4.3 Create `frontend/src/components/auth/AuthGuard.tsx` component that checks `isAuthenticated` and `allowedRoles`, redirecting unauthorized users to `/login` with an access denied toast alert
- [x] 4.4 Update `frontend/src/App.tsx` to register `/login` and `/signup` routes, wrap `/admin` inside `<AuthGuard allowedRoles={['club_admin', 'campus_staff']}>`, and wrap the app in `<AuthProvider>`
- [x] 4.5 Update `frontend/src/components/layout/NavBar.tsx` to display live authentication status (e.g., showing `Log In` / `Sign Up` buttons when anonymous, or a role pill and `Log Out` button when authenticated)

## 5. Verification & Documentation

- [x] 5.1 Run `npm run lint` and `npm run build` in `frontend/` to verify zero TypeScript compilation errors, zero ESLint warnings, and clean bundle generation
- [x] 5.2 Test local login, signup, role toggling, and protected route redirection in Vite dev server (`http://localhost:5173/login`)
- [x] 5.3 Write mandatory module completion summary at `docs/modules/module-03-auth.md` detailing Cognito setup, auth-fn trigger, and UI flows
- [x] 5.4 Update root `PROGRESS.md` to check off `- [x] Module 1.3 Auth (Cognito)`
- [x] 5.5 Commit all changes to Git with message: `feat(module-03): cognito user pool, auth-fn trigger, and neo-brutalist login/signup screens`
