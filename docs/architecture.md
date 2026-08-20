# architecture.md - eFOCUS Frontend Architecture Guide

This document details the software architecture, folder structures, state management flow, routing, and coding conventions for the eFOCUS production e-commerce frontend.

---

## 1. Technical Design Stack

- **Core Framework**: React (v18+) with Vite as the build compiler
- **Strict Typing**: TypeScript (Strict mode enabled)
- **Styling Layer**: Tailwind CSS + Custom CSS Variables for accurate color representation matching the original eFOCUS visual style
- **Component Primitives**: shadcn/ui (Tailwind-based components initialized via components.json)
- **Routing Engine**: React Router DOM (v6+ with data router configuration)
- **Server State Caching**: TanStack Query (React Query v5) for handling paginated queries, search indexing, and details fetches
- **Client State Stores**: Zustand (v4+) for cart/basket persistence, wishlist tracking, and modal/drawer state
- **Network Interface**: Centralized Axios client with interceptors for error transformations

---

## 2. Directory Layout Architecture

The project conforms to a **Feature-Based Modular Structure** under `src/features/`. Each business capability holds its own components, pages, hooks, services, and types to ensure high cohesion and loose coupling.

```text
efocus-frontend/
│
├── public/                     # Static assets (original image maps and icons)
│   ├── images/
│   │   ├── hero/
│   │   ├── products/
│   │   ├── categories/
│   │   ├── banners/
│   │   └── blog/
│   └── favicon/
│
├── src/
│   ├── app/                    # Central routing, provider bootstrap, and env configuration
│   │   ├── App.tsx
│   │   ├── router.tsx          # Router layout maps
│   │   ├── providers.tsx       # QueryClient, UI Theme, Toast providers
│   │   └── config.ts           # Centralized environment variable mapper
│   │
│   ├── components/             # Truly shared cross-feature resources
│   │   ├── ui/                 # Accessible shadcn primitives (Button, Input, Sheet, etc.)
│   │   ├── layout/             # Universal headers, navigation bars, footer, announcement
│   │   └── common/             # Breadcrumbs, Pagination, Loader skeletons, Error bounds
│   │
│   ├── features/               # Cohesive self-contained business modules
│   │   ├── home/               # Landing sections, banners, values
│   │   ├── products/           # Product lists, details tabs, grids, card models
│   │   ├── categories/         # Categories grid, nested sidebar listings
│   │   ├── filters/            # Dynamic specifications accordion panels
│   │   ├── search/             # Global debounced input suggestions
│   │   ├── quote/              # Basket state management, drawer configs, intake validation
│   │   ├── wishlist/           # Persistent wishlist logic and components
│   │   ├── blog/               # Guides, articles, and documentation components
│   │   ├── custom-assembly/    # Ribbon / harness spec custom builders
│   │   └── contact/            # Inquiry intake validations
│   │
│   ├── layouts/                # Wrapper shells
│   │   └── MainLayout.tsx      # Composes Announcement + Header + Nav + Main Outlet + Footer
│   │
│   ├── services/               # Centralized APIs and HTTP clients
│   │   ├── api-client.ts       # Central Axios instance
│   │   ├── api-endpoints.ts    # Centralized endpoint dictionary
│   │   └── api-error.ts        # Normalized API error wrapper
│   │
│   ├── hooks/                  # Global shared hooks (useMediaQuery, useDebounce, etc.)
│   ├── lib/                    # Library initialization helpers (shadcn utils, constants)
│   ├── types/                  # Shared domain types
│   └── styles/                 # Global styles and design variables (globals.css, variables.css)
```

---

## 3. Dependency Flow Rules

To prevent circular imports and maintain a scalable codebase, components must strictly follow a **one-way downward dependency flow**:

```text
Pages (Routing Outlets)
    ↓
Feature Components (Logic Aggregators)
    ↓
Feature Hooks (Business Hook Wrappers)
    ↓
Feature Services (Axios Endpoints)
    ↓
API Client (Central Axios Instance)
```

- **Shared UI Components (`src/components/ui/` or `src/components/common/`)** must be pure and dumb. They must **never** import business logic, hooks, or service layers from `src/features/`.
- **Feature boundaries** must be respected. For example, `features/products/` components should not directly import internal helpers from `features/quote/` except through clearly defined public types or shared store hooks.

---

## 4. State Management Strategy

### Server State (TanStack Query)
Managed via React Query to provide cached, re-validated responses:
- `useQuery` configurations handle category structures, filter configuration states, and products grids (paginated/filtered).
- Avoids mirroring server data (like product details) in local stores.

### Client State (Zustand + LocalStorage Persistence)
Used strictly for UI and user-managed transaction data:
- **Quote Basket Store** (`features/quote/store/quote.store.ts`): Tracks items added to the request basket, adjusts quantities, and handles customer forms. Persisted to `localStorage` under `efocus_quote_basket`.
- **Wishlist Store** (`features/wishlist/store/wishlist.store.ts`): Tracks wishlist items. Persisted under `efocus_wishlist`.
- **UI State**: Handles slide-out states of the Quote Drawer or mobile navigations.
