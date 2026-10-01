# 🎓 Asquala — Student Interface Master Plan & Architecture

> **Scope**: Comprehensive architecture, route hierarchy, component structure, and implementation roadmap for the **Student Learning Portal** on Asquala. Built with **Next.js 16 App Router**, **TypeScript**, **Drizzle ORM**, **better-auth**, **Zustand**, and **Tailwind CSS v4** adhering strictly to the **Emerald Green Light Mode** design system.

---

## 🏛️ System Architecture & Route Hierarchy

The student interface provides an intuitive, focused, and distraction-free learning environment. It is isolated under the `/student` route group with a unified persistent layout shell.

```text
/student
├── layout.tsx                               ── Persistent Shell (Sidebar, Header, Mobile Drawer)
├── dashboard/page.tsx                       ── Student Hub (Jump Back In, Stats, Enrolled Quick View, Deadlines)
├── explore/
│   ├── page.tsx                             ── Course Discovery & Catalog (Search, Filter, Category Chips)
│   └── [slug]/page.tsx                      ── Course Preview & Enrollment Landing (Syllabus, Instructor, 1-Click Enroll)
├── courses/
│   ├── page.tsx                             ── My Courses Library (In-Progress, Completed, Bookmarked)
│   └── [slug]/
│       ├── page.tsx                         ── Course Syllabus & Learning Hub (Modules, Assets, Announcements)
│       ├── lessons/[lessonId]/page.tsx      ── Classroom Lesson Player (Video/Reading, Q&A, Notes, Drawer)
│       └── quizzes/[quizId]/page.tsx        ── Quiz & Assessment Runner (Timer, Question Flow, Results)
├── certificates/page.tsx                    ── Certificates & Credentials (Earned Badges, Verification, PDF View)
└── settings/page.tsx                        ── Student Profile & Preferences (Goals, Notifications, Account)
```

---

## 📂 Proposed Folder & File Structure

```text
asquala-online-school/
├── app/
│   └── student/
│       ├── layout.tsx                                 # Persistent Student Shell
│       ├── loading.tsx                                # Shared skeleton state
│       ├── dashboard/
│       │   └── page.tsx                               # Student Dashboard
│       ├── explore/
│       │   ├── page.tsx                               # Course Catalog & Discovery
│       │   └── [slug]/
│       │       └── page.tsx                           # Course Preview & Enrollment Page
│       ├── courses/
│       │   ├── page.tsx                               # Enrolled Courses Library
│       │   └── [slug]/
│       │       ├── page.tsx                           # Course Syllabus & Resource Hub
│       │       ├── lessons/
│       │       │   └── [lessonId]/
│       │       │       └── page.tsx                   # Classroom Lesson Player
│       │       └── quizzes/
│       │           └── [quizId]/
│       │               └── page.tsx                   # Interactive Quiz Runner
│       ├── certificates/
│       │   └── page.tsx                               # Verified Certificates Hub
│       └── settings/
│           └── page.tsx                               # Student Profile & Settings
├── components/
│   └── student/
│       ├── layout/
│       │   ├── student-sidebar.tsx                    # Desktop collapsible sidebar
│       │   ├── student-header.tsx                     # Topbar with streak, search, notifications
│       │   ├── student-mobile-nav.tsx                 # Mobile drawer navigation
│       │   └── student-user-dropdown.tsx              # Quick user avatar & sign out menu
│       ├── dashboard/
│       │   ├── jump-back-in-card.tsx                  # Hero card for last-watched lesson
│       │   ├── student-stat-card.tsx                  # Learning metrics (hours, streak, completed)
│       │   ├── enrolled-preview-list.tsx              # Horizontal / grid list of active courses
│       │   └── upcoming-deadlines-card.tsx            # Quizzes and milestones calendar
│       ├── explore/
│       │   ├── course-catalog-card.tsx                # Course discovery card with price/level/rating
│       │   ├── course-filter-bar.tsx                  # Category pills, difficulty, duration filters
│       │   ├── course-search-input.tsx                # Debounced course search input
│       │   └── course-sort-dropdown.tsx               # Sort by Popular, Highest Rated, Newest
│       ├── course-preview/
│       │   ├── course-preview-hero.tsx                # Course title, level, rating, enroll action
│       │   ├── what-you-will-learn.tsx                # Learning outcomes bullet checklist
│       │   ├── course-curriculum-preview.tsx          # Read-only accordion of modules & lessons
│       │   ├── instructor-card.tsx                    # Teacher bio, credentials, and courses
│       │   └── enrollment-sticky-bar.tsx              # Sticky desktop/mobile enroll action card
│       ├── my-courses/
│       │   ├── course-progress-card.tsx               # Enrolled course card with progress bar
│       │   └── course-library-tabs.tsx                # "In Progress", "Completed", "Archived" tabs
│       ├── course-hub/
│       │   ├── course-syllabus-accordion.tsx          # Interactive module/lesson listing with checkmarks
│       │   ├── course-resources-list.tsx              # Downloadable PDFs, slides, project files
│       │   └── course-announcements-tab.tsx           # Instructor updates and announcements
│       ├── classroom/
│       │   ├── lesson-player-frame.tsx                # Responsive video player / rich text reader
│       │   ├── lesson-curriculum-drawer.tsx           # Side panel for navigation between lessons
│       │   ├── lesson-control-bar.tsx                 # Prev / Next / Mark Complete buttons
│       │   ├── lesson-tabs.tsx                        # Overview, Q&A / Discussion, Personal Notes
│       │   └── lesson-notes-editor.tsx                # Personal student notes scratchpad
│       ├── quiz/
│       │   ├── quiz-header.tsx                        # Quiz title, question indicator, countdown timer
│       │   ├── question-card.tsx                      # Multiple choice question with option selectors
│       │   ├── quiz-progress-dots.tsx                 # Question jumping navigation dots
│       │   └── quiz-result-breakdown.tsx              # Score percentage, passing badge, retry CTA
│       ├── certificates/
│       │   ├── certificate-grid-card.tsx              # Certificate visual card with verified ID
│       │   ├── certificate-preview-modal.tsx          # Full-size printable / shareable certificate
│       │   └── certificate-share-popover.tsx          # Copy verification URL, LinkedIn share
│       └── settings/
│           ├── profile-form.tsx                       # Full name, bio, target skills, avatar
│           ├── learning-preferences-form.tsx          # Weekly study goal, reminder days
│           └── account-security-form.tsx              # Change password, active sessions
├── types/
│   └── student.ts                                     # Shared interfaces (Course, Lesson, Progress, Quiz)
├── stores/
│   ├── student-ui-store.ts                            # Sidebar state, player theater mode, active notes
│   └── course-progress-store.ts                       # Optimistic lesson completion & streak tracking
└── lib/
    └── mock-student-data.ts                           # Comprehensive seed & mock fixtures for UI dev
```

