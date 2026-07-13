# E-Commerce Admin Dashboard

A full-featured admin dashboard for managing products, orders, and customers — built with React, TypeScript, and Redux Toolkit.

## Live Demo
🔗 [View Live](https://ecommerce-app-7vy4.vercel.app)


## Features

- 📊 **Dashboard** — KPI cards (revenue, orders, customers, low stock) and weekly sales bar chart
- 📦 **Products** — Full CRUD (add, edit, delete), search by name, filter by category
- 🛒 **Orders** — View all orders, update order status (processing → shipped → delivered)
- 👥 **Customers** — Customer list with total orders
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
| Backend | Supabase (PostgreSQL) |
| Build Tool | Vite |
| Deployment | Vercel |

## Getting Started

### Prerequisites
- Node.js 18+
- npm
- Supabase account (free)

### Installation

1. Clone the repo
```bash
   git clone https://github.com/RutujaBhojane/Ecommerce-App.git
   cd Ecommerce-App
```

2. Install dependencies
```bash
   npm install
```

3. Create a `.env.local` file in the project root:
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

4. Start the dev server
```bash
   npm start
```

5. Open [http://localhost:5173](http://localhost:5173) in your browser

## Project Structure
src/
├── app/             # Redux store, typed hooks, theme context, Supabase client
├── features/        # Feature-based modules (products, orders, customers, dashboard)
├── components/      # Shared layout components (Sidebar, Header)
├── routes/          # React Router setup
└── types/           # TypeScript interfaces (Product, Order, Customer)

## Key Technical Highlights

- **TypeScript throughout** — typed Redux state, async thunks, component props, and Zod-inferred form types
- **Redux Toolkit** — multiple slices with `createAsyncThunk` for async Supabase calls and local reducers for UI state (search, filter)
- **Supabase** — real PostgreSQL database with REST API, replacing json-server for a production-ready backend
- **Zod + React Hook Form** — schema-based form validation with TypeScript type inference (`z.infer`)
- **`useMemo`** — optimized client-side filtering without unnecessary re-renders
- **Utility types** — `Omit<Product, 'id'>` for add-product thunk, `Record<Order['status'], string>` for status badge styles

