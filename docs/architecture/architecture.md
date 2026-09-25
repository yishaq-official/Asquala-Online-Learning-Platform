
# 🎓 Asquala — Online Learning Platform

### Architecture goal

Build Asquala as a:

> **Modular, scalable, maintainable full-stack learning platform with clear domain boundaries and room for future growth.**

Rather than creating:

```text
controllers/
models/
routes/
services/
```

with hundreds of unrelated files mixed together, we'll organize around **business modules/domains**.

---

# 1. High-Level Architecture

For the initial version, we will build a **Full-Stack Next.js Modular Monolith**.

Not microservices. Not even a separated frontend/backend repo.

```text
                    ┌─────────────────────────┐
                    │       Asquala Web        │
                    │     Next.js App Router   │
                    │   (Frontend & Backend)   │
                    └────────────┬────────────┘
                                 │
                 ┌───────────────┴───────────────┐
                 │        Server Actions &       │
                 │         Route Handlers        │
                 └───────────────┬───────────────┘
                                 │
        ┌────────────────────────┼────────────────────────┐
        │                        │                        │
        ▼                        ▼                        ▼
 ┌─────────────┐         ┌──────────────┐         ┌──────────────┐
 │    Auth     │         │    Users     │         │    Courses   │
 │   Module    │         │    Module    │         │    Module    │
 │(better-auth)│         │              │         │              │
 └─────────────┘         └──────────────┘         └──────────────┘
        │                        │                        │
        └────────────────────────┼────────────────────────┘
                                 │
                 ┌───────────────┼────────────────┐
                 │               │                │
                 ▼               ▼                ▼
          ┌────────────┐  ┌─────────────┐  ┌─────────────┐
          │ Enrollment │  │  Learning   │  │ Assessment  │
          │   Module   │  │   Module    │  │   Module    │
          └────────────┘  └─────────────┘  └─────────────┘
                 │               │                │
                 └───────────────┼────────────────┘
                                 │
             ┌───────────────────┼───────────────────┐
             │                   │                   │
             ▼                   ▼                   ▼
       ┌───────────┐       ┌───────────┐       ┌────────────┐
       │ Payments  │       │ Media &   │       │ Analytics  │
       │  (Chapa)  │       │ Storage   │       │            │
       └───────────┘       └───────────┘       └────────────┘
                                 │
                    ┌────────────▼────────────┐
                    │      Infrastructure      │
                    │  PostgreSQL (Drizzle)    │
                    │  Mux / UploadThing       │
                    └─────────────────────────┘
```

The important idea is that **each module owns a business capability** within the single Next.js application.

---

# 2. Why Modular Monolith?


This is important.

You might be tempted to say:

> "Advanced architecture = microservices."

Not necessarily. 😄

For Asquala's initial architecture, microservices would introduce a lot of infrastructure complexity:

- service discovery
- inter-service communication
- distributed transactions
- API gateways
- message brokers
- multiple deployments
- distributed logging
- tracing
- network failures

Instead:

```text
                 ASQUALA
                    │
          ┌─────────┴─────────┐
          │   Modular Backend │
          └─────────┬─────────┘
                    │
       ┌────────────┼────────────┐
       ▼            ▼            ▼
     Auth        Courses      Payments
       │            │            │
       └────────────┼────────────┘
                    ▼
                 Database
```

Everything runs as one application, **but internally behaves like separate modules**.

Later:

```text
                    API Gateway
                         │
       ┌─────────────────┼──────────────────┐
       ▼                 ▼                  ▼
    Asquala           Course             Payment
      Core             Service            Service
       │                 │                  │
       ▼                 ▼                  ▼
    PostgreSQL         PostgreSQL          PostgreSQL
```

You can extract modules into services when there's a real reason.

---

# 3. Main Actors

Asquala should initially have four major roles.

### Student

Can:

- register/login
- browse courses
- enroll
- learn
- watch lessons
- take quizzes
- submit assignments
- track progress
- earn certificates
- review courses
- receive notifications

### Instructor

Can:

- create courses
- manage course content
- create lessons
- create quizzes
- create assignments
- manage students
- view course analytics
- respond to discussions

