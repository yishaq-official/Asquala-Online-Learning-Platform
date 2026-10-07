import {
  StudentStats,
  JumpBackInItem,
  UpcomingDeadline,
  CourseCatalogItem,
  CourseDetail,
  EnrolledCourseItem,
  QuizDetail,
  CertificateItem,
  StudentProfile,
  LearningPreferences,
  CourseResource,
  CourseAnnouncement,
} from "@/types/student";

export const MOCK_STUDENT_STATS: StudentStats = {
  enrolledCoursesCount: 4,
  totalHoursLearned: 34.5,
  currentStreakDays: 5,
  completedCertificatesCount: 2,
};

export const MOCK_JUMP_BACK_IN: JumpBackInItem = {
  courseTitle: "Next.js 16 Full-Stack Mastery with Drizzle & Auth",
  courseSlug: "nextjs-16-fullstack-mastery",
  moduleTitle: "Module 3: Authentication & Role-Based Authorization",
  lessonTitle: "Lesson 3.4: Server Actions & Protected Routing",
  lessonId: "lesson-3-4",
  progressPercentage: 68,
  durationMinutesRemaining: 14,
  thumbnailUrl: "/illustrations/nextjs-course.png",
};

export const MOCK_UPCOMING_DEADLINES: UpcomingDeadline[] = [
  {
    id: "deadline-1",
    title: "Module 3 Assessment: Auth & Session Handling",
    courseTitle: "Next.js 16 Full-Stack Mastery",
    courseSlug: "nextjs-16-fullstack-mastery",
    type: "quiz",
    dueDate: "2026-10-02T23:59:59Z",
    dueLabel: "Due Tomorrow",
    isUrgent: true,
  },
  {
    id: "deadline-2",
    title: "PostgreSQL Indexing & Optimization Assignment",
    courseTitle: "Modern PostgreSQL Architecture",
    courseSlug: "modern-postgresql-architecture",
    type: "milestone",
    dueDate: "2026-10-06T23:59:59Z",
    dueLabel: "Due in 5 days",
    isUrgent: false,
  },
  {
    id: "deadline-3",
    title: "Live Student Architecture Review with Yishaq",
    courseTitle: "Full-Stack Software Engineering",
    courseSlug: "nextjs-16-fullstack-mastery",
    type: "live_session",
    dueDate: "2026-10-08T16:00:00Z",
    dueLabel: "Friday • 4:00 PM",
    isUrgent: false,
  },
];

