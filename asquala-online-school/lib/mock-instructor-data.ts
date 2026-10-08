import {
  InstructorApplication,
  InstructorCourseItem,
  InstructorStatKPIs,
  CourseSettingsData,
} from "@/types/instructor";
import { QuizDetail } from "@/types/student";
import { MOCK_SAMPLE_QUIZ } from "@/lib/mock-student-data";


export const MOCK_CURRENT_INSTRUCTOR_APPLICATION: InstructorApplication = {
  id: "ASQ-APP-2026-9812",
  userId: "user-inst-1",
  fullName: "Yishaq Abreham",
  email: "yishaq.abreham@asquala.edu",
  phone: "+251 91 123 4567",
  headline: "Senior Cloud & Full-Stack Systems Architect",
  bio: "Over 7 years of production software engineering experience in Addis Ababa. Passionate about empowering Ethiopian university students with modern Next.js, PostgreSQL, and distributed cloud computing skills.",
  websiteUrl: "https://yishaq-tech.et",
  linkedinUrl: "https://linkedin.com/in/yishaq-abreham",
  githubUrl: "https://github.com/yishaq-official",
  primarySubject: "Full-Stack Web Development & Cloud Systems",
  targetAudience: "Computer Science Students & Junior Developers",
  status: "under_review",
  submittedAt: "2026-10-07T14:30:00Z",
  education: [
    {
      id: "edu-1",
      degree: "B.Sc. in Computer Science & Engineering",
      institution: "Addis Ababa University (AAiT)",
      fieldOfStudy: "Software Engineering & Systems",
      graduationYear: 2020,
      documentName: "AAU_BSc_Computer_Science_Degree_Certificate.pdf",
      documentUrl: "#",
      isVerified: true,
    },
    {
      id: "edu-2",
      degree: "M.Sc. in Information Technology & Telecommunications",
      institution: "Addis Ababa Science & Technology University (AASTU)",
      fieldOfStudy: "Cloud Computing & Data Networks",
      graduationYear: 2023,
      documentName: "AASTU_MSc_Degree_Transcript_Official.pdf",
      documentUrl: "#",
      isVerified: false,
    },
  ],
  experience: [
    {
      id: "exp-1",
      role: "Lead Full-Stack Systems Architect",
      organization: "Ethiopian Artificial Intelligence Institute",
      yearsOfExperience: 4,
      isTeachingRole: false,
      description:
        "Architected scalable microservices, relational database clusters, and internal developer platforms for public-sector enterprise workloads.",
    },
    {
      id: "exp-2",
      role: "Visiting Lecturer & Technical Mentor",
      organization: "Addis Ababa Institute of Technology",
      yearsOfExperience: 3,
      isTeachingRole: true,
      description:
        "Instructed over 350 undergraduate engineering students in Web Architectures, Database Modeling, and Cloud API design.",
    },
  ],
  certifications: [
    {
      id: "cert-1",
      title: "AWS Certified Solutions Architect – Professional",
      issuingOrganization: "Amazon Web Services (AWS)",
      issueDate: "2024-03",
      credentialId: "AWS-PSA-9081249",
      documentName: "AWS_Solutions_Architect_Professional_Certificate.pdf",
      documentUrl: "#",
      isVerified: true,
    },
    {
      id: "cert-2",
      title: "Certified Kubernetes Administrator (CKA)",
      issuingOrganization: "Cloud Native Computing Foundation (CNCF)",
      issueDate: "2023-11",
      credentialId: "CKA-2300-87123",
      documentName: "CKA_LinuxFoundation_Accreditation.pdf",
      documentUrl: "#",
      isVerified: true,
    },
  ],
  sampleVideoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
};

export const MOCK_APPROVED_INSTRUCTOR_APPLICATION: InstructorApplication = {
  ...MOCK_CURRENT_INSTRUCTOR_APPLICATION,
  id: "ASQ-APP-2026-7731",
  status: "approved",
  reviewedAt: "2026-10-06T09:15:00Z",
  reviewNotes:
    "Approved with Distinction. All university degrees, academic transcripts, and professional cloud certifications have been verified by the Asquala Academic Review Board.",
};

