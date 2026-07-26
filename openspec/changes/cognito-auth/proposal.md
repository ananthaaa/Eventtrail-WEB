## Why

Secure, role-based authentication is essential for EventTrail so students can browse and RSVP to campus events, while club organizers and campus staff can securely administer events, venues, and club directories without unauthorized access. Implementing Amazon Cognito User Pools now establishes the identity foundation required before building out the database schemas and protected API endpoints in Sprint 2.

## What Changes

- **AWS Cognito User Pool & Client**: Add infrastructure in `infra/` (via AWS CDK) defining an Amazon Cognito User Pool with email verification, password policies, and custom schema attributes (`custom:role` supporting `student`, `club_admin`, `campus_staff`, and `custom:faculty`).
- **Post-Confirmation Lambda Trigger**: Implement `lambdas/auth-fn/` as a Node.js/TypeScript handler wired to Cognito's `PostConfirmation_ConfirmSignUp` trigger to process new registrations and prepare user identity data for database syncing.
- **Neo-Brutalist Login & Signup Screens**: Create `/login` and `/signup` screens in `frontend/src/pages/` styled with canonical Module 1.2 Neo-brutalist tokens (`Card`, `Button`, 3px borders, flat shadows), including role selection and faculty dropdown controls.
- **Client Authentication State (`useAuth`)**: Implement an authentication provider and hook (`AuthProvider` / `useAuth` in `frontend/src/contexts/AuthContext.tsx`) that manages JWT tokens, decodes user claims, handles login/logout/signup flows, and supports an offline development fallback mode.
- **Protected Routing & Navigation Chrome**: Update `App.tsx` and `NavBar.tsx` to protect administrative routes (`/admin`) and dynamically toggle authentication action buttons (`Log In` / `Sign Up` vs. user profile pill and `Log Out`).

## Capabilities

### New Capabilities
- `cognito-user-pool`: Defines the CDK infrastructure for the Amazon Cognito User Pool, SPA client, custom role attributes, and IAM triggers.
- `auth-trigger-lambda`: Defines the `auth-fn` Lambda function behavior for post-confirmation signup handling.
- `auth-ui-screens`: Defines the visual structure, validation rules, and user flows for the Neo-brutalist `/login` and `/signup` screens and `useAuth` client state hook.

### Modified Capabilities
- `frontend-shell`: Requirement for client-side routing is modified to include authentication state management, login/signup route registration, and protected navigation rules.

## Impact

- **Infrastructure (`infra/`)**: Adds new AWS CDK constructs (`UserPool`, `UserPoolClient`, `Lambda` trigger) to the backend stack.
- **Backend Compute (`lambdas/auth-fn/`)**: Implements TypeScript logic for post-confirmation user processing.
- **Frontend App (`frontend/`)**: Introduces `@aws-sdk/client-cognito-identity-provider` (or JWT helper library) dependencies, new page components (`Login.tsx`, `Signup.tsx`), global authentication state (`AuthContext.tsx`), and navigation bar updates.
