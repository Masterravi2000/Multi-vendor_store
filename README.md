# Multi-Vendor Store Catalog & Dynamic Cart

A responsive, mobile-first e-commerce web application engineered for a multi-vendor grocery catalog. The platform enables users to seamlessly browse products across distinct merchants, manage items via a centralized Redux state, view purchases automatically grouped by shop name during checkout, and maintain robust data persistence across browser sessions using IndexedDB.

---

## Architectural Overview & Tech Stack

- **Core Library**: React.js (Functional Components, Hooks)
- **State Management**: Redux Toolkit (`createSlice`, typed hooks)
- **Client-Side Persistence**: IndexedDB (Async storage layer ensuring seamless reload safety)
- **Styling**: Tailwind CSS (Optimized for 360px–430px mobile viewports)
- **Icons**: Lucide React

---

## How It Works: Core Architecture & Implementation

### 1. Centralized State Management (Redux Toolkit)
The cart's state (`cartSlice.ts`) acts as the single source of truth for all product additions, deletions, and quantity updates. 
- **Action Handling**: When a user modifies item quantities via `ProductCard`, an `updateQuantity` action is dispatched to Redux.
- **Dynamic Calculation**: Selectors compute the live item count and cumulative total price in real-time, powering both the header badge and the sticky bottom checkout bar without prop drilling.

### 2. Robust Persistence Layer (IndexedDB)
To satisfy reload resilience without relying solely on volatile memory:
- Cart payloads are synchronized directly to local **IndexedDB** stores.
- Upon initial application load, the stored items are fetched asynchronously and loaded into the Redux store (`setCart`), guaranteeing that page refreshes or accidental closures never wipe user selections.

### 3. Multi-Vendor Cart & Store Grouping
Unlike single-vendor apps, this platform handles inventory from competing shops (`store_name`) simultaneously.
- **Grouping Logic**: Inside `ProductCheckout.tsx`, the flat array of cart items is processed using JavaScript's `.reduce()` method to categorize products dynamically by their respective `store_name`.
- **UI Presentation**: The checkout view renders distinct merchant sections, displaying store headers alongside their specific item subsets, quantities, and sub-totals.

### 4. Adaptive Navigation & View Switching
- **Catalog View**: Features a top `Header` with a live badge counter, a promotional `Banner`, horizontally scrollable `Category` tabs, and a responsive 2-column `ProductCard` grid.
- **Sticky Bottom Bar (`BottomNavBar`)**: Automatically floats above the viewport when `totalItems > 0`, displaying live totals and a "Proceed to Checkout" CTA.
- **View Transition**: Clicking either the header cart icon or the bottom checkout bar triggers a clean conditional view switch to `CartPage.tsx`, complete with an itemized bill summary and back-navigation.

---

## Project Directory Structure

```text
src/
├── app/
│   └── store.ts                 # Redux store configuration & middleware setup
├── features/
│   ├── cart/
│   │   └── cartSlice.ts         # Redux slice for cart actions and state management
│   └── products/
│       └── components/
│           └── ProductCard.tsx   # Responsive product card with interactive controls
├── components/
│   └── common/
│       ├── Banner.tsx           # Promotional banner component
│       ├── Category.tsx         # Horizontally scrollable category filter bar
│       ├── Header.tsx           # Top header containing the live cart badge icon
│       ├── BottomNavBar.tsx     # Sticky bottom checkout action bar
│       └── ProductCheckout.tsx  # Store-grouped item list for checkout/billing
├── pages/
│   ├── Catalog.tsx              # Primary product browsing & category filtering view
│   └── CartPage.tsx             # Dedicated cart summary and bill breakdown view
├── data/
│   └── mockProducts.json        # Multi-vendor product dataset (Ramu Mart, Krishna Dairy, etc.)
├── types/
│   └── index.ts                 # TypeScript interfaces and type definitions
├── App.tsx                      # Root component managing view switching & IndexedDB sync
└── main.tsx                     # React DOM entry point

Getting Started Locally
Prerequisites
Make sure you have Node.js (v16 or higher) and npm installed on your machine.

Setup Instructions
Clone the repository:

Bash
git clone <your-repository-url>
cd <repository-folder>
Install dependencies:

Bash
npm install
Run the development server:

Bash
npm run dev
Open your browser and navigate to the local development URL provided in your terminal (typically http://localhost:5173).