export const MOCK_ACTION_REQUIRED_APPLICATION: InstructorApplication = {
  ...MOCK_CURRENT_INSTRUCTOR_APPLICATION,
  id: "ASQ-APP-2026-5542",
  status: "action_required",
  reviewedAt: "2026-10-08T08:00:00Z",
  reviewNotes:
    "The uploaded scan for your M.Sc. degree certificate (AASTU) is blurry and missing the official registrar stamp on page 2. Please re-upload a clear, certified color PDF scan of your final diploma to complete verification.",
};

export const MOCK_INSTRUCTOR_KPIS: InstructorStatKPIs = {
  totalRevenueETB: 148600,
  revenueThisMonthETB: 38400,
  totalStudentsCount: 1420,
  activeStudentsThisWeek: 310,
  averageRating: 4.9,
  totalReviewsCount: 385,
  publishedCoursesCount: 3,
  draftCoursesCount: 1,
};

export const MOCK_INSTRUCTOR_COURSES: InstructorCourseItem[] = [
  {
    id: "inst-course-1",
    title: "Next.js 16 Full-Stack Mastery",
    slug: "nextjs-16-fullstack-mastery",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80",
    category: "Web Development",
    status: "published",
    price: 1800,
    enrolledStudentsCount: 840,
    averageRating: 4.9,
    reviewsCount: 220,
    totalLessonsCount: 42,
    totalDurationMinutes: 520,
    publishedAt: "2026-08-15",
    lastUpdatedAt: "2026-10-02",
  },
  {
    id: "inst-course-2",
    title: "PostgreSQL & Drizzle ORM in Production",
    slug: "postgresql-drizzle-production",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=800&q=80",
    category: "Database & Backend",
    status: "published",
    price: 1200,
    enrolledStudentsCount: 420,
    averageRating: 4.8,
    reviewsCount: 115,
    totalLessonsCount: 28,
    totalDurationMinutes: 340,
    publishedAt: "2026-09-01",
    lastUpdatedAt: "2026-10-04",
  },
  {
    id: "inst-course-3",
    title: "Modern TypeScript 5 & Clean Design Patterns",
    slug: "typescript-clean-code",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1516116211227-bbc042be68e7?auto=format&fit=crop&w=800&q=80",
    category: "Software Engineering",
    status: "published",
    price: 950,
    enrolledStudentsCount: 160,
    averageRating: 5.0,
    reviewsCount: 50,
    totalLessonsCount: 22,
    totalDurationMinutes: 260,
    publishedAt: "2026-09-20",
    lastUpdatedAt: "2026-10-06",
  },
  {
    id: "inst-course-4",
    title: "Docker & Kubernetes for Cloud Native Apps",
    slug: "docker-kubernetes-cloud-native",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&w=800&q=80",
    category: "DevOps & Cloud",
    status: "draft",
    price: 2400,
    enrolledStudentsCount: 0,
    averageRating: 0,
    reviewsCount: 0,
    totalLessonsCount: 14,
    totalDurationMinutes: 180,
    lastUpdatedAt: "2026-10-07",
  },
];

export function getInstructorCourseById(courseId: string): InstructorCourseItem | undefined {
  return MOCK_INSTRUCTOR_COURSES.find(
    (c) => c.id === courseId || c.slug === courseId
  );
}