export const MOCK_CATALOG_COURSES: CourseCatalogItem[] = [
  {
    id: "course-1",
    slug: "nextjs-16-fullstack-mastery",
    title: "Next.js 16 Full-Stack Mastery with Drizzle & Auth",
    summary:
      "Build production-grade full-stack web applications with Next.js 16 App Router, PostgreSQL, Drizzle ORM, and Better-Auth.",
    thumbnailUrl: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80",
    category: "Web Development",
    level: "Intermediate",
    durationHours: 16.5,
    lessonsCount: 24,
    rating: 4.9,
    reviewCount: 1240,
    instructor: {
      name: "Yishaq Abreham",
      role: "Lead Software Architect",
      avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    },
    isEnrolled: true,
    price: "Included with Membership",
  },
  {
    id: "course-2",
    slug: "modern-postgresql-architecture",
    title: "Modern PostgreSQL Architecture, Indexing & Scaling",
    summary:
      "Deep dive into relational database internals, query planner optimization, connection pooling, and multi-tenant schema isolation.",
    thumbnailUrl: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=800&q=80",
    category: "Backend & DB",
    level: "Advanced",
    durationHours: 12.0,
    lessonsCount: 18,
    rating: 4.8,
    reviewCount: 890,
    instructor: {
      name: "Dr. Sarah Jenkins",
      role: "Database Systems Researcher",
      avatarUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80",
    },
    isEnrolled: true,
    price: "Included with Membership",
  },
  {
    id: "course-3",
    slug: "tailwind-css-v4-design-systems",
    title: "Tailwind CSS v4 & High-End Design Systems",
    summary:
      "Design and code modern, responsive, and accessible user interfaces utilizing CSS custom properties, OKLCH colors, and Tailwind v4 inline themes.",
    thumbnailUrl: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80",
    category: "UI/UX Design",
    level: "Beginner",
    durationHours: 8.5,
    lessonsCount: 16,
    rating: 5.0,
    reviewCount: 420,
    instructor: {
      name: "Alex Rivera",
      role: "Principal Product Designer",
      avatarUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80",
    },
    isEnrolled: true,
    price: "Included with Membership",
  },
  {
    id: "course-4",
    slug: "typescript-enterprise-patterns",
    title: "TypeScript Enterprise Architecture & Design Patterns",
    summary:
      "Master advanced TypeScript generic constraints, template literal types, domain-driven design, and strict type-safety patterns.",
    thumbnailUrl: "https://images.unsplash.com/photo-1516116211227-bbc042be68e7?auto=format&fit=crop&w=800&q=80",
    category: "Web Development",
    level: "Advanced",
    durationHours: 14.0,
    lessonsCount: 20,
    rating: 4.9,
    reviewCount: 960,
    instructor: {
      name: "Michael Chen",
      role: "Staff TypeScript Engineer",
      avatarUrl: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=200&q=80",
    },
    isEnrolled: true,
    price: "Included with Membership",
  },
  {
    id: "course-5",
    slug: "distributed-systems-go-docker",
    title: "Distributed Systems Engineering with Go & Docker",
    summary:
      "Build high-throughput microservices, event-driven pipelines with Kafka, and containerized cloud workloads using Go and Docker.",
    thumbnailUrl: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&w=800&q=80",
    category: "Cloud & DevOps",
    level: "Advanced",
    durationHours: 22.0,
    lessonsCount: 30,
    rating: 4.8,
    reviewCount: 710,
    instructor: {
      name: "Marcus Vance",
      role: "Cloud Infrastructure Lead",
      avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    },
    isEnrolled: false,
    price: "Free with Asquala Pro",
  },
  {
    id: "course-6",
    slug: "mobile-app-mastery-react-native",
    title: "Cross-Platform Mobile Apps with React Native & Expo",
    summary:
      "Ship native iOS and Android applications with Expo router, offline-first SQLite sync, and buttery smooth gesture animations.",
    thumbnailUrl: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80",
    category: "Mobile Apps",
    level: "Intermediate",
    durationHours: 18.0,
    lessonsCount: 26,
    rating: 4.7,
    reviewCount: 540,
    instructor: {
      name: "Elena Rostova",
      role: "Mobile Engineering Lead",
      avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
    },
    isEnrolled: false,
    price: "Free with Asquala Pro",
  },
];

export const MOCK_ENROLLED_COURSES: EnrolledCourseItem[] = [
  {
    courseId: "course-1",
    slug: "nextjs-16-fullstack-mastery",
    title: "Next.js 16 Full-Stack Mastery with Drizzle & Auth",
    thumbnailUrl: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80",
    category: "Web Development",
    instructorName: "Yishaq Abreham",
    lastAccessedAt: "2 hours ago",
    completedLessons: 16,
    totalLessons: 24,
    progressPercentage: 68,
    nextLessonId: "lesson-3-4",
    nextLessonTitle: "Lesson 3.4: Server Actions & Protected Routing",
    isCompleted: false,
  },
  {
    courseId: "course-2",
    slug: "modern-postgresql-architecture",
    title: "Modern PostgreSQL Architecture, Indexing & Scaling",
    thumbnailUrl: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=800&q=80",
    category: "Backend & DB",
    instructorName: "Dr. Sarah Jenkins",
    lastAccessedAt: "3 days ago",
    completedLessons: 4,
    totalLessons: 18,
    progressPercentage: 25,
    nextLessonId: "lesson-1-5",
    nextLessonTitle: "Lesson 1.5: B-Tree Index Mechanics",
    isCompleted: false,
  },
  {
    courseId: "course-3",
    slug: "tailwind-css-v4-design-systems",
    title: "Tailwind CSS v4 & High-End Design Systems",
    thumbnailUrl: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80",
    category: "UI/UX Design",
    instructorName: "Alex Rivera",
    lastAccessedAt: "1 week ago",
    completedLessons: 16,
    totalLessons: 16,
    progressPercentage: 100,
    isCompleted: true,
    certificateId: "cert-tw4-1049",
  },
  {
    courseId: "course-4",
    slug: "typescript-enterprise-patterns",
    title: "TypeScript Enterprise Architecture & Design Patterns",
    thumbnailUrl: "https://images.unsplash.com/photo-1516116211227-bbc042be68e7?auto=format&fit=crop&w=800&q=80",
    category: "Web Development",
    instructorName: "Michael Chen",
    lastAccessedAt: "2 weeks ago",
    completedLessons: 20,
    totalLessons: 20,
    progressPercentage: 100,
    isCompleted: true,
    certificateId: "cert-ts5-0812",
  },
];

