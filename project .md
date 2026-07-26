# EventTrail — Project Plan

> **Reference only:** `EventTrail-UI-main` (uploaded demo) is a **UI/UX blueprint only** — its design system (Neo-brutalism), component patterns, and page flow are the visual reference. This repo is built **from scratch**, with real AWS backend, real database, and production-grade architecture as described in `CampusPulse_Abstract.docx` and the attached architecture/DFD/use-case diagrams.

- **Duration:** 3 months (12 weeks)
- **Sprint length:** 2 weeks → **6 sprints total**
- **Rule:** ⚠️ **A module is not "done" until its module doc is written.** No moving to the next module without it (see "Module Documentation Policy" below).

---

## Module Documentation Policy (Mandatory)

After **every module** is completed:
1. Create a file at `docs/modules/module-XX-<slug>.md`
2. It must contain, in short form:
   - **What was built** (features, endpoints, screens, tables)
   - **Why / key decisions** (e.g. "chose DynamoDB conditional writes over Lambda locking because...")
   - **AWS resources touched/created** (Lambda names, DynamoDB tables, IAM roles, S3 buckets, etc.)
   - **Database changes** (new tables/columns/indexes, migration notes)
   - **Known gaps / TODO carried to next sprint**
   - **How to test it locally / demo it**
3. Update the root `PROGRESS.md` checklist (create once at project start) — tick off the module.
4. Only then start the next module.

This is non-negotiable — it's how you'll know every detail of the project when it's done.

---

## Tech Stack (carried from Abstract + Architecture diagram)

| Layer | Technology |
|---|---|
| Frontend | React.js (Vite), Tailwind CSS, Neo-brutalism design system (ported from demo) |
| Hosting/CDN | Amazon S3 + CloudFront |
| Auth | AWS Cognito (JWT, role-based: Student / Admin-Club-Organizer / Campus Staff) |
| API | Amazon API Gateway (~20 REST endpoints) |
| Compute | AWS Lambda (Auth, Events, RSVP/Waitlist, Maps, Notifier functions) |
| Relational DB | Amazon RDS MySQL (Users, Events, Venues, Clubs) |
| Real-time state | Amazon DynamoDB (RSVP + Waitlist, atomic counters) |
| Notifications | Amazon SNS (Email/SMS) + Amazon EventBridge (scheduled T-1hr reminders) |
| Maps — Outdoor | Leaflet.js + OpenStreetMap + OpenRouteService (pedestrian routing) + Browser Geolocation API |
| Maps — Indoor | Custom step-graph (admin-authored), Haversine geofence trigger, S3-hosted floor data |
| IaC | AWS CDK or Terraform (pick one in Sprint 1) |

---

## SPRINT 1 (Week 1–2): Foundations, Design System & Auth

**Goal:** A running app shell with real login, deployed pipeline, and the visual language locked in.

### Module 1.1 — Repo & Infra Scaffold
- Init new repo (Vite + React 19 + Tailwind), ESLint/Oxlint config
- Set up AWS account structure: IAM users/roles, budget alarms (free-tier guardrails)
- Choose IaC tool (CDK/Terraform), scaffold base stack (empty S3 bucket, CloudFront dist)
- CI/CD: GitHub Actions → build → deploy to S3 → CloudFront invalidation

### Module 1.2 — Neo-Brutalism Design System (ported, not copied blindly)
- Recreate design tokens in `tailwind.config.js`: colors (`bg-neobrutalist #F9F5F6`, `accent-yellow #FFDB58`, pastel mint/peach), `neo-shadow` box-shadow utilities, 3px black borders, `Epilogue`/`Inter` fonts
- Build core UI kit: `Button`, `Card`, `Badge`, `SeatMeter`, `StepTracker`, `RSVPTicket`, `ImageUploadZone`, `Marquee`, toast system
- Build layout shells: `LandingLayout`, `StudentLayout`, `AdminLayout`, shared `NavBar`/`Footer`

### Module 1.3 — Authentication (Cognito)
- Cognito User Pool with custom attributes for role (student/admin/staff)
- Lambda "Auth Fn" for post-confirmation triggers / profile bootstrap
- Frontend: Login/Signup pages (reuse demo UI), JWT storage, protected routes, role-based redirect
- API Gateway authorizer wired to Cognito JWT

**📄 Docs due:** `module-01-foundations.md`, `module-02-design-system.md`, `module-03-auth.md`

---

## SPRINT 2 (Week 3–4): Database Schema, Event Discovery & Clubs

**Goal:** Students can browse real events and clubs from a real database.

### Module 2.1 — RDS MySQL Schema
- Design & migrate tables: `users`, `events`, `venues`, `clubs`, `club_members`
- Connection via Lambda (RDS Proxy recommended for connection pooling)

### Module 2.2 — Events Lambda + API
- CRUD endpoints for events (`GET /events`, `GET /events/:id`, `POST /events` [admin], `PUT/DELETE`)
- Filtering: faculty, category, date range (query params → SQL)

### Module 2.3 — Event Discovery UI
- Event feed page with filters/search (port `EventDiscovery.jsx` layout)
- Event detail page (port `EventDetail.jsx`)

### Module 2.4 — Club Directory & Profiles
- Club CRUD (admin), club directory + profile pages (port `ClubDirectory.jsx`, `ClubProfile.jsx`)
- Membership join/leave, role distinction (member vs club admin)

**📄 Docs due:** `module-04-rds-schema.md`, `module-05-events-api.md`, `module-06-event-discovery-ui.md`, `module-07-clubs.md`

---

## SPRINT 3 (Week 5–6): RSVP & Waitlist Engine

