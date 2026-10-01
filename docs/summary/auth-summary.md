# 🔐 Asquala — Full-Stack Authentication & Database Summary

> **Scope**: Comprehensive architectural summary of the full-stack authentication system, PostgreSQL database integration via Drizzle ORM, `better-auth` configuration, client state management with Zustand, and form UI primitives implemented for **Asquala**.

---

## 1. System Architecture & Technologies

The authentication system is built as an end-to-end, type-safe pipeline within Next.js:

* **Database**: PostgreSQL 18 running locally in Docker (`container: postgresql`, database: `development`, port: `5432`).
* **ORM & Query Layer**: **Drizzle ORM** with the `postgres` (postgres.js) driver, configured with a singleton client to prevent connection exhaustion during development hot-reloads.
* **Authentication Engine**: **`better-auth`** running directly against our PostgreSQL database via the Drizzle adapter. Enforces secure password hashing, token generation, and HTTP-only session cookies.
* **Role-Based Access Control (RBAC)**: Extended the default user schema with a custom `role` column (`student` | `instructor` | `admin`), inferred seamlessly on both server and client.
* **Client UI State Management**: **Zustand** (`stores/auth-store.ts`) for managing UI-only states (active role toggle, post-login redirect tracking, and form loading indicators) decoupled from session tokens.
* **Form Validation**: **Zod** (`modules/auth/schema.ts`) for strict client-side validation rules.
* **Design System**: All auth components, inputs, and layouts strictly utilize the emerald green light-mode CSS tokens (`var(--primary)`, `var(--border)`, `var(--card)`).

---

## 2. File-to-Functionality Mapping