export const MOCK_COURSE_DETAILS: Record<string, CourseDetail> = {
  "nextjs-16-fullstack-mastery": {
    ...MOCK_CATALOG_COURSES[0],
    description:
      "This comprehensive masterclass takes you from foundational concepts to architecting high-scale web platforms. You will construct end-to-end applications powered by Next.js 16 Server Components, secure authentication workflows, database migrations with Drizzle ORM, and crisp UI components designed with modern CSS custom variables.",
    whatYouWillLearn: [
      "Architect production Next.js 16 applications using the App Router and Server Actions",
      "Model relational data, run migrations, and write type-safe queries using Drizzle ORM",
      "Deploy and manage PostgreSQL containers in Docker for seamless local development",
      "Implement robust authentication and Role-Based Access Control (RBAC) with better-auth",
      "Build optimistic UI interactions with Zustand and seamless server synchronization",
      "Design accessible, responsive component libraries with strict light mode CSS variables",
    ],
    prerequisites: [
      "Comfortable with modern JavaScript (ES6+) and basic React concepts (hooks, props)",
      "Basic understanding of SQL queries and relational databases is helpful but not required",
      "Docker Desktop installed on your development machine",
    ],
    certificateAvailable: true,
    lastUpdated: "October 2026",
    language: "English",
    modules: [
      {
        id: "mod-1",
        title: "Module 1: Foundations & Local Development Setup",
        order: 1,
        lessons: [
          {
            id: "lesson-1-1",
            title: "Course Overview & Learning Outcomes",
            order: 1,
            durationMinutes: 6,
            type: "video",
            isCompleted: true,
            isPreview: true,
          },
          {
            id: "lesson-1-2",
            title: "Setting Up Docker & PostgreSQL 18 Locally",
            order: 2,
            durationMinutes: 14,
            type: "video",
            isCompleted: true,
            isPreview: true,
          },
          {
            id: "lesson-1-3",
            title: "Initializing Next.js 16 with TypeScript & Strict Tailwind v4",
            order: 3,
            durationMinutes: 12,
            type: "video",
            isCompleted: true,
          },
          {
            id: "lesson-1-4",
            title: "Foundations Milestone Assessment",
            order: 4,
            durationMinutes: 10,
            type: "quiz",
            isCompleted: true,
            quizId: "quiz-mod-1",
          },
        ],
      },
      {
        id: "mod-2",
        title: "Module 2: Database Modeling & Drizzle ORM",
        order: 2,
        lessons: [
          {
            id: "lesson-2-1",
            title: "Relational Schema Design & Table Constraints",
            order: 1,
            durationMinutes: 18,
            type: "video",
            isCompleted: true,
          },
          {
            id: "lesson-2-2",
            title: "Configuring the Drizzle Client Singleton Pool",
            order: 2,
            durationMinutes: 15,
            type: "video",
            isCompleted: true,
          },
          {
            id: "lesson-2-3",
            title: "Schema Migrations with drizzle-kit",
            order: 3,
            durationMinutes: 11,
            type: "reading",
            isCompleted: true,
          },
          {
            id: "lesson-2-4",
            title: "Writing Complex Relations & Type-Safe Joins",
            order: 4,
            durationMinutes: 20,
            type: "video",
            isCompleted: true,
          },
        ],
      },
      {
        id: "mod-3",
        title: "Module 3: Authentication & Role-Based Authorization",
        order: 3,
        lessons: [
          {
            id: "lesson-3-1",
            title: "Integrating better-auth with Drizzle Adapter",
            order: 1,
            durationMinutes: 22,
            type: "video",
            isCompleted: true,
          },
          {
            id: "lesson-3-2",
            title: "Building Reusable Form Primitives & Validation",
            order: 2,
            durationMinutes: 16,
            type: "video",
            isCompleted: true,
          },
          {
            id: "lesson-3-3",
            title: "Session Reactive Navbar & Sign Out Workflows",
            order: 3,
            durationMinutes: 12,
            type: "video",
            isCompleted: true,
          },
          {
            id: "lesson-3-4",
            title: "Server Actions & Protected Routing",
            order: 4,
            durationMinutes: 14,
            type: "video",
            isCurrent: true,
            isCompleted: false,
          },
          {
            id: "lesson-3-5",
            title: "Module 3 Authentication Quiz",
            order: 5,
            durationMinutes: 15,
            type: "quiz",
            isCompleted: false,
            quizId: "quiz-mod-3",
          },
        ],
      },
      {
        id: "mod-4",
        title: "Module 4: Student Learning Portal Architecture",
        order: 4,
        lessons: [
          {
            id: "lesson-4-1",
            title: "Designing the Distraction-Free Classroom Player",
            order: 1,
            durationMinutes: 25,
            type: "video",
            isCompleted: false,
          },
          {
            id: "lesson-4-2",
            title: "Real-Time Lesson Progress & Notes Persistence",
            order: 2,
            durationMinutes: 18,
            type: "video",
            isCompleted: false,
          },
          {
            id: "lesson-4-3",
            title: "Generating Verified Digital Credentials & PDF Badges",
            order: 3,
            durationMinutes: 20,
            type: "video",
            isCompleted: false,
          },
        ],
      },
    ],
  },
};