**Goal:** Thread-safe, real-time RSVP with automatic waitlist promotion.

### Module 3.1 — DynamoDB Table Design
- `RSVP` table: partition key `eventId`, sort key `userId`, atomic counter attribute for `confirmedCount`
- Conditional writes to enforce capacity (no overbooking under concurrency)

### Module 3.2 — RSVP/Waitlist Lambda
- `POST /rsvp` (confirm or auto-waitlist if full), `DELETE /rsvp` (cancel → triggers promotion)
- DynamoDB Streams → Lambda trigger to promote longest-waiting student on cancellation

### Module 3.3 — RSVP UI
- One-click RSVP button + `SeatMeter` component wired to live capacity
- RSVP confirmation screen (port `RsvpConfirmation.jsx`), waitlist status indicator
- Student dashboard: "My RSVPs" list (port `StudentDashboard.jsx`)

**📄 Docs due:** `module-08-dynamodb-rsvp.md`, `module-09-rsvp-lambda.md`, `module-10-rsvp-ui.md`

---

## SPRINT 4 (Week 7–8): Campus Navigator (Map Feature)

**Goal:** Full dual-phase (outdoor → indoor) navigation, the flagship feature.

### Module 4.1 — Outdoor Routing
- Leaflet.js + OpenStreetMap base map
- Browser Geolocation API → current position
- OpenRouteService pedestrian routing API call → polyline + turn-by-turn steps to building entrance
- Route request proxied through a "Maps Fn" Lambda (hide API key, cache responses)

### Module 4.2 — Geofence & Phase Transition
- Haversine formula to detect entry into configurable geofence radius around venue
- Auto-switch UI from outdoor map view to indoor mode on geofence entry

### Module 4.3 — Indoor Navigation
- Admin-authored step-by-step text directions per venue (stored in RDS `venues` or dedicated table)
- `StepTracker` component: sequential step interaction, progress bar, arrival confirmation
- Admin venue upload tool (port `AdminVenueUpload.jsx`, `AdminVenueList.jsx`)

**📄 Docs due:** `module-11-outdoor-routing.md`, `module-12-geofence.md`, `module-13-indoor-nav.md`

---

## SPRINT 5 (Week 9–10): Notifications & Admin Dashboard

**Goal:** Proactive alerts + full admin control surface.

### Module 5.1 — SNS + EventBridge Notifications
- SNS topics for email/SMS
- EventBridge scheduled rule: T-1hr event reminder
- Immediate triggers: waitlist promotion alert, venue-change alert (includes updated indoor directions + map link)
- "Notifier Fn" Lambda consolidating all notification triggers

### Module 5.2 — Admin Dashboard
- RSVP stats, roster export (port `AdminDashboard.jsx`, `AdminRoster.jsx`)
- Event create/edit form (port `AdminEventForm.jsx`)
- Role-based access control enforcement across admin routes

**📄 Docs due:** `module-14-notifications.md`, `module-15-admin-dashboard.md`

---

## SPRINT 6 (Week 11–12): Integration, Hardening & Launch

**Goal:** Ship it — polished, tested, documented, demoable.

### Module 6.1 — End-to-End Testing
- Critical flows: signup→RSVP→waitlist promotion→notification; navigation geofence transition
- Load-test DynamoDB atomic counter under concurrent RSVP bursts

### Module 6.2 — Security & Cost Review
- IAM least-privilege audit per Lambda
- Cognito JWT scope review
- AWS Free Tier usage check (Lambda invocations, RDS hours, DynamoDB RCU/WCU, SNS sends)

### Module 6.3 — Accessibility & Polish Pass
- Contrast/focus-state audit on neo-brutalist components
- Mobile responsiveness pass

### Module 6.4 — Final Deployment & Demo Package
- Production deploy (S3+CloudFront+API Gateway stage)
- Record demo walkthrough, finalize architecture diagrams to match as-built system
- Compile final `PROJECT_SUMMARY.md` from all module docs

**📄 Docs due:** `module-16-testing.md`, `module-17-security-cost.md`, `module-18-accessibility.md`, `module-19-launch.md`

---

## Suggested Repo Structure

```
campuspulse/
├── frontend/                 # React app (Vite + Tailwind, neo-brutalist design system)
├── infra/                    # CDK/Terraform stacks
├── lambdas/
│   ├── auth-fn/
│   ├── events-fn/
│   ├── rsvp-fn/
│   ├── maps-fn/
│   └── notifier-fn/
├── docs/
│   └── modules/               # ← mandatory module write-ups live here
├── PROGRESS.md                # sprint/module checklist, ticked as you go
└── project.md                 # this file
```

---

## PROGRESS.md Checklist (create this alongside project.md)

- [ ] Module 1.1 Repo & Infra Scaffold
- [ ] Module 1.2 Design System
- [ ] Module 1.3 Auth (Cognito)
- [ ] Module 2.1 RDS Schema
- [ ] Module 2.2 Events API
- [ ] Module 2.3 Event Discovery UI
- [ ] Module 2.4 Clubs
- [ ] Module 3.1 DynamoDB RSVP Design
- [ ] Module 3.2 RSVP/Waitlist Lambda
- [ ] Module 3.3 RSVP UI
- [ ] Module 4.1 Outdoor Routing
- [ ] Module 4.2 Geofence
- [ ] Module 4.3 Indoor Navigation
- [ ] Module 5.1 Notifications
- [ ] Module 5.2 Admin Dashboard
- [ ] Module 6.1 Testing
- [ ] Module 6.2 Security & Cost
- [ ] Module 6.3 Accessibility & Polish
- [ ] Module 6.4 Launch
