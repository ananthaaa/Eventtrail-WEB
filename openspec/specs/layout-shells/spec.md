# Capability: Layout Shells

## Purpose
Defines consistent navigation chrome (`NavBar`, `Footer`) and role-specific layout wrappers (`LandingLayout`, `StudentLayout`, `AdminLayout`) for EventTrail pages.

## Requirements

### Requirement: Shared NavBar and Footer provide consistent navigation chrome
The `NavBar` (`frontend/src/components/layout/NavBar.tsx`) and `Footer` (`frontend/src/components/layout/Footer.tsx`) components SHALL establish consistent top and bottom branding chrome. The `NavBar` SHALL display the EventTrail logo in Epilogue font, navigation links, and a CTA button (or user profile pill when logged in), styled with a bottom 3px black border (`border-b-3 border-black`) and sticky top positioning. The `Footer` SHALL display copyright and secondary links with a top 3px black border.

#### Scenario: NavBar remains sticky at top of viewport
- **WHEN** a user scrolls down a page wrapped in a layout shell
- **THEN** the `NavBar` SHALL remain fixed or sticky at the top of the viewport with its bottom border separating it from scrolling content

### Requirement: Role-specific layout shells wrap page content with appropriate navigation
The application SHALL provide three layout wrappers in `frontend/src/components/layout/`:
- `LandingLayout`: Wraps public marketing and discovery pages with `NavBar`, `.bg-grid-dots` background texture, and `Footer`.
- `StudentLayout`: Wraps authenticated student portal pages with student-oriented navigation items and clean background container.
- `AdminLayout`: Wraps event/club administration pages with an administrative header or sidebar navigation and workspace container.

#### Scenario: Rendering page in LandingLayout applies background grid and navigation
- **WHEN** `<LandingLayout><HomePage /></LandingLayout>` is rendered
- **THEN** the output SHALL display the `NavBar` at the top, `HomePage` content inside a container with `.bg-grid-dots` background, and `Footer` at the bottom