### Admin

Can:

- manage users
- manage instructors
- manage courses
- approve courses
- manage categories
- manage payments
- moderate content
- view platform analytics

### Super Admin

System-level operations:

- platform configuration
- role management
- permissions
- audit logs
- administrative operations

---

# 4. Core Domain Modules

I'd initially define these modules:

```text
ASQUALA
│
├── Identity
├── Users
├── Courses
├── Catalog
├── Enrollment
├── Learning
├── Assessments
├── Assignments
├── Certificates
├── Reviews
├── Discussions
├── Payments
├── Notifications
├── Search
├── Analytics
└── Administration
```

But we should **not implement all of them immediately**.

The architecture should distinguish between:

### Core

```text
Identity
Users
Courses
Enrollment
Learning
Assessments
```

### Supporting

```text
Reviews
Certificates
Notifications
Discussions
Search
```

### Platform

```text
Payments
Analytics
Administration
```

---

# 5. Application Architecture

For the framework, we are using **Next.js + TypeScript (App Router)**.

Instead of a complex Monorepo (Turborepo), we will start with a **Standard Next.js Project Structure** but organized in a modular way. 

```text
asquala/
│
├── src/
│   ├── app/                 # Next.js App Router (Pages, Layouts, API Routes)
│   ├── modules/             # Business Logic (The "Backend" & Domain logic)
│   ├── components/          # Shared UI Components (shadcn/ui, Tailwind)
│   ├── lib/                 # Shared Utilities (Drizzle, better-auth config)
│   ├── hooks/               # React Hooks
│   └── stores/              # Client State (Zustand)
│
├── public/
├── drizzle/                 # Database Migrations
└── package.json
```

This single-repo approach keeps development fast and simple while maintaining boundaries.

---

# 6. Next.js App Router Structure

Inside `src/app/`, we structure by feature/audience:

```text
src/app/
│
├── (auth)/
│   ├── login/
│   ├── register/
│   └── forgot-password/
│
├── (public)/
│   ├── courses/
│   ├── instructors/
│   └── categories/
│
├── (student)/
│   ├── dashboard/
│   ├── learning/
│   └── certificates/
│
├── (instructor)/
│   ├── dashboard/
│   ├── courses/
│   └── analytics/
│
├── (admin)/
│   ├── dashboard/
│   ├── users/
│   └── courses/
│
└── api/                     # Route Handlers (Webhooks, etc.)
```

---

# 7. Backend Architecture (Server Actions & Modules)

Here's where Asquala becomes interesting. Instead of scattering logic inside Server Actions or React components, we organize by **feature/module** in `src/modules/`.

```text
src/
│
├── modules/
│   │
│   ├── auth/
│   │   ├── actions.ts       # Next.js Server Actions
│   │   ├── service.ts       # Core logic
│   │   └── schema.ts        # Drizzle schema
│   │
│   ├── users/
│   ├── courses/
│   ├── enrollment/
│   ├── learning/
│   ├── payments/
│   └── notifications/
```

This is highly scalable.

---

# 8. Inside a Module

For example, the Course module:

```text
src/modules/courses/
│
├── actions.ts               # Next.js Server Actions (Callable from Client)
├── service.ts               # Business logic (Create, Update, Fetch courses)
├── schema.ts                # Drizzle ORM Schema definition for Courses
├── queries.ts               # Complex DB queries
└── types.ts                 # TypeScript types/zod validation
```

The flow becomes:

```text
React Component (Client)
     │
     ▼
Server Action (actions.ts)
     │
     ▼
Service (service.ts)
     │
     ▼
Drizzle ORM (queries/schema)
     │
     ▼
PostgreSQL Database
```

---

# 9. Course Domain


Courses will probably be the heart of Asquala.

The hierarchy should be:

```text
Course
 │
 ├── Section
 │    │
 │    ├── Lesson
 │    │    ├── Video
 │    │    ├── Article
 │    │    ├── Resource
 │    │    └── Quiz
 │    │
 │    └── Assignment
 │
 ├── Instructor
 ├── Category
 ├── Tags
 ├── Reviews
 └── Certificate
```

Example:

```text
Full Stack Development
│
├── Section 1: Fundamentals
│   ├── Introduction
│   ├── HTTP
│   └── REST APIs
│
├── Section 2: Backend
│   ├── Node.js
│   ├── Express
│   └── PostgreSQL
│
└── Section 3: Frontend
    ├── React
    ├── Next.js
    └── Final Project
```

---

# 10. Database Architecture

For Asquala, I'd choose:

### PostgreSQL

as the primary database.

Why?

Because the platform contains heavily relational data:

```text
User
 ↓
Enrollment
 ↓
Course
 ↓
Section
 ↓
Lesson
 ↓
Progress
 ↓
Assessment
 ↓
Attempt
 ↓
Result
```

PostgreSQL fits this beautifully.

---

# 11. Core Database Entities (Drizzle ORM)

Using Drizzle, we will define our schema declaratively. Initial conceptual schema:

```text
users
│
├── roles
├── permissions
│
├── instructor_profiles
├── student_profiles
│
├── courses
│   ├── course_sections
│   │   └── lessons
│   │
│   ├── quizzes
│   │   └── questions
│   │
│   └── assignments
│
├── enrollments
│
├── lesson_progress
│
├── certificates
│
├── reviews
│
├── payments (Chapa references)
│
└── notifications
```

---

# 12. Authentication Architecture

We are using **better-auth** for managing authentication and identity.

`better-auth` will handle:

```text
Registration
Login
Logout
Password reset
Email verification
Sessions
OAuth
```

The setup lives centrally (e.g., `src/lib/auth.ts`) and ties into Drizzle ORM seamlessly.

---

# 13. RBAC


Use **Role-Based Access Control**.

Something like:

```text
User
 │
 ├── Student
 │
 ├── Instructor
 │
 ├── Admin
 │
 └── Super Admin
```

But don't hardcode:

```typescript
if (user.role === "admin")
```

everywhere.

Instead build an authorization layer:

```text
AuthorizationService
        │
        ├── hasRole()
        ├── hasPermission()
        └── can()
```

Eventually:

```text
course:create
course:update
course:publish
course:delete
student:view
student:manage
payment:view
user:manage
```

This makes the system much more flexible.

---

# 14. Learning Engine

This deserves its own module.

```text
Learning Module
│
├── Course Access
├── Lesson Progress
├── Video Progress
├── Completion Tracking
├── Learning Streak
├── Course Completion
└── Resume Learning
```

Example:

```text
Student
   │
   ▼
Enrollment
   │
   ▼
Course
   │
   ▼
Lesson
   │
   ▼
Progress
   │
   ▼
Completion
```

We can calculate:

```text
course_progress =
completed_lessons / total_lessons
```

Later, this can become more sophisticated.

---

# 15. Assessment Engine

Instead of putting quizzes directly inside the course module:

```text
Assessments
│
├── Quiz
├── Question
├── Option
├── Attempt
├── Answer
├── Score
└── Result
```

Possible question types:

```text
Multiple Choice
Multiple Select
True / False
Short Answer
Essay
Coding
```

🔥 The coding-assessment capability could eventually make Asquala much more interesting for software engineering education.

---

# 16. File / Media Architecture

Don't store videos directly inside PostgreSQL.

Instead we will use specialized services tailored for Next.js:

### Video Hosting: Mux
Mux provides adaptive bitrate streaming (HLS) out of the box. 
- You upload a video to Mux.
- Mux processes it.
- We store the Mux `playbackId` in our database.

### File Hosting (Images, PDFs): UploadThing
UploadThing makes handling file uploads inside Next.js extremely easy and type-safe.

```text
             Asquala (Next.js)
                │
        ┌───────┴───────┐
        ▼               ▼
   UploadThing         Mux
   (Images/PDFs)     (Video Streaming)
```

---

# 17. Redis


Redis should be a supporting infrastructure component.

Use it for:

```text
Caching
Sessions
Rate limiting
Temporary data
OTP
Job queues
Frequently accessed courses
```

Architecture:

```text
Application
    │
    ├──────────► PostgreSQL
    │
    └──────────► Redis
```

Don't use Redis as the primary source of truth.

---

