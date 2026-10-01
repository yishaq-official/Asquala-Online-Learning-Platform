# 🖥️ Student Portal — Layout Shell & Navigation Plan

> **File**: `docs/plan/student-interface/01-layout-shell.md`  
> **Target Route**: `/student/*` via `app/student/layout.tsx`  
> **Master Overview**: [00-overview.md](file:///home/eaglex/Documents/officials/Asquala-online-learning-platform/docs/plan/student-interface/00-overview.md)

---

## 🎯 Objectives & Scope

The **Student Layout Shell** serves as the persistent chrome for all student experiences. It must provide:
1. **Effortless Navigation**: Seamless switching between Dashboard, My Courses, Explore, Certificates, and Settings.
2. **Context & Motivation**: Always-visible learning streak badge, global search shortcut, and notification indicator.
3. **Responsive Adaptation**: Sticky desktop sidebar (collapsible) and a frictionless mobile drawer with backdrop blur.
4. **Session Integration**: Direct connection with `better-auth` session and `auth-store` for user name, avatar, and sign-out.

---

## 📐 Layout Wireframe

### Desktop View (>= 1024px)
```text
┌─────────────────────────────────────────────────────────────────────────────┐
│ ┌───────────────┐ ┌───────────────────────────────────────────────────────┐ │
│ │  ASQUALA 🎓   │ │ 🔍 Search courses, lessons...      🔥 5 Days  🔔  [User]│ │ Topbar
│ ├───────────────┤ └───────────────────────────────────────────────────────┘ │
│ │ 🏠 Dashboard  │ ┌───────────────────────────────────────────────────────┐ │
│ │ 📚 My Courses │ │                                                       │ │
│ │ 🧭 Explore    │ │                                                       │ │
│ │ 🏆 Certificate│ │             Main Content View Area                    │ │
│ │ ⚙️ Settings   │ │             ({children} container)                    │ │
│ │               │ │                                                       │ │
│ │ ───────────── │ │                                                       │ │
│ │ 🚪 Sign Out   │ │                                                       │ │
│ └───────────────┘ └───────────────────────────────────────────────────────┘ │
│    Sidebar                             Page Content                         │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Mobile View (< 1024px)
```text
┌─────────────────────────────────────────────────────────┐
│ [☰] ASQUALA 🎓                   🔥 5 Days  🔔  [User]  │ Mobile Header
├─────────────────────────────────────────────────────────┤
│                                                         │
│                Main Content Area                        │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## 🗂️ Proposed File Locations

```text
asquala-online-school/
├── app/
│   └── student/
│       ├── layout.tsx                                # Root shell layout component
│       └── loading.tsx                               # Layout-level skeleton loader
├── components/
│   └── student/
│       └── layout/
│           ├── student-sidebar.tsx                   # Collapsible desktop sidebar
│           ├── student-header.tsx                    # Topbar with search, streak, user menu
│           ├── student-mobile-nav.tsx                # Mobile slide-over drawer
│           ├── student-user-dropdown.tsx             # Profile info & sign-out button
│           └── streak-badge.tsx                      # Flame icon + active streak days
└── stores/
    └── student-ui-store.ts                           # Zustand store for UI toggles
```

---

## 🧩 Component Breakdown & Props

### 1. `app/student/layout.tsx`
- **Role**: Server/Client hybrid wrapper rendering `StudentSidebar`, `StudentHeader`, `StudentMobileNav`, and the scrollable main container.
- **Session Check**: Verifies active session via `auth.api.getSession`. If unauthenticated, safely redirects to `/login`.

### 2. `StudentSidebar` (`components/student/layout/student-sidebar.tsx`)
- **Props**: None (reads current route via `usePathname()` and collapse state via `student-ui-store`).
- **Features**:
  - Logo with graduation cap icon linking to `/student/dashboard`.
  - Navigation links list with active route styling:
    - `/student/dashboard` → Dashboard (`LayoutDashboard` icon)
    - `/student/courses` → My Courses (`BookOpen` icon)
    - `/student/explore` → Explore (`Compass` icon)
    - `/student/certificates` → Certificates (`Award` icon)
    - `/student/settings` → Settings (`Settings` icon)
  - Collapse toggle button (`ChevronLeft` / `ChevronRight`) allowing full (256px) or icon-only (72px) mode.
  - Active state: `bg-primary-light text-primary font-semibold border-r-2 border-primary`.

### 3. `StudentHeader` (`components/student/layout/student-header.tsx`)
- **Features**:
  - Hamburger toggle for mobile devices.
  - Quick Search Trigger (`Cmd + K` search trigger opening search modal or focusing input).
  - Learning Streak Pill (`StreakBadge`).
  - Notification icon with unread indicator badge.
  - User Dropdown (`StudentUserDropdown`).

### 4. `StudentMobileNav` (`components/student/layout/student-mobile-nav.tsx`)
- **State**: Controlled by `isMobileNavOpen` in `student-ui-store`.
- **Features**: Slide-in overlay with backdrop blur (`bg-slate-900/40 backdrop-blur-sm`). Closes automatically on route changes.

### 5. `StudentUserDropdown` (`components/student/layout/student-user-dropdown.tsx`)
- **Features**:
  - Displays user avatar (fallback to initials), student name, and email.
  - Menu links: "View Profile", "Learning Goals", "Account Settings".
  - "Sign Out" button triggering `authClient.signOut()` and redirecting to `/login`.

---

## 🎨 Design System & Styling Rules

| Element | Style / CSS Variables |
|---|---|
| Sidebar Surface | `bg-card border-r border-border` |
| Active Nav Item | `bg-primary-light text-primary font-medium border-r-2 border-primary` |
| Inactive Nav Item | `text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors` |
| Header Surface | `bg-card/90 backdrop-blur-md border-b border-border sticky top-0 z-30` |
| Streak Badge | `bg-amber-50 text-amber-700 border border-amber-200 font-semibold px-2.5 py-1 rounded-full text-xs` |
| Canvas Background | `bg-background min-h-screen text-foreground` |

---

## 🧪 Implementation & Verification Steps

- [ ] **Step 1**: Create `stores/student-ui-store.ts` with `isSidebarCollapsed` and `isMobileNavOpen` actions.
- [ ] **Step 2**: Build `StreakBadge` and `StudentUserDropdown` with auth session data.
- [ ] **Step 3**: Build `StudentSidebar` with desktop collapse animation and active route highlights.
- [ ] **Step 4**: Build `StudentHeader` and `StudentMobileNav` with responsive breakpoint toggles.
- [ ] **Step 5**: Assemble `app/student/layout.tsx` and verify layout rendering on desktop (1280px), tablet (768px), and mobile (375px).
