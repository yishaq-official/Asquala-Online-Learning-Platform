# 🔐 Asquala — Full-Stack Authentication Implementation Plan

> **Scope**: Implement full-stack authentication for Asquala using **Next.js 16 App Router**, **PostgreSQL** (running locally in Docker), **Drizzle ORM**, **better-auth** (with Role-Based Access Control), **Zustand** for client-side auth UI state, and **Tailwind CSS v4** relying strictly on our established **CSS global variables** (emerald green light mode).

---

## 🏛️ Architecture Overview

```text
┌─────────────────────────────────────────────────────────────┐
│                       Client Browser                        │
│                                                             │
│   ┌─────────────────────┐       ┌───────────────────────┐   │
│   │   Auth UI Forms     │       │   Zustand Auth Store  │   │
│   │ (/login, /register) │◄─────►│ (stores/auth-store.ts)│   │
│   └──────────┬──────────┘       └───────────────────────┘   │
│              │                                              │
│              ▼                                              │
│   ┌─────────────────────┐                                   │
│   │  better-auth Client │                                   │
│   │ (lib/auth-client.ts)│                                   │
│   └──────────┬──────────┘                                   │
└──────────────┼──────────────────────────────────────────────┘
               │ HTTPS / Server Actions
               ▼
┌─────────────────────────────────────────────────────────────┐
│                   Next.js 16 App Server                     │
│                                                             │
│   ┌─────────────────────────────────────────────────────┐   │
│   │ Route Handler: /api/auth/[...all] (lib/auth.ts)      │   │
│   └──────────────────────────┬──────────────────────────┘   │
│                              │                              │
│                              ▼                              │
│   ┌─────────────────────────────────────────────────────┐   │
│   │ Drizzle ORM Adapter (db/index.ts & db/schema/auth.ts│   │
│   └──────────────────────────┬──────────────────────────┘   │
└──────────────────────────────┼──────────────────────────────┘
                               │ TCP / Port 5432
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                 PostgreSQL (Docker: postgres:18)            │
│               Database: development (port 5432)             │
│        Tables: user, session, account, verification         │
└─────────────────────────────────────────────────────────────┘
```

---

## 🎨 Styling & Design Rules (Mandatory)
Every auth component and form primitive **must** adhere strictly to the design system established in `app/globals.css`:
- **Primary Color**: Deep Emerald Green (`var(--primary)`: `#047857`, hover: `var(--primary-hover)`: `#065f46`, light tint: `var(--primary-light)`: `#ecfdf5`).
- **Surfaces**: Crisp white cards (`var(--card)`: `#ffffff`) over subtle slate canvas (`var(--background)`: `#f8fafc`).
- **Borders & Rings**: Clean 1px slate borders (`var(--border)`: `#e2e8f0`) with emerald focus rings (`var(--ring)`: `#059669`).
- **Typography**: Unified **Inter** font (`var(--font-sans)`).
- **Strictly No Blue**: Use emerald green for active states, amber for hints/warnings, and rose for destructive/errors.

---

## 📅 Phased Implementation Roadmap

---

### Phase 1: Database Foundation & Drizzle Setup

* **Objective**: Connect the Next.js application to the local Docker PostgreSQL container via Drizzle ORM.
* **Docker Context**:
  - Container: `postgresql` (`postgres:18`)
  - Port: `5432`
  - User: `postgres`
  - Password: `your_strong_password`
  - Default DB: `development`
  - Connection String: `postgresql://postgres:your_strong_password@localhost:5432/development`

#### Steps:
1. **Step 1.1 — Install Dependencies**
   - Install `drizzle-orm`, `postgres` (postgres.js client), `drizzle-kit` (dev), and `dotenv`.
2. **Step 1.2 — Configure Environment Variables**
   - Create `.env.local` inside `asquala-online-school/` with:
     ```env
     DATABASE_URL=postgresql://postgres:your_strong_password@localhost:5432/development
     BETTER_AUTH_SECRET=a_random_32_character_secret_key_here
     BETTER_AUTH_URL=http://localhost:3000
     ```
