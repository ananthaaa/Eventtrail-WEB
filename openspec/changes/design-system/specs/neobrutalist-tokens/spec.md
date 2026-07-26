## ADDED Requirements

### Requirement: Tailwind CSS is configured with Neo-brutalist design tokens
The `frontend/tailwind.config.ts` configuration SHALL define custom color tokens (`bg-neobrutalist: '#F9F5F6'`, `accent-yellow: '#FFDB58'`, `pastel-mint: '#DAF5F0'`, `pastel-peach: '#F8D6B3'`, `pastel-yellow: '#FDFD96'`, `border-black: '#000000'`), typography families (`display: ['"Epilogue"', ...]` and `body: ['"Inter"', ...]`), border width (`3: '3px'`), and hard-edged offset box shadows (`neobrutalist-sm`, `neobrutalist`, `neobrutalist-lg`).

#### Scenario: Tailwind tokens are available in utility classes
- **WHEN** a developer applies `bg-neobrutalist`, `text-accent-yellow`, `font-display`, `border-3`, or `shadow-neobrutalist` in a component and compiles CSS
- **THEN** the generated stylesheet SHALL include the corresponding HEX values, font families, 3px border width, and offset black shadows with zero blur

### Requirement: Global CSS utilities provide Neo-brutalist borders, shadows, textures, and scrollbars
The `frontend/src/index.css` file SHALL import Google Fonts (`Epilogue` and `Inter`), declare CSS variables for core color tokens on `:root`, provide utility classes for borders (`.neo-border`) and box shadows (`.neo-shadow-sm`, `.neo-shadow`, `.neo-shadow-lg`), implement `.neo-clickable:active` for shadow compression on press, define `.bg-grid-dots` background texture, and override webkit scrollbars and `.neo-popup` Leaflet map popups with 3px black borders and square corners.

#### Scenario: Active state compresses clickable elements
- **WHEN** an element with class `.neo-clickable` is clicked or pressed in the browser
- **THEN** the element SHALL translate down and right by 2px (`translate(2px, 2px)`) and downgrade its drop shadow to `1px 1px 0px 0px #000000`

#### Scenario: Scrollbars follow Neo-brutalist styling
- **WHEN** a container or page scrolls in a webkit browser
- **THEN** the scrollbar thumb SHALL display in yellow with a solid black border and zero border radius
