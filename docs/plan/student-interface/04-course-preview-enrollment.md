# 📖 Student Portal — Course Preview & Enrollment Plan

> **File**: `docs/plan/student-interface/04-course-preview-enrollment.md`  
> **Target Route**: `/student/explore/[slug]` via `app/student/explore/[slug]/page.tsx`  
> **Master Overview**: [00-overview.md](file:///home/eaglex/Documents/officials/Asquala-online-learning-platform/docs/plan/student-interface/00-overview.md)

---

## 🎯 Objectives & Scope

The **Course Preview & Enrollment** page is the decision-making landing view for students before enrolling in a course.
Key goals:
1. **Compelling Overview**: Clear learning outcomes, instructor credentials, and full syllabus breakdown.
2. **Transparent Curriculum**: Expandable module accordion detailing every lesson title, format (video vs. reading), and duration.
3. **Frictionless Enrollment**: Instant 1-click enrollment for students with optimistic confirmation modal.
4. **Already-Enrolled Detection**: If the student is already enrolled, display "You're already enrolled! [Go to Course]" instead of duplicate enrollment options.

---

## 📐 Layout Wireframe

```text
┌─────────────────────────────────────────────────────────────────────────────┐
│ 🧭 Explore > Web Development > Next.js 16 Mastery                           │ Breadcrumb
├──────────────────────────────────────────────────────┬──────────────────────┤
│ 🚀 Next.js 16 Full-Stack Mastery with Drizzle & Auth │ ┌──────────────────┐ │
│ Master modern web development with Server Actions,   │ │ [Preview Video]  │ │ Sticky
│ Drizzle ORM, better-auth, and clean Tailwind styling │ │                  │ │ Enroll Card
│ ⭐ 4.9 (1,240 reviews) • 👥 4,820 students enrolled  │ │ Free / Included  │ │
│ Created by Yishaq Abreham • Updated Oct 2026         │ │ [ Enroll Now 🚀 ]│ │
│                                                      │ │ ───────────────  │ │
│ ┌──────────────────────────────────────────────────┐ │ │ • 14.5 hrs video │ │
│ │ 🎯 What You'll Learn                             │ │ │ • 24 resources   │ │
│ │  Full-Stack Next.js 16 App Router architecture   │ │ │ • 6 Quizzes      │ │
│ │  Drizzle ORM schema design & Docker PostgreSQL   │ │ │ • Certificate    │ │
│ │  Production authentication & RBAC authorization  │ │ └──────────────────┘ │
│ └──────────────────────────────────────────────────┘ │                      │
│                                                      │                      │
│ 📚 Course Content (8 Modules • 48 Lessons • 14.5h)   │                      │
│ ┌──────────────────────────────────────────────────┐ │                      │
│ │ ▼ Module 1: Foundations & Docker Setup (4 lessons)│ │                      │
│ │   ├─ 1.1 Welcome & Course Overview      (04:20)  │ │                      │
│ │   ├─ 1.2 Local Dev & Docker Containers  (12:15)  │ │                      │
│ │   └─ 1.3 Setting Up Next.js 16          (10:45)  │ │                      │
│ │ ▶ Module 2: Database Modeling with Drizzle       │ │                      │
│ │ ▶ Module 3: Authentication & Better-Auth         │ │                      │
│ └──────────────────────────────────────────────────┘ │                      │
│                                                      │                      │
│ 👨‍🏫 Instructor: Yishaq Abreham                        │                      │
│ Senior Full-Stack Engineer & Lead Curriculum Creator │                      │
└──────────────────────────────────────────────────────┴──────────────────────┘
```

---

## 🗂️ Proposed File Locations

```text
asquala-online-school/
├── app/
│   └── student/
│       └── explore/
│           └── [slug]/
│               ├── page.tsx                           # Course preview page
│               └── loading.tsx                        # Course preview skeleton loader
├── components/
│   └── student/
│       └── course-preview/
│           ├── course-preview-hero.tsx                # Title, ratings, metadata header
│           ├── what-you-will-learn.tsx                # 2-column checklist with checkmarks
│           ├── course-curriculum-preview.tsx          # Read-only collapsible module accordion
│           ├── instructor-profile-card.tsx            # Instructor bio, avatar, and stats
│           ├── enrollment-sticky-card.tsx             # Desktop sticky / mobile bottom enroll bar
│           └── enrollment-success-modal.tsx           # Celebratory dialog redirecting to syllabus
└── types/
    └── student.ts                                     # CourseDetail, ModulePreview, LessonPreview
```

---

## 🧩 Component Breakdown & Props

### 1. `CoursePreviewHero` (`components/student/course-preview/course-preview-hero.tsx`)
- Breadcrumbs navigating back to `/student/explore`.
- Large `h1` course title, descriptive subtitle.
- Meta chips: Star rating with review count, total enrolled students, difficulty badge, language, last updated timestamp.

### 2. `WhatYouWillLearn` (`components/student/course-preview/what-you-will-learn.tsx`)
- **Props**: `outcomes: string[]`.
- Card container with `border border-primary-border/60 bg-primary-light/30 rounded-xl p-6`.
- 2-column grid of outcomes with emerald checkmark icons (`CheckCircle2`).

### 3. `CourseCurriculumPreview` (`components/student/course-preview/course-curriculum-preview.tsx`)
- Header displaying total modules, total lessons, and total runtime.
- Expandable accordion items (`Module 1`, `Module 2`...):
  - Each lesson row lists title, lesson type icon (`Video` or `FileText`), duration, and optional "Preview" badge.
  - "Expand All" / "Collapse All" toggle control.

### 4. `EnrollmentStickyCard` (`components/student/course-preview/enrollment-sticky-card.tsx`)
- **Props**: `course: CourseDetail; isEnrolled: boolean`.
- Sticky positioning (`sticky top-20`).
- If `isEnrolled: false`:
  - Highlights course inclusions (video hours, quizzes, certificate, lifetime access).
  - Primary button: "Enroll in Course" with loading spinner during submission.
- If `isEnrolled: true`:
  - Displays "You are enrolled in this course".
  - Button: "Go to Classroom" linking to `/student/courses/[slug]`.

### 5. `EnrollmentSuccessModal` (`components/student/course-preview/enrollment-success-modal.tsx`)
- Celebratory modal with confetti / emerald badge when student enrolls.
- Action: "Start First Lesson Now" navigating to `/student/courses/[slug]`.

---

## 🎨 Design System & Styling Rules

| Element | Style / CSS Variables |
|---|---|
| Learning Outcomes Card | `bg-primary-light/20 border border-primary-border/50 rounded-xl p-6` |
| Checkmark Icon | `text-primary w-5 h-5 flex-shrink-0 mt-0.5` |
| Accordion Header | `bg-card hover:bg-secondary/60 border border-border p-4 rounded-lg cursor-pointer transition-colors` |
| Lesson Row | `py-2.5 px-4 flex items-center justify-between text-sm border-b border-border/50 last:border-b-0` |
| Sticky Enroll Card | `bg-card border border-border shadow-lg rounded-xl p-6 sticky top-20` |

---

## 🧪 Implementation & Verification Steps

- [ ] **Step 1**: Add `CourseDetail` and `ModulePreview` schemas to `types/student.ts`.
- [ ] **Step 2**: Add mock detailed course payload in `lib/mock-student-data.ts`.
- [ ] **Step 3**: Build `CoursePreviewHero` and `WhatYouWillLearn`.
- [ ] **Step 4**: Build `CourseCurriculumPreview` with collapsible accordion state.
- [ ] **Step 5**: Build `EnrollmentStickyCard` with enrollment action handling.
- [ ] **Step 6**: Test enrollment flow: clicking "Enroll Now" toggles enrolled state and displays celebratory redirect modal.