| File Path | Role / Functionality | Key Features & Implementation Details |
|---|---|---|
| [.env](file:///home/eaglex/Documents/officials/Asquala-online-learning-platform/asquala-online-school/.env) | Environment Secrets | Stores `DATABASE_URL`, `BETTER_AUTH_SECRET`, and `BETTER_AUTH_URL`. Excluded from Git via `.gitignore`. |
| [db/index.ts](file:///home/eaglex/Documents/officials/Asquala-online-learning-platform/asquala-online-school/db/index.ts) | Database Connection Singleton | Connects to PostgreSQL using `postgres` and exports `db` (Drizzle client). Caches connection on `globalThis` in development to prevent connection leaks. |
| [drizzle.config.ts](file:///home/eaglex/Documents/officials/Asquala-online-learning-platform/asquala-online-school/drizzle.config.ts) | Migration & Schema Tooling | Configures Drizzle Kit to scan `./db/schema/*`, output to `./db/migrations`, and target PostgreSQL. |
| [db/schema/auth.ts](file:///home/eaglex/Documents/officials/Asquala-online-learning-platform/asquala-online-school/db/schema/auth.ts) | Drizzle Auth Schema | Declares relational tables: `user` (with `role`), `session` (with user cascade delete), `account` (credentials & password hash), and `verification`. |
| [lib/auth.ts](file:///home/eaglex/Documents/officials/Asquala-online-learning-platform/asquala-online-school/lib/auth.ts) | Server Authentication Instance | Configures `betterAuth` with `drizzleAdapter(db, { provider: "pg", schema })`, enabled email/password provider, and custom user role field. |
| [app/api/auth/[...all]/route.ts](file:///home/eaglex/Documents/officials/Asquala-online-learning-platform/asquala-online-school/app/api/auth/%5B...all%5D/route.ts) | Catch-All Auth Route Handler | Maps incoming Next.js HTTP requests (`GET`, `POST`) to `better-auth` internal handlers via `toNextJsHandler(auth.handler)`. |
| [lib/auth-client.ts](file:///home/eaglex/Documents/officials/Asquala-online-learning-platform/asquala-online-school/lib/auth-client.ts) | Client-Side Auth Helper | Instantiates client via `createAuthClient` with `inferAdditionalFields<typeof auth>()`. Exports `signIn`, `signUp`, `signOut`, and `useSession`. |
| [stores/auth-store.ts](file:///home/eaglex/Documents/officials/Asquala-online-learning-platform/asquala-online-school/stores/auth-store.ts) | Zustand Auth UI Store | Manages `selectedRole` (`student` vs. `instructor`), `redirectAfterLogin`, `isLoading`, and state reset actions. |
| [modules/auth/schema.ts](file:///home/eaglex/Documents/officials/Asquala-online-learning-platform/asquala-online-school/modules/auth/schema.ts) | Zod Validation Schemas | Defines `registerSchema` (name, email, password min 8 chars + 1 number, password confirmation, role enum) and `loginSchema`. |
| [components/ui/label.tsx](file:///home/eaglex/Documents/officials/Asquala-online-learning-platform/asquala-online-school/components/ui/label.tsx) | Accessible Form Label | Reusable label component with optional required asterisk indicator (`*`). |
| [components/ui/input.tsx](file:///home/eaglex/Documents/officials/Asquala-online-learning-platform/asquala-online-school/components/ui/input.tsx) | Form Input Primitive | Input field with emerald focus ring (`focus:border-primary focus:ring-primary/20`) and error state border styling (`border-destructive`). |
| [components/ui/button.tsx](file:///home/eaglex/Documents/officials/Asquala-online-learning-platform/asquala-online-school/components/ui/button.tsx) | Action Button Primitive | Supports `primary`, `secondary`, `outline`, and `ghost` variants, animated SVG loading spinner (`isLoading`), and disabled states. |
| [app/(auth)/layout.tsx](file:///home/eaglex/Documents/officials/Asquala-online-learning-platform/asquala-online-school/app/(auth)/layout.tsx) | Dedicated Auth Layout | Distraction-free, centered canvas (`max-w-md`) with back-to-home link, prominent Asquala logo (`w-12 h-12`), and clean card framing. |
| [app/(auth)/register/page.tsx](file:///home/eaglex/Documents/officials/Asquala-online-learning-platform/asquala-online-school/app/(auth)/register/page.tsx) | Registration Page Flow | Features a segmented Student vs. Instructor role toggle, field validation, server error alerts, and `authClient.signUp.email()` integration. |
| [app/(auth)/login/page.tsx](file:///home/eaglex/Documents/officials/Asquala-online-learning-platform/asquala-online-school/app/(auth)/login/page.tsx) | Login Page Flow | Credential submission with email and password, error message banner, `<React.Suspense>` boundary for search params, and redirection logic. |
| [components/layout/navbar.tsx](file:///home/eaglex/Documents/officials/Asquala-online-learning-platform/asquala-online-school/components/layout/navbar.tsx) | Session-Aware Navigation | Reactively consumes `useSession()`. Shows initial avatar bubble, user name, role badge, and functional Sign Out button when authenticated. |

---

## 3. Database Schema Structure (PostgreSQL)

All 4 tables were generated and pushed to the Docker PostgreSQL database:

```text
public.user
├── id: text (PK)
├── name: text
├── email: text (UNIQUE)
├── email_verified: boolean
├── image: text (nullable)
├── role: text (default: 'student')
├── created_at: timestamp
└── updated_at: timestamp

public.session
├── id: text (PK)
├── expires_at: timestamp
├── token: text (UNIQUE)
├── user_id: text (FK -> user.id, CASCADE)
├── ip_address: text (nullable)
├── user_agent: text (nullable)
├── created_at: timestamp
└── updated_at: timestamp

public.account
├── id: text (PK)
├── account_id: text
├── provider_id: text ('credential')
├── user_id: text (FK -> user.id, CASCADE)
├── password: text (hashed password)
├── access_token, refresh_token, scope, etc.
├── created_at: timestamp
└── updated_at: timestamp

public.verification
├── id: text (PK)
├── identifier: text
├── value: text
├── expires_at: timestamp
└── created_at, updated_at: timestamp
```

---

## 4. Verified End-to-End Workflows

1. **User Registration**:
   - Submits user registration payload via `authClient.signUp.email()`.
   - Creates a new record in `public.user` with role `student` or `instructor`.
   - Hashes the password securely and stores it in `public.account`.
   - Generates an active session token in `public.session`.

2. **User Sign In**:
   - Validates credentials against `public.account`.
   - Sets a secure HTTP-only cookie (`better-auth.session_token`) with 7-day expiration (`Max-Age: 604800; Path=/; HttpOnly; SameSite=Lax`).
   - Automatically rejects invalid credentials with a descriptive error message.

3. **Session Reactivity in Navbar**:
   - While session loads: renders an unobtrusive skeleton to eliminate layout shifts.
   - Upon authentication: replaces "Sign In / Get Started" with user initials in an emerald bubble, full name, role pill, and a "Sign Out" button.
   - Upon signing out: calling `authClient.signOut()` immediately revokes the session cookie, clears the client cache, and updates the Navbar.
