# HealthAdmin 🏥 - B2B Healthcare Admin Dashboard

<div align="center">

![HealthAdmin](https://img.shields.io/badge/Healthcare-Admin%20Dashboard-blue?style=flat-square&logo=hospital-box)

**A Modern, Responsive, Enterprise-Grade Admin Dashboard for Healthcare Management Systems**

[![React](https://img.shields.io/badge/React-19.2-61DAFB?style=flat-square&logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org)
[![Redux Toolkit](https://img.shields.io/badge/Redux%20Toolkit-2.11-764ABC?style=flat-square&logo=redux)](https://redux-toolkit.js.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.1-06B6D4?style=flat-square&logo=tailwind-css)](https://tailwindcss.com)
[![Radix UI](https://img.shields.io/badge/Radix%20UI-Components-000000?style=flat-square&logo=radix-ui)](https://www.radix-ui.com)
[![Vite](https://img.shields.io/badge/Vite-7.2-646CFF?style=flat-square&logo=vite)](https://vitejs.dev)

[🌐 Live Demo](#-live-demo) • [📸 Screenshots](#-screenshots) • [🚀 Quick Start](#-quick-start) • [📖 Documentation](#-technical-architecture)

</div>

---

## 📖 Project Overview

**HealthAdmin** is a production-ready, professional-grade B2B Healthcare Admin Dashboard built with modern frontend technologies. Designed for healthcare administrators and clinic managers, it provides:

- 🔐 **Secure Authentication** with persistent sessions and role-based access control
- 📊 **Real-time Data Visualization** with interactive KPI cards and patient analytics
- 👥 **Advanced Patient Management** with search, filtering, and CSV export capabilities
- 🌓 **Dark Mode Support** with system-aware theme switching
- 📱 **Fully Responsive Design** optimized for desktop, tablet, and mobile devices
- ⚡ **Enterprise Architecture** using feature-based folder structure for scalability
- 🛡️ **Global Error Handling** with custom error boundaries and 404 pages
- 🎨 **UI Excellence** featuring glassmorphism, skeleton loading, and smooth animations

Perfect for internship portfolios, production deployments, and technical interviews.

---

## 🌐 Live Demo

> **🔗 Live URL:** [Vercel Deployment Link - Coming Soon](#)
>
> **Demo Credentials:**
> - 📧 Email: `admin@healthcare.com`
> - 🔑 Password: `admin123`

---

## 📸 Screenshots

### 🖥️ Desktop View

#### Login Page
![Login Page](https://via.placeholder.com/800x600?text=Login+Page+-+Desktop)
*Secure login with email validation, loading states, and error handling*

#### Dashboard Overview
![Dashboard](https://via.placeholder.com/800x600?text=Dashboard+-+KPI+Cards)
*Real-time KPI cards displaying Total Patients, Doctors, Appointments, and Active Clinics*

#### Patients Management
![Patients Table](https://via.placeholder.com/800x600?text=Patients+Table+-+Search+%26+Filter)
*Interactive patients table with real-time search, status filtering, and CSV export*

#### Settings Page
![Settings](https://via.placeholder.com/800x600?text=Settings+-+Theme+%26+User+Management)
*Theme customization, user account info, and admin creation interface*

---

### 📱 Mobile & Tablet Views

#### Mobile Sidebar Navigation
![Mobile Sidebar](https://via.placeholder.com/400x600?text=Mobile+Drawer+Navigation)
*Responsive hamburger menu with full navigation drawer*

#### Mobile Patient Cards
![Mobile Patients](https://via.placeholder.com/400x600?text=Mobile+Patient+Cards)
*Optimized card-based layout for patient information on small screens*

#### Responsive Dashboard
![Mobile Dashboard](https://via.placeholder.com/400x600?text=Mobile+Dashboard+Cards)
*Adaptive grid layout that stacks gracefully on mobile devices*

---

### 🌙 Dark Mode

#### Dashboard in Dark Mode
![Dark Dashboard](https://via.placeholder.com/800x600?text=Dashboard+-+Dark+Mode)
*Beautiful dark theme with system-aware color adjustments*

---

## 🚀 Features

### 🔐 **Authentication & Security**

- ✅ **Secure Login System**
  - Email validation using HTML5 patterns
  - Password field with visual feedback
  - Regex-based email format validation
  - Clear error messages for invalid credentials

- ✅ **Session Persistence**
  - User data stored in `localStorage` for session persistence
  - Automatic login on page refresh
  - Manual logout clears all session data

- ✅ **Protected Routes**
  - Route guards prevent unauthorized access
  - Automatic redirect to login for unauthenticated users
  - Location state preservation for post-login navigation

- ✅ **Role-Based Admin Creation**
  - Create new admin accounts from Settings page
  - Auto-generated avatars using UI Avatar API
  - Default password system for new admins
  - Real-time admin list management

---

### 📊 **Advanced Data Handling**

#### Interactive Patients Table
- 🔍 **Real-time Search** - Search by patient name or assigned doctor
- 🏷️ **Status Filtering** - Filter by Critical, Active, or Recovered status
- 💾 **CSV Export** - Download filtered patient data as CSV file
- 📱 **Responsive Views**
  - Desktop: Full-featured data table with all columns
  - Mobile: Card-based layout optimized for touch
  - Tablet: Adaptive layout with horizontal scrolling option

#### State Management with Redux Toolkit
- 🎯 **Centralized Store** - Single source of truth for app state
- 📦 **Auth Slice** - User authentication and session management
- 📦 **Dashboard Slice** - Patient data and KPI metrics
- ⚡ **Async Thunks** - Handle API calls and data fetching with loading states
- 💾 **Persistence** - User data persists across sessions

---

### 🎨 **UI/UX Excellence**

#### Fully Responsive Design
- ✅ **Mobile First** - Optimized for small screens first
- ✅ **Tablet Optimized** - Perfect layout for iPad and tablets
- ✅ **Desktop Enhanced** - Full-featured experience on large screens
- ✅ **Adaptive Sidebar** - Hidden on mobile, hamburger menu, full sidebar on desktop
- ✅ **Responsive Tables** - Inline tables on desktop, cards on mobile
- ✅ **Flexible Grids** - 1-column on mobile, multi-column on larger screens

#### Dark Mode with Radix UI
- 🌓 **System-Aware** - Auto-detects OS theme preference
- 🎨 **Three Modes** - Light, Dark, and System automatic
- 🔄 **Smooth Transitions** - 300ms theme transitions for comfort
- 🌈 **Full Coverage** - Every component supports dark mode
- 💾 **Persistent** - User preference saved in localStorage

#### Polish & Excellence
- ✨ **Glassmorphism Effects** - Frosted glass cards and modals
- 🎬 **Skeleton Loading** - Animated placeholder skeletons during data fetch
- 🔔 **Toast Notifications** - Non-intrusive notifications using Sonner
- 🎯 **Smooth Animations** - Page transitions, hover effects, and micro-interactions
- ♿ **Accessibility** - ARIA labels, semantic HTML, keyboard navigation

---

### 🛡️ **Robustness & Error Handling**

#### Global Error Boundary
- 🚨 **Crash Prevention** - Catches React component errors gracefully
- 📋 **Error Details** - Collapsible technical details for debugging
- 🔧 **Recovery Options** - "Try Again" and "Go Home" buttons
- 🎨 **Beautiful UI** - Professional error page with icon and messaging

#### Custom 404 Page
- 🔍 **Not Found Handler** - Friendly Amazon-style 404 page
- 🏠 **Navigation** - Quick links to dashboard and back button
- 🎨 **Design Consistency** - Matches app theme and styling

---

## 🛠️ Tech Stack

### Frontend Framework
- **React 19.2** - Modern UI library with concurrent features
- **TypeScript 5.9** - Type-safe JavaScript for production code
- **Vite 7.2** - Lightning-fast build tool with HMR

### State Management
- **Redux Toolkit 2.11** - Simplified Redux with built-in utilities
- **React Redux 9.2** - Official React bindings for Redux

### UI Framework & Components
- **Tailwind CSS 4.1** - Utility-first CSS with dark mode support
- **Radix UI** - Unstyled, accessible component library
  - Dropdown Menu - User profile menu
  - Dialog - Mobile sidebar drawer
  - Other components for future features

### Routing & Navigation
- **React Router 7.12** - Client-side routing with protected routes
- **React Router DOM** - DOM-specific React Router APIs

### Icons & Design
- **Lucide React 0.562** - Consistent icon library (100+ icons used)
- **Sonner** - Toast notification library

### Styling & Animations
- **Tailwind CSS 4.1** - Responsive design and dark mode
- **Tailwind Merge** - Utility class conflict resolution
- **CLSX** - Conditional class name utility

### Development Tools
- **ESLint 9.39** - Code quality and style consistency
- **TypeScript ESLint** - Type-aware linting
- **Vite Plugin React** - Fast refresh for development

---

## 💻 Local Installation

### Prerequisites

Ensure you have the following installed:
- **Node.js** 16+ ([Download](https://nodejs.org))
- **npm** or **yarn** (comes with Node.js)
- **Git** (optional, for cloning)

### Step 1: Clone the Repository

```bash
git clone https://github.com/TejeswarAchari/healthcare-admin-dashboard.git
cd healthcare-admin-dashboard
```

Or download as ZIP and extract:
- Download repository → Extract → Open folder in terminal

### Step 2: Install Dependencies

```bash
npm install
# or
yarn install
```

This installs all packages listed in `package.json`:
- React, Redux Toolkit, React Router
- Tailwind CSS, Radix UI components
- Lucide icons, TypeScript, Vite
- ESLint, development tools

### Step 3: Start Development Server

```bash
npm run dev
# or
yarn dev
```

Output:
```
  ➜  Local:   http://localhost:5173/
  ➜  press h to show help
```

Open `http://localhost:5173/` in your browser.

### Step 4: Build for Production

```bash
npm run build
# or
yarn build
```

Creates optimized production build in `dist/` folder.

### Step 5: Preview Production Build

```bash
npm run preview
# or
yarn preview
```

---

## 🔑 Demo Credentials

### Default Admin Account

| Field | Value |
|-------|-------|
| **Email** | `admin@healthcare.com` |
| **Password** | `admin123` |

### Create Additional Admin Accounts

1. Log in with default credentials
2. Navigate to **Settings** → **Admin Management**
3. Fill in "Add New Admin" form:
   - Full Name: Enter desired name
   - Email Address: Enter valid email
4. Click **Create User**
5. New admin created with default password: `password123`

---

## 📱 Responsive Design Details

### Mobile (< 768px)
- ✅ **Hidden Desktop Sidebar** - Replaced with hamburger menu
- ✅ **Mobile Drawer Navigation** - Full-height slide-out menu using Radix Dialog
- ✅ **Card-Based Patient View** - Table replaced with responsive cards
- ✅ **Stacked Layouts** - All grids stack to 1 column
- ✅ **Touch-Friendly** - Larger tap targets and spacing
- ✅ **Optimized Forms** - Single-column forms with full-width inputs

### Tablet (768px - 1024px)
- ✅ **Sidebar Visible** - Desktop sidebar shown on tablet
- ✅ **2-Column Grids** - Dashboard cards and settings sections
- ✅ **Table Scrolling** - Horizontal scroll on data tables
- ✅ **Balanced Spacing** - Optimal padding and margins

### Desktop (> 1024px)
- ✅ **Full Sidebar** - 256px fixed navigation panel
- ✅ **Multi-Column Grids** - 4-column KPI cards, 2-column settings
- ✅ **Full Tables** - All columns visible without scrolling
- ✅ **Rich Interactions** - Hover effects, dropdowns, transitions

---

## 🏗️ Project Architecture

### Feature-Based Folder Structure

```
src/
├── app/                          # Redux store configuration
│   └── store.ts                  # Redux store setup & type exports
│
├── features/                     # Feature-based modules (scalable)
│   ├── auth/                     # Authentication feature
│   │   └── authSlice.ts          # Login, logout, user management
│   │
│   └── dashboard/                # Dashboard feature
│       ├── dashboardSlice.ts     # KPI data, patient list
│       ├── DashboardView.tsx     # Main dashboard page
│       ├── StatsCard.tsx         # Reusable KPI card component
│       └── RecentPatientsTable.tsx # Patients table with search/filter
│
├── components/                   # Shared UI components
│   ├── layout/                   # Layout wrappers
│   │   ├── DashboardLayout.tsx   # Main app layout with sidebar/header
│   │   ├── ProtectedRoute.tsx    # Route guards for authentication
│   │   └── ModeToggle.tsx        # Dark/Light mode switcher
│   │
│   ├── theme-provider.tsx        # Theme context & logic
│   └── ErrorFallback.tsx         # Error boundary fallback UI
│
├── pages/                        # Page components (route views)
│   ├── Login.tsx                 # Public login page
│   ├── Patients.tsx              # Patient directory page
│   ├── Settings.tsx              # Admin settings page
│   └── NotFound.tsx              # 404 page
│
├── hooks/                        # Custom React hooks
│   └── redux.ts                  # Type-safe Redux hooks
│
├── types/                        # TypeScript type definitions
│   └── index.ts                  # User, AuthState interfaces
│
├── App.tsx                       # Route configuration
├── main.tsx                      # React entry point
└── index.css                     # Global styles
```

### Why Feature-Based Structure?

✅ **Scalability** - Easy to add new features (doctors, appointments, etc.)  
✅ **Organization** - Related code lives together  
✅ **Maintainability** - Find code quickly by feature name  
✅ **Team Collaboration** - Teams can work on separate features  
✅ **Testing** - Test features independently  

---

## 🔐 Security & Best Practices

### Authentication Security
- ✅ Email validation with regex patterns
- ✅ Password fields (masked input)
- ✅ Error messages don't leak user info (generic "Invalid credentials")
- ✅ Session stored in `localStorage` (production would use HttpOnly cookies)

### Data Safety
- ✅ No sensitive data in console logs
- ✅ HTTPS-ready (production deployment)
- ✅ CORS-compatible architecture
- ✅ Type-safe Redux for state immutability

### Code Quality
- ✅ TypeScript for compile-time type checking
- ✅ ESLint for code style consistency
- ✅ Proper error boundaries for crash prevention
- ✅ Proper component composition and reusability

---

## 🎯 Key Interesting Features

### 🤖 Smart Admin Management
The Settings page includes a full **admin creation system**:
- Create new admin accounts with auto-generated avatars
- Track all admins with email and role badges
- Default password system for consistency
- Real-time admin list with scrollable container

### 💾 CSV Export Functionality
The Patients table includes **client-side CSV export**:
- Export filtered (searched/filtered) patient data
- Automatic filename: `patients_report.csv`
- Works entirely in browser - no server needed
- Perfect for reports and external tools

### 🎨 Advanced Theme System
The dark mode implementation is **sophisticated**:
- System-aware detection using `prefers-color-scheme`
- Three modes: Light, Dark, System
- localStorage persistence across sessions
- Smooth 300ms CSS transitions
- Every component color-coordinated for dark mode

### 🎬 Skeleton Loading States
Dashboard loading is **professional**:
- Animated pulse effect on card skeletons
- Prevents layout shift (Cumulative Layout Shift = 0)
- Improves perceived performance
- Better UX than traditional spinners

### 🛡️ Global Error Handling
Error handling is **production-grade**:
- React Error Boundary catches component errors
- Collapsible technical details for developers
- Recovery options (Try Again, Go Home)
- Doesn't crash entire app on single error

---

## 📊 Performance Metrics

- ⚡ **Fast Load Time** - Vite + code splitting
- 📦 **Small Bundle Size** - Tree-shaking with Tailwind CSS
- 🎯 **Zero Cumulative Layout Shift** - Skeleton loaders prevent jumps
- 🖼️ **Optimized Images** - Lucide icons (SVG) and placeholder avatars
- 🚀 **React Optimizations** - Memoization and proper hook dependencies

---

## 🧪 Future Enhancement Ideas

- [ ] **Backend API Integration** - Replace mock data with real API calls
- [ ] **Doctor & Appointment Management** - Full module for doctors
- [ ] **Appointment Scheduling** - Calendar view and booking system
- [ ] **Patient Profiles** - Detailed patient information pages
- [ ] **Analytics Dashboard** - Charts and metrics visualizations
- [ ] **Email Notifications** - Real-time alerts with Sonner
- [ ] **Unit Tests** - Jest + React Testing Library
- [ ] **E2E Tests** - Cypress or Playwright
- [ ] **PWA Features** - Offline support and app installation
- [ ] **Database Integration** - Firebase or backend database

---

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Make changes and commit: `git commit -m "Add new feature"`
4. Push to branch: `git push origin feature/your-feature`
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License** - see [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Developer Notes

### Commands

```bash
# Development
npm run dev              # Start dev server with HMR

# Production
npm run build            # Build for production
npm run preview          # Preview production build locally

# Code Quality
npm run lint             # Check code style with ESLint
npm run lint --fix       # Auto-fix ESLint issues
```

### File Size Analysis

Check bundle size:
```bash
npm run build && npm run preview
```

Monitor in browser DevTools → Network tab

### Git Commit Convention

Follow conventional commits:
- `feat: add new feature`
- `fix: fix bug`
- `style: formatting changes`
- `docs: update documentation`
- `refactor: code restructuring`

---

## 🆘 Troubleshooting

### Issue: Port 5173 Already in Use
```bash
# Kill process on port 5173 (Windows)
netstat -ano | findstr :5173
taskkill /PID <PID> /F

# Or use different port
npm run dev -- --port 3000
```

### Issue: Dark Mode Not Working
- Clear browser cache and localStorage
- Try incognito/private mode
- Check system dark mode preference

### Issue: Login Fails
- Verify credentials: `admin@healthcare.com` / `admin123`
- Check browser console for errors
- Clear localStorage and try again

### Issue: Sidebar Not Appearing on Mobile
- Ensure you're viewing on device < 768px width
- Test in browser DevTools responsive mode
- Clear browser cache

---

## 📞 Support & Contact

For questions or issues:
- 📧 Email: [vteja797@gmail.com](mailto:your-email@example.com)
- 🐙 GitHub Issues: [Report a Bug](https://github.com/TejeswarAchari/healthcare-admin-dashboard/issues)
- 💬 Discussions: [Ask a Question](https://github.com/TejeswarAchari/healthcare-admin-dashboard/discussions)

---

## 🎉 Acknowledgments

Built with ❤️ by [Tejeswar Achari]

**Special thanks to:**
- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Radix UI](https://www.radix-ui.com)
- [Redux Toolkit](https://redux-toolkit.js.org)
- [Lucide Icons](https://lucide.dev)

---

<div align="center">

**Made with ❤️ for healthcare management**

⭐ If you find this helpful, please consider giving it a star on GitHub!

[⬆ Back to Top](#healthadmin--b2b-healthcare-admin-dashboard)

</div>
