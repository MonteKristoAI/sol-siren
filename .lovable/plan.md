

## Plan: Update Madeline product photos

### Changes in `src/data/products.ts`

**Line 3155** — Change main shop image from `madelineImg1` to `madelineImg6`

**Line 3184** — Update the images array:
- Remove `madelineImg4` (the 4th photo)
- Move `madelineImg6` to first position

From: `[madelineImg1, madelineImg2, madelineImg3, madelineImg4, madelineImg5, madelineImg6]`
To: `[madelineImg6, madelineImg1, madelineImg2, madelineImg3, madelineImg5]`

One file, two line changes.

