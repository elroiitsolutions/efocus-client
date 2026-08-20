# project-analysis.md - eFOCUS Storefront Project Analysis

This document provides a detailed analysis of the existing static eFOCUS storefront (HTML, CSS, JavaScript, and assets) to serve as a blueprint for the React + Vite migration.

---

## 1. Existing Page Sections & Component Breakdown

The static homepage contains the following sections in order, which must be mapped to distinct React components under `src/features/home/components/` and `src/components/layout/`:

1. **Announcement Bar** (`AnnouncementBar.tsx`): 
   - Left: Social icons (Twitter, Facebook, Instagram)
   - Center: Promo text ("The full product range, one accountable vendor.") linking to brochure
   - Right: Language/currency settings ("India (INR ₹) / USD ($) • English")
2. **Main Header** (`Header.tsx`):
   - Logo: Styled text mark (`logo-e` in circle + `logo-focus` text, with subtitle "INDUSTRIAL SOLUTIONS")
   - Header Search (`HeaderSearch.tsx`): Combined Category select dropdown (custom styled) + input search bar + search button
   - Header Actions (`HeaderActions.tsx`): Direct mail link (to `gautham@efocusinds.com`), Wishlist icon with badge count, and Quote Basket icon with badge count (triggers Quote Drawer)
3. **Primary Navigation** (`Navigation.tsx` / `MobileNavigation.tsx`):
   - Nav links: Home, SMT & Rework, Cables & Connectivity, Tools & MRO, Power & Electrical, ESD & RF, Testing & Measurement, Custom & Assembly
   - Promo tag: "UP TO 47 STOCKED LINES • 2026 BROCHURE"
4. **Hero Banner** (`Hero.tsx`):
   - Slider dots (3 indicators)
   - Left column: Headline ("The full product range, one accountable vendor."), subtitle, description, and primary CTA ("Explore 47 Stocked Lines")
   - Right column: Hero image representing precision cables
5. **Sub-Hero Banners Grid** (`SubHeroBanners.tsx`):
   - 3 cards with light pastel backgrounds:
     - Peach card: SMT, Rework & Assembly
     - Mint card: RF & Microwave Assemblies
     - Cyan card: Industrial Control & Automation
   - Hover scale effects on background images and custom clean buttons
6. **Trending Collections** (`TrendingCollections.tsx`):
   - Header with title ("Trending Collections") and subtitle
   - Centered list of circular category icons with hover zoom, label, and product count (Industrial Cables, Test & Measurement, RF & Microwave, Hand & Power Tools, ESD Control)
7. **Popular Now Grid** (`PopularProducts.tsx`):
   - Filter tabs: All Lines, Test & Bench, Industrial Cabling, RF Assemblies, SMT & Rework
   - Multi-column responsive product card grid (loads initial 8 items)
   - Load More button centered below the grid
8. **Product Highlight Section** (`ProductHighlight.tsx`):
   - Splitted layout:
     - Left: Product image gallery (spec-built ribbon cable) with 4 clickable thumbnails (updates main image) and "SPEC BUILT" badge
     - Right: Product specs configurator with options (Assembly Type: Ribbon Cables/Wire Harnesses, Insulation/Sheath Option: Standard Flat Ribbon/Rose/Silicone/Braid) and quantity picker (+/- buttons), and a big primary CTA button "Request Custom Build Quote"
     - Standard checkmarks list for Single-Vendor Procurement, IPC-WHMA-A-620 Certification, and fast dispatch
9. **Horizontal Ticker Bar** (`FactoryRange.tsx` ticker):
   - Continuous looping text marquee detailing eFOCUS certifications, products, and contact info
10. **Bento Feature Grid** (`FactoryRange.tsx` / `BestSellers.tsx`):
    - Title: "Factory & Production Range"
    - Grid layout (5 cards):
      - 1 large left card: SMT, Rework & Assembly
      - 1 medium right-top card: Industrial Networking & Fiber
      - 3 small bottom cards: Pneumatics & Fluid, Test & Measurement, Power & Electrical
11. **Best Sellers Section** (`BestSellers.tsx`):
    - Multi-column grid showcasing the highest-volume products (SMA-SMA assemblies, Crimping tool set, M12 4-pin cables, Oscilloscope probes)
12. **Technical Blog Section** (`BlogSection.tsx`):
    - Grid of 3 guides/articles with tags ("SMT & Rework", "RF & Microwave", "Procurement"), dates, titles, and descriptions
13. **Value Proposition Bar** (`ValueProposition.tsx`):
    - 4 icons with titles and descriptions (Single-Vendor Procurement, Spec Built, Trusted Assembly, ESD & ISO Certified)
14. **Footer** (`Footer.tsx`):
    - Brand tagline, detailed contact details (sales email, phone, catalogue url), social links
    - Footer links columns (Product Categories, Quick Links)
    - Quote consolidation form (consolidating client component lists)
    - Copyright and legal credits
15. **Quote Request Drawer** (`QuoteDrawer.tsx`):
    - Custom slide-out overlay drawer displaying a list of selected items, item quantities, remove buttons, and a customer intake form (Name, Email, Company Name)

---

## 2. HTML & CSS Structure

- **Colors & Variable Tokens**:
  - Primary Red: `#ee2761` (represented as `--primary-rose`)
  - Accent Dark: `#111827` (slate-900 equivalent)
  - Background Pastels: Peach, Mint, Cyan, Light Grey (`#f9fafb`)
  - Text: Muted slates for subtitles and clean white/dark gray for primary information
- **Fonts**:
  - Uses Google Fonts: `Inter` (sans-serif) for body and structure, and `Outfit` for display headings
- **Grid Layouts**:
  - Employs css custom column systems (`.grid-3`, `.grid-4`, custom bento grids) with explicit media query breakpoints

---

## 3. JavaScript Functionality to Migrate

The original `script.js` manages local state and DOM manipulations:
1. **Quote Basket State**: Holds an array of items (`id`, `name`, `category`, `qty`, `code`).
   - Trigger buttons (`.btn-request-quote`) extract information from parent card elements and push to the basket.
   - Quantity adjusts (`adjustQty`) recalculate total item count and update badges and text.
   - Removal handles splice items out of state.
2. **Product Highlight Gallery**: Clicking thumbnails queries the target source from `data-large` and swaps the main image source with a fading transition (`opacity` timer).
3. **Category Tab Filters**: Clicking tabs parses the `data-filter` value and matches it against `data-category` attribute on product cards, hiding unselected cards using `.style.display`.
4. **Global Search**: Query strings from the search input are mapped using lowercase matches against product cards' titles, SKUs, and categories.
5. **Toast Notifications**: Dynamically creates a toast container and slides in checkmark success alerts for 3.5 seconds.
6. **Mobile Navigation**: Toggles `.mobile-open` class on navigation wrapper when clicking the hamburger button.

All of these visual scripts will be fully rewritten in React using **Zustand state stores, React local state, and dynamic CSS styling using Tailwind CSS**.
