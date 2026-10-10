# 📖 Phase 4 Plan: Course Quality & Marketplace Publishing Audit

> **File**: `docs/plan/admin-interface/04-course-quality-audit.md`  
> **Target Routes**: `/admin/courses`, `/admin/courses/[id]`  
> **Master Overview**: [00-overview.md](file:///home/eaglex/Documents/officials/Asquala-online-learning-platform/docs/plan/admin-interface/00-overview.md)  
> **Status**: SPECIFIED & PLANNED  

---

## 1. Objectives & Scope

1. **Course Publishing Queue (`/admin/courses`)**:
   - Filter tabs: *All Submissions*, *Under Board Audit* (amber counter), *Approved & Live* (emerald badge).
   - Search bar filtering by course title, author name, or technology category.
   - Course cards displaying curriculum metrics: total modules, video lessons, hours, milestone quizzes, pass threshold, and ETB tuition.

2. **Curriculum & Financial Audit Explorer (`/admin/courses/[id]`)**:
   - **Learning Outcomes & Competencies**: Audited checklist of market-ready skills students will acquire.
   - **ETB Tuition & 85/15 Revenue Split**:
     - Listed student price (e.g. `ETB 1,800`).
     - Instructor Royalty (85% net payout, e.g. `ETB 1,530`).
     - Asquala Platform Take-Rate (15% infrastructure & processing share, e.g. `ETB 270`).
   - **Syllabus & Assessment Compliance**:
     - Video lecture content compliance (lesson count, video quality, code walkthroughs).
     - Milestone quizzes and certificate passing threshold (e.g. 80% or 85% requirement).

3. **Academic Publishing Ruling Modal (`CourseDecisionModal`)**:
   - **Approve & Publish to Student Catalog**: Makes course immediately discoverable in the public student marketplace.
   - **Request Curriculum Changes (Revision Needed)**: Transmits actionable feedback notes back to the teacher's studio (e.g. "Add code repository starter files for Module 2").
   - **Reject Course**: Disallows publication.

---

## 2. Layout Wireframes

### Course Publishing Audit View (`/admin/courses/[id]`)
```text
┌─────────────────────────────────────────────────────────────────────────────┐
│ ‹ Back to Course Audit Queue   •   Submission #crs-audit-1                  │
│ Next.js 16 & Modern Full-Stack Cloud Architecture  [ Under Board Review ]   │
│ Instructor: Yishaq Abreham • Category: Full-Stack • Tuition: ETB 1,800      │
│                                            [ 🛡️ Record Publication Ruling ] │
├─────────────────────────────────────────────────────────────────────────────┤
│ 🎯 AUDITED LEARNING OUTCOMES & COMPETENCIES                                 │
│ 1. Master Next.js 16 Server Components and Turbopack internals              │
│ 2. Architect relational schemas using Drizzle ORM and PostgreSQL            │
│ 3. Deploy scalable microservices to AWS with Docker & ECS                   │
│ 4. Implement multi-tenant RBAC and Telebirr payment webhooks                │
├─────────────────────────────────────────────────────────────────────────────┤
│ 💰 ETB TUITION PRICING & 85/15 REVENUE SPLIT                                │
│ ┌──────────────────────┬──────────────────────┬───────────────────────────┐ │
│ │ LISTED TUITION       │ INSTRUCTOR NET (85%) │ ASQUALA PLATFORM (15%)    │ │
│ │ ETB 1,800            │ ETB 1,530            │ ETB 270                   │ │
│ │ Lifetime Access      │ Direct to Wallet     │ Hosting & Payment Webhooks│ │
│ └──────────────────────┴──────────────────────┴───────────────────────────┘ │
├─────────────────────────────────────────────────────────────────────────────┤
│ 📚 CURRICULUM STRUCTURE & ASSESSMENT COMPLIANCE                             │
│ • Video Lessons: 24 Lessons (14.5 hours) ➔ Complete & HD 1080p            │
│ • Milestone Quizzes: 4 Quizzes (80% Passing Threshold) ➔ Standards Met      │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 3. Component Hierarchy & Deliverables

```text
asquala-online-school/
├── components/admin/courses/
│   ├── course-audit-table.tsx                # Course submissions queue with filter tabs
│   ├── curriculum-audit-viewer.tsx           # Outcomes, 85/15 split, and assessment compliance
│   └── course-decision-modal.tsx             # Publication ruling modal (Approve / Revise / Reject)
└── app/admin/courses/
    ├── page.tsx                              # Course queue page
    └── [id]/page.tsx                         # Single course audit inspection page
```

---

## 4. Verification Checklist

- [ ] Filter tabs correctly isolate pending courses from approved courses.
- [ ] Financial split card calculates 85% instructor net and 15% platform infrastructure cut accurately.
- [ ] Recording an "Approved" ruling updates course badge to `Approved & Live on Marketplace`.
- [ ] Recording a "Revision Requested" ruling updates badge and attaches the feedback notes.