3. **Step 1.3 — Initialize Drizzle Client & Configuration**
   - Create `db/index.ts`: connection pooling instance using `postgres`.
   - Create `drizzle.config.ts`: configuration for schema path and migration output.
4. **Step 1.4 — Connection Smoke Test**
   - Run a test query script to verify live connection to Docker PostgreSQL.

---

### Phase 2: Core `better-auth` & Schema Definition

* **Objective**: Define the authentication database tables with role support and configure `better-auth`.

#### Steps:
1. **Step 2.1 — Install `better-auth`**
   - Install `better-auth`.
2. **Step 2.2 — Define Auth Schema (`db/schema/auth.ts`)**
   - Define Drizzle tables according to `better-auth` specification:
     - `user`: `id`, `name`, `email`, `emailVerified`, `image`, `role` (`student` | `instructor` | `admin`), `createdAt`, `updatedAt`.
     - `session`: `id`, `expiresAt`, `token`, `createdAt`, `updatedAt`, `ipAddress`, `userAgent`, `userId`.
     - `account`: `id`, `accountId`, `providerId`, `userId`, `accessToken`, `refreshToken`, `password`, `createdAt`, `updatedAt`.
     - `verification`: `id`, `identifier`, `value`, `expiresAt`, `createdAt`, `updatedAt`.
3. **Step 2.3 — Generate & Apply Migrations**
   - Run `drizzle-kit generate` and `drizzle-kit push` to create the auth tables in Docker PostgreSQL.
4. **Step 2.4 — Configure Server Auth Instance (`lib/auth.ts`)**
   - Instantiate `betterAuth` with `drizzleAdapter(db, { provider: "pg" })`, email/password provider, and custom user fields (`role`).
5. **Step 2.5 — Create Catch-all API Route Handler**
   - Create `app/api/auth/[...all]/route.ts` bridging HTTP requests to `auth.handler`.
6. **Step 2.6 — Configure Client Auth Helper (`lib/auth-client.ts`)**
   - Export `createAuthClient` with `signIn`, `signUp`, `signOut`, and `useSession`.

---

### Phase 3: Client State Management with Zustand (`stores/auth-store.ts`)

* **Objective**: Separate client UI state (role toggle, loading states, post-login redirection URL) from server session state.

#### Steps:
1. **Step 3.1 — Install Zustand**
   - Install `zustand`.
2. **Step 3.2 — Build Auth Store (`stores/auth-store.ts`)**
   - State definitions:
     - `selectedRole: "student" | "instructor"` (for registration role toggle).
     - `redirectAfterLogin: string | null` (tracking where to route after sign in).
     - `activeTab: "login" | "register"`.
     - Actions: `setSelectedRole(role)`, `setRedirectAfterLogin(url)`.

---

### Phase 4: Shared Auth Layout & Form Primitives

* **Objective**: Build reusable, accessible form UI components using the green light-mode design tokens.

#### Steps:
1. **Step 4.1 — Auth Route Group Layout (`app/(auth)/layout.tsx`)**
   - Minimalist, distraction-free centered container.
   - Large prominent Asquala logo (`/images/logo.png`), tagline, and back-to-home link.
   - White card container (`bg-card border-border shadow-xs rounded-2xl`).
2. **Step 4.2 — Reusable Form Components (`components/ui/`)**
   - `components/ui/input.tsx`: Text and password inputs with emerald focus ring (`focus:border-primary focus:ring-primary/20`).
   - `components/ui/label.tsx`: Accessible form labels.
   - `components/ui/button.tsx`: Primary button with spinner loading state.

---

### Phase 5: Registration Flow (`/register`)

* **Objective**: Allow new users to register as either a Student or an Instructor with validated credentials.

#### Steps:
1. **Step 5.1 — Zod Validation Schema (`modules/auth/schema.ts`)**
   - Rules: Name (min 2 chars), valid email, password (min 8 chars, at least 1 number), role (`student` | `instructor`).
