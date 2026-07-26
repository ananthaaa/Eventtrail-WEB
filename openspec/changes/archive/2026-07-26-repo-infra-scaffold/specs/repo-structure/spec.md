## ADDED Requirements

### Requirement: Repository directory structure is established
The repository SHALL contain the top-level directories `frontend/`, `infra/`, `lambdas/`, `docs/modules/`, and `openspec/specs/`, plus root files `PROGRESS.md` and `README.md`, matching the structure specified in `project.md`.

#### Scenario: All required top-level directories exist after scaffold
- **WHEN** the scaffold task is complete and the repository is cloned fresh
- **THEN** running `ls` at the repo root SHALL show `frontend/`, `infra/`, `lambdas/`, `docs/`, `openspec/`, `PROGRESS.md`, and `README.md`

#### Scenario: Lambda stub directories exist for all five functions
- **WHEN** the scaffold is complete
- **THEN** `lambdas/` SHALL contain subdirectories: `auth-fn/`, `events-fn/`, `rsvp-fn/`, `maps-fn/`, `notifier-fn/`, each with at minimum a `README.md` stub

#### Scenario: PROGRESS.md lists all 19 modules unchecked
- **WHEN** `PROGRESS.md` is read
- **THEN** it SHALL list all 19 modules (Module 1.1 through Module 6.4) as unchecked `- [ ]` items matching the checklist in `project.md`
