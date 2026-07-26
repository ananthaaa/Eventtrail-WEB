# CampusPulse — User Stories

Derived from `CampusPulse_Abstract.docx`, the Use Case Diagram, and `project.md`. Grouped by epic; each epic maps to a Sprint/Module so you can drop these straight into your sprint board. Roles come from the Use Case Diagram: **Student**, **Admin / Club Organizer**, **Campus Staff**.

Format: `As a <role>, I want <goal>, so that <benefit>.` + Acceptance Criteria (AC) + linked module.

---

## Epic 1 — Authentication & Onboarding
*(→ Module 1.3, Sprint 1)*

**US-1.1** — As a **Student**, I want to register an account with my campus email, so that I can access event and club features.
- AC: Signup form validates campus email domain; Cognito user created with `role=student`; redirected to onboarding/faculty selection on first login.

**US-1.2** — As a **Student**, I want to log in and stay logged in across sessions, so that I don't re-authenticate every visit.
- AC: JWT stored securely; session persists until expiry/logout; expired token triggers silent redirect to login.

**US-1.3** — As an **Admin/Club Organizer**, I want a distinct login role, so that I can access club/event management tools not visible to students.
- AC: Role claim in JWT enforced both client-side (route guard) and server-side (API Gateway authorizer + Lambda check) — never trust the client-side check alone.

**US-1.4** — As a **Campus Staff** member, I want a staff role separate from club admins, so that I can post campus-wide events/announcements without club affiliation.
- AC: `campus_staff` role can create events not tied to a `club_id`.

---

## Epic 2 — Event Discovery
*(→ Modules 2.2–2.3, Sprint 2)*

**US-2.1** — As a **Student**, I want to browse a feed of all upcoming events, so that I don't have to check WhatsApp groups or noticeboards.
- AC: Feed loads events sorted by date ascending; each card shows title, date/time, faculty, category, seats remaining.

**US-2.2** — As a **Student**, I want to filter events by faculty, category, and date, so that I can find events relevant to me quickly.
- AC: Filters combine (AND logic); filter state reflected in URL query params (shareable/bookmarkable); "no results" empty state shown.

**US-2.3** — As a **Student**, I want to view full event details (description, schedule, speakers, venue), so that I can decide whether to attend.
- AC: Detail page shows agenda timeline, speaker cards, and a "View on Map" link into the Campus Navigator.

**US-2.4** — As a **Student**, I want to see how many seats are left in real time, so that I know if I should hurry to RSVP.
- AC: Seat count reflects live DynamoDB `confirmedCount`, not a cached RDS value; updates without full page reload if possible.

---

## Epic 3 — Clubs & Membership
*(→ Module 2.4, Sprint 2)*

**US-3.1** — As a **Student**, I want to browse a directory of campus clubs, so that I can discover communities that match my interests.
- AC: Directory grid shows club logo, name, short description, member count.

**US-3.2** — As a **Student**, I want to view a club's profile page with its upcoming/past events, so that I can decide whether to join.
- AC: Club profile lists events via `organizer_club_id`; shows member count and a Join/Leave button.

**US-3.3** — As a **Student**, I want to join or leave a club, so that I can manage my own community involvement.
- AC: Join adds row to `club_members`; leave removes it; UI updates immediately (optimistic update acceptable).

**US-3.4** — As a **Club Admin**, I want to be distinguished from regular members, so that only I can create events/edit the club profile.
- AC: `member_role = club_admin` required for club-scoped mutations; enforced server-side.

---

## Epic 4 — RSVP & Waitlist
*(→ Modules 3.1–3.3, Sprint 3)*

**US-4.1** — As a **Student**, I want to RSVP to an event in one click, so that registration is fast and frictionless.
- AC: Click triggers atomic DynamoDB `ADD confirmedCount` with capacity condition; success shows confirmation ticket; no double-booking possible under concurrent clicks (load-test in Sprint 6).

**US-4.2** — As a **Student**, I want to be automatically waitlisted if an event is full, so that I don't miss out if a spot opens up.
- AC: Failed capacity condition → RSVP item written with `status=WAITLISTED` + `waitlistJoinedAt`; UI clearly shows "Waitlisted — position X".

**US-4.3** — As a **Student**, I want to be automatically promoted from the waitlist when someone cancels, so that I don't have to keep checking manually.
- AC: Cancellation triggers DynamoDB Stream → promotion Lambda picks the single oldest waitlisted entry via `GSI2-WaitlistOrder`; promoted student notified immediately (ties into Epic 6).

**US-4.4** — As a **Student**, I want to cancel my RSVP, so that I can free up my spot for someone else if my plans change.
- AC: Cancel decrements `confirmedCount`, sets `status=CANCELLED`, triggers promotion flow.

**US-4.5** — As a **Student**, I want to see all my RSVP'd/waitlisted events in one dashboard, so that I can track my schedule.
- AC: "My RSVPs" queries `GSI1-UserRsvps`; shows status badge (Confirmed/Waitlisted) per event.

---

## Epic 5 — Campus Navigator (Outdoor + Indoor)
*(→ Modules 4.1–4.3, Sprint 4)*