2. **Step 5.2 — Registration Page UI (`app/(auth)/register/page.tsx`)**
   - Role Selector: Clean 2-option segmented toggle (Learner vs. Instructor) powered by `useAuthStore`.
   - Form fields: Full Name, Email Address, Password, Confirm Password.
3. **Step 5.3 — Wire Signup Client Action**
   - Call `authClient.signUp.email({ name, email, password, role })`.
   - Handle loading button state and display server error messages (e.g. "Email already in use").
4. **Step 5.4 — Verify in PostgreSQL**
   - Inspect newly created user record and verify secure password hashing in `account` table.

---

### Phase 6: Login Flow (`/login`) & Session Management

* **Objective**: Allow existing users to authenticate securely and obtain a valid session cookie.

#### Steps:
1. **Step 6.1 — Login Zod Schema**
   - Validate email format and non-empty password.
2. **Step 6.2 — Login Page UI (`app/(auth)/login/page.tsx`)**
   - Email, Password, "Forgot password?" placeholder, and "Remember me" checkbox.
   - Link switching between `/login` and `/register`.
3. **Step 6.3 — Wire Sign In Action**
   - Call `authClient.signIn.email({ email, password })`.
   - On success: redirect to intended dashboard (`/student/dashboard` or `/instructor/dashboard` based on user role).
4. **Step 6.4 — Session Verification**
   - Inspect browser HTTP-only cookie and PostgreSQL `session` table record.

---

### Phase 7: Navbar Integration & Session Reactivity

* **Objective**: Reflect authenticated status dynamically on the main landing page.

#### Steps:
1. **Step 7.1 — Connect Navbar to `useSession()`**
   - When unauthenticated: Show "Sign In" and "Get Started" buttons.
   - When authenticated: Show user's name, role badge (`Student` or `Instructor`), and a "Sign Out" button.
2. **Step 7.2 — Wire Logout Action**
   - Calling `authClient.signOut()` immediately clears the session cookie and updates the Navbar reactively.

---

## 📋 Step-by-Step Execution Checklist

| Step | Task | Status | Output Files |
|---|---|---|---|
| **1.1** | Install Drizzle & DB packages | ✅ Completed | `package.json` |
| **1.2** | Configure `.env.local` | ✅ Completed | `.env` |
| **1.3** | Setup Drizzle client & config | ✅ Completed | `db/index.ts`, `drizzle.config.ts` |
| **1.4** | Verify Docker PostgreSQL connection | ✅ Completed | Smoke test verified |
| **2.1** | Install `better-auth` | ✅ Completed | `package.json` |
| **2.2** | Define Auth Schemas with RBAC | ✅ Completed | `db/schema/auth.ts` |
| **2.3** | Push migrations to PostgreSQL | ✅ Completed | Tables created in PostgreSQL |
| **2.4** | Configure server auth | ✅ Completed | `lib/auth.ts` |
| **2.5** | Create API route handler | ✅ Completed | `app/api/auth/[...all]/route.ts` |
| **2.6** | Create client auth instance | ✅ Completed | `lib/auth-client.ts` |
| **3.1** | Install Zustand & build store | ✅ Completed | `stores/auth-store.ts` |
| **4.1** | Build Auth Layout with logo | ✅ Completed | `app/(auth)/layout.tsx` |
| **4.2** | Build reusable form primitives | ✅ Completed | `components/ui/{input,label,button}.tsx` |
| **5.1** | Define Zod register schema | ✅ Completed | `modules/auth/schema.ts` |
| **5.2** | Build Register page UI | ✅ Completed | `app/(auth)/register/page.tsx` |
| **5.3** | Wire register submission | ✅ Completed | `authClient.signUp.email` |
| **5.4** | Verify user & password in DB | ✅ Completed | Verified in PostgreSQL |
| **6.1** | Build Login page UI | ✅ Completed | `app/(auth)/login/page.tsx` |
| **6.2** | Wire login submission & cookies | ✅ Completed | Verified session token & cookie |
| **7.1** | Connect Navbar to active session | ✅ Completed | `components/layout/navbar.tsx` |
| **7.2** | Verify logout & session clear | ✅ Completed | `authClient.signOut()` |