export const MOCK_SAMPLE_QUIZ: QuizDetail = {
  id: "quiz-mod-3",
  title: "Module 3 Assessment: Authentication & Authorization",
  courseTitle: "Next.js 16 Full-Stack Mastery",
  courseSlug: "nextjs-16-fullstack-mastery",
  moduleTitle: "Module 3: Authentication & Role-Based Authorization",
  durationMinutes: 15,
  passingScorePercentage: 70,
  questions: [
    {
      id: "q-1",
      questionText:
        "Which Drizzle ORM method is recommended for configuring client-side connection pooling with node-postgres?",
      codeSnippet: `import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
export const db = drizzle(pool);`,
      options: [
        { id: "opt-1", text: "Passing a shared Pool instance directly to drizzle(pool)" },
        { id: "opt-2", text: "Opening a new Client connection for every HTTP request" },
        { id: "opt-3", text: "Using drizzle-orm without a database connection string" },
        { id: "opt-4", text: "Invoking db.disconnect() after every query" },
      ],
      correctOptionId: "opt-1",
      explanation:
        "Passing a shared Pool instance allows Node.js to reuse active connections across incoming requests, preventing database connection exhaustion.",
    },
    {
      id: "q-2",
      questionText:
        "When extending the better-auth user schema with custom attributes such as 'role', which helper plugin is utilized?",
      options: [
        { id: "opt-1", text: "inferAdditionalFields<typeof auth>() on the client instance" },
        { id: "opt-2", text: "localStorage.setItem('user_role', 'student')" },
        { id: "opt-3", text: "dangerouslySetRole() in middleware" },
        { id: "opt-4", text: "Redux Thunk role injector" },
      ],
      correctOptionId: "opt-1",
      explanation:
        "better-auth provides inferAdditionalFields<typeof auth>() so the client TypeScript type definitions automatically recognize additional schema fields like 'role'.",
    },
    {
      id: "q-3",
      questionText:
        "Why is it essential in our design system to reference CSS custom properties (e.g. var(--primary)) instead of hardcoded hex values?",
      options: [
        { id: "opt-1", text: "To ensure consistent theming, frictionless brand adjustments, and no generic color drift" },
        { id: "opt-2", text: "Because Tailwind CSS v4 does not support hex values" },
        { id: "opt-3", text: "To make the application bundle size smaller" },
        { id: "opt-4", text: "Browsers only render CSS variables on Linux systems" },
      ],
      correctOptionId: "opt-1",
      explanation:
        "Relying on CSS custom variables centralizes our color palette in globals.css, ensuring strict adherence to the Emerald Green light mode system without color drift.",
    },
    {
      id: "q-4",
      questionText:
        "How should an unauthenticated student attempting to view /student/dashboard be handled?",
      options: [
        { id: "opt-1", text: "Redirect safely to /login with redirect query param preserved" },
        { id: "opt-2", text: "Render a blank white page without any notice" },
        { id: "opt-3", text: "Crash the Next.js server with an uncaught error" },
        { id: "opt-4", text: "Automatically sign them in as an admin" },
      ],
      correctOptionId: "opt-1",
      explanation:
        "Protected routes should verify session state and gracefully redirect unauthenticated visitors to /login, allowing them to return after authenticating.",
    },
    {
      id: "q-5",
      questionText:
        "What is the primary benefit of maintaining client UI state like sidebar collapse in Zustand rather than React URL state?",
      options: [
        { id: "opt-1", text: "It persists smoothly across route transitions without cluttering the URL address bar" },
        { id: "opt-2", text: "Zustand is faster than standard JavaScript variables" },
        { id: "opt-3", text: "URL parameters cannot hold boolean values" },
        { id: "opt-4", text: "It prevents students from opening developer tools" },
      ],
      correctOptionId: "opt-1",
      explanation:
        "Ephemeral UI preferences such as sidebar collapse or drawer toggles belong in client state stores like Zustand, keeping URLs clean and focused on content navigation.",
    },
  ],
};

