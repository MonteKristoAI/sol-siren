

## Plan: Add MADELINE Product Photos

### Summary
Replace placeholder images for the MADELINE (Apres Ski) product with the 6 uploaded photos.

### Changes

**1. Copy 6 images to `src/assets/products/madeline/`**
- `madeline-front.png` (full front view on mannequin)
- `madeline-back.png` (back view, higher angle)
- `madeline-back-2.png` (back view, lower angle)
- `madeline-collar.png` (close-up of collar/buttons)
- `madeline-label.png` (Roffe brand label)
- `madeline-tag.png` (handwritten "Madeline" name tag)

**2. Update `src/data/products.ts`**
- Change `image` from `"/placeholder.svg"` to the front view import
- Replace `images` array with all 6 photos (front, back, back-2, collar, label, tag)
- Add ES6 imports at top of file for all 6 images