---

## 🗺️ Master Pages Specification Matrix

| # | Page / Feature | Route Path | Core Functionality | Primary Components | Detailed Plan File |
|---|----------------|------------|-------------------|--------------------|-------------------|
| **01** | **Student Shell & Layout** | `/student/*` | Persistent sidebar, top search, streak counter, user dropdown, mobile drawer | `StudentSidebar`, `StudentHeader`, `StudentMobileNav`, `StudentUserDropdown` | [01-layout-shell.md](file:///home/eaglex/Documents/officials/Asquala-online-learning-platform/docs/plan/student-interface/01-layout-shell.md) |
| **02** | **Student Dashboard** | `/student/dashboard` | Last-active lesson resumption card, weekly streak tracker, learning hours stats, upcoming quizzes | `JumpBackInCard`, `StudentStatCard`, `EnrolledPreviewList`, `UpcomingDeadlinesCard` | [02-student-dashboard.md](file:///home/eaglex/Documents/officials/Asquala-online-learning-platform/docs/plan/student-interface/02-student-dashboard.md) |
| **03** | **Course Catalog & Explore** | `/student/explore` | Course discovery grid, category pills, level/rating filters, debounced live search | `CourseCatalogCard`, `CourseFilterBar`, `CourseSearchInput`, `CourseSortDropdown` | [03-course-explore.md](file:///home/eaglex/Documents/officials/Asquala-online-learning-platform/docs/plan/student-interface/03-course-explore.md) |
| **04** | **Course Preview & Enrollment** | `/student/explore/[slug]` | Course landing, learning outcomes checklist, instructor bio, syllabus preview, 1-click enroll | `CoursePreviewHero`, `WhatYouWillLearn`, `CourseCurriculumPreview`, `EnrollmentStickyBar` | [04-course-preview-enrollment.md](file:///home/eaglex/Documents/officials/Asquala-online-learning-platform/docs/plan/student-interface/04-course-preview-enrollment.md) |
| **05** | **Enrolled Courses Library** | `/student/courses` | Tabbed course library (In-Progress, Completed), percentage progress bars, quick resume | `CourseProgressCard`, `CourseLibraryTabs`, `CourseSearchFilter` | [05-my-courses-library.md](file:///home/eaglex/Documents/officials/Asquala-online-learning-platform/docs/plan/student-interface/05-my-courses-library.md) |
| **06** | **Course Syllabus & Hub** | `/student/courses/[slug]` | Module accordion with checkmarks, downloadable lesson resources/PDFs, instructor announcements | `CourseSyllabusAccordion`, `CourseResourcesList`, `CourseAnnouncementsTab` | [06-course-syllabus-resources.md](file:///home/eaglex/Documents/officials/Asquala-online-learning-platform/docs/plan/student-interface/06-course-syllabus-resources.md) |
| **07** | **Classroom Lesson Player** | `/student/courses/[slug]/lessons/[lessonId]` | Video player / text reader, collapsible curriculum drawer, mark complete toggle, Q&A / notes tabs | `LessonPlayerFrame`, `LessonCurriculumDrawer`, `LessonControlBar`, `LessonTabs` | [07-classroom-player.md](file:///home/eaglex/Documents/officials/Asquala-online-learning-platform/docs/plan/student-interface/07-classroom-player.md) |
| **08** | **Quiz & Assessment Runner** | `/student/courses/[slug]/quizzes/[quizId]` | Multiple choice runner, question jump tracker, timer, instant score breakdown, retake CTA | `QuizHeader`, `QuestionCard`, `QuizProgressDots`, `QuizResultBreakdown` | [08-quiz-runner.md](file:///home/eaglex/Documents/officials/Asquala-online-learning-platform/docs/plan/student-interface/08-quiz-runner.md) |
| **09** | **Certificates Hub** | `/student/certificates` | Earned certificates grid, unique verification IDs, PDF preview modal, LinkedIn sharing | `CertificateGridCard`, `CertificatePreviewModal`, `CertificateSharePopover` | [09-certificates-hub.md](file:///home/eaglex/Documents/officials/Asquala-online-learning-platform/docs/plan/student-interface/09-certificates-hub.md) |
| **10** | **Profile & Student Settings** | `/student/settings` | Personal details, study goals, avatar customization, notification toggles, password update | `ProfileForm`, `LearningPreferencesForm`, `AccountSecurityForm` | [10-profile-settings.md](file:///home/eaglex/Documents/officials/Asquala-online-learning-platform/docs/plan/student-interface/10-profile-settings.md) |

---

## 🎨 Design System & Theming Tokens

All student interfaces strictly adhere to the light mode palette defined in `app/globals.css`:

```css
/* Core Palette Tokens */
--primary: #047857;          /* Forest / Deep Emerald Green */
--primary-hover: #065f46;    /* Darker Emerald on interaction */
--primary-light: #ecfdf5;    /* Soft Emerald badge/tint background */
--primary-border: #a7f3d0;   /* Light Emerald boundary ring */

--background: #f8fafc;       /* Slate-50 soft canvas */
--card: #ffffff;             /* Crisp white card surface */
--foreground: #0f172a;       /* Slate-900 high-contrast typography */

--secondary: #f1f5f9;        /* Slate-100 neutral backgrounds */
--muted-foreground: #64748b; /* Slate-500 secondary labels */
--border: #e2e8f0;           /* Slate-200 clean borders */

--warning: #d97706;          /* Amber for pending / streak fire */
--warning-light: #fffbeb;    /* Amber tint */
--destructive: #e11d48;      /* Rose for errors / reset actions */
```

### 🚫 Design Prohibitions
1. **No Generic Blue**: Primary actions, active indicators, and links use Emerald Green (`#047857`).
2. **No Dark Mode**: Development is strictly focused on a crisp, polished light mode.
3. **No Raw Hardcoded Hex**: Always reference CSS custom properties or mapped Tailwind utility tokens (`bg-primary`, `text-primary`, `border-border`, `bg-card`).
4. **Consistent Typography**: Unified `Inter` font inherited from root layout.

---

## 🔄 Data Architecture & Integration Strategy

```text
┌────────────────────────────────────────────────────────┐
│                   Phase 1: Mock Fixtures               │
│  (lib/mock-student-data.ts + types/student.ts)         │
│  Allows rapid, robust UI/UX polish with realistic data │
└──────────────────────────┬─────────────────────────────┘
                           │
                           ▼
┌────────────────────────────────────────────────────────┐
│                 Phase 2: Drizzle ORM Schema            │
│  Tables: courses, modules, lessons, enrollments,       │
│          lesson_progress, quiz_submissions             │
└──────────────────────────┬─────────────────────────────┘
                           │
                           ▼
┌────────────────────────────────────────────────────────┐
│             Phase 3: Server Actions & Better Auth      │
│  Authenticated session guards, real database mutations,│
│  automatic streak calculations & progress updates      │
└────────────────────────────────────────────────────────┘
```

---

## 🚀 Execution & Phasing Roadmap

1. **Step 1: Layout Shell & Navigation Shell** (`01-layout-shell.md`)
   - Build persistent sidebar, top header, responsive mobile drawer, and shared student shell.
2. **Step 2: Mock Data & Type Definitions**
   - Create `types/student.ts` and `lib/mock-student-data.ts` to power all views.
3. **Step 3: Student Dashboard** (`02-student-dashboard.md`)
   - Deliver the home hub with resumption cards, stats, and course quick access.
4. **Step 4: Course Discovery & Preview** (`03-course-explore.md` & `04-course-preview-enrollment.md`)
   - Enable students to find and enroll in new courses.
5. **Step 5: Enrolled Courses & Syllabus Hub** (`05-my-courses-library.md` & `06-course-syllabus-resources.md`)
   - Provide organized access to enrolled coursework and materials.
6. **Step 6: Classroom Player & Quiz Runner** (`07-classroom-player.md` & `08-quiz-runner.md`)
   - Deliver the core interactive learning experience.
7. **Step 7: Certificates & Settings** (`09-certificates-hub.md` & `10-profile-settings.md`)
   - Complete credential verification and account management.