export function getInstructorCourseCurriculum(courseId: string) {
  const course = getInstructorCourseById(courseId);
  const slug = course?.slug || courseId;

  // If course matches Next.js 16 Full-Stack Mastery, provide rich 5-module curriculum
  if (slug === "nextjs-16-fullstack-mastery" || courseId === "inst-course-1") {
    return [
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
            type: "video" as const,
            isPreview: true,
            videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
            resources: [
              {
                id: "res-1",
                title: "Course Architecture Slides (PDF)",
                type: "pdf" as const,
                url: "#",
                size: "4.2 MB",
              },
            ],
          },
          {
            id: "lesson-1-2",
            title: "Setting Up Docker & PostgreSQL 18 Locally",
            order: 2,
            durationMinutes: 14,
            type: "video" as const,
            isPreview: true,
            videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
          },
          {
            id: "lesson-1-3",
            title: "Initializing Next.js 16 with TypeScript & Strict Tailwind v4",
            order: 3,
            durationMinutes: 12,
            type: "video" as const,
            isPreview: false,
            videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
          },
          {
            id: "lesson-1-4",
            title: "Foundations Milestone Assessment",
            order: 4,
            durationMinutes: 10,
            type: "quiz" as const,
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
            type: "video" as const,
            isPreview: false,
            videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
          },
          {
            id: "lesson-2-2",
            title: "Configuring the Drizzle Client Singleton Pool",
            order: 2,
            durationMinutes: 15,
            type: "video" as const,
            isPreview: false,
            videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
          },
          {
            id: "lesson-2-3",
            title: "Schema Migrations with drizzle-kit",
            order: 3,
            durationMinutes: 11,
            type: "reading" as const,
            readingContent: "## Database Schema Migrations\n\nLearn how to configure `drizzle-kit generate` and apply automated schema migrations without database downtime.",
          },
          {
            id: "lesson-2-4",
            title: "Relational Queries & Complex Joins",
            order: 4,
            durationMinutes: 16,
            type: "video" as const,
            isPreview: false,
            videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
          },
        ],
      },
      {
        id: "mod-3",
        title: "Module 3: Server Actions & Safe Mutations",
        order: 3,
        lessons: [
          {
            id: "lesson-3-1",
            title: "Next.js 16 Server Actions Architecture",
            order: 1,
            durationMinutes: 14,
            type: "video" as const,
            isPreview: false,
            videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
          },
          {
            id: "lesson-3-2",
            title: "Form Validation with Zod & Optimistic UI",
            order: 2,
            durationMinutes: 17,
            type: "video" as const,
            isPreview: false,
            videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
          },
          {
            id: "lesson-3-3",
            title: "Module 3 Mutation & Security Assessment",
            order: 3,
            durationMinutes: 12,
            type: "quiz" as const,
            quizId: "quiz-mod-3",
          },
        ],
      },
    ];
  }

  // Fallback default modules for any other course
  return [
    {
      id: "mod-1",
      title: "Module 1: Introduction & Architecture Setup",
      order: 1,
      lessons: [
        {
          id: "lesson-1-1",
          title: "Course Overview & Objectives",
          order: 1,
          durationMinutes: 10,
          type: "video" as const,
          isPreview: true,
          videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        },
        {
          id: "lesson-1-2",
          title: "Setting Up Development Environment",
          order: 2,
          durationMinutes: 15,
          type: "reading" as const,
          readingContent: "## Environment Setup\n\nEnsure you have Node.js 22+, Docker, and your preferred code editor installed.",
        },
      ],
    },
    {
      id: "mod-2",
      title: "Module 2: Practical Implementation & Lab",
      order: 2,
      lessons: [
        {
          id: "lesson-2-1",
          title: "Building Production Services",
          order: 1,
          durationMinutes: 20,
          type: "video" as const,
          isPreview: false,
          videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        },
        {
          id: "lesson-2-2",
          title: "Module 2 Comprehension Quiz",
          order: 2,
          durationMinutes: 15,
          type: "quiz" as const,
          quizId: "quiz-mod-2",
        },
      ],
    },
  ];
}

