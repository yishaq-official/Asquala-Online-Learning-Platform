# 🎓 Asquala — Online Learning Platform Architecture

### Architecture Goal
Build Asquala as a:
> **Modular, scalable, maintainable full-stack Next.js learning platform with clear domain boundaries, clean light design aesthetics, and a phased, incremental implementation path.**

---

# 1. High-Level Architecture

Asquala is built as a **Full-Stack Next.js Modular Monolith**. Both frontend pages and backend domain logic run within the Next.js App Router application.

```text
                    ┌─────────────────────────────────┐
                    │          Asquala Web            │
                    │       Next.js App Router        │
                    │      (React 19, TypeScript)     │
                    └────────────────┬────────────────┘
                                     │
                     ┌───────────────┴───────────────┐
                     │       React Server Actions    │
                     │       & Route Handlers (API)  │
                     └───────────────┬───────────────┘
                                     │
         ┌───────────────────────────┼───────────────────────────┐
         │                           │                           │
         ▼                           ▼                           ▼
  ┌──────────────┐            ┌──────────────┐            ┌──────────────┐
  │     Auth     │            │    Users     │            │   Courses    │
  │    Module    │            │    Module    │            │    Module    │
  │(better-auth) │            │              │            │              │
  └──────────────┘            └──────────────┘            └──────────────┘
         │                           │                           │
         └───────────────────────────┼───────────────────────────┘
                                     │
                     ┌───────────────┼───────────────┐
                     │               │               │
                     ▼               ▼               ▼
              ┌────────────┐  ┌─────────────┐  ┌─────────────┐
              │ Enrollment │  │  Learning   │  │ Assessment  │
              │   Module   │  │   Module    │  │   Module    │
              └────────────┘  └─────────────┘  └─────────────┘
                                     │
                     ┌───────────────┴───────────────┐
                     │         Data Access           │
                     │     Drizzle ORM + Zod         │
                     └───────────────┬───────────────┘
                                     │
                                     ▼
                     ┌───────────────────────────────┐
                     │       PostgreSQL Database     │
                     └───────────────────────────────┘
```

### Why Full-Stack Modular Monolith?
- **Zero Overhead**: Eliminates dual-server setup, complex CORS, and distributed API latency.
- **End-to-End Type Safety**: Server actions share TypeScript types directly with client components.
- **Clean Boundaries**: All domain capabilities (Auth, Courses, Learning) live in dedicated modules rather than mixed together.

---

# 2. Main Actors & Permissions

Asquala initially recognizes four primary roles:

### 1. Student
- Browse, search, and view course catalogs.
- Enroll in free or paid courses.
- Stream lessons, track progress, mark lessons complete.
- Complete quizzes, submit assignments, view scores.
- Earn certificates and leave course reviews.

### 2. Instructor
- Create and manage courses, sections, and lessons.
- Upload course materials, draft quizzes, and assign tasks.
- Track enrolled students and view course performance metrics.
- Moderate course discussions and Q&A.

### 3. Admin
- Manage users, verify instructor accounts, and review course submissions.
- Moderate reviews, catalog categories, and platform content.
- Monitor platform analytics and enrollment volume.

### 4. Super Admin
- Platform-wide configurations, system roles, and audit access.

---

# 3. Core Domain Modules

The business capabilities are organized into modular domains:

```text
Domain Modules
├── Auth (better-auth integration, session management, RBAC)
├── Users (Student & Instructor profiles, account settings)
├── Courses (Curriculum hierarchy: Course → Section → Lesson)
├── Enrollment (Access rights, enrollment lifecycle)
├── Learning (Lesson progress, completion percentage, resume learning)
├── Assessments (Quizzes, question banks, submissions, scoring)
└── Deferred Integrations (Chapa payments, Mux video, UploadThing storage)
```

---

# 4. Project Directory Structure

The project lives under `asquala-online-school/` with a modular domain-driven layout:

```text
asquala-online-school/
│
├── app/                           # Next.js App Router (Routing & Layouts)
│   ├── (auth)/                    # Auth route group (login, register)
│   ├── (public)/                  # Public landing, catalog, course previews
│   ├── (student)/                 # Student dashboard, learning room, certificates
│   ├── (instructor)/              # Instructor studio, course builder, analytics
│   ├── (admin)/                   # Admin moderation & user management
│   ├── api/                       # REST endpoints reserved for webhooks
│   ├── layout.tsx                 # Root layout with font and theme injection
│   ├── globals.css                # Design tokens & Tailwind theme definitions
│   └── page.tsx                   # Landing page
│
├── components/                    # Reusable UI components
│   ├── ui/                        # Base primitives (shadcn-compatible)
│   ├── layout/                    # Header, Sidebar, Footer, Navigation
│   └── shared/                    # Course cards, progress bars, stat badges
│
├── modules/                       # Domain Business Logic & Server Actions
│   ├── auth/                      # Auth actions, RBAC guards
│   ├── users/                     # User services & profile queries
│   ├── courses/                   # Course CRUD, curriculum services
│   ├── learning/                  # Progress tracking & completion calculations
│   └── assessments/               # Quiz engines & score calculators
│
├── db/                            # Database Layer
│   ├── schema/                    # Drizzle schema definitions per domain
│   │   ├── auth.ts
│   │   ├── users.ts
│   │   ├── courses.ts
│   │   ├── enrollments.ts
│   │   └── assessments.ts
│   ├── index.ts                   # Drizzle client instance
│   └── migrations/                # Generated SQL migrations
│
├── lib/                           # Central configuration & third-party clients
│   ├── auth.ts                    # better-auth client & server configuration
│   └── utils.ts                   # Class merging (cn) and formatting helpers
│
├── stores/                        # Client state (Zustand)
├── hooks/                         # Shared React hooks
├── types/                         # Global TypeScript types
├── drizzle.config.ts              # Drizzle ORM configuration
└── package.json
```

