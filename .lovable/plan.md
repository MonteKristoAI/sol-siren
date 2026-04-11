

## Plan: Add Sierra as a New Product

### What we know
- Sierra is a new leather product (1970s Frontier Fringe Suede Jacket by Sears Western Wear)
- Tallulah stays untouched -- its photos and data remain as-is
- User provided 6 photos for Sierra; the 3rd photo (`v2_3c72a9e4` -- front view on mannequin) should be the primary/first image and display on the shop page
- Price: $0 (placeholder, matching other products)

### Photo order (6 images)
1. `v2_3c72a9e4-505d-4d2c-ba2f-e2533e543e19.jpg` (front on mannequin -- 3rd uploaded, becomes 1st)
2. `sol_siren_bg_match_2.jpg` (open jacket showing lining)
3. `sol_siren_no_dot_v2.jpg` (fringe detail close-up)
4. `v2_6d53b694-3b65-4c87-8ce9-ad6440933578.jpg` (back view)
5. `v2_99e02e74-3d1d-44f2-b109-3399d9608397.jpg` (front angle, open)
6. `v2_d56d8c4b-ec77-4057-a708-fce943ad1d32.jpg` (close-up fringe/collar detail)

### Steps

1. **Copy 6 uploaded images** into `src/assets/products/sierra/` as `sierra-1.jpg` through `sierra-6.jpg` (in the order above)

2. **Add imports** in `src/data/products.ts` for all 6 Sierra images

3. **Add Sierra product entry** in the products array (after Tallulah, before Vixen -- to keep leather products grouped), with:
   - Full product details, size & fit, and care instructions from the user's provided text
   - `image: sierraImg1` (the front mannequin shot)
   - `images: [sierraImg1, sierraImg2, sierraImg3, sierraImg4, sierraImg5, sierraImg6]`
   - Category: `"leather"`
   - Slug: `"sierra"`

4. **Update PRODUCT-CATALOG.md** to document Sierra as a new leather product

### Technical details
- File modified: `src/data/products.ts` (imports + new product object)
- File modified: `PRODUCT-CATALOG.md`
- 6 new image files copied into `src/assets/products/sierra/`
- No changes to Tallulah whatsoever

