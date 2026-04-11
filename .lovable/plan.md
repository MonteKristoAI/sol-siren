

## Plan

### 1. Bigger logo in Footer
In `src/components/Footer.tsx` line 15, change `h-12` to `h-20` (or similar) to make the footer logo larger.

### 2. Fix Gift Cards background logo
In `src/pages/GiftCards.tsx` lines 127-133, the logo is rendered as an `<img>` inside the gift card buttons. The SVG likely has complex artwork that doesn't work well at small sizes with low opacity. Fix by:
- Increasing size slightly and adjusting opacity
- Adding `object-contain` to prevent distortion
- Potentially switching to a simpler visual treatment (e.g., a subtle border pattern or just the Gift icon) if the SVG still looks odd at that size

### Files to edit
- `src/components/Footer.tsx` — increase logo height
- `src/pages/GiftCards.tsx` — fix background logo rendering in gift card tiles