export const MOCK_CERTIFICATES: CertificateItem[] = [
  {
    id: "cert-tw4-1049",
    courseTitle: "Tailwind CSS v4 & High-End Design Systems",
    courseSlug: "tailwind-css-v4-design-systems",
    studentName: "Alex Rivera",
    instructorName: "Alex Rivera",
    issueDate: "September 28, 2026",
    verificationCode: "ASQ-2026-TW4-1049",
    gradePercentage: 98,
    withDistinction: true,
  },
  {
    id: "cert-ts5-0812",
    courseTitle: "TypeScript Enterprise Architecture & Design Patterns",
    courseSlug: "typescript-enterprise-patterns",
    studentName: "Alex Rivera",
    instructorName: "Michael Chen",
    issueDate: "August 14, 2026",
    verificationCode: "ASQ-2026-TS5-0812",
    gradePercentage: 94,
    withDistinction: false,
  },
];

export const MOCK_STUDENT_PROFILE: StudentProfile = {
  name: "Alex Rivera",
  email: "alex.rivera@example.com",
  avatarUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80",
  headline: "Full-Stack Web Developer & Lifelong Learner",
  bio: "Passionate about building performant, accessible web apps with Next.js, TypeScript, PostgreSQL, and clean modern styling.",
  targetSkills: ["Next.js 16", "TypeScript", "PostgreSQL", "Drizzle ORM", "Tailwind CSS", "Docker"],
};

export const MOCK_LEARNING_PREFERENCES: LearningPreferences = {
  weeklyHoursGoal: 5,
  reminderDays: ["Mon", "Tue", "Wed", "Thu", "Fri"],
  reminderTime: "19:00",
  notifyAnnouncements: true,
  notifyDeadlines: true,
  notifyWeeklyDigest: true,
  notifyNewCourses: false,
};

