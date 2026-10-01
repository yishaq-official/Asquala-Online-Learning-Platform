# 📖 Student Portal — Course Syllabus & Learning Hub Plan

> **File**: `docs/plan/student-interface/06-course-syllabus-resources.md`  
> **Target Route**: `/student/courses/[slug]` via `app/student/courses/[slug]/page.tsx`  
> **Master Overview**: [00-overview.md](file:///home/eaglex/Documents/officials/Asquala-online-learning-platform/docs/plan/student-interface/00-overview.md)

---

## 🎯 Objectives & Scope

The **Course Syllabus & Learning Hub** is the central dashboard for an enrolled course. Before entering the full-screen classroom player, students use this hub to:
1. **Track Full Course Progress**: View completed modules, passed quizzes, and remaining certificate requirements.
2. **Access Curriculum**: Drill down into modules and jump to any specific lesson or quiz.
3. **Download Course Materials**: Access downloadable cheatsheets, project starter files, slides, and code repositories.
4. **Read Instructor Announcements**: Stay informed of curriculum updates, live Q&A schedules, and assignment tips.

---

## 📐 Layout Wireframe

```text
┌─────────────────────────────────────────────────────────────────────────────┐
│ 📚 Courses > Next.js 16 Full-Stack Mastery                                  │ Breadcrumbs
├─────────────────────────────────────────────────────────────────────────────┤
│ 🚀 Next.js 16 Full-Stack Mastery with Drizzle & Better-Auth                 │
│ Instructor: Yishaq Abreham • Enrolled Sept 18, 2026                         │
│ [██████████████████░░░░] 68% Completed (16 of 24 lessons completed)         │
│                                                   [ 🚀 Continue: Lesson 17] │
├──────────────────────────────────────────────────────┬──────────────────────┤
│ [ Syllabus & Modules ]  [ Resources (12) ]  [ Notices]│ ┌──────────────────┐ │
├──────────────────────────────────────────────────────┤ │ 🏆 Certificate   │ │
│ 📚 MODULES & LESSONS                                 │ │    Requirement   │ │
│ ┌──────────────────────────────────────────────────┐ │ │ 8 lessons left to│ │
│ │ ▼ Module 1: Foundations & PostgreSQL Setup (4/4) │ │ │ unlock verified  │ │
│ │   ├─ ✅ 1.1 Welcome & Orientation (04:20) [Rewatch│ │ │ certificate.     │ │
│ │   ├─ ✅ 1.2 Docker Containers Setup (12:15)      │ │ ├──────────────────┤ │
│ │   ├─ ✅ 1.3 Next.js 16 Setup (10:45)             │ │ │ 📊 Quick Stats   │ │
│ │   └─ ✅ 1.4 Module 1 Quiz (Passed: 100%)         │ │ │ • 8.5 hrs learned│ │
│ ├──────────────────────────────────────────────────┤ │ │ • 3 quizzes pass │ │
│ │ ▼ Module 2: Authentication & RBAC (3/4)          │ │ │ • 12 downloads   │ │
│ │   ├─ ✅ 2.1 Better-Auth Architecture             │ │ └──────────────────┘ │
│ │   ├─ 🟢 2.2 Role-Based Permissions (Next) [Start]│ │                      │
│ │   └─ ⚪ 2.3 Module 2 Assessment (Locked)         │ │                      │
│ └──────────────────────────────────────────────────┘ │                      │
└──────────────────────────────────────────────────────┴──────────────────────┘
```

---

## 🗂️ Proposed File Locations

```text
asquala-online-school/
├── app/
│   └── student/
│       └── courses/
│           └── [slug]/
│               ├── page.tsx                           # Course syllabus & hub page
│               └── loading.tsx                        # Course hub skeleton loader
├── components/
│   └── student/
│       └── course-hub/
│           ├── course-hub-header.tsx                  # Title, overall progress bar, resume button
│           ├── course-syllabus-accordion.tsx          # Modules list with completion icons
│           ├── course-resources-list.tsx              # Downloadable files and repo links
│           ├── course-announcements-feed.tsx          # Instructor announcements and notices
│           └── course-certificate-tracker.tsx         # Sidebar card tracking certificate unlock
└── types/
    └── student.ts                                     # EnrolledCourseDetail, ModuleWithProgress
```

---

## 🧩 Component Breakdown & Props

### 1. `CourseHubHeader` (`components/student/course-hub/course-hub-header.tsx`)
- Displays course title, instructor, and enrollment date.
- Visual emerald progress bar (`68% completed • 16 of 24 lessons completed`).
- Large CTA button: "Continue Learning" pointing directly to the current lesson (`/student/courses/[slug]/lessons/[lessonId]`).

### 2. `CourseSyllabusAccordion` (`components/student/course-hub/course-syllabus-accordion.tsx`)
- Expandable modules with completion counters (e.g. `4/4 completed`, `3/5 completed`).
- Each lesson row displays:
  - Status Icon:
    - ✅ Completed: Emerald check circle (`CheckCircle2 text-primary`)
    - 🟢 Current/Next: Emerald pulsing dot (`CircleDot text-primary`)
    - ⚪ Incomplete: Slate outline circle (`Circle text-muted-foreground`)
  - Lesson Title & format badge (Video vs. Text/Reading vs. Quiz).
  - Duration (e.g., `12:45`).
  - Action button: "Watch", "Rewatch", or "Take Quiz".

### 3. `CourseResourcesList` (`components/student/course-hub/course-resources-list.tsx`)
- List of downloadable assets:
  - Starter repository link (GitHub icon).
  - Lecture slide PDFs (FileText icon).
  - Cheat sheets and database schemas (Database icon).
  - Direct download button with file size indicator (e.g., `PDF • 2.4 MB`).

### 4. `CourseCertificateTracker` (`components/student/course-hub/course-certificate-tracker.tsx`)
- Motivational widget in the sidebar showing distance to certificate:
  - If < 100%: "Complete 8 more lessons to unlock your verified credential."
  - If 100%: Emerald celebration banner: "Certificate Unlocked! [View & Download]".

---

## 🎨 Design System & Styling Rules

| Element | Style / CSS Variables |
|---|---|
| Hub Header Container | `bg-card border border-border rounded-xl p-6 shadow-sm` |
| Progress Indicator | `h-2.5 rounded-full bg-primary transition-all` |
| Module Accordion Trigger | `bg-card hover:bg-secondary/70 border border-border p-4 rounded-lg flex items-center justify-between` |
| Completed Lesson Item | `bg-card/50 text-foreground hover:bg-secondary/40 py-3 px-4 rounded-md border border-border/50` |
| Current Lesson Item | `bg-primary-light/40 text-foreground border border-primary-border py-3 px-4 rounded-md font-medium` |
| Resource Item Card | `bg-card border border-border hover:border-primary-border rounded-lg p-4 flex items-center justify-between` |

---

## 🧪 Implementation & Verification Steps

- [ ] **Step 1**: Define `EnrolledCourseDetail` and `ModuleWithProgress` in `types/student.ts`.
- [ ] **Step 2**: Add mock module syllabus data with lesson progress states.
- [ ] **Step 3**: Implement `CourseHubHeader` with animated progress percentage.
- [ ] **Step 4**: Build `CourseSyllabusAccordion` with status icons and collapsible modules.
- [ ] **Step 5**: Build `CourseResourcesList` with working file simulation links.
- [ ] **Step 6**: Verify tab navigation between Syllabus, Resources, and Announcements.
