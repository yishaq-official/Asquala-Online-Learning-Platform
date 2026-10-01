# 🌐 Asquala — Landing Page & Design System Summary

> **Scope**: Comprehensive architectural summary of the landing page, global design tokens, visual assets, and modular component hierarchy implemented for **Asquala**.

---

## 1. Design System & Theming Specifications

The platform is designed around a **clean, focused light-mode interface** with strict aesthetic guardrails:

* **Primary Palette**: Deep Forest / Emerald Green (`#047857`), hover states (`#065f46`), light tints (`#ecfdf5`), and subtle borders (`#a7f3d0`).
* **Zero Blue Colors**: Generic blues are strictly prohibited to avoid a generic SaaS/boilerplate appearance.
* **Neutrals**: Crisp slate backgrounds (`#f8fafc`), card surfaces (`#ffffff`), 1px borders (`#e2e8f0`), and high-contrast charcoal text (`#0f172a`).
* **Supporting Accents**: Warm amber (`#d97706`) for ratings and achievements; rose (`#e11d48`) for destructive/error states.
* **Typography**: Unified platform-wide **Inter** font loaded via `next/font/google` (`--font-inter`) with zero layout shift.
* **Restrained Styling**: Clean solid cards, 1px borders, and soft shadows (`shadow-xs` / `shadow-2xs`) without unnecessary or distracting rainbow gradients.

---

## 2. File-to-Functionality Mapping

| File Path | Role / Functionality | Key Features |
|---|---|---|
| [app/globals.css](file:///home/eaglex/Documents/officials/Asquala-online-learning-platform/asquala-online-school/app/globals.css) | Core Design Tokens & Theme | Defines CSS variables (`--primary`, `--background`, `--card`, etc.) and maps them to Tailwind v4 via `@theme inline`. Enforces light mode defaults. |
| [app/layout.tsx](file:///home/eaglex/Documents/officials/Asquala-online-learning-platform/asquala-online-school/app/layout.tsx) | Root Layout & Global Shell | Injects the Google Inter font variable, sets root HTML attributes, configures platform metadata, and sets `/images/logo.png` as the browser favicon. |
| [app/page.tsx](file:///home/eaglex/Documents/officials/Asquala-online-learning-platform/asquala-online-school/app/page.tsx) | Landing Page Orchestrator | Clean 26-line orchestrator that imports and composes the navbar, hero, trust bar, categories, featured courses, value pillars, CTA banner, and footer. |
| [public/images/logo.png](file:///home/eaglex/Documents/officials/Asquala-online-learning-platform/asquala-online-school/public/images/logo.png) | Brand Logo Asset | Official transparent PNG asset featuring the stylized green "A" and amber diamond accent. |
| [public/images/hero-illustration.jpg](file:///home/eaglex/Documents/officials/Asquala-online-learning-platform/asquala-online-school/public/images/hero-illustration.jpg) | Hero Visual Anchor | Custom 2D digital illustration of an Ethiopian online student at a modern desk with floating modular course and progress widgets. |
| [components/layout/navbar.tsx](file:///home/eaglex/Documents/officials/Asquala-online-learning-platform/asquala-online-school/components/layout/navbar.tsx) | Header Navigation Bar | Sticky header (`h-20`) featuring the enlarged Asquala logo (`w-12 h-12`), navigation links, and dynamic session-aware authentication actions. |
| [components/layout/footer.tsx](file:///home/eaglex/Documents/officials/Asquala-online-learning-platform/asquala-online-school/components/layout/footer.tsx) | Site Footer | Platform branding, inline logo, course & category quick links, privacy/terms links, and copyright text. |
| [components/landing/hero-section.tsx](file:///home/eaglex/Documents/officials/Asquala-online-learning-platform/asquala-online-school/components/landing/hero-section.tsx) | 2-Column Hero Section | Left column with concise headline (*"Structured learning for real-world mastery"*), subtitle, CTAs, and perks checklist; right column framing the custom digital illustration. |
| [components/landing/trust-indicators.tsx](file:///home/eaglex/Documents/officials/Asquala-online-learning-platform/asquala-online-school/components/landing/trust-indicators.tsx) | Social Proof & Metrics Bar | 4-column metric bar displaying 15,000+ Students, 120+ Courses, 98% Completion Rate, and 4.9/5 Learner Satisfaction. |
| [components/landing/categories-section.tsx](file:///home/eaglex/Documents/officials/Asquala-online-learning-platform/asquala-online-school/components/landing/categories-section.tsx) | Disciplines & Tracks Grid | Cards showcasing 4 key learning tracks: Software Engineering, Data Science & AI, UI/UX Design, and Business & Management. |
| [components/landing/featured-courses.tsx](file:///home/eaglex/Documents/officials/Asquala-online-learning-platform/asquala-online-school/components/landing/featured-courses.tsx) | Curriculum Showcase | Grid container showcasing course highlights and delegating presentation to reusable `<CourseCard />` components. |
| [components/shared/course-card.tsx](file:///home/eaglex/Documents/officials/Asquala-online-learning-platform/asquala-online-school/components/shared/course-card.tsx) | Reusable Course Card Primitive | Typed, reusable card displaying category badge, difficulty level, title, instructor name, lesson count, duration, rating, and enrollment button. |
| [components/landing/why-asquala.tsx](file:///home/eaglex/Documents/officials/Asquala-online-learning-platform/asquala-online-school/components/landing/why-asquala.tsx) | Value Proposition Pillars | 3 feature highlight cards: (1) Modular Curricula, (2) Targeted Assessments, and (3) Verified Completion. |
| [components/landing/cta-banner.tsx](file:///home/eaglex/Documents/officials/Asquala-online-learning-platform/asquala-online-school/components/landing/cta-banner.tsx) | Conversion Banner | Clean call-to-action strip encouraging learners to create an account and explore introductory courses. |

---

## 3. Component Hierarchy

```text
[app/page.tsx]
├── <Navbar /> (components/layout/navbar.tsx)
│   ├── Logo Image (/images/logo.png)
│   ├── Navigation Links (#courses, #categories, #features, #about)
│   └── Dynamic Auth State (Sign In / Register vs. Profile Badge / Sign Out)
│
└── <main>
    ├── <HeroSection /> (components/landing/hero-section.tsx)
    │   ├── Left Column: Title, Subtitle, CTAs, Feature Perks
    │   └── Right Column: Framed Illustration (/images/hero-illustration.jpg) & Quality Chip
    │
    ├── <TrustIndicators /> (components/landing/trust-indicators.tsx)
    │
    ├── <CategoriesSection /> (components/landing/categories-section.tsx)
    │
    ├── <FeaturedCourses /> (components/landing/featured-courses.tsx)
    │   └── 3x <CourseCard /> (components/shared/course-card.tsx)
    │
    ├── <WhyAsquala /> (components/landing/why-asquala.tsx)
    │
    └── <CtaBanner /> (components/landing/cta-banner.tsx)
│
└── <Footer /> (components/layout/footer.tsx)
```

---

## 4. Current Status & Verification
* **Responsive Layout**: Verified across mobile, tablet, and desktop viewports.
* **Component Modularity**: All landing components reside in their respective folders under `components/` and are fully decoupled.
* **Performance**: Zero external fonts blocking render; static assets optimized via Next.js `<Image />` component.
