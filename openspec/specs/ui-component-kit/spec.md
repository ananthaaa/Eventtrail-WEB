# Capability: UI Component Kit

## Purpose
Defines the atomic Neo-brutalist UI component library (`Button`, `Badge`, `Card`, `SeatMeter`, `StepTracker`, `RSVPTicket`, `Marquee`, `ImageUploadZone`, and `ToastProvider`) for tactile user interactions across EventTrail.

## Requirements

### Requirement: Button component implements Neo-brutalist variants and tap animations
The `Button` component in `frontend/src/components/ui/Button.tsx` SHALL support variants (`primary`, `secondary`, `accent`, `outline`), disabled states, and HTML button types. It SHALL be styled with `font-display font-bold text-sm tracking-wide uppercase py-3 px-6 neo-border` and zero border radius. It SHALL use `framer-motion` to apply `whileTap={{ scale: 0.98 }}` and shadow compression when clicked.

#### Scenario: Primary button displays accent yellow with black text
- **WHEN** `<Button variant="primary">Click Me</Button>` is rendered
- **THEN** it SHALL display a yellow background (`bg-accent-yellow`), solid black text, 3px black border, and a flat black drop shadow

#### Scenario: Disabled button prevents clicks and reduces opacity
- **WHEN** `<Button disabled={true} onClick={handler} />` is rendered and clicked
- **THEN** it SHALL display with 50% opacity (`opacity-50 cursor-not-allowed`) and SHALL NOT invoke the `onClick` handler

### Requirement: Badge component displays uppercase status tags with square corners
The `Badge` component in `frontend/src/components/ui/Badge.tsx` SHALL support variants (`mint`, `peach`, `yellow`, `accent`, `white`, `dark`). It SHALL render as a small pill styled with `px-3 py-1 text-xs font-bold font-display border-2 border-black tracking-wider rounded-none`.

#### Scenario: Dark badge displays inverted black background and white text
- **WHEN** `<Badge variant="dark">VIP</Badge>` is rendered
- **THEN** it SHALL display with background `#000000`, text `#FFFFFF`, and zero border radius

### Requirement: Card component supports configurable backgrounds, shadow sizes, and interactive hover lifts
The `Card` component in `frontend/src/components/ui/Card.tsx` SHALL support variants (`white`, `mint`, `peach`, `yellow`, `accent`, `transparent`), shadow sizes (`none`, `small`, `medium`, `large`), and an optional `hoverEffect` boolean. When an `onClick` prop is provided or `hoverEffect` is true, it SHALL use `framer-motion` to translate up-left on hover and upgrade its box shadow.

#### Scenario: Clickable card lifts on hover
- **WHEN** a user hovers their mouse over a `Card` configured with `onClick`
- **THEN** the card SHALL animate upward and to the left by 1–2px and increase its shadow size (e.g., from `neo-shadow` to `neo-shadow-lg`)

### Requirement: SeatMeter component animates capacity and indicates waitlist status
The `SeatMeter` component in `frontend/src/components/ui/SeatMeter.tsx` SHALL accept `total` and `available` number props and render a horizontal progress bar using canonical Neo-brutalist tokens (`neo-border`, `neo-shadow`, `accent-yellow`, black text). It SHALL use `framer-motion` to animate the fill width over 1 second. When `available <= 0`, the bar SHALL turn red and display a waitlist indicator.

#### Scenario: Full capacity triggers waitlist state
- **WHEN** `<SeatMeter total={100} available={0} />` is rendered
- **THEN** the fill bar SHALL reach 100% width, turn red/warning color, and display text indicating waitlist mode

### Requirement: StepTracker component renders numbered vertical steps with completion state
The `StepTracker` component in `frontend/src/components/ui/StepTracker.tsx` SHALL accept an array of step objects, `activeStepIndex`, `completedSteps` array, and an `onStepClick` callback. It SHALL display vertical numbered circles connected by a line, styled with canonical Neo-brutalist tokens.

#### Scenario: Completed step displays checkmark indicator
- **WHEN** a step index is included in the `completedSteps` prop array
- **THEN** the corresponding circle SHALL display a checkmark icon instead of the step number and render with a mint/success background

### Requirement: RSVPTicket component simulates a tactile perforated ticket
The `RSVPTicket` component in `frontend/src/components/ui/RSVPTicket.tsx` SHALL accept an event object, `rsvpStatus` string, and `ticketNumber`. It SHALL render a card with `neo-shadow-sm`, circular cutout divs on the left and right edges with a dashed border divider simulating perforation, a status icon in a bordered box, a status `Badge`, and the ticket number in a highlighted pastel tag.

#### Scenario: Ticket renders perforation cutouts and status badge
- **WHEN** an `RSVPTicket` is rendered with status "confirmed"
- **THEN** it SHALL display visual circular cutouts on its edges, a dashed separation line, and a "CONFIRMED" mint badge

### Requirement: Marquee component displays infinite scrolling text banner
The `Marquee` component in `frontend/src/components/ui/Marquee.tsx` SHALL accept an array of text strings, speed (`normal` | `fast`), and custom background classes (defaulting to black background and white text). It SHALL duplicate items to create an infinite loop animation and place a rotated yellow square/diamond divider between items.

#### Scenario: Marquee banner loops continuously
- **WHEN** the `Marquee` is rendered on screen
- **THEN** the text items SHALL scroll horizontally across the container in a continuous loop without gaps or stutter

### Requirement: ImageUploadZone component provides dropzone styled with dashed black border
The `ImageUploadZone` component in `frontend/src/components/ui/ImageUploadZone.tsx` SHALL provide a file drag-and-drop or selection area styled with a thick dashed black border (`border-3 border-dashed border-black`), background hover states, and clear preview/remove functionality for selected images.

#### Scenario: Dragging file over zone highlights background
- **WHEN** a user drags a file over the `ImageUploadZone`
- **THEN** the dropzone background SHALL change color (e.g., to `pastel-yellow`) to indicate active drop target

### Requirement: Toast notification system displays Neo-brutalist alerts
The toast notification system (`frontend/src/components/ui/ToastProvider.tsx` and `useToast` hook) SHALL allow components to trigger temporary alert messages (`success`, `error`, `info`, `warning`). Toasts SHALL appear at the bottom-right of the screen, styled with `neo-border`, flat black drop shadow, and square corners, automatically dismissing after a configurable timeout or on manual close click.

#### Scenario: Triggering toast displays alert card in corner
- **WHEN** a component calls `toast({ title: 'Saved', type: 'success' })`
- **THEN** a mint-colored Neo-brutalist alert card SHALL animate into the bottom-right viewport area and disappear after 3 to 5 seconds
