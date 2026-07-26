# Capability: Style Guide QA

## Purpose
Defines an interactive visual QA test suite screen at `/style-guide` for validating all Neo-brutalist UI components, tokens, micro-animations, and toast alerts.

## Requirements

### Requirement: Style guide screen renders all UI components and variant states for visual QA
The application SHALL provide a dedicated visual QA screen at route `/style-guide` (`frontend/src/pages/StyleGuide.tsx`) that imports and displays live, interactive examples of every Module 1.2 design system component: all `Button` variants and sizes, all `Badge` variants, `Card` shadows and hover states, `SeatMeter` at various capacities (including 100% waitlist), `StepTracker` with active/completed steps, `RSVPTicket`, `Marquee`, `ImageUploadZone`, and interactive buttons to trigger test `Toast` alerts.

#### Scenario: Navigating to style guide route displays interactive component catalog
- **WHEN** a user or QA developer opens `http://localhost:5173/style-guide` in the browser
- **THEN** the page SHALL render cleanly without console errors and display organized sections for colors, typography, buttons, badges, cards, progress meters, tickets, and toasts

#### Scenario: Style guide interactive controls trigger toast alerts and state changes
- **WHEN** a user clicks the "Show Success Toast" button on the style guide page
- **THEN** a success toast alert SHALL appear in the bottom-right viewport corner
