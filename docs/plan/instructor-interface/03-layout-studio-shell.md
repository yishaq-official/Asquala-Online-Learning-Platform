# 🏛️ Teacher Studio — Layout Shell & Navigation Plan

> **File**: `docs/plan/instructor-interface/03-layout-studio-shell.md`  
> **Target Routes**: `/instructor/*` via `app/instructor/layout.tsx`  
> **Master Overview**: [00-overview.md](file:///home/eaglex/Documents/officials/Asquala-online-learning-platform/docs/plan/instructor-interface/00-overview.md)  
> **Status**: READY FOR IMPLEMENTATION

---

## 🎯 Objectives & Scope

The **Teacher Studio Layout Shell** provides a dedicated, productive workspace for educators. It maintains complete visual separation from the student learning portal while providing an effortless one-click switcher between teacher and student modes.

Key requirements:
1. **Desktop Studio Sidebar (`InstructorSidebar`)**:
   - Official Asquala Logo (`/images/logo.png`) with "Creator Studio" branding.
   - Core Creator Navigation:
     - 📊 **Dashboard** (`/instructor/dashboard`)
     - 📚 **Courses** (`/instructor/courses`)
     - 📈 **Analytics** (`/instructor/analytics`)
     - 💬 **Student Q&A** (`/instructor/qa`)
     - 💰 **Earnings & Payouts** (`/instructor/earnings`)
     - ⚙️ **Studio Settings** (`/instructor/settings`)
   - Bottom Action: **"Switch to Student Portal"** button (routes to `/student/dashboard`).
   - Collapsible state support with tooltip labels.
2. **Top Creator Header (`InstructorHeader`)**:
   - Mobile hamburger button & mobile logo.
   - Fast action: **"+ New Course"** primary button.
   - Revenue badge pill: e.g. **"ETB 38,400 earned this month"** in subtle emerald card.
   - Instructor User Menu with verified badge and sign-out action.
3. **Mobile Navigation Drawer (`InstructorMobileNav`)**:
   - Slide-over drawer with identical navigation hierarchy and student mode switcher.

---

## 📐 Layout Wireframe

```text
┌──────────────┬──────────────────────────────────────────────────────────────┐
│ [Asquala]    │ [☰]  [+ Create Course]        [ETB 38,400/mo]  [(Avatar) YA▼]│
│ Studio       ├──────────────────────────────────────────────────────────────┤
├──────────────┤                                                              │
│ 📊 Dashboard │                                                              │
│ 📚 Courses   │                                                              │
│ 📈 Analytics │                       STUDIO CONTENT                         │
│ 💬 Q&A Forum │                                                              │
│ 💰 Earnings  │                                                              │
│ ⚙️ Settings  │                                                              │
├──────────────┤                                                              │
│ [⇄ Student]  │                                                              │
│ [‹ Collapse] │                                                              │
└──────────────┴──────────────────────────────────────────────────────────────┘
```

---

## 🗂️ Proposed File Locations

```text
asquala-online-school/
├── app/
│   └── instructor/
│       ├── layout.tsx                          # Studio layout shell
│       └── loading.tsx                         # Studio page loading skeleton
├── components/
│   └── instructor/
│       └── layout/
│           ├── instructor-sidebar.tsx          # Desktop studio sidebar
│           ├── instructor-header.tsx           # Creator topbar with quick actions
│           ├── instructor-mobile-nav.tsx       # Mobile slide-over navigation
│           ├── instructor-user-dropdown.tsx    # Creator profile dropdown
│           └── portal-switcher-button.tsx      # Switch to Student Portal button
└── stores/
    └── instructor-ui-store.ts                  # Sidebar collapse & mobile open state
```

---

## 🧪 Implementation & Verification Checklist

- [ ] **Step 1**: Create `stores/instructor-ui-store.ts` for creator navigation state.
- [ ] **Step 2**: Implement `InstructorSidebar` with official logo and student switcher.
- [ ] **Step 3**: Implement `InstructorHeader` with "+ Create Course" button and earnings badge.
- [ ] **Step 4**: Implement `InstructorMobileNav` with slide-over drawer.
- [ ] **Step 5**: Implement `InstructorUserDropdown` with "Verified Educator" badge.
- [ ] **Step 6**: Assemble `app/instructor/layout.tsx` and `app/instructor/loading.tsx`.
- [ ] **Step 7**: Verify zero TypeScript errors with `tsc --noEmit`.
