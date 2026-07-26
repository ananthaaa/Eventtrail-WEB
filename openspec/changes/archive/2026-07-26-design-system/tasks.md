## 1. Setup & Design Tokens

- [x] 1.1 Install UI animation and icon dependencies in `frontend/`: `framer-motion`, `lucide-react`, `clsx`, `tailwind-merge`
- [x] 1.2 Update `frontend/tailwind.config.ts` with Neo-brutalist color tokens (`bg-neobrutalist: '#F9F5F6'`, `accent-yellow: '#FFDB58'`, `pastel-mint: '#DAF5F0'`, `pastel-peach: '#F8D6B3'`, `pastel-yellow: '#FDFD96'`, `border-black: '#000000'`), Epilogue and Inter font families, 3px border width (`3: '3px'`), and hard-edged offset drop shadows (`neobrutalist-sm`, `neobrutalist`, `neobrutalist-lg`)
- [x] 1.3 Update `frontend/src/index.css` to import Google Fonts (`Epilogue` and `Inter`), declare CSS custom properties on `:root`, define `.neo-border` and `.neo-shadow*` utilities, add `.neo-clickable:active` press animation, define `.bg-grid-dots` background texture, and add custom webkit scrollbar and `.neo-popup` map popup overrides

## 2. Atomic UI Components

- [x] 2.1 Create `frontend/src/components/ui/Button.tsx` supporting variants (`primary`, `secondary`, `accent`, `outline`), sizes, disabled state, 3px black border, and `framer-motion` tap compression (`whileTap={{ scale: 0.98 }}`)
- [x] 2.2 Create `frontend/src/components/ui/Badge.tsx` supporting variants (`mint`, `peach`, `yellow`, `accent`, `white`, `dark`), styled as an uppercase bold pill with 2px black border and `rounded-none`
- [x] 2.3 Create `frontend/src/components/ui/Card.tsx` supporting background variants, shadow sizes (`none`, `small`, `medium`, `large`), and optional interactive hover lift via `framer-motion`
- [x] 2.4 Create `frontend/src/components/ui/SeatMeter.tsx` displaying an animated capacity fill bar using canonical Neo-brutalist tokens and turning red/warning in waitlist mode (`available <= 0`)
- [x] 2.5 Create `frontend/src/components/ui/StepTracker.tsx` displaying a vertical numbered step sequence with checkmark icons for completed steps and highlight styling for active steps
- [x] 2.6 Create `frontend/src/components/ui/RSVPTicket.tsx` displaying a tactile ticket card with edge circular cutouts, dashed perforation border line, status icon box, status badge, and ticket number tag
- [x] 2.7 Create `frontend/src/components/ui/Marquee.tsx` displaying an infinite horizontal scrolling text banner with rotated yellow diamond separators
- [x] 2.8 Create `frontend/src/components/ui/ImageUploadZone.tsx` displaying a file drag-and-drop zone with thick dashed 3px black border and active drop hover styling
- [x] 2.9 Create toast notification system (`frontend/src/components/ui/ToastProvider.tsx` and `useToast` hook) managing Neo-brutalist alert cards (`success`, `error`, `info`, `warning`) in the bottom-right viewport corner

## 3. Layout Shells

- [x] 3.1 Create `frontend/src/components/layout/NavBar.tsx` displaying Epilogue logo, navigation links, and action button with sticky top positioning and bottom 3px black border
- [x] 3.2 Create `frontend/src/components/layout/Footer.tsx` displaying copyright and footer links with top 3px black border
- [x] 3.3 Create `frontend/src/components/layout/LandingLayout.tsx` wrapping public marketing pages with `NavBar`, `.bg-grid-dots` background container, and `Footer`
- [x] 3.4 Create `frontend/src/components/layout/StudentLayout.tsx` wrapping authenticated student portal pages with student navigation items
- [x] 3.5 Create `frontend/src/components/layout/AdminLayout.tsx` wrapping administrative workspace pages with admin header/sidebar chrome

## 4. Visual QA Style Guide & Routing

- [x] 4.1 Create `frontend/src/pages/StyleGuide.tsx` rendering interactive visual QA demos of all UI components (`Button`, `Badge`, `Card`, `SeatMeter`, `StepTracker`, `RSVPTicket`, `Marquee`, `ImageUploadZone`) and toast trigger controls
- [x] 4.2 Update `frontend/src/App.tsx` to set up basic routing (or tab state routing) rendering the `StyleGuide` page at `/style-guide` and a sample landing view at `/`

## 5. Verification & Documentation

- [x] 5.1 Run `npm run lint` and `npm run build` in `frontend/` to confirm all 9 atomic UI components and 5 layout shells build cleanly without TypeScript or ESLint errors, and clean bundle generation
- [x] 5.2 Write module completion summary at `docs/modules/module-02-design-system.md` detailing all tokens and components built
- [x] 5.3 Update root `PROGRESS.md` to check off `- [x] Module 1.2 Design System`
- [x] 5.4 Commit all changes to Git with message: `feat(module-02): neo-brutalist design tokens, UI component library, and layout shells`