**US-5.1** — As a **Student**, I want to see a walking route from my current location to the event venue, so that I don't get lost on a large campus.
- AC: Browser Geolocation used as origin; OpenRouteService pedestrian API returns polyline + turn-by-turn steps rendered on a Leaflet map.

**US-5.2** — As a **Student**, I want the app to detect when I've arrived at the building, so that I don't have to manually switch to indoor directions.
- AC: Haversine distance to venue coordinates checked against `geofence_radius_m`; crossing the boundary auto-switches the UI to indoor mode.

**US-5.3** — As a **Student**, I want step-by-step indoor directions to the exact room, so that I can find the venue without a floor-plan image.
- AC: Steps pulled from `venue_steps` ordered by `step_order`; student taps "Next" to advance; progress bar updates; final step shows an arrival confirmation.

**US-5.4** — As an **Admin/Club Organizer**, I want to author indoor step-by-step directions for a venue, so that students can navigate to it without me drawing a floor plan.
- AC: Admin form creates/edits ordered `venue_steps` rows (instruction + details text, optional mini-map x/y position).

**US-5.5** — As a **Student**, I want a direct "View on Map" link from an event or notification, so that I can jump straight into navigation without re-searching.
- AC: Deep link opens Navigator pre-loaded with the event's venue.

---

## Epic 6 — Notifications
*(→ Module 5.1, Sprint 5)*

**US-6.1** — As a **Student**, I want a reminder before an event I've RSVP'd to, so that I don't forget to attend.
- AC: EventBridge scheduled rule fires 1 hour before `event_date`+`start_time`; SNS sends email/SMS to all `CONFIRMED` RSVPs for that event.

**US-6.2** — As a **Student**, I want to be notified immediately if I'm promoted from the waitlist, so that I know to plan to attend.
- AC: Promotion Lambda (Epic 4) triggers an SNS push within seconds of promotion.

**US-6.3** — As a **Student**, I want to be notified if an event's venue changes after I've RSVP'd, so that I don't show up at the wrong place.
- AC: Venue-change notification includes the new venue name, updated indoor directions summary, and a direct map link; sent to all `CONFIRMED` attendees (fan-out query described in `database.md` §3.3).

**US-6.4** — As an **Admin/Club Organizer**, I want confidence that changing a venue automatically notifies attendees, so that I don't have to message everyone manually.
- AC: Venue-change action in the admin UI triggers the notification pipeline automatically — no separate "send notification" step required.

---

## Epic 7 — Admin: Event & Venue Management
*(→ Modules 2.2, 4.3, 5.2, Sprints 2/4/5)*

**US-7.1** — As an **Admin/Club Organizer**, I want to create and edit events with all details (schedule, speakers, seat capacity), so that students see accurate information.
- AC: Form writes to `events`, `event_schedule`, `event_speakers`; publishing sets `status=published` and initializes the DynamoDB `METADATA` counter item (`confirmedCount=0`, `seatsTotal=<value>`).

**US-7.2** — As an **Admin/Club Organizer**, I want to delete or cancel an event, so that I can remove events that no longer happen.
- AC: Cancel sets `status=cancelled` (soft delete, preserves RSVP history) rather than hard delete; students with RSVPs are notified.

**US-7.3** — As an **Admin/Club Organizer**, I want to upload/manage venue details and indoor directions, so that every event I host has accurate navigation.
- AC: Venue CRUD screen ties into `venues` + `venue_steps`; reused across events at the same venue.

**US-7.4** — As **Campus Staff**, I want to manage venues independent of any specific club, so that shared campus spaces (auditoriums, stadium) are available to all organizers.
- AC: Venues are not owned by a club; any admin/staff can select an existing venue when creating an event.

---

## Epic 8 — Admin Dashboard & Reporting
*(→ Module 5.2, Sprint 5)*

**US-8.1** — As an **Admin/Club Organizer**, I want to see RSVP and waitlist stats for my events, so that I can gauge interest and plan capacity.
- AC: Dashboard reads DynamoDB `METADATA` items for the organizer's events; shows confirmed vs. waitlisted counts, fill %.

**US-8.2** — As an **Admin/Club Organizer**, I want to view/export the attendee roster for an event, so that I can do check-in on the day.
- AC: Roster queries all `SK=USER#*` items under an event's `PK`, joined with `users` for names/emails; exportable as CSV.

**US-8.3** — As an **Admin/Club Organizer**, I want a single dashboard view across all my clubs' events, so that I don't have to check each event individually.
- AC: Dashboard aggregates across all events where `organizer_club_id` matches the admin's club(s).

---

## Traceability Matrix (Epic → Module → Sprint)

| Epic | Module(s) | Sprint |
|---|---|---|
| 1. Auth & Onboarding | 1.3 | 1 |
| 2. Event Discovery | 2.2, 2.3 | 2 |
| 3. Clubs & Membership | 2.4 | 2 |
| 4. RSVP & Waitlist | 3.1, 3.2, 3.3 | 3 |
| 5. Campus Navigator | 4.1, 4.2, 4.3 | 4 |
| 6. Notifications | 5.1 | 5 |
| 7. Admin Event/Venue Mgmt | 2.2, 4.3, 5.2 | 2, 4, 5 |
| 8. Admin Dashboard | 5.2 | 5 |

Use this table to make sure every sprint's module doc (per `project.md`'s documentation policy) also references which user stories it closed.
