# 🌸 Velvet Salon — Frontend

A modern salon reservation web application built with **Vue 3**, **TailwindCSS**, and **Pinia**.

![Vue](https://img.shields.io/badge/Vue-3-42b883?style=for-the-badge&logo=vue.js&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Pinia](https://img.shields.io/badge/Pinia-State-FFD859?style=for-the-badge&logo=vue.js&logoColor=black)

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Pages](#pages)
- [Getting Started](#-getting-started)
- [Environment Setup](#-environment-setup)
- [Project Structure](#-project-structure)
- [Roles & Access](#-roles--access)
- [API Connection](#-api-connection)
- [Guest Booking Flow](#-guest-booking-flow)
- [Common Issues](#-common-issues)

---

## 🎯 Overview

Velvet Salon is a full-featured salon booking platform with two distinct themes:

- 🌸 **Pink theme** — Client-facing pages (home, services, booking, profile)
- 💜 **Purple dark theme** — Admin & Super Admin dashboard

The frontend connects to the [Laravel 12 backend API](https://github.com/FeRoRin/salon-reservation-api).

---

## ✨ Features

- ✅ Guest booking — book without an account, auto-creates account + sends password by email
- ✅ Authenticated booking — logged-in clients book directly (no Guest tab shown)
- ✅ Role-based navigation — different UI for client / admin / super admin
- ✅ Real-time service filtering, search, and sorting
- ✅ Admin dashboard with live charts (ApexCharts + Chart.js)
- ✅ Super admin: manage services, business settings, admins, clients
- ✅ Change password from profile (any role)
- ✅ Dynamic homepage — working hours + contact info loaded from API
- ✅ Reservation management with inline status updates
- ✅ Freeze / unfreeze admin accounts
- ✅ Fully responsive design

---

## 🛠 Tech Stack

| Technology | Purpose |
|-----------|---------|
| Vue 3 (Composition API) | UI framework |
| Vite | Build tool and dev server |
| TailwindCSS v3 | Styling |
| Pinia | State management (auth store) |
| Vue Router 4 | Client-side routing + navigation guards |
| Axios | HTTP requests to Laravel API |
| ApexCharts + vue3-apexcharts | Donut + area line charts |
| Chart.js | Bar chart for top services |

---

## 📄 Pages

### 🌸 Client Pages (Pink Theme)

| # | Page | Route | Access |
|---|------|--------|--------|
| 1 | Landing Page | `/` | Public |
| 2 | Services | `/services` | Public |
| 3 | Register | `/register` | Guest only |
| 4 | Login | `/login` | Guest only |
| 5 | Dashboard | `/dashboard` | Logged in |
| 6 | Book Appointment | `/booking` | Public / Logged in |
| 7 | My Reservations | `/my-reservations` | Logged in |
| 8 | Profile + Change Password | `/profile` | Logged in |

### 💜 Admin Pages (Purple Dark Theme)

| # | Page | Route | Access |
|---|------|--------|--------|
| 9 | Admin Login | `/admin/login` | Guest only |
| 10 | Admin Dashboard | `/admin` | Admin+ |
| 11 | Reservations Management | `/admin/reservations` | Admin+ |
| 12 | Clients List | `/admin/clients` | Admin+ |
| 13 | Services Management | `/admin/services` | Super Admin |
| 14 | Business Settings | `/admin/settings` | Super Admin |
| 15 | Manage Admins | `/admin/manage-admins` | Super Admin |
| 16 | Create Admin | `/admin/create-admin` | Super Admin |

---

## 🚀 Getting Started

### Requirements

- Node.js v18+
- npm v9+
- The [Laravel backend](https://github.com/FeRoRin/salon-reservation-api) running on `http://127.0.0.1:8000`

---

### 1 — Clone the repository

```bash
git clone https://github.com/FeRoRin/velvet-salon-frontend.git
cd velvet-salon-frontend
```

### 2 — Install dependencies

```bash
npm install
```

### 3 — Start the development server

```bash
npm run dev
# Running at: http://localhost:5173
```

> ⚠️ Make sure the Laravel API is running first: `php artisan serve`

### 4 — Build for production

```bash
npm run build
# Output goes to: dist/
```

---

## 🔧 Environment Setup

The API base URL is set directly in `src/services/api.js`:

```js
// src/services/api.js
const BASE_URL = 'http://127.0.0.1:8000/api'
```

**For production** change it to your real domain:

```js
const BASE_URL = 'https://api.yourdomain.com/api'
```

---

## 📁 Project Structure

```
src/
├── main.js                        ← App entry point, registers Pinia + Router + ApexCharts
├── App.vue                        ← Root component — decides client vs admin layout
│
├── services/
│   └── api.js                     ← ALL API calls live here — central file
│
├── stores/
│   └── auth.js                    ← Pinia store — user, token, role getters
│
├── router/
│   └── index.js                   ← All 16 routes + navigation guards
│
├── views/
│   ├── client/
│   │   ├── HomeView.vue           ← Assembles 5 section components
│   │   ├── ServicesView.vue       ← Services with search + filter + sort
│   │   ├── LoginView.vue          ← With rate limit countdown
│   │   ├── RegisterView.vue       ← With field-level validation
│   │   ├── DashboardView.vue      ← Stats + upcoming appointments
│   │   ├── BookingView.vue        ← Guest tab + auth tab
│   │   ├── MyReservationsView.vue ← Filter tabs + pagination + cancel
│   │   └── ProfileView.vue        ← Info + change password
│   │
│   └── admin/
│       ├── AdminLoginView.vue
│       ├── AdminDashboardView.vue ← Real charts from API
│       ├── ReservationsView.vue   ← Table + filters + manual booking modal
│       ├── ClientsListView.vue    ← Search + super admin can change password
│       ├── ServicesManagementView.vue ← Full CRUD
│       ├── BusinessSettingsView.vue   ← Hours + days
│       ├── ManageAdminsView.vue   ← Freeze / delete / change password
│       └── CreateAdminView.vue
│
└── components/
    ├── layout/
    │   ├── NavBar.vue             ← Sticky, role-based links, user dropdown
    │   ├── Footer.vue
    │   └── AdminLayout.vue        ← Collapsible sidebar + topbar
    │
    ├── home/
    │   ├── HeroSection.vue        ← Full-screen gradient + stats row
    │   ├── ServicesSection.vue    ← First 6 services from API
    │   ├── AboutSection.vue       ← Story + highlight cards
    │   ├── TestimonialsSection.vue
    │   └── ContactSection.vue     ← Working hours loaded dynamically from API
    │
    ├── ui/
    │   ├── ServiceCard.vue        ← Reusable service card
    │   └── StatusBadge.vue        ← Color-coded reservation status
    │
    └── admin/
        └── StatCard.vue           ← Dashboard metric card
```

---

## 👥 Roles & Access

Navigation guards in `router/index.js` enforce access automatically:

| Guard | Who | Behavior |
|-------|-----|----------|
| `requiresAuth` | Guests | Redirect to `/login` |
| `guestOnly` | Logged-in users | Redirect to `/dashboard` |
| `requiresAdmin` | Non-admins | Redirect to `/` |
| `requiresSuperAdmin` | Non-super-admins | Redirect to `/admin` |

**Booking page special behavior:**
- Guest (not logged in) → sees two tabs: **Book as Guest** and **I Have an Account**
- Logged-in user → Guest tab is hidden, booking form shown directly

---

## 🔌 API Connection

All API calls go through `src/services/api.js` using Axios with two auto-interceptors:

**Request interceptor** — adds Bearer token to every call automatically:
```js
config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
```

**Response interceptor** — on 401 (expired token), clears storage and redirects to `/login`.

### Available API exports

```js
import { authAPI }         from './services/api'  // login, register, logout, me, changePassword
import { servicesAPI }     from './services/api'  // GET /services
import { reservationsAPI } from './services/api'  // create, myBookings, cancel
import { guestBookingAPI } from './services/api'  // POST /guest-booking
import { adminAPI }        from './services/api'  // dashboard, reservations, clients
import { superAdminAPI }   from './services/api'  // services CRUD, settings, manage admins
import { publicAPI }       from './services/api'  // GET /business-settings (no token)
```

---

## 💌 Guest Booking Flow

1. Visitor clicks **Book Now** → `/booking` page opens
2. **Book as Guest** tab is shown (hidden if already logged in)
3. Fills in: name, email, phone, service, date, time, optional notes
4. Submits → `POST /api/guest-booking`
5. Laravel creates account with auto-generated password (format: `Velvet@4829`)
6. **Success screen** shows the password with a save warning
7. Same password is sent to their email with full booking details
8. They can login at `/login` with that password
9. They can change it anytime from `/profile`

> If the email already exists → 409 response → user is redirected to **I Have an Account** tab

---

## 📦 Install Commands

```bash
# Core packages
npm install vue-router@4 pinia axios

# Styling
npm install -D tailwindcss@3 postcss autoprefixer
npx tailwindcss init -p

# Charts
npm install apexcharts vue3-apexcharts chart.js
```

---

## 🐛 Common Issues

| Problem | Fix |
|---------|-----|
| Blank page | Run `npm install` then `npm run dev` |
| Services list empty | Check Laravel is running on port 8000 |
| Login redirects wrong page | Check `role` is returned inside `data.user` in login response |
| Charts not rendering | Run `npm install apexcharts vue3-apexcharts chart.js` |
| `tailwindcss init` fails | Use `npm install -D tailwindcss@3` (not v4) |
| Guest booking 404 | Add `Route::post('/guest-booking', ...)` to Laravel `routes/api.php` |
| Password email not arriving | Check `.env` Gmail App Password is wrapped in quotes |
| Token lost on page refresh | Check Pinia store initializes from `localStorage` |

---

## 🔗 Related Repository

| Repo | Description |
|------|-------------|
| [salon-reservation-api](https://github.com/FeRoRin/salon-reservation-api) | Laravel 12 backend API — setup instructions there |

---

## 📄 License

MIT License — free to use and modify.