export function getInstructorCourseSettings(courseId: string): CourseSettingsData {
  const course = getInstructorCourseById(courseId);
  const slug = course?.slug || courseId;

  if (slug === "nextjs-16-fullstack-mastery" || courseId === "inst-course-1") {
    return {
      id: "inst-course-1",
      slug: "nextjs-16-fullstack-mastery",
      title: "Next.js 16 Full-Stack Mastery",
      subtitle: "Production Architecture, Drizzle ORM, Docker & Tailwind CSS",
      description:
        "This comprehensive masterclass takes you from foundational concepts to architecting high-scale web platforms. You will construct end-to-end applications powered by Next.js 16 Server Components, secure authentication workflows, database migrations with Drizzle ORM, and crisp UI components designed with modern CSS custom variables.",
      category: "Web Development",
      level: "Intermediate",
      language: "English",
      thumbnailUrl:
        "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80",
      promotionalVideoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      whatYouWillLearn: [
        "Architect production Next.js 16 applications using the App Router and Server Actions",
        "Model relational data, run migrations, and write type-safe queries using Drizzle ORM",
        "Deploy and manage PostgreSQL containers in Docker for seamless local development",
        "Implement robust authentication and Role-Based Access Control (RBAC)",
        "Build optimistic UI interactions with Zustand and seamless server synchronization",
        "Design accessible, responsive component libraries with strict light mode CSS variables",
      ],
      prerequisites: [
        "Comfortable with modern JavaScript (ES6+) and basic React concepts (hooks, props)",
        "Basic understanding of SQL queries and relational databases is helpful",
        "Docker Desktop installed on your development machine",
      ],
      isPaid: true,
      priceETB: 1800,
      status: "published",
      certificateAvailable: true,
    };
  }

  // Fallback for other courses or drafts
  return {
    id: course?.id || courseId,
    slug: course?.slug || "custom-course",
    title: course?.title || "Docker & Kubernetes for Cloud Native Apps",
    subtitle: "Enterprise containerization, orchestration, and continuous deployment workflows",
    description:
      "A hands-on, production-focused engineering course that prepares students to containerize microservices, deploy resilient Kubernetes clusters, and automate cloud environments with confidence.",
    category: course?.category || "DevOps & Cloud",
    level: "Intermediate",
    language: "English",
    thumbnailUrl:
      course?.thumbnailUrl ||
      "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&w=800&q=80",
    promotionalVideoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    whatYouWillLearn: [
      "Containerize multi-stage Node.js and Next.js applications with minimal image footprint",
      "Deploy persistent volumes, secrets, and config maps across Kubernetes namespaces",
      "Configure ingress controllers, SSL termination, and horizontal pod autoscalers",
    ],
    prerequisites: [
      "Foundational Linux shell commands and bash scripting",
      "Familiarity with Git and software development workflows",
    ],
    isPaid: (course?.price || 0) > 0,
    priceETB: course?.price || 2400,
    status: course?.status || "draft",
    certificateAvailable: true,
  };
}

export function getInstructorCourseQuizzes(courseId: string): QuizDetail[] {
  const course = getInstructorCourseById(courseId);
  const slug = course?.slug || courseId;

  return [
    {
      ...MOCK_SAMPLE_QUIZ,
      id: "quiz-mod-1",
      title: "Module 1 Assessment: Foundations & Dev Setup",
      courseTitle: course?.title || "Next.js 16 Full-Stack Mastery",
      courseSlug: slug,
      moduleTitle: "Module 1: Foundations & Local Development Setup",
      durationMinutes: 10,
      passingScorePercentage: 80,
    },
    {
      ...MOCK_SAMPLE_QUIZ,
      id: "quiz-mod-3",
      title: "Module 3 Assessment: Authentication & Authorization",
      courseTitle: course?.title || "Next.js 16 Full-Stack Mastery",
      courseSlug: slug,
      moduleTitle: "Module 3: Authentication & Role-Based Authorization",
      durationMinutes: 15,
      passingScorePercentage: 75,
    },
  ];
}

export interface StudentReviewItem {
  id: string;
  studentName: string;
  studentRole: string;
  courseTitle: string;
  rating: number;
  date: string;
  content: string;
  instructorReply?: {
    date: string;
    content: string;
  };
}

