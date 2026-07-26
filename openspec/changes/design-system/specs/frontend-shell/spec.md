## MODIFIED Requirements

### Requirement: Frontend renders a placeholder page
The built React app SHALL configure client-side routing (e.g., using React Router or state-based tab routing) and render active application screens wrapped in appropriate layout shells, including a public landing page and the `/style-guide` route for visual QA, replacing the static Module 1.1 placeholder page.

#### Scenario: Placeholder page is visible in browser
- **WHEN** the built bundle is served (via CloudFront or local `npm run preview`)
- **THEN** the root path `/` SHALL render the main landing layout and navigation chrome, and the path `/style-guide` SHALL render the interactive design system catalog
