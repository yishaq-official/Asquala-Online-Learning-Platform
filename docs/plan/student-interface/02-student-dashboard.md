# 📊 Student Portal — Dashboard Plan

> **File**: `docs/plan/student-interface/02-student-dashboard.md`  
> **Target Route**: `/student/dashboard` via `app/student/dashboard/page.tsx`  
> **Master Overview**: [00-overview.md](file:///home/eaglex/Documents/officials/Asquala-online-learning-platform/docs/plan/student-interface/00-overview.md)

---

## 🎯 Objectives & Scope

The **Student Dashboard** is the daily home base where learners resume their education with zero friction. Key goals:
1. **Instant Resumption**: Jump immediately back into the last active lesson with a single click.
2. **Progress Transparency**: Clear metrics on learning hours, active courses, streak, and completion rate.
3. **Accountability**: Visual upcoming deadlines (quizzes, module milestones, live Q&As).
4. **Course Overview**: Quick access to in-progress courses without needing to navigate to the full library.

---

## 📐 Layout Wireframe

```text
┌─────────────────────────────────────────────────────────────────────────────┐
│ 👋 Welcome back, Alex!  🔥 5-Day Learning Streak                           │
│ "Consistency is the key to mastery. You have 2 lessons left in React 19."   │
├─────────────────────────────────────────────────────────────────────────────┤
│ ┌─────────────────────────────────────────────────────────────────────────┐ │
│ │ 🎯 JUMP BACK IN                                                         │ │
│ │ Next.js 16 Full-Stack Mastery                                           │ │
│ │ Current Lesson: Module 3 • Lesson 4: Server Actions & Drizzle Mutations │ │
│ │ [██████████████████░░░░] 68% Completed (12 min left)                    │ │
│ │                                               [ 🚀 Continue Learning ]  │ │
│ └─────────────────────────────────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────────────────────────────────┤
│ ┌───────────────┐ ┌───────────────┐ ┌───────────────┐ ┌───────────────────┐ │
│ │ 📚 3 Enrolled │ │ ⏱️ 28.5 Hours │ │ 🔥 5 Day Streak│ │ 🏆 4 Certificates│ │ Stats
│ └───────────────┘ └───────────────┘ └───────────────┘ └───────────────────┘ │
├──────────────────────────────────────────────────────┬──────────────────────┤
│ 📚 IN-PROGRESS COURSES                               │ ⏰ UPCOMING DUE DATES│
│ ┌──────────────────────────────────────────────────┐ │ ┌──────────────────┐ │
│ │ Course Card 1: Advanced TypeScript (82%) [Resume]│ │ │ Quiz: React Auth │ │
│ ├──────────────────────────────────────────────────┤ │ │ Due Tomorrow     │ │
│ │ Course Card 2: UI/UX with Tailwind v4 (45%)      │ │ ├──────────────────┤ │
│ ├──────────────────────────────────────────────────┤ │ │ Module 4 Project │ │
│ │ Course Card 3: PostgreSQL Database Design (20%)  │ │ │ Due Oct 5        │ │
│ └──────────────────────────────────────────────────┘ │ └──────────────────┘ │
└──────────────────────────────────────────────────────┴──────────────────────┘
```

---

## 🗂️ Proposed File Locations

```text
asquala-online-school/
├── app/
│   └── student/
│       └── dashboard/
│           ├── page.tsx                               # Dashboard page component
│           └── loading.tsx                            # Dashboard skeleton loader
├── components/
│   └── student/
│       └── dashboard/
│           ├── jump-back-in-card.tsx                  # Large hero resumption card
│           ├── student-stat-card.tsx                  # Reusable metric card (4-col grid)
│           ├── enrolled-preview-list.tsx              # Active courses list with progress bars
│           ├── upcoming-deadlines-card.tsx            # Deadlines & scheduled assessments
│           └── weekly-goal-widget.tsx                 # Weekly study time progress bar
└── types/
    └── student.ts                                     # Dashboard data interfaces
```

---

## 🧩 Component Breakdown & Props

### 1. `JumpBackInCard` (`components/student/dashboard/jump-back-in-card.tsx`)
- **Props**:
  ```ts
  interface JumpBackInProps {
    courseTitle: string;
    courseSlug: string;
    moduleTitle: string;
    lessonTitle: string;
    lessonId: string;
    progressPercentage: number;
    durationMinutesRemaining: number;
    thumbnailUrl?: string;
  }
  ```
- **Styling**: Gradient border highlight (`border-primary-border bg-card shadow-sm hover:shadow-md transition-shadow`).
- **Action**: Primary Emerald button with `PlayCircle` icon routing to `/student/courses/[slug]/lessons/[lessonId]`.

### 2. `StudentStatCard` (`components/student/dashboard/student-stat-card.tsx`)
- **Props**:
  ```ts
  interface StudentStatProps {
    label: string;
    value: string | number;
    subtext?: string;
    icon: LucideIcon;
    trend?: { positive: boolean; text: string };
  }
  ```
- **Metrics Displayed**:
  - Active Courses (BookOpen icon, Emerald tint)
  - Total Hours Learned (Clock icon, Slate tint)
  - Current Streak (Flame icon, Amber tint)
  - Certificates Earned (Award icon, Emerald tint)

### 3. `EnrolledPreviewList` (`components/student/dashboard/enrolled-preview-list.tsx`)
- Displays top 3 most recently accessed courses.
- Shows thumbnail, instructor name, overall completion percentage with emerald progress bar (`h-2 rounded-full bg-primary`), and a "Resume" button.
- "View All Courses" link pointing to `/student/courses`.

### 4. `UpcomingDeadlinesCard` (`components/student/dashboard/upcoming-deadlines-card.tsx`)
- Lists pending quizzes, assignments, and milestones ordered by due date.
- Badges: "Due Today" (rose/destructive badge), "Due Tomorrow" (amber/warning badge), "Upcoming" (slate badge).
- Direct link to start quiz or view assignment.

---

## 🎨 Design System & Styling Rules

| Element | Style / CSS Variables |
|---|---|
| Page Background | `bg-background text-foreground` |
| Hero Card | `bg-card border border-primary-border/60 shadow-sm rounded-xl p-6` |
| Progress Bar Fill | `bg-primary transition-all duration-500 rounded-full` |
| Progress Bar Track| `bg-secondary rounded-full overflow-hidden` |
| Stat Card Accent | `p-3 rounded-lg bg-primary-light text-primary` |
| Due Date Alert | `bg-warning-light text-warning-foreground border border-warning/30` |

---

## 🧪 Implementation & Verification Steps

- [ ] **Step 1**: Define `StudentDashboardData` interface in `types/student.ts`.
- [ ] **Step 2**: Create mock dashboard fixture in `lib/mock-student-data.ts`.
- [ ] **Step 3**: Build `JumpBackInCard` with progress bar and continue CTA.
- [ ] **Step 4**: Build `StudentStatCard` 4-column responsive grid (1 col mobile, 2 col tablet, 4 col desktop).
- [ ] **Step 5**: Build `EnrolledPreviewList` and `UpcomingDeadlinesCard`.
- [ ] **Step 6**: Assemble `app/student/dashboard/page.tsx` and verify responsive layout and quick navigation.