export const MOCK_INSTRUCTOR_ANALYTICS = {
  overview: {
    totalEnrollments: 1420,
    activeLearnersThisMonth: 860,
    avgCompletionRate: 68,
    avgQuizScore: 84,
    npsScore: 78,
  },
  monthlyTrends: [
    { month: "May", enrollments: 95, revenueETB: 12400 },
    { month: "Jun", enrollments: 140, revenueETB: 18200 },
    { month: "Jul", enrollments: 210, revenueETB: 27500 },
    { month: "Aug", enrollments: 280, revenueETB: 35600 },
    { month: "Sep", enrollments: 345, revenueETB: 43800 },
    { month: "Oct", enrollments: 350, revenueETB: 44200 },
  ],
  regionalBreakdown: [
    { city: "Addis Ababa", percentage: 56, count: 795 },
    { city: "Hawassa", percentage: 14, count: 198 },
    { city: "Bahir Dar", percentage: 12, count: 170 },
    { city: "Jimma & Adama", percentage: 11, count: 156 },
    { city: "Mekelle & Dire Dawa", percentage: 7, count: 101 },
  ],
  funnelStages: [
    { stage: "Module 1: Foundations Setup", completionPercentage: 94, dropoffRate: 6 },
    { stage: "Module 2: Database Modeling", completionPercentage: 81, dropoffRate: 13 },
    { stage: "Module 3: Server Actions & Auth", completionPercentage: 70, dropoffRate: 11 },
    { stage: "Module 4: Performance Caching", completionPercentage: 62, dropoffRate: 8 },
    { stage: "Module 5: AWS Capstone Deployment", completionPercentage: 54, dropoffRate: 8 },
  ],
  assessmentInsights: {
    averageScore: 82,
    passRatePercentage: 79,
    totalAttempts: 1240,
    hardestQuestions: [
      {
        question: "Drizzle client singleton connection pooling configuration",
        module: "Module 2",
        accuracyPercentage: 54,
        attemptsCount: 380,
      },
      {
        question: "better-auth client schema extension with custom roles",
        module: "Module 3",
        accuracyPercentage: 61,
        attemptsCount: 340,
      },
      {
        question: "Partial Prerendering (PPR) cache invalidation triggers",
        module: "Module 4",
        accuracyPercentage: 66,
        attemptsCount: 290,
      },
    ],
  },
  reviews: [
    {
      id: "rev-1",
      studentName: "Natnael Tefera",
      studentRole: "Software Engineering Student @ AAiT",
      courseTitle: "Next.js 16 Full-Stack Mastery",
      rating: 5,
      date: "2 days ago",
      content:
        "The best Next.js 16 practical course available in Ethiopia! The step-by-step guidance on PostgreSQL Docker containers and Drizzle ORM helped me ace my university final project.",
      instructorReply: {
        date: "1 day ago",
        content: "Thank you Natnael! Thrilled that the Docker & Drizzle modules gave you a competitive edge in your AAiT projects. Keep building!",
      },
    },
    {
      id: "rev-2",
      studentName: "Bethlehem Haile",
      studentRole: "Junior Full-Stack Developer",
      courseTitle: "Next.js 16 Full-Stack Mastery",
      rating: 5,
      date: "5 days ago",
      content:
        "Clear explanations, zero unnecessary fluff. The milestone assessments really test whether you understand the underlying concepts rather than just copy-pasting code.",
    },
    {
      id: "rev-3",
      studentName: "Kidus Melaku",
      studentRole: "Backend Developer @ Fintech",
      courseTitle: "PostgreSQL & Drizzle ORM in Production",
      rating: 5,
      date: "1 week ago",
      content:
        "Finally an advanced database course taught by someone with real production experience in Addis Ababa. The query optimization tricks saved our team hours.",
    },
    {
      id: "rev-4",
      studentName: "Selamawit Girma",
      studentRole: "Computer Science Sophomore @ AASTU",
      courseTitle: "Modern TypeScript 5 & Clean Design Patterns",
      rating: 4,
      date: "2 weeks ago",
      content:
        "Great course overall! Would love to see an additional lesson on generic conditional types with distributed unions in the next update.",
      instructorReply: {
        date: "1 week ago",
        content: "Thanks Selamawit! Great suggestion — I am currently preparing an advanced bonus lesson covering distributive conditional types for Module 4.",
      },
    },
  ],
};

export interface InstructorQaReply {
  id: string;
  authorName: string;
  authorRole: "instructor" | "student";
  createdAt: string;
  content: string;
  isOfficialAnswer?: boolean;
  upvotesCount?: number;
}

export interface InstructorQaThread {
  id: string;
  courseId: string;
  courseTitle: string;
  lessonId: string;
  lessonTitle: string;
  timestampOrSection?: string;
  studentName: string;
  studentRole: string;
  title: string;
  questionText: string;
  codeSnippet?: string;
  createdAt: string;
  isResolved: boolean;
  upvotesCount: number;
  replies: InstructorQaReply[];
}

