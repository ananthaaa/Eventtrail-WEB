# EventTrail — Design System (Neo-Brutalism)

Extracted directly from `EventTrail-UI-main` (the UI reference repo). This is the exact token set and component API to rebuild from scratch in the new project — visual language matched, code not copied.

---

## 1. Design Tokens

### Colors

```js
// tailwind.config.js — theme.extend.colors
'bg-neobrutalist': '#F9F5F6',   // page background (off-white/cream)
'accent-yellow':   '#FFDB58',   // primary CTA color
'pastel-mint':     '#DAF5F0',   // success / confirmed state
'pastel-peach':    '#F8D6B3',   // warning / waitlist / accent cards
'pastel-yellow':   '#FDFD96',   // secondary highlight
'border-black':    '#000000',   // universal border/shadow color
```
Also declared as CSS custom properties in `:root` (`--bg-neobrutalist`, `--accent-yellow`, etc.) so they're available outside Tailwind utility classes too.

**Usage convention:** text is black on every surface (no dark-mode/inverted text) except the `dark` badge variant (`bg-black text-white`) and the marquee bar (`bg-black text-white`).

### Typography

```js
fontFamily: {
  display: ['"Epilogue"', '"Epilogue Placeholder"', 'sans-serif'],  // headings, buttons, labels
  body:    ['"Inter"', 'sans-serif'],                                 // paragraph/body text
}
```
Loaded via Google Fonts in `index.css`:
```css
@import url('https://fonts.googleapis.com/css2?family=Epilogue:ital,wght@0,100..900;1,100..900&family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap');
```
- Headings/buttons/badges: `font-display`, bold/black weight, `uppercase`, `tracking-wide`/`tracking-wider`
- Body copy: `font-body` (Inter), default weight

### Borders & Shadows (the core "neo-brutalist" signature)

```js
borderWidth: { 3: '3px' }
boxShadow: {
  'neobrutalist-sm': '2px 2px 0px 0px #000',
  'neobrutalist':    '4px 4px 0px 0px #000',
  'neobrutalist-lg': '6px 6px 0px 0px #000',
}
```
Global utility classes (`index.css`):
```css
.neo-border    { border: 3px solid #000000; }
.neo-shadow-sm { box-shadow: 2px 2px 0px 0px #000000; }
.neo-shadow    { box-shadow: 4px 4px 0px 0px #000000; }
.neo-shadow-lg { box-shadow: 6px 6px 0px 0px #000000; }

.neo-clickable:active {
  transform: translate(2px, 2px);
  box-shadow: 1px 1px 0px 0px #000000;
}
```
**Rule:** every interactive surface (button, clickable card) has a solid black offset drop-shadow, no blur, no opacity — flat, hard-edged shadows only. Radius is always `0` (no rounded corners anywhere in this system — note `Badge` explicitly sets `rounded-none`).

### Motion

- `framer-motion` on nearly every interactive component
- Standard tap feedback: `whileTap={{ scale: 0.98 }}` on buttons
- Standard entrance: `initial={{ opacity: 0, y: 20 }}` → `animate={{ opacity: 1, y: 0 }}`
- Hover on clickable cards: shift up-left 1–2px + upgrade to a larger shadow (`neo-shadow` → `neo-shadow-lg`)
- Active/click on buttons and clickable cards: translate down-right 1–2px + downgrade to a smaller shadow — simulates the shadow "compressing" as if physically pressed

### Background Texture

```css
.bg-grid-dots {
  background-image: radial-gradient(rgba(0, 0, 0, 0.15) 1.5px, transparent 1.5px);
  background-size: 20px 20px;
}
```
Used as a subtle dotted-grid overlay on landing/hero sections.

### Scrollbar & Third-Party Overrides

Custom `::-webkit-scrollbar` styled to match (yellow thumb, black border, square corners). Leaflet map popups get a `.neo-popup` override so third-party map UI doesn't break the visual language (square corners, 3px black border, flat shadow, no default tip pointer).

---

## 2. Component Library

### `Button`
Props: `variant` (`primary | secondary | accent | outline`), `disabled`, `type`, `onClick`

| Variant | Style |
|---|---|
| `primary` | `bg-accent-yellow`, black text — main CTA |
| `secondary` | `bg-white`, black text — secondary action |
| `accent` | `bg-pastel-peach`, black text — tertiary/alt emphasis |
| `outline` | transparent, subtle hover, lighter click depress (1px vs 2px) |

