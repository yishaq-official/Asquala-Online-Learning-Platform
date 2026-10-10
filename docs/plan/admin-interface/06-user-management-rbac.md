# 👥 Phase 6 Plan: User Directory & Access Control (RBAC)

> **File**: `docs/plan/admin-interface/06-user-management-rbac.md`  
> **Target Route**: `/admin/users`  
> **Master Overview**: [00-overview.md](file:///home/eaglex/Documents/officials/Asquala-online-learning-platform/docs/plan/admin-interface/00-overview.md)  
> **Status**: SPECIFIED & PLANNED  

---

## 1. Objectives & Scope

1. **Platform User Directory (`UserDirectoryTable`)**:
   - Comprehensive account management covering **Students**, **Instructors**, **Academic Auditors**, and **Super Admins**.
   - Role badge differentiation with explicit "Accredited" pill for teachers who passed the degree verification audit.
   - Filter tabs: *All Accounts*, *Students*, *Teachers*, *Admins*.
   - Live search input filtering by user name or institutional email.

2. **Account Status & Governance Actions**:
   - Active account states: `active`, `suspended`, `pending_verification`.
   - Security actions: One-click "Suspend" / "Reactivate" toggle to freeze bad actors or restore accounts.
   - User activity metrics: Enrolled courses for students, authored courses for instructors.

---

## 2. Layout Wireframes

```text
┌─────────────────────────────────────────────────────────────────────────────┐
│ ‹ Back to Dashboard   •   User Directory                                    │
│ User Directory & Access Control              [ 8,940 Total Accounts ]       │
│ Manage student registrations, accredited teachers, and board administrators │
├─────────────────────────────────────────────────────────────────────────────┤
│ 📋 REGISTERED ACCOUNTS TABLE                                                │
│ [ Search by user name or email...   ]  [ All ] [ Students ] [ Teachers ] [Admins]│
│ ─────────────────────────────────────────────────────────────────────────── │
│ User Identity      Role & Badges    Status    Activity Metric    Action     │
│ ─────────────────────────────────────────────────────────────────────────── │
│ Abel Tesfaye       Student          Active    3 Enrolled Courses [ Suspend ]│
│ Yishaq Abreham     Instructor [Acc] Active    2 Authored Courses [ Suspend ]│
│ Dr. Meron Tesfaye  Instructor [Acc] Active    3 Authored Courses [ Suspend ]│
│ Dr. Alazar Tadesse Admin            Active    Board Governance   [ Suspend ]│
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 3. Component Hierarchy & Deliverables

```text
asquala-online-school/
├── components/admin/users/
│   └── user-directory-table.tsx              # Interactive table with search, role tabs & status toggle
└── app/admin/users/
    └── page.tsx                              # User directory page root
```

---

## 4. Verification Checklist

- [ ] Role filter tabs cleanly isolate students, instructors, and administrators.
- [ ] Accredited instructors display the "Accredited" verification pill.
- [ ] Clicking "Suspend" immediately flips user status to `Suspended` and changes button to `Reactivate`.
- [ ] Clicking "Reactivate" restores account to `Active`.