export const MOCK_INSTRUCTOR_QA_THREADS: InstructorQaThread[] = [
  {
    id: "qa-1",
    courseId: "inst-course-1",
    courseTitle: "Next.js 16 Full-Stack Mastery",
    lessonId: "lesson-1-2",
    lessonTitle: "Setting Up Docker & PostgreSQL 18 Locally",
    timestampOrSection: "Video at 08:42",
    studentName: "Amanuel Dagne",
    studentRole: "CS Junior @ Addis Ababa University",
    title: "Connection refused error on port 5432 in Docker container",
    questionText:
      "When running the docker container command shown in the lesson, my terminal throws: 'Error: bind: address already in use: 0.0.0.0:5432'. How do I inspect if an existing system PostgreSQL service is conflicting with the docker daemon on Ubuntu?",
    codeSnippet: `sudo docker run -d \\
  --name asquala-postgres \\
  -e POSTGRES_PASSWORD=postgres \\
  -p 5432:5432 \\
  postgres:18-alpine`,
    createdAt: "15 minutes ago",
    isResolved: false,
    upvotesCount: 3,
    replies: [],
  },
  {
    id: "qa-2",
    courseId: "inst-course-2",
    courseTitle: "PostgreSQL & Drizzle ORM in Production",
    lessonId: "lesson-2-3",
    lessonTitle: "Schema Migrations with drizzle-kit",
    timestampOrSection: "Section: ALTER TYPE",
    studentName: "Tsion Bekele",
    studentRole: "Junior Backend Engineer",
    title: "Drizzle migrations failing with enum constraint violation",
    questionText:
      "When adding an extra status value to our pgEnum schema, running drizzle-kit generate works, but the subsequent migration fails saying the type cannot be altered in a transaction block. What is the recommended workaround?",
    codeSnippet: `export const roleEnum = pgEnum('role', [
  'student',
  'instructor',
  'admin',
  'academic_reviewer' // New value causing error
]);`,
    createdAt: "2 hours ago",
    isResolved: false,
    upvotesCount: 5,
    replies: [],
  },
  {
    id: "qa-3",
    courseId: "inst-course-1",
    courseTitle: "Next.js 16 Full-Stack Mastery",
    lessonId: "lesson-3-2",
    lessonTitle: "Form Validation with Zod & Optimistic UI",
    timestampOrSection: "Video at 14:15",
    studentName: "Yohannes Alemu",
    studentRole: "Frontend Developer",
    title: "Server Action optimistic update reverts prematurely on slow networks",
    questionText:
      "Testing the optimistic comment list on a simulated 3G network shows the new comment appearing, then disappearing for 2 seconds before finally confirming. Is there a way to hold the optimistic payload until the Promise settles?",
    createdAt: "5 hours ago",
    isResolved: false,
    upvotesCount: 2,
    replies: [],
  },
  {
    id: "qa-4",
    courseId: "inst-course-2",
    courseTitle: "PostgreSQL & Drizzle ORM in Production",
    lessonId: "lesson-2-2",
    lessonTitle: "Configuring the Drizzle Client Singleton Pool",
    timestampOrSection: "Section: SSL Mode",
    studentName: "Blen Mengistu",
    studentRole: "Software Engineering Student @ AASTU",
    title: "How to configure SSL connection pool parameters for hosted databases?",
    questionText:
      "I am testing our application with a remote PostgreSQL instance on Aiven. How should we configure the node-postgres Pool options in TypeScript to handle SSL certificates properly without security warnings?",
    codeSnippet: `import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});`,
    createdAt: "1 day ago",
    isResolved: true,
    upvotesCount: 8,
    replies: [
      {
        id: "rep-qa-4",
        authorName: "Yishaq Abreham",
        authorRole: "instructor",
        createdAt: "Yesterday",
        content:
          "Great question Blen! For cloud-hosted providers like Aiven, AWS RDS, or Supabase, passing `ssl: { rejectUnauthorized: false }` or downloading their CA root certificate and supplying `ca: fs.readFileSync('./ca.pem')` is the production standard. Make sure your `DATABASE_URL` also includes `?sslmode=require`.",
        isOfficialAnswer: true,
        upvotesCount: 4,
      },
    ],
  },
  {
    id: "qa-5",
    courseId: "inst-course-3",
    courseTitle: "Modern TypeScript 5 & Clean Design Patterns",
    lessonId: "lesson-1-3",
    lessonTitle: "Discriminated Unions & Safe Narrowing",
    timestampOrSection: "Reading Guide",
    studentName: "Ephrem Tadesse",
    studentRole: "Web Developer",
    title: "Zod discriminatedUnion schema inference issue with generic types",
    questionText:
      "When constructing a discriminated union with more than 4 member types, TypeScript strict mode complains about the index signature. Is there a helper pattern to keep it clean?",
    createdAt: "3 days ago",
    isResolved: true,
    upvotesCount: 6,
    replies: [
      {
        id: "rep-qa-5",
        authorName: "Yishaq Abreham",
        authorRole: "instructor",
        createdAt: "2 days ago",
        content:
          "Hey Ephrem, make sure each schema in the union array specifies the exact literal discriminant: `z.object({ type: z.literal('success'), ... })`. If you have dynamic keys, consider using `z.custom()` or a discriminated tuple instead.",
        isOfficialAnswer: true,
        upvotesCount: 5,
      },
    ],
  },
];

