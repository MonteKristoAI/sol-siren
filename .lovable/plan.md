

## Add 20 Missing Products — Total: 45 Products

### Current State
The site has **25 products**. After adding all missing products from both spreadsheets, there will be **45 products** total.

### Missing Products (20)

**From Part 1 — 3 products:**
- ELVIRA (Fur)
- COLLETTE (Penny Lane / Afghan)
- RHIANNON (Penny Lane / Afghan)

**From Part 2 — Overcoats — 8 products:**
- DIANA, BIANCA, NICO, ROAN, VALENTINA, PENELOPE, VIVIENNE, KENDRA

**From Part 2 — Apres Ski — 9 products:**
- BLAIR, SUNNY, ROCCO, SLOANE, ROMY, ANDIE, MONIQUE, MADELINE, + unnamed orange puffer (will use "AURORA" as placeholder name)

### What Changes

**`src/data/products.ts`**
- Add 20 new product entries with full data from the spreadsheets (descriptions, product details, size & fit measurements, care instructions)
- Update `sizeFit` measurements for 5 existing products (STEVIE, SIERRA, VIXEN, CLEO, CANDACE) where the spreadsheet has richer data than current TBD placeholders

No other files need changes — the shop page filters and product detail page already support all categories dynamically.

### Summary
- **Before:** 25 products
- **After:** 45 products
- **Categories after:** Fur (14), Penny Lane/Afghan (8), Leather (5), Overcoat (9), Apres Ski (9)

