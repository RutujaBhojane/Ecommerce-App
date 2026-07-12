# E-Commerce Admin Dashboard

A full-featured admin dashboard for managing products, orders, and customers — built with React, TypeScript, and Redux Toolkit.

## Live Demo
🔗 [View Live](#) ← replace with Vercel link after deployment

## Screenshots
<!-- Add screenshots after deployment -->

## Features

- 📊 **Dashboard** — KPI cards (revenue, orders, customers, low stock) and weekly sales bar chart
- 📦 **Products** — Full CRUD (add, edit, delete), search by name, filter by category
- 🛒 **Orders** — View all orders, update order status (processing → shipped → delivered)
- 👥 **Customers** — Customer list with order history
- 🌙 **Dark mode** — Toggle between light and dark theme
- 🔗 **Active sidebar navigation** — Visual highlight on current page

## Tech Stack

| Category | Technology |
|---|---|
| Framework | React 18 + TypeScript |
| State Management | Redux Toolkit + createAsyncThunk |
| Styling | Tailwind CSS v4 |
| Routing | React Router v6 |
| Charts | Recharts |
| Forms & Validation | React Hook Form + Zod |
| Mock Backend | json-server |
| Build Tool | Vite |

## Getting Started

### Prerequisites
- Node.js 18+
- npm

### Installation

1. Clone the repo
```bash
   git clone https://github.com/YOUR_USERNAME/ecommerce-admin-dashboard.git
   cd ecommerce-admin-dashboard
```

2. Install dependencies
```bash
   npm install
```

3. Start the mock backend (json-server)
```bash
   npx json-server --watch data/db.json --port 5000
```

4. Start the dev server (in a separate terminal)
```bash
   npm start
```

5. Open [http://localhost:5173](http://localhost:5173) in your browser

## Project Structure

src/
├── app/             # Redux store, typed hooks, theme context
├── features/        # Feature-based modules (products, orders, customers, dashboard)
├── components/      # Shared layout components (Sidebar, Header)
├── routes/          # React Router setup
└── types/           # TypeScript interfaces (Product, Order, Customer)

## Key Technical Highlights

- **TypeScript throughout** — typed Redux state, async thunks, component props, and Zod-inferred form types
- **Redux Toolkit** — multiple slices with `createAsyncThunk` for async API calls and local reducers for UI state (search, filter)
- **Zod + React Hook Form** — schema-based form validation with TypeScript type inference (`z.infer`)
- **`useMemo`** — optimized client-side filtering without unnecessary re-renders
- **Utility types** — `Omit<Product, 'id'>` for add-product thunk, `Record<Order['status'], string>` for status badge styles