---

# 5. Course & Curriculum Domain Model

Courses are structured in a clear hierarchical tree:

```text
Course (Metadata, Price, Instructor, Category, Level, Published Status)
 │
 └── CourseSection (Title, SortOrder)
      │
      └── Lesson (Title, Type: Video/Article/Quiz, Duration, SortOrder)
           ├── Video Content (Mux Playback ID - deferred)
           ├── Article Content (Markdown / Rich Text)
           └── Quiz / Assessment (Questions & Options)
```

---

# 6. Database Architecture (PostgreSQL + Drizzle ORM)

PostgreSQL handles all relational data, schema integrity, and relations.

```text
users ─────────────┬────────── instructor_profiles
                   ├────────── student_profiles
                   │
                   ▼
              enrollments ◄──────── courses
                   │                   │
                   ▼                   ▼
            lesson_progress     course_sections
                   │                   │
                   ▼                   ▼
             quiz_attempts          lessons
```

### Key Schema Entities:
1. **users**: Primary user records managed in conjunction with `better-auth`.
2. **roles & permissions**: RBAC mapping (Student, Instructor, Admin).
3. **courses**: Title, slug, description, thumbnail URL, price, level, published status.
4. **course_sections**: Groups of lessons within a course.
5. **lessons**: Individual learning units with type (`video`, `reading`, `quiz`).
6. **enrollments**: User access grants to specific courses.
7. **lesson_progress**: User completion records per lesson.
8. **quizzes & questions**: Question sets with multiple choice options and answer keys.
9. **quiz_attempts**: Records of user submissions and calculated scores.

---

# 7. Design System & UX Standards

### 7.1 Visual Philosophy
- **Clean Light Mode First**: A focused, bright, high-contrast educational interface. Dark mode is postponed to avoid split focus.
- **Distinguished Color Palette (No Generic Blue)**:
  - **Primary**: Deep Emerald / Forest Green (`#059669`, `#047857`, `#064e3b`) conveying credibility, growth, and academic quality.
  - **Neutrals**: Crisp slate/zinc backgrounds (`#ffffff`, `#f8fafc`, `#f1f5f9`), soft borders (`#e2e8f0`), and deep charcoal text (`#0f172a`).
  - **Accents**: Warm amber/gold for achievements, badges, and ratings (`#d97706`).
- **Restrained Styling (No Unnecessary Gradients)**:
  - Clean solid surfaces with subtle 1px borders.
  - No flashy rainbow gradients. Gradients are strictly limited to soft, subtle single-tone depth overlays if ever needed.
- **Consistent Typography (`next/font/google`)**:
  - A single, modern, highly legible geometric font family (e.g. **Plus Jakarta Sans** or **Outfit**) loaded via `next/font/google`.
  - Applied platform-wide for headings, UI controls, and body text.
- **Subtle Micro-interactions**:
  - Crisp button hovers, smooth accordion dropdowns, and progress bar animations.

---

# 8. Technology Stack

| Layer | Technology | Purpose |
|---|---|---|
| **Framework** | Next.js 16 (App Router) | Full-stack SSR, Server Actions, Route Handlers |
| **Language** | TypeScript | Strict type safety across client and server |
| **Styling** | Tailwind CSS v4 | Utility-first styling with custom CSS variables |
| **UI Primitives** | shadcn/ui patterns | Accessible, headless primitives (Radix UI) |
| **Font Management** | `next/font/google` | Zero-layout-shift font optimization |
| **Database** | PostgreSQL | Relational storage for users, courses, and progress |
| **ORM** | Drizzle ORM | High-performance, type-safe SQL query builder |
| **Authentication** | better-auth | Identity, session tokens, and role management |
| **Client State** | Zustand | Course player state, active lesson controls |
| **Validation** | Zod | Schema validation for forms and server actions |

---

# 9. Deferred External Integrations (Final Phase)

To maintain focus on core learning workflows, external third-party service dependencies are implemented in the final phase:

1. **Video Streaming (Mux)**:
   - Adaptive HLS streaming and secure playback tokens.
   - Handled with placeholder video embeds during initial development.
2. **File & Asset Storage (UploadThing)**:
   - Course thumbnails, attachments, and profile images.
3. **Payment Processing (Chapa)**:
   - Ethiopian payment gateway integration for local bank and mobile money checkout.

---

# 10. Phased Implementation Roadmap

Development will proceed in small, self-contained, verifiable steps:

```text
Step 1: Theming & Typography
└── Setup Google Font (next/font/google), emerald green light-mode palette, base CSS tokens.

Step 2: Base UI Primitives & Shell
└── Setup Header, Navigation, Footer, and responsive container layout.

Step 3: Database & Drizzle Configuration
└── Configure PostgreSQL connection, Drizzle schema, and test migrations.

Step 4: Authentication & Roles
└── Configure better-auth with credentials, session verification, and role checks.

Step 5: User & Profile Management
└── Student dashboard shell, instructor profile view, role routing guards.

Step 6: Course Domain & Catalog
└── Course listings, course detail pages, section/lesson curriculum views.

Step 7: Learning & Progress Engine
└── Lesson view, mark-as-complete action, progress calculation.

Step 8: Assessment Engine
└── Quiz runner, answer submission, result calculation.

Step 9: Deferred Integrations
└── UploadThing file uploads, Mux streaming, Chapa payment checkout.
```
