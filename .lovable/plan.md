

## Plan: Remove duplicate Tilly product

### Change
**File: `src/data/products.ts`** (lines 3211-3241)
- Delete the entire Tilly product entry with `id: "tilly"` (the one with description "A vivid apres-ski puffer in warm orange tones..."). This is ~31 lines.
- The other Tilly (`id: "tilly-bomber"`, line 3096) remains untouched.

One file, one deletion.

