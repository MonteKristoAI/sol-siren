

## Plan: Improve Product Detail Image Gallery

### Problem
The main product image uses a 3:4 aspect ratio which is too tall -- users must scroll to see the full image. Also, there's no way to navigate between images without clicking thumbnails below.

### Changes (single file: `src/pages/ProductDetail.tsx`)

**1. Reduce image size**
- Change the main image aspect ratio from `aspect-[3/4]` to `aspect-[4/5]` and cap its max height with `max-h-[70vh]` so the image always fits within the viewport without scrolling.

**2. Add prev/next arrow buttons on the main image**
- Add left/right `ChevronLeft` / `ChevronRight` buttons overlaid on the main image (centered vertically, semi-transparent background, appear on hover).
- Clicking them cycles through the images array (wrapping around).
- Only show arrows when there are 2+ images.

**3. Keep thumbnails as-is**
- The thumbnail strip below remains unchanged for direct selection.

### Technical Details
- Import `ChevronLeft`, `ChevronRight` from `lucide-react`.
- Add `prevImage` / `nextImage` handlers that update the `active` state index.
- Arrow buttons: absolute positioned inside the existing relative container, styled with `bg-black/30 hover:bg-black/50 text-white rounded-full p-2`.
- The `max-h-[70vh]` ensures the image + some product info are visible without scrolling on standard viewports.

