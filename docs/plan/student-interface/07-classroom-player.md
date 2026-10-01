# 🎥 Student Portal — Classroom Lesson Player Plan

> **File**: `docs/plan/student-interface/07-classroom-player.md`  
> **Target Route**: `/student/courses/[slug]/lessons/[lessonId]` via `app/student/courses/[slug]/lessons/[lessonId]/page.tsx`  
> **Master Overview**: [00-overview.md](file:///home/eaglex/Documents/officials/Asquala-online-learning-platform/docs/plan/student-interface/00-overview.md)

---

## 🎯 Objectives & Scope

The **Classroom Lesson Player** is the core interactive environment where students consume educational content.
Key goals:
1. **Focus & Immersion**: Distraction-free layout with optional theater mode and collapsible syllabus drawer.
2. **Multi-Format Support**: High-performance video player wrapper and rich-text reading view for text-based lessons.
3. **Effortless Traversal**: Previous / Next lesson controls and immediate "Mark as Complete" button updating the student's progress.
4. **Active Learning Utilities**: Dedicated tabs for Lesson Overview, Discussion / Q&A, and auto-saved Personal Notes.
5. **Always-Accessible Curriculum**: Side drawer allowing instant jumps to any lesson without losing playback context.

---

## 📐 Layout Wireframe

```text
┌─────────────────────────────────────────────────────────────────────────────┐
│ [← Back to Course Hub]  Next.js 16 Mastery • Lesson 3.2: Drizzle ORM Setup │ Top Bar
│ Progress: [██████████████░░░░] 68%          [ ☰ Course Syllabus (Toggle) ] │
├──────────────────────────────────────────────────────┬──────────────────────┤
│ ┌──────────────────────────────────────────────────┐ │ 📚 COURSE CURRICULUM │
│ │                                                  │ │ (Collapsible Drawer) │
│ │                                                  │ │                      │
│ │               VIDEO PLAYER FRAME                 │ │ ▼ Module 1 (Done)    │
│ │             (16:9 Aspect Ratio / HD)             │ │   ├─ ✅ 1.1 Intro    │
│ │                                                  │ │   └─ ✅ 1.2 Docker   │
│ │                                                  │ │                      │
│ └──────────────────────────────────────────────────┘ │ ▼ Module 2 (Active)  │
│ ┌──────────────────────────────────────────────────┐ │   ├─ ✅ 2.1 Schema   │
│ │ [◀ Previous Lesson]  [ ✅ Mark Complete ] [Next ▶]│ │   ├─ 🟢 2.2 Drizzle  │
│ └──────────────────────────────────────────────────┘ │   └─ ⚪ 2.3 Auth     │
├──────────────────────────────────────────────────────┤                      │
│ [ Overview ]  [ Q&A & Discussion (8) ]  [ My Notes ] │                      │
├──────────────────────────────────────────────────────┤                      │
│ 📝 LESSON OVERVIEW                                   │                      │
│ In this lesson, we configure the Drizzle ORM client  │                      │
│ singleton, set up Docker PostgreSQL connection pool, │                      │
│ and generate our initial migration files.            │                      │
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
│               └── lessons/
│                   └── [lessonId]/
│                       ├── page.tsx                   # Classroom player page
│                       └── loading.tsx                # Player skeleton loader
├── components/
│   └── student/
│       └── classroom/
│           ├── lesson-player-frame.tsx                # Video / rich text container
│           ├── lesson-curriculum-drawer.tsx           # Collapsible side drawer with module list
│           ├── lesson-control-bar.tsx                 # Previous, Next, and Complete toggles
│           ├── lesson-tabs.tsx                        # Overview, Q&A, and Notes tab controller
│           ├── lesson-notes-editor.tsx                # LocalStorage auto-saved notes pad
│           └── lesson-qa-forum.tsx                    # Questions thread with reply form
└── stores/
    └── course-progress-store.ts                       # Optimistic lesson completion store
```

---

## 🧩 Component Breakdown & Props

### 1. `LessonPlayerFrame` (`components/student/classroom/lesson-player-frame.tsx`)
- **Props**:
  ```ts
  interface LessonPlayerFrameProps {
    type: "video" | "reading";
    videoUrl?: string;
    readingContent?: string;
    title: string;
    durationMinutes: number;
    onEnded?: () => void;
  }
  ```
- **Video Mode**: 16:9 responsive frame, playback speed toggles (1x, 1.25x, 1.5x, 2x), theater mode expander.
- **Reading Mode**: Clean typography container (`prose prose-slate max-w-none`) with syntax-highlighted code snippets.

### 2. `LessonControlBar` (`components/student/classroom/lesson-control-bar.tsx`)
- **Buttons**:
  - `Previous Lesson`: Disabled on first lesson; navigates to `prevLessonId`.
  - `Mark as Complete`:
    - Incomplete state: Outlined emerald button with `CheckCircle` icon ("Mark as Complete").
    - Completed state: Filled emerald button ("Completed ✅").
  - `Next Lesson`: Primary button navigating to `nextLessonId` or next quiz.

### 3. `LessonCurriculumDrawer` (`components/student/classroom/lesson-curriculum-drawer.tsx`)
- Sidebar or slide-over drawer displaying all modules and lessons.
- Active lesson highlighted with `bg-primary-light text-primary font-medium`.
- Toggle button in header allows hiding the drawer to maximize video size.

### 4. `LessonNotesEditor` (`components/student/classroom/lesson-notes-editor.tsx`)
- Private student scratchpad automatically saved per lesson in browser `localStorage`.
- Includes "Copy Notes" and "Export as Markdown" buttons.

### 5. `LessonQaForum` (`components/student/classroom/lesson-qa-forum.tsx`)
- List of questions asked by other students on this specific lesson.
- Form to submit a new question with instant optimistic submission.

---

## 🎨 Design System & Styling Rules

| Element | Style / CSS Variables |
|---|---|
| Player Wrapper | `bg-slate-950 rounded-xl overflow-hidden shadow-lg border border-border` |
| Control Bar Surface | `bg-card border border-border p-4 rounded-xl flex items-center justify-between` |
| Mark Complete Button | `border border-primary text-primary hover:bg-primary hover:text-white transition-colors px-4 py-2 rounded-lg font-medium` |
| Completed State Button | `bg-primary text-white px-4 py-2 rounded-lg font-medium inline-flex items-center gap-2` |
| Active Lesson in Drawer | `bg-primary-light text-primary border-l-4 border-primary font-medium py-2.5 px-3` |
| Inactive Lesson in Drawer| `hover:bg-secondary text-muted-foreground hover:text-foreground py-2.5 px-3 transition-colors` |

---

## 🧪 Implementation & Verification Steps

- [ ] **Step 1**: Define `LessonDetail` and `LessonNote` in `types/student.ts`.
- [ ] **Step 2**: Create `stores/course-progress-store.ts` for optimistic completion status.
- [ ] **Step 3**: Implement `LessonPlayerFrame` with video and reading switch.
- [ ] **Step 4**: Build `LessonControlBar` with Previous/Next routing and completion toggle.
- [ ] **Step 5**: Build `LessonCurriculumDrawer` with collapsible animation and current lesson indicator.
- [ ] **Step 6**: Build `LessonTabs` with `LessonNotesEditor` (persisting to localStorage).
- [ ] **Step 7**: Verify navigation between lessons, theater mode toggle, and responsive mobile behavior.
