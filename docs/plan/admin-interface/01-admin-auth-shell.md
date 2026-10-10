# 🛡️ Phase 1 Plan: Admin Authentication & Governance Shell

> **File**: `docs/plan/admin-interface/01-admin-auth-shell.md`  
> **Target Routes**: `/admin/login`, `/admin/layout.tsx`  
> **Master Overview**: [00-overview.md](file:///home/eaglex/Documents/officials/Asquala-online-learning-platform/docs/plan/admin-interface/00-overview.md)  
> **Status**: COMPLETED & VERIFIED IN BROWSER ✅  

---

## 1. Objectives & Scope

1. **Dedicated Administrative Sign-In (`/admin/login`)**:
   - Institutional portal designed for Academic Review Board members, Quality Assurance Auditors, and Super Administrators.
   - High-security visual presentation featuring the official Asquala logo (`/images/logo.png`) and an explicit "Restricted Authority Area" security callout.
   - Authentication fields:
     - Institutional Email (`name@asquala.edu`)
     - Administrative Password (masked)
     - Hardware 2FA / Authenticator Token (6-digit token, e.g. `882-910`)
   - Quick Demo Fill button to instantly populate credentials for **Dr. Alazar Tadesse** (Academic Board Chair).
   - Direct navigation to the Admin Console upon successful authentication.
   - Quick switcher links back to Teacher Studio and Student Marketplace.

2. **Isolated Administrative Shell (`/admin/layout.tsx`)**:
   - Layout route isolation: When viewing `/admin/login`, render standalone without navigation bars.
   - Collapsible desktop sidebar (`w-64` ⇄ `w-20`) with smooth animated transitions powered by Zustand (`useAdminUIStore`).
   - Top Admin Header with breadcrumbs, active audit queue alert pill, notifications bell, and administrator profile chip.
   - Responsive slide-over drawer for tablet and mobile viewports (`AdminMobileNav`).
   - Cross-portal navigation shortcuts allowing administrators to audit the platform from Teacher and Student perspectives.

---

## 2. Layout Wireframes

### Dedicated Admin Sign-In (`/admin/login`)
```text
┌─────────────────────────────────────────────────────────────────────────────┐
│                            [ Asquala Logo ]                                 │
│                       ASQUALA GOVERNANCE PORTAL                             │
│       Academic Accreditation & Quality Assurance Control Plane              │
│                                                                             │
│ ┌─────────────────────────────────────────────────────────────────────────┐ │
│ │ ⚠️ RESTRICTED AUTHORITY AREA: Access is monitored & restricted to       │ │
│ │ appointed Academic Review Board members & Super Administrators.          │ │
│ └─────────────────────────────────────────────────────────────────────────┘ │
│                                                                             │
│ ┌─────────────────────────────────────────────────────────────────────────┐ │
│ │ Official Institutional Email: [ alazar.admin@asquala.edu              ] │ │
│ │ Administrative Password:      [ •••••••••••••••••••••••••             ] │ │
│ │ Hardware 2FA Token:           [ 882-910                               ] │ │
│ │                                                                         │ │
│ │ [ ⚡ Fill Auditor Credentials (Dr. Alazar Tadesse) ]                     │ │
│ │                                                                         │ │
│ │ [ 🚀 Enter Governance Console ➔ ]                                       │ │
│ │                                                                         │ │
│ │ Looking for other portals?  [ Teacher Studio ] • [ Student Marketplace ] │ │
│ └─────────────────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Collapsible Admin Governance Shell (`/admin/layout.tsx`)
```text
┌──────────────┬──────────────────────────────────────────────────────────────┐
│ [Logo]       │  Academic Governance & Audit         [ 7 Audits Pending ] 🔔 │
│ Asquala Admin│  Asquala Quality Control             Dr. Alazar Tadesse (AT) │
├──────────────┼──────────────────────────────────────────────────────────────┤
│ 🟢 Board Mode│                                                              │
│              │                                                              │
│ 📊 Dashboard │  [ Page Content Viewport ]                                    │
│ 🎓 Teacher   │                                                              │
│    Accredit  │                                                              │
│    (4)       │                                                              │
│ 📖 Course    │                                                              │
│    Audit (3) │                                                              │
│ 💰 Treasury  │                                                              │
│    (5)       │                                                              │
│ 👥 Users     │                                                              │
│ ⚙️ Settings   │                                                              │
│              │                                                              │
│ ──────────── │                                                              │
│ ⚡ Studio    │                                                              │
│ 🎓 Student   │                                                              │
│ 🚪 Logout    │                                                              │
└──────────────┴──────────────────────────────────────────────────────────────┘
```

---

## 3. Component Hierarchy & Deliverables

```text
asquala-online-school/
├── stores/
│   └── admin-ui-store.ts                     # Zustand store for collapse & drawer state
├── components/admin/layout/
│   ├── admin-sidebar.tsx                     # Collapsible branded sidebar (w-64 ⇄ w-20)
│   ├── admin-header.tsx                      # Top navigation with live audit pill & user chip
│   └── admin-mobile-nav.tsx                  # Responsive mobile drawer
└── app/admin/
    ├── layout.tsx                            # Root admin layout with route isolation
    └── login/page.tsx                        # High-security administrative login portal
```

---

## 4. Verification & Testing Checklist

- [x] Navigating to `/admin/login` renders clean, centered view without sidebar or header.
- [x] Clicking "Autofill Board Chair" populates email, password, and 2FA token.
- [x] Submitting login navigates to `/admin/dashboard`.
- [x] On desktop, clicking sidebar collapse toggle shrinks sidebar from `w-64` to `w-20` and hides labels gracefully.
- [x] On mobile/tablet, clicking hamburger menu opens slide-over navigation drawer.
- [x] Notification bell renders live Governance Activity Feed stream.
- [x] Passed TypeScript compilation check (`npx tsc --noEmit`) with 0 errors.
