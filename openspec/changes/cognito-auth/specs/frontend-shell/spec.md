## MODIFIED Requirements

### Requirement: Frontend renders a placeholder page
The built React app SHALL configure client-side routing (e.g., using React Router or state-based tab routing) and render active application screens wrapped in appropriate layout shells, including a public landing page, `/login` and `/signup` authentication routes, protected role workspaces (`/events`, `/admin`), and the `/style-guide` route for visual QA, replacing the static Module 1.1 placeholder page.

#### Scenario: Placeholder page is visible in browser
- **WHEN** the built bundle is served (via CloudFront or local `npm run preview`)
- **THEN** the root path `/` SHALL render the main landing layout and navigation chrome, `/login` and `/signup` SHALL render authentication forms, and the path `/style-guide` SHALL render the interactive design system catalog

#### Scenario: Unauthorized access to admin route redirects to login
- **WHEN** an unauthenticated user or student attempts to navigate to `/admin`
- **THEN** the routing layer SHALL intercept the request and redirect to `/login` with an error notification or access denied state