# 18. Background Jobs

Some operations shouldn't block HTTP requests.

For example:

```text
Student completes course
        │
        ▼
API responds immediately
        │
        ▼
Queue
        │
        ├── Generate certificate
        ├── Send email
        ├── Update analytics
        └── Send notification
```

This introduces:

```text
Job Queue
Worker
```

Possible stack:

```text
Redis
   +
BullMQ
```

---

# 19. Notifications

Separate notification channels:

```text
Notification Module
│
├── In-App
├── Email
├── Push
└── SMS
```

And an abstraction:

```typescript
NotificationService
```

Instead of:

```typescript
sendEmail(...)
```

everywhere.

We could have:

```text
NotificationService
       │
       ├── EmailProvider
       ├── PushProvider
       └── SMSProvider
```

That's clean architecture thinking.

---

# 20. Search

Eventually:

```text
Student
   │
   ▼
Search
   │
   ├── Courses
   ├── Instructors
   ├── Categories
   └── Lessons
```

Initially PostgreSQL full-text search may be enough.

Later:

```text
PostgreSQL
     │
     ▼
Elasticsearch / OpenSearch
```

No need to over-engineer version 1.

---

# 21. Analytics

Analytics should be separated from normal transactional operations.

For example:

```text
Analytics
│
├── Student Analytics
├── Course Analytics
├── Instructor Analytics
└── Platform Analytics
```

Metrics:

```text
Course enrollments
Course completion rate
Lesson completion
Average quiz score
Active students
Learning time
Revenue
Instructor performance
```

---

# 22. API Design (Server Actions)

Since we are using Next.js App Router, we will rely heavily on **React Server Actions** instead of building a traditional REST API for the frontend.

Server Actions allow us to call backend functions directly from client components with full end-to-end type safety.

Example `actions.ts`:
```typescript
'use server'

export async function createCourse(data: CreateCourseInput) {
  // ... business logic ...
}
```

We only use REST Route Handlers (`src/app/api/...`) for:
- Webhooks (e.g., Chapa payment webhooks, Mux video processing webhooks)
- External integrations

---

# 23. API Response Standard (Server Actions)

Even with Server Actions, we should standardize responses:

```typescript
type ActionResponse<T> = {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
  };
};
```

This ensures the frontend handles loading and error states consistently.

---

# 24. Security Architecture


Because this is an education platform containing accounts and potentially payments, security should be architectural—not something we bolt on later.

Core controls:

```text
HTTPS
│
├── Authentication
├── Authorization
├── Input validation
├── Rate limiting
├── CSRF protection where applicable
├── Secure cookies/tokens
├── Password hashing
├── File validation
├── SQL injection protection
├── XSS protection
├── Audit logging
├── Security headers
└── Secrets management
```

And:

```text
Client
   │
   ▼
Rate Limiter
   │
   ▼
Authentication
   │
   ▼
Authorization
   │
   ▼
Validation
   │
   ▼
Business Logic
```

---

# 25. Observability

A serious application should know what it's doing.

Add:

```text
Logging
Monitoring
Metrics
Tracing
Audit Logs
```

For example:

```text
Request
 │
 ├── Request ID
 ├── User ID
 ├── IP
 ├── Endpoint
 ├── Duration
 └── Status
```

Later:

```text
OpenTelemetry
Prometheus
Grafana
Sentry
```

Again, not all on day one.

---

# 26. Deployment Architecture

Initial deployment (e.g., Vercel or a VPS):

```text
                    Internet
                       │
                       ▼
                 ┌──────────┐
                 │   CDN    │
                 └────┬─────┘
                      │
             ┌────────▼────────┐
             │ Next.js App     │
             │ (Web & Backend) │
             └────────┬────────┘
                      │
          ┌───────────┼───────────┐
          ▼           ▼           ▼
      PostgreSQL     Mux      UploadThing
```

---

# 27. Recommended Technology Stack

For **Asquala**, we are locking in this modern tech stack:

| Layer | Technology |
|---|---|
| Framework | Next.js (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| UI Components | shadcn/ui |
| State Management | Zustand |
| ORM | Drizzle ORM |
| Database | PostgreSQL |
| Authentication | better-auth |
| Payments | Chapa (Ethiopian Gateway) |
| Video Hosting | Mux |
| File Storage | UploadThing |
| Validation | Zod |

---

# 28. Complete Repository Architecture

Putting everything together into a unified Next.js structure:

```text
asquala/
│
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   ├── (student)/
│   │   ├── (instructor)/
│   │   ├── (admin)/
│   │   ├── api/             # Webhooks
│   │   ├── layout.tsx
│   │   └── page.tsx
│   │
│   ├── components/
│   │   ├── ui/              # shadcn components
│   │   ├── layout/
│   │   └── shared/
│   │
│   ├── modules/             # Business Logic & DB schemas
│   │   ├── auth/
│   │   ├── users/
│   │   ├── courses/
│   │   ├── learning/
│   │   ├── assessments/
│   │   ├── payments/
│   │   └── notifications/
│   │
│   ├── lib/                 # Third-party setups
│   │   ├── db.ts            # Drizzle setup
│   │   ├── auth.ts          # better-auth setup
│   │   ├── chapa.ts         # Chapa SDK setup
│   │   ├── mux.ts
│   │   └── uploadthing.ts
│   │
│   ├── stores/              # Zustand stores
│   ├── hooks/
│   └── types/
│
├── drizzle/                 # Migrations
├── docs/
│   └── architecture/
│
├── next.config.mjs
├── tailwind.config.ts
├── drizzle.config.ts
├── package.json
└── README.md
```

---

# 29. Dependency Direction


This is one of the **most important architectural rules**.

We don't want this:

```text
Courses → Users → Payments → Courses → Auth
```

creating spaghetti.

Instead:

```text
                 Shared
                   ▲
                   │
        ┌──────────┼──────────┐
        │          │          │
     Identity   Courses    Payments
        │          │          │
        └──────────┼──────────┘
                   │
                Events
```

Modules should communicate through **well-defined interfaces/events**, not by directly reaching into another module's database internals.

For example:

```text
Enrollment
    │
    │ CourseEnrolled
    ▼
Event Bus
    │
    ├── Analytics
    ├── Notification
    └── Learning
```

This gives us a pathway toward event-driven architecture later.

---

# 30. Architecture Evolution

I would intentionally design Asquala through stages.

### Phase 1 — Foundation

```text
Next.js
Node.js
PostgreSQL
Prisma
Docker
```

Build:

```text
Identity
Users
Courses
```

### Phase 2 — Learning

```text
Enrollment
Learning
Progress
Assessments
```

### Phase 3 — Platform

```text
Reviews
Certificates
Notifications
Discussions
```

### Phase 4 — Business

```text
Payments (Chapa Integration)
Subscriptions
Instructor revenue
Analytics
```

### Phase 5 — Infrastructure

```text
Redis
Queues
Object storage
Search
Observability
```

### Phase 6 — Scale

Only if necessary:

```text
Load balancing
Horizontal scaling
Read replicas
Message broker
Service extraction
CDN
Microservices
```

---

# 31. The Most Important Architectural Principle

I'd make this the **Asquala architecture rule**:

> **Business modules should be independent enough that a module can eventually be extracted into a separate service without rewriting the entire application.**

That means we're not building microservices today.

We're building a **modular monolith that has a migration path toward distributed architecture.**

That's a much more mature approach than randomly splitting everything into 15 services because "microservices sounds advanced." 😄

---

## 🧭 Where I suggest we go next

Before writing a single line of implementation code, I'd take Asquala through these architecture documents **in this exact order**:

```text
01. Product Scope
        ↓
02. Actors & Use Cases
        ↓
03. System Context Diagram
        ↓
04. Functional Modules
        ↓
05. Module Dependency Map
        ↓
06. Detailed Backend Architecture
        ↓
07. Frontend Architecture
        ↓
08. Database ERD
        ↓
09. API Architecture
        ↓
10. Authentication + RBAC
        ↓
11. Event / Queue Architecture
        ↓
12. Security Architecture
        ↓
13. Deployment Architecture
        ↓
14. Monorepo Structure
        ↓
15. Development Roadmap
```

