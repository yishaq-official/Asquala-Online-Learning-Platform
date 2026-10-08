import {
  InstructorApplication,
  InstructorCourseItem,
  InstructorStatKPIs,
} from "@/types/instructor";

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

