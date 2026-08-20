# migration-plan.md - UI Migration Plan

This plan details the phased steps to migrate the static eFOCUS codebase (HTML, CSS, JS) into a production-quality, responsive React + Vite + TypeScript application.

---

## Phase 1: Project Initialization & Configuration
1. **Bootstrap the Application**:
   - Initialize a Vite React project using TypeScript: `npx create-vite@latest efocus-frontend --template react-ts`
   - Setup Tailwind CSS, PostCSS, and Autoprefixer.
   - Configure Path Aliases (`@/*` mapping to `src/*`) in `tsconfig.json` and `vite.config.ts`.
2. **Initialize shadcn/ui**:
   - Initialize the CLI using `npx shadcn-ui@latest init` to setup the `components.json` layout.
   - Add only required components: `button`, `input`, `select`, `checkbox`, `dialog`, `sheet`, `accordion`, `tabs`, `badge`, `skeleton`, `separator`, `breadcrumb`.
3. **Write Initial Documentation**:
   - Save the analysis reports (`docs/`) to the project repository.

---

## Phase 2: Design Tokens & Core Layout
1. **Core Styles Migration**:
   - Copy fonts configuration and base variables from the original `style.css` (e.g. rose red color, pastels, Outfits display fonts) into `src/styles/variables.css` and `src/styles/globals.css`.
2. **Implement Main Layout Components**:
   - Create `AnnouncementBar.tsx` including top social bars, language selections, and brochure links.
   - Create `Header.tsx` including logo elements, search layouts, and actions (Wishlist + Quote drawer badges).
   - Create `Navigation.tsx` / `MobileNavigation.tsx` utilizing dynamic routing lists.
   - Create `Footer.tsx` integrating email subscriptions and links.
   - Assemble `MainLayout.tsx` wrapping all layouts around `React Router`'s `<Outlet />`.

---

## Phase 3: Centralized Client State Management
1. **Create Zustand Stores**:
   - **Quote Basket Store** (`src/features/quote/store/quote.store.ts`): Tracks added items, adjusts quantity offsets, computes total counts, and handles intake form cache. Persisted using `zustand/middleware`'s `persist`.
   - **Wishlist Store** (`src/features/wishlist/store/wishlist.store.ts`): Manages item toggles and persists them to local storage.
2. **Validate State Components**:
   - Link headers' badge icons to stores' hook metrics to verify immediate updates when items are selected.

---

## Phase 4: Page Routing & Static Feature Migration
1. **Setup Route Maps** (`src/app/router.tsx`):
   - Define paths for `/`, `/products`, `/products/:slug`, `/categories`, `/categories/:slug`, `/search`, `/custom-assembly`, `/blog`, `/blog/:slug`, `/contact`.
2. **Migrate HomePage Sections** (`src/features/home/`):
   - Break down `index.html` sections into React components: `Hero`, `SubHeroBanners`, `TrendingCollections`, `PopularProducts` (initial state), `ProductHighlight` configurator, Bento grids, Best Sellers.
3. **Migrate Custom Assembly & Blog Pages**:
   - Port ribbon/harness descriptions to `CustomAssemblyPage.tsx`.
   - Port static blog posts to `features/blog/data/blog.data.ts` and build details pages.

---

## Phase 5: API Layer & Server State Hooks
1. **Centralize HTTP Agent**:
   - Create Axios instance under `src/services/api-client.ts` targeting `import.meta.env.VITE_API_URL`.
   - Configure global error handlers to normalize response payloads.
2. **Build Feature Services**:
   - `category.service.ts`: Fetches listings and tree layouts.
   - `product.service.ts`: Integrates query string aggregators for paginated queries, search, categories, and brand queries.
   - `filter.service.ts`: Loads dynamic specifications by family.
3. **Build Query Hooks (TanStack Query)**:
   - Create `useProducts`, `useCategories`, `useSearch`, `useProductDetails` query managers to handle caching, skeletons, and error boundaries.

---

## Phase 6: Sync Filter Controls & Search to URL
1. **Url Filter Sync**:
   - Refactor category pages and product search grids to sync search query, brand checkbox arrays, and page index numbers to URL parameters: `?category=01&brand=Quick&page=1`.
   - Ensure the application handles back/forward navigations and URL link sharing correctly.

---

## Phase 7: Automated Checks & Visual QA
1. **Run Verification Commands**:
   - Build checks: `npm run build`
   - Linting fixes: `npm run lint`
2. **Visual Verification**:
   - Double check typography spacing, button colors, drawer overlays, responsive margins, and asset directories.
