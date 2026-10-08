# 📊 Teacher Studio — Studio Dashboard Plan

> **File**: `docs/plan/instructor-interface/04-studio-dashboard.md`  
> **Target Route**: `/instructor/dashboard` via `app/instructor/dashboard/page.tsx`  
> **Master Overview**: [00-overview.md](file:///home/eaglex/Documents/officials/Asquala-online-learning-platform/docs/plan/instructor-interface/00-overview.md)  
> **Status**: READY FOR IMPLEMENTATION

---

## 🎯 Objectives & Scope

The **Teacher Studio Dashboard** is the command center for educators on Asquala. It provides immediate clarity on course performance, student engagement, revenue metrics, and pending actions that require instructor attention.

Key features:
1. **Financial & Growth KPIs**:
   - **Total Earnings**: Formatted in ETB (e.g. `ETB 148,600`) with monthly delta.
   - **Enrolled Students**: Active learners across all courses (e.g. `1,420`).
   - **Course Rating**: Aggregate score (e.g. `4.9 ★` across 385 reviews).
   - **Active Courses**: Breakdown of published vs. in-review and draft curricula.
2. **Action Required Highlights**:
   - **Unanswered Student Questions**: Direct alert showing student questions waiting for instructor answers.
   - **Pending Assignment Submissions**: If grading or manual review is required.
3. **Course Performance Snapshot**:
   - Mini-table or cards showing top courses by revenue, active students, and average completion rate.
4. **Recent Enrollments Stream**:
   - Real-time feed of newly joined students with timestamps and course badges.

---

## 📐 Layout Wireframe

```text
┌─────────────────────────────────────────────────────────────────────────────┐
│ 📊 Instructor Studio Dashboard                                              │
│ Welcome back, Yishaq! Here is your teaching performance overview.           │
├─────────────────────────────────────────────────────────────────────────────┤
│ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐         │
│ │ TOTAL REVENUE│ │ TOTAL STUDENTS│ │ COURSE RATING│ │ PUBLISHED    │         │
│ │ ETB 148,600  │ │ 1,420 Active │ │ 4.9 ★ (385)  │ │ 4 Published  │  KPIs   │
│ │ +18% this mo │ │ +94 this mo  │ │ 98% positive │ │ 2 Drafts     │         │
│ └──────────────┘ └──────────────┘ └──────────────┘ └──────────────┘         │
├─────────────────────────────────────────────────────────────────────────────┤
│ ┌───────────────────────────────────────────┐ ┌───────────────────────────┐ │
│ │ 📚 Top Performing Courses                 │ │ 💬 Unanswered Q&A (3)     │ │
│ │ • Next.js 16 Mastery (840 students • 4.9★)│ │ "How to configure Drizzle"│ │
│ │ • PostgreSQL Production (420 students)    │ │   by Abel T. • 2 hrs ago  │ │
│ │ • Docker for Developers (160 students)    │ │   [ Reply Now ➔ ]         │ │
│ └───────────────────────────────────────────┘ └───────────────────────────┘ │
├─────────────────────────────────────────────────────────────────────────────┤
│ ┌───────────────────────────────────────────┐ ┌───────────────────────────┐ │
│ │ 👥 Recent Student Enrollments             │ │ ⚡ Quick Actions          │ │
│ │ • Sara M. enrolled in Next.js 16 (10m ago)│ │ • [+ Create New Course]   │ │
│ │ • Dawit K. enrolled in PostgreSQL (1h ago)│ │ • [ Request Payout ]      │ │
│ └───────────────────────────────────────────┘ └───────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 🗂️ Proposed File Locations

```text
asquala-online-school/
├── app/
│   └── instructor/
│       └── dashboard/
│           ├── page.tsx                        # Studio dashboard page
│           └── loading.tsx                     # Dashboard skeleton loader
├── components/
│   └── instructor/
│       └── dashboard/
│           ├── studio-kpi-card.tsx             # Metric card (Revenue, Students, Rating)
│           ├── top-courses-overview.tsx        # Top performing courses table
│           ├── pending-qa-alert.tsx            # Unanswered student questions widget
│           ├── recent-enrollments-feed.tsx     # Student activity stream
│           └── studio-quick-actions.tsx        # Fast shortcuts card
```

---

## 🧪 Implementation & Verification Checklist

- [ ] **Step 1**: Implement `StudioKpiCard` with emerald indicators and comparative deltas.
- [ ] **Step 2**: Implement `TopCoursesOverview` listing course title, enrollment, and revenue.
- [ ] **Step 3**: Implement `PendingQaAlert` displaying unanswered forum questions.
- [ ] **Step 4**: Implement `RecentEnrollmentsFeed` with student avatars and timestamps.
- [ ] **Step 5**: Implement `StudioQuickActions` linking to course creation and payouts.
- [ ] **Step 6**: Assemble `app/instructor/dashboard/page.tsx` with responsive grid layout.
- [ ] **Step 7**: Verify zero TypeScript errors with `tsc --noEmit`.
