# data-quality.md - Data Quality & Analysis Report

This document reports data consistency checks and recommendations for the eFOCUS product database, focusing on image statuses, casing differences, filter maps, and specifications.

---

## 1. Primary Observations & Quality Concerns

### 1. Image Statuses ("Needed" vs "Available")
- **Findings**: The `Image Status` column for all 164 rows in the Product Master sheet displays the value **"Needed"**. This indicates there are no pre-matched individual product image assets named exactly after their SKUs in the static folder.
- **Impact**: Default image loaders would throw broken link errors if they attempt to load files from `public/images/products/${sku}.png`.
- **Recommendation**: 
  - Build a fallback visual asset loader in `ProductCard.tsx` and `ProductGallery.tsx`.
  - Map categories to standard default category card placeholder drawings (e.g., test leads icons, ribbon cables, DMM illustrations) whenever the product's image status is "Needed" or the image is missing from storage.
  - Use high-quality SVG drawings or clean default thumbnails.

### 2. Header and Hierarchy Casing Inconsistencies
- **Findings**: Column titles across Excel sheets differ (e.g. `Sub-Category` in Product Master vs `Sub-Categories` in Category Summary). Casing variations occur in family names (e.g. `Soldering Stations` vs `Soldering Station`).
- **Impact**: Strict string matches would fail to link rows.
- **Recommendation**: The backend importer script successfully normalizes strings by calling `.toLowerCase().trim()`. The frontend client must use lowercase matches when linking query parameters to backend states.

### 3. Missing Key Specifications
- **Findings**: Several rows have blank columns for `Key Spec 2` or `Key Spec 3` (e.g. `QUICK-200-2.4D` chisel tip only has `Key Spec 1: Tip Type: Chisel 2.4D` and `Key Spec 2: Compatibility: Quick 203H`, while `Key Spec 3` is empty).
- **Impact**: Render loops might print empty badges or broken divider lines if they expect exactly three specifications.
- **Recommendation**: Filter out empty values: `[product.key_spec_1, product.key_spec_2, product.key_spec_3].filter(Boolean)` before mapping them to specification badges in cards or detail pages.

### 4. Dynamic Filter Mappings
- **Findings**: In the config sheet, options are separated using custom characters (e.g. middle dots `·`, bullets `•`, commas `,`).
- **Impact**: Normal regex splits on standard commas might produce dirty options array values.
- **Recommendation**: Keep the regex splits robust: `.split(/[\u00b7\u2022,\u2027]/).map(s => s.trim()).filter(Boolean)` as implemented in the backend parser to clean up whitespaces and character sets.

---

## 2. Dynamic Specifications & Cart Validation Rules

To prevent checkout issues in the Quote Drawer:
- **Product Matching Rules**: Cart items must store specific option selections (e.g., if a user requests a quote for a ribbon cable, the cart must capture the selected Assembly Type and Sheath Insulation to prevent split-vendor quotes with incomplete specifications).
- **Validation schema**: Define Zod models on cart checkouts:
  ```ts
  const CartItemSpecSchema = z.object({
    assemblyType: z.string().optional(),
    insulationOption: z.string().optional(),
    customNote: z.string().max(250).optional()
  });
  ```