Base: `font-display font-bold text-sm tracking-wide uppercase py-3 px-6 neo-border`, hover upgrades shadow, active depresses + downgrades shadow, disabled → `opacity-50 cursor-not-allowed`.

### `Badge`
Props: `variant` (`mint | peach | yellow | accent | white | dark`)
Small uppercase pill: `px-3 py-1 text-xs font-bold font-display border-2 border-black tracking-wider rounded-none`. Used for status labels (Confirmed/Waitlisted/category tags).

### `Card`
Props: `variant` (`white | mint | peach | yellow | accent | transparent`), `shadowSize` (`none | small | medium | large`), `hoverEffect`, `onClick`
Base: `neo-border`, background per variant, shadow per `shadowSize`. If clickable (`onClick` set), gets full hover-lift + click-depress interaction; if not clickable but `hoverEffect` true, gets a smaller passive hover lift.

### `SeatMeter`
Props: `total`, `available`
Animated horizontal fill bar (`framer-motion`, `width` animates over 1s) showing seats filled vs total; turns red and shows a "join waitlist" message at 100% capacity.
> ⚠️ **Inconsistency to fix when rebuilding:** this component in the demo uses a different token set (`bg-surface`, `text-primary`, `accent`, `border-subtle`) that doesn't exist in `tailwind.config.js` — leftover from an earlier dark-theme draft. Rebuild it using the actual neo-brutalist tokens (`neo-border`, `neo-shadow`, `accent-yellow`, black text) for consistency.

### `StepTracker`
Props: `steps`, `activeStepIndex`, `completedSteps`, `onStepClick`
Vertical numbered step list with a connecting line, used for indoor navigation. Circles show step number, a checkmark when completed, highlighted when active. Same token inconsistency as `SeatMeter` — rebuild with neo-brutalist tokens, not the leftover dark-theme classes.

### `RSVPTicket`
Props: `event`, `rsvpStatus`, `ticketNumber`
The most detailed component — styled like a physical event ticket: `neo-shadow-sm` card, torn-perforation effect using a dashed border plus two circular cutout divs positioned at the left/right edges, status icon (CheckCircle/Clock from `lucide-react`) in a small bordered box, `Badge` for status, ticket number in a highlighted pastel-yellow tag. This is your reference for "how far to push the physical/tactile metaphor" in this design system.

### `Marquee`
Props: `items`, `speed` (`normal | fast`), `bgClass`
Infinite horizontal scroll banner (CSS `@keyframes marquee`, items duplicated 4x for seamless loop), black background/white text by default, small rotated accent-yellow diamond between items.

### `ImageUploadZone`, `MockToast`, `CampusMap`, `RouteLayer`
Present in the demo but not detailed here — inspect these directly in the uploaded zip (`src/components/ui/`) when you reach Module 2 (design system) and Module 11 (outdoor routing), since `CampusMap`/`RouteLayer` are Leaflet-specific and tie directly into the map feature rather than being generic UI.

---

## 3. Layout Shells

`src/components/layout/`: `LandingLayout`, `StudentLayout`, `AdminLayout`, shared `NavBar`, `Footer` — role-specific page chrome. Rebuild these as the outer shell for each role's route tree (matches Module 1.2/2 in your module plan).

---

## 4. Rebuild Checklist (Module 2 — Design System)

- [ ] Port color tokens + `neo-*` box-shadow scale into new `tailwind.config.js`
- [ ] Add Epilogue/Inter font imports
- [ ] Recreate global utility classes (`neo-border`, `neo-shadow*`, `.neo-clickable:active`, `.bg-grid-dots`, scrollbar overrides)
- [ ] Build `Button`, `Badge`, `Card` first — everything else composes from these
- [ ] Build `SeatMeter`, `StepTracker` **using the corrected token set** (not the demo's leftover dark-theme classes)
- [ ] Build `RSVPTicket`, `Marquee`
- [ ] Build `ImageUploadZone`, `MockToast` (inspect demo source directly)
- [ ] Build layout shells + `NavBar`/`Footer`
- [ ] Ship a `/style-guide` route rendering every component/variant for visual QA — this is the Definition of Done from `module-details.md` Module 2.
