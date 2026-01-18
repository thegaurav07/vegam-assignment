<!-- # Admin Dashboard - Internship Assignment

A pre-built admin dashboard with **intentional bugs** and **incomplete features** for you to fix and complete.

# Admin Dashboard – Internship Assignment

A React + TypeScript based Admin Dashboard built as part of the **Internship Technical Assessment**.

This project demonstrates clean architecture, bug fixing, feature enhancements, and production-ready practices.

---

## 🚀 Tech Stack

- React 18
- TypeScript
- Vite
- Material UI (MUI)
- Material React Table
- React Query (@tanstack/react-query)
- React Router
- MSW (Mock Service Worker)
- Notistack (Snackbar notifications)

---

## ✅ Completed Requirements

### 🐞 Bug Fixes
- ✔ Table refresh after user status update
- ✔ Groups column rendering fixed (`[object Object]` → chips)
- ✔ Pagination, filters & search synced with URL

### ✨ Features
- ✔ Debounced search (300ms)
- ✔ Server-side pagination
- ✔ Optimistic UI updates for status toggle
- ✔ Loading skeleton for table
- ✔ Error handling with user-friendly alerts
- ✔ Global Error Boundary

### 🧩 Actions Column
- ✔ Enable / Disable user status
- ✔ Accessible buttons & hover states
- ⚠ Confirmation dialog before deactivation (optional – not required)

---

## 🧪 Error Handling
- Global `ErrorBoundary` to catch runtime crashes
- Friendly error UI with retry option
- React Query error states handled gracefully

---

## 📂 Project Structure

## Quick Start

```bash

# Install dependencies
npm install

# Initialize MSW (required for mock API)
npx msw init public --save

# Start development server
npm run dev
```

The app will be available at http://localhost:5173

## Tech Stack

| Technology | Purpose |
|------------|---------|
| React 18 | UI Framework |
| TypeScript | Type Safety (strict mode) |
| Material React Table (MRT) | Data Grid |
| Material UI | Component Library |
| React Query | Data Fetching & Caching |
| MSW | Mock API |
| React Router v6 | Routing |
| Notistack | Toast Notifications |

## Project Structure

```
src/
├── api/                  # API calls
├── components/
│   └── tables/           # Table components (DynamicGrid, UserActions)
├── hooks/                # Custom hooks (useUsers, useDebounce)
├── layouts/              # Page layouts
├── mocks/                # MSW mock handlers
├── pages/
│   └── UsersPage/        # Users page
├── types/                # TypeScript types
├── utils/                # Utilities & column config
├── App.tsx
├── main.tsx
└── routes.tsx
```

## Your Tasks

See **ASSIGNMENT.md** for detailed instructions.

### Summary

| Task Type | Count | Skills Tested |
|-----------|-------|---------------|
| Bug Fixes | 3 | Debugging, React Query, MRT |
| Complete Features | 3 | Pattern following |
| Build New | 2 | Independent thinking |

## Submission

1. Fix all bugs and complete features
2. Make separate commits for each fix/feature
3. Update this README with your changes
4. Deploy to Vercel/Netlify
5. Submit repo link + live demo

---

## Changes Made

<!--
CANDIDATE: Document your changes here after completing the assignment.

### Bug Fixes
1. **Cache Invalidation** - ...
2. **Chiplist Renderer** - ...
3. **URL Sync** - ...

### Features Completed
1. **Debounced Search** - ...
2. **Loading Skeleton** - ...
3. **Optimistic UI** - ...
--> -->



# Admin Dashboard – Internship Assignment

A React + TypeScript based **Admin Dashboard** built as part of the **Internship Technical Assessment**.

This project demonstrates the ability to **debug an existing codebase**, **complete incomplete features**, and **build production-ready enhancements** following real-world frontend practices.

---

## 🔗 Live Demo

https://vegam-assignment1.vercel.app

---

## ⚠️ Live Demo Note (Important)

This project uses **MSW (Mock Service Worker)** to mock backend APIs.

- MSW works fully in **local development**
- In production deployments (Vercel / Netlify), MSW does not intercept API requests
- As a result, API-dependent features may not function correctly in the live demo

👉 **For full functionality, please run the project locally** using the instructions below.

---

## 🚀 Tech Stack

- React 18
- TypeScript (strict mode)
- Vite
- Material UI (MUI)
- Material React Table
- React Query (@tanstack/react-query)
- React Router v6
- MSW (Mock Service Worker)
- Notistack (Snackbar notifications)

---

## ✅ Completed Requirements

### 🐞 Bug Fixes
- ✔ Fixed table not refreshing after user status update using React Query cache invalidation
- ✔ Fixed Groups column rendering (`[object Object]` → group name chips)
- ✔ Synced pagination, filters, and search state with URL parameters

---

### ✨ Completed Features
- ✔ Debounced search (300ms) to prevent excessive API calls
- ✔ Server-side pagination
- ✔ Optimistic UI updates for user status toggle
- ✔ Loading skeleton for table during data fetch
- ✔ User-friendly error handling
- ✔ Global Error Boundary with retry option

---

### 🧩 Actions Column Enhancements
- ✔ Enable / Disable user status
- ✔ Accessible action buttons with hover states
- ✔ Keyboard-friendly interactions
- ⚠ Confirmation dialog before deactivation (optional – not mandatory)

---

## 🧪 Error Handling
- Global `ErrorBoundary` to catch runtime crashes
- Friendly fallback UI with retry option
- React Query error states handled gracefully

---

## 📂 Project Structure



