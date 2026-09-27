import Link from "next/link";
import { CourseCard, CourseCardProps } from "@/components/shared/course-card";

export function FeaturedCourses() {
  const featuredCourses: CourseCardProps[] = [
    {
      title: "Modern Full-Stack Web Development with Next.js",
      category: "Software Engineering",
      instructor: "Dr. Henok T.",
      level: "Intermediate",
      lessons: "24 Lessons",
      duration: "36 Hours",
      rating: "4.9",
      price: "Free",
    },
    {
      title: "PostgreSQL & Database Systems Architecture",
      category: "Backend & Systems",
      instructor: "Bethlehem A.",
      level: "Advanced",
      lessons: "18 Lessons",
      duration: "28 Hours",
      rating: "4.8",
      price: "Free",
    },
    {
      title: "Applied Machine Learning and Python Data Pipelines",
      category: "Data Science",
      instructor: "Yonas K.",
      level: "Beginner",
      lessons: "30 Lessons",
      duration: "45 Hours",
      rating: "5.0",
      price: "Free",
    },
  ];

  return (
    <section
      id="courses"
      className="py-16 md:py-24 bg-card border-b border-border"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-primary">
              Curriculum Highlights
            </h2>
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mt-1">
              Featured Courses
            </h3>
          </div>
          <Link
            href="#courses"
            className="text-sm font-semibold text-primary hover:text-primary-hover flex items-center gap-1.5 mt-2 md:mt-0"
          >
            View all courses <span>→</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredCourses.map((course, idx) => (
            <CourseCard key={idx} {...course} />
          ))}
        </div>
      </div>
    </section>
  );
}
