## ADDED Requirements

### Requirement: Neo-brutalist Login screen renders authentication form
The application SHALL provide a Login screen at `/login` (`frontend/src/pages/Login.tsx`) styled with canonical Module 1.2 Neo-brutalist tokens (`Card`, `Button`, 3px borders, Epilogue headings, and flat shadows). It SHALL include inputs for Email and Password, a submit button, and a toggle link to navigate to `/signup`. When submitted, it SHALL invoke the `useAuth().login()` method and redirect authenticated users to their destination or role dashboard.

#### Scenario: Submitting valid credentials logs user in and redirects
- **WHEN** a user enters valid email and password on `/login` and clicks submit
- **THEN** the authentication state SHALL update to authenticated and redirect the user to `/events` (for students) or `/admin` (for admins/staff)

#### Scenario: Failed login displays Neo-brutalist error toast
- **WHEN** authentication fails due to incorrect password or unverified account
- **THEN** an error alert toast SHALL be triggered with the failure message

### Requirement: Neo-brutalist Signup screen supports role and faculty selection
The application SHALL provide a Signup screen at `/signup` (`frontend/src/pages/Signup.tsx`) styled with Neo-brutalist tokens. It SHALL capture Full Name, Email, Password, Faculty (dropdown or text input), and Role selection (radio buttons or cards selecting between `Student`, `Club Admin`, and `Campus Staff`). When submitted, it SHALL invoke `useAuth().signup()`, support email verification code confirmation (if required or simulated in local mode), and redirect upon completion.

#### Scenario: User signs up with chosen role and faculty
- **WHEN** a user fills out `/signup` selecting role `Club Admin` and faculty `Engineering` and submits
- **THEN** the account registration SHALL be initiated with custom attributes `custom:role = club_admin` and `custom:faculty = Engineering`

### Requirement: AuthProvider manages client identity state and offline fallback
The application SHALL provide an `AuthProvider` context component (`frontend/src/contexts/AuthContext.tsx`) and `useAuth` hook exporting `user` (object containing email, name, role, faculty), `isAuthenticated` (boolean), `isLoading` (boolean), `login(email, password)`, `signup(...)`, and `logout()`. In local development mode without live AWS Cognito credentials, `AuthProvider` SHALL support an offline mock mode allowing developers to switch between test student and admin personas for rapid UI testing.

#### Scenario: Mock offline mode allows immediate testing of student and admin roles
- **WHEN** the application runs locally in development mode without live Cognito keys
- **THEN** `useAuth` SHALL allow toggling between pre-seeded test student and test admin profiles without failing network requests