export function getCourseDetailBySlug(slug: string): CourseDetail | null {
  if (MOCK_COURSE_DETAILS[slug]) {
    return MOCK_COURSE_DETAILS[slug];
  }

  const catalogItem = MOCK_CATALOG_COURSES.find((c) => c.slug === slug);
  if (!catalogItem) return null;

  return {
    ...catalogItem,
    description: `Dive deep into ${catalogItem.title}. This industry-focused curriculum covers foundational concepts up through enterprise-grade architecture, complete with interactive hands-on code labs, quizzes, and verified accreditation.`,
    whatYouWillLearn: [
      `Master core principles and best practices in ${catalogItem.category}`,
      "Construct production-ready projects with clean, modern architectural patterns",
      "Understand performance optimization, security, and scalability trade-offs",
      "Earn a verifiable digital certificate to showcase on your professional profile",
    ],
    prerequisites: [
      "Basic programming and developer tools literacy",
      "A code editor and development environment set up on your machine",
    ],
    certificateAvailable: true,
    lastUpdated: "October 2026",
    language: "English",
    modules: [
      {
        id: "mod-1",
        title: "Module 1: Orientation & Foundations",
        order: 1,
        lessons: [
          {
            id: "lesson-1-1",
            title: "Course Overview & Objectives",
            order: 1,
            durationMinutes: 8,
            type: "video",
            isPreview: true,
          },
          {
            id: "lesson-1-2",
            title: "Development Environment Setup",
            order: 2,
            durationMinutes: 14,
            type: "video",
            isPreview: true,
          },
          {
            id: "lesson-1-3",
            title: "Foundations Reading & Architecture Overview",
            order: 3,
            durationMinutes: 10,
            type: "reading",
          },
        ],
      },
      {
        id: "mod-2",
        title: "Module 2: Core Architecture & Implementation",
        order: 2,
        lessons: [
          {
            id: "lesson-2-1",
            title: "Designing Data Flows & State Machines",
            order: 1,
            durationMinutes: 20,
            type: "video",
          },
          {
            id: "lesson-2-2",
            title: "Hands-on Code Exercise & Test Suite",
            order: 2,
            durationMinutes: 25,
            type: "video",
          },
          {
            id: "lesson-2-3",
            title: "Module 2 Checkpoint Assessment",
            order: 3,
            durationMinutes: 15,
            type: "quiz",
          },
        ],
      },
    ],
  };
}

export const MOCK_COURSE_RESOURCES: CourseResource[] = [
  {
    id: "res-1",
    title: "Official Starter Repository & Docker Compose Configuration",
    type: "github",
    url: "https://github.com/asquala/nextjs-16-fullstack-starter",
  },
  {
    id: "res-2",
    title: "Complete Module 1-4 Architectural Cheatsheet & Diagrams",
    type: "pdf",
    size: "4.2 MB",
    url: "#",
  },
  {
    id: "res-3",
    title: "PostgreSQL Production Schema & Migration SQL Scripts",
    type: "pdf",
    size: "1.8 MB",
    url: "#",
  },
  {
    id: "res-4",
    title: "Full-Stack Exercise Code & Assets Package (.zip)",
    type: "zip",
    size: "16.4 MB",
    url: "#",
  },
];

export const MOCK_COURSE_ANNOUNCEMENTS: CourseAnnouncement[] = [
  {
    id: "anc-1",
    title: "Live Architecture Review & Q&A Session This Friday!",
    date: "2 days ago",
    content:
      "Join us live this Friday at 4:00 PM for an in-depth walkthrough of database pooling, Drizzle migrations, and real-world authentication patterns. Bring your questions!",
    authorName: "Yishaq Abreham",
    isPinned: true,
  },
  {
    id: "anc-2",
    title: "Module 3 Assessment & Code Solution Walkthrough Available",
    date: "1 week ago",
    content:
      "The Module 3 quiz has been published alongside downloadable solution zip files for the authentication laboratory.",
    authorName: "Yishaq Abreham",
    isPinned: false,
  },
];

export function getQuizById(quizId: string): QuizDetail {
  if (quizId === MOCK_SAMPLE_QUIZ.id) {
    return MOCK_SAMPLE_QUIZ;
  }

  return {
    ...MOCK_SAMPLE_QUIZ,
    id: quizId,
    title: `Assessment Checkpoint: ${quizId.toUpperCase()}`,
  };
}
