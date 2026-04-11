

## Plan: Make Sloane visible on Shop page

The Shop page (line 25) filters out all sold products with `products.filter((p) => !p.sold)`. This is why Sloane doesn't appear.

### Change
**File: `src/pages/Shop.tsx`** (line 25-28)
- Remove the `!p.sold` filter so ALL products show, including sold ones
- Change from:
  ```js
  const available = products.filter((p) => !p.sold);
  const filtered = activeCategory === "all" ? available : available.filter(...);
  ```
- To:
  ```js
  const filtered = activeCategory === "all" ? products : products.filter((p) => p.category === activeCategory);
  ```

This will show all products (including sold ones like Sloane) on the Shop page. Sold items already have proper UI treatment (opacity reduction, "Sold" badge, disabled button).