export type PayoutMethodType = "telebirr" | "cbe_bank" | "cbe_birr" | "awash_bank";

export interface InstructorPayoutMethod {
  id: string;
  type: PayoutMethodType;
  title: string;
  accountIdentifier: string;
  accountHolderName: string;
  isDefault: boolean;
}

export interface PayoutTransactionItem {
  id: string;
  transactionRef: string;
  date: string;
  amountETB: number;
  method: PayoutMethodType;
  methodLabel: string;
  accountDetails: string;
  status: "completed" | "processing" | "pending";
}

export interface InstructorEarningsData {
  availableBalanceETB: number;
  pendingClearanceETB: number;
  lifetimeEarningsETB: number;
  totalPaidOutETB: number;
  thisMonthRevenueETB: number;
  payoutMethods: InstructorPayoutMethod[];
  transactions: PayoutTransactionItem[];
}

export const MOCK_INSTRUCTOR_EARNINGS: InstructorEarningsData = {
  availableBalanceETB: 24800,
  pendingClearanceETB: 13600,
  lifetimeEarningsETB: 148600,
  totalPaidOutETB: 110200,
  thisMonthRevenueETB: 38400,
  payoutMethods: [
    {
      id: "pm-1",
      type: "telebirr",
      title: "Telebirr Mobile Wallet",
      accountIdentifier: "+251 91 123 4567",
      accountHolderName: "Yishaq Abreham",
      isDefault: true,
    },
    {
      id: "pm-2",
      type: "cbe_bank",
      title: "Commercial Bank of Ethiopia (CBE)",
      accountIdentifier: "1000 1849 20194",
      accountHolderName: "Yishaq Abreham",
      isDefault: false,
    },
  ],
  transactions: [
    {
      id: "tx-1",
      transactionRef: "ASQ-PAY-2026-901",
      date: "Oct 01, 2026",
      amountETB: 28000,
      method: "telebirr",
      methodLabel: "Telebirr Wallet",
      accountDetails: "+251 91 123 4567",
      status: "completed",
    },
    {
      id: "tx-2",
      transactionRef: "ASQ-PAY-2026-784",
      date: "Sep 15, 2026",
      amountETB: 35000,
      method: "cbe_bank",
      methodLabel: "Commercial Bank of Ethiopia",
      accountDetails: "1000 1849 20194",
      status: "completed",
    },
    {
      id: "tx-3",
      transactionRef: "ASQ-PAY-2026-642",
      date: "Sep 01, 2026",
      amountETB: 24500,
      method: "telebirr",
      methodLabel: "Telebirr Wallet",
      accountDetails: "+251 91 123 4567",
      status: "completed",
    },
    {
      id: "tx-4",
      transactionRef: "ASQ-PAY-2026-512",
      date: "Aug 15, 2026",
      amountETB: 22700,
      method: "cbe_bank",
      methodLabel: "Commercial Bank of Ethiopia",
      accountDetails: "1000 1849 20194",
      status: "completed",
    },
  ],
};






