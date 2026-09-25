import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      {/* Navigation Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border bg-card/95 backdrop-blur-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold text-xl shadow-xs transition-transform group-hover:scale-105">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5"
              >
                <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z" />
                <path d="M6 6h10" />
                <path d="M6 10h10" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-xl tracking-tight text-foreground leading-tight">
                Asquala
              </span>
              <span className="text-[10px] uppercase font-semibold tracking-wider text-muted-foreground">
                Online Learning
              </span>
            </div>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
            <Link
              href="#courses"
              className="transition-colors hover:text-foreground hover:font-semibold"
            >
              Courses
            </Link>
            <Link
              href="#categories"
              className="transition-colors hover:text-foreground hover:font-semibold"
            >
              Categories
            </Link>
            <Link
              href="#features"
              className="transition-colors hover:text-foreground hover:font-semibold"
            >
              Features
            </Link>
            <Link
              href="#about"
              className="transition-colors hover:text-foreground hover:font-semibold"
            >
              About
            </Link>
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="px-4 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/register"
              className="px-4 py-2 text-sm font-medium rounded-lg bg-primary text-primary-foreground hover:bg-primary-hover shadow-xs transition-colors"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative pt-12 pb-16 md:pt-16 md:pb-20 border-b border-border bg-card">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Left Column: Text & CTAs */}
              <div className="lg:col-span-6 flex flex-col items-start">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground leading-[1.2]">
                  Structured online learning for{" "}
                  <span className="text-primary underline decoration-primary-border underline-offset-6">
                    real-world mastery
                  </span>
                </h1>

                <p className="mt-5 text-base sm:text-lg text-muted-foreground leading-relaxed max-w-xl">
                  Step-by-step curricula crafted by experienced practitioners. Build
                  proven competence with modular lessons, targeted assessments, and
                  verified certificates.
                </p>

                {/* Key Value Checklist */}
                <div className="mt-6 flex flex-col gap-2.5 text-sm text-foreground">
                  <div className="flex items-center gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-primary-light text-primary flex items-center justify-center font-bold text-xs">
                      ✓
                    </span>
                    <span>Industry-aligned curricula subdivided into clear lessons</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-primary-light text-primary flex items-center justify-center font-bold text-xs">
                      ✓
                    </span>
                    <span>Automated quizzes and practical assessment feedback</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-primary-light text-primary flex items-center justify-center font-bold text-xs">
                      ✓
                    </span>
                    <span>Verifiable completion certificates for career growth</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-8 flex flex-col sm:flex-row items-center gap-3.5 w-full sm:w-auto">
                  <Link
                    href="#courses"
                    className="w-full sm:w-auto px-6 py-3 text-sm font-semibold rounded-lg bg-primary text-primary-foreground hover:bg-primary-hover shadow-xs transition-all text-center"
                  >
                    Explore Courses
                  </Link>
                  <Link
                    href="#features"
                    className="w-full sm:w-auto px-6 py-3 text-sm font-semibold rounded-lg border border-border bg-background hover:bg-secondary text-foreground transition-all text-center"
                  >
                    How Asquala Works
                  </Link>
                </div>
              </div>

              {/* Right Column: Beautiful Illustration & Visual Anchor */}
              <div className="lg:col-span-6 relative">
                <div className="relative rounded-2xl border border-border bg-background p-2.5 shadow-sm overflow-hidden group">
                  <div className="relative rounded-xl overflow-hidden aspect-4/3 bg-slate-100">
                    <Image
                      src="/images/hero-illustration.jpg"
                      alt="Asquala student learning online with structured modules"
                      width={800}
                      height={600}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                      priority
                    />
                  </div>

                  {/* Floating Subtle Quality Badge */}
                  <div className="absolute bottom-5 left-5 right-5 sm:right-auto bg-card/95 backdrop-blur-xs border border-border rounded-lg px-4 py-2.5 shadow-xs flex items-center gap-3">
                    <div className="w-8 h-8 rounded-md bg-primary-light text-primary flex items-center justify-center font-bold text-sm">
                      ★
                    </div>
                    <div className="text-xs">
                      <div className="font-bold text-foreground">Curated Course Catalog</div>
                      <div className="text-muted-foreground">Certified & verified instructors</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Trust Indicators / Stats Bar */}
            <div className="mt-14 pt-8 border-t border-border grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-2xl font-bold text-foreground">15,000+</div>
                <div className="text-xs text-muted-foreground font-medium mt-0.5">
                  Active Students
                </div>
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">120+</div>
                <div className="text-xs text-muted-foreground font-medium mt-0.5">
                  Verified Courses
                </div>
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">98%</div>
                <div className="text-xs text-muted-foreground font-medium mt-0.5">
                  Completion Rate
                </div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">4.9 / 5.0</div>
                <div className="text-xs text-muted-foreground font-medium mt-0.5">
                  Learner Satisfaction
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section id="categories" className="py-16 md:py-20 bg-background border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
              <div>
                <h2 className="text-xs font-bold uppercase tracking-wider text-primary">
                  Disciplines
                </h2>
                <h3 className="text-2xl md:text-3xl font-bold text-foreground mt-1">
                  Explore Learning Tracks
                </h3>
              </div>
              <p className="text-sm text-muted-foreground max-w-md mt-2 md:mt-0">
                Curated specializations aligned with industry standards and real-world execution.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  title: "Software Engineering",
                  desc: "Full-stack development, backend systems, APIs & databases.",
                  courses: "34 Courses",
                  icon: (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-6 h-6 text-primary"
                    >
                      <polyline points="16 18 22 12 16 6" />
                      <polyline points="8 6 2 12 8 18" />
                    </svg>
                  ),
                },
                {
                  title: "Data Science & AI",
                  desc: "Machine learning, statistical analysis, Python and models.",
                  courses: "22 Courses",
                  icon: (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-6 h-6 text-primary"
                    >
                      <path d="M12 2v20" />
                      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                    </svg>
                  ),
                },
                {
                  title: "Product & UI/UX Design",
                  desc: "User research, wireframing, component systems, and UX strategy.",
                  courses: "18 Courses",
                  icon: (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-6 h-6 text-primary"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <circle cx="12" cy="12" r="4" />
                    </svg>
                  ),
                },
                {
                  title: "Business & Management",
                  desc: "Leadership, tech entrepreneurship, agile workflows, and finance.",
                  courses: "16 Courses",
                  icon: (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-6 h-6 text-primary"
                    >
                      <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
                      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                    </svg>
                  ),
                },
              ].map((category, index) => (
                <div
                  key={index}
                  className="p-6 rounded-xl border border-border bg-card hover:border-primary-border hover:shadow-xs transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="w-12 h-12 rounded-lg bg-primary-light flex items-center justify-center mb-4 transition-transform group-hover:scale-105">
                      {category.icon}
                    </div>
                    <h4 className="font-bold text-lg text-foreground mb-1.5 group-hover:text-primary transition-colors">
                      {category.title}
                    </h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {category.desc}
                    </p>
                  </div>
                  <div className="mt-5 pt-4 border-t border-border flex items-center justify-between text-xs font-semibold text-primary">
                    <span>{category.courses}</span>
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Courses Section */}
        <section id="courses" className="py-16 md:py-24 bg-card border-b border-border">
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
              {[
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
              ].map((course, idx) => (
                <div
                  key={idx}
                  className="rounded-xl border border-border bg-background overflow-hidden flex flex-col hover:border-primary-border hover:shadow-xs transition-all"
                >
                  {/* Visual Course Header */}
                  <div className="p-6 border-b border-border bg-primary-light flex items-center justify-between">
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-card text-accent-foreground border border-primary-border">
                      {course.category}
                    </span>
                    <span className="text-xs font-semibold text-muted-foreground">
                      {course.level}
                    </span>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="font-bold text-lg text-foreground hover:text-primary transition-colors cursor-pointer leading-snug">
                        {course.title}
                      </h4>
                      <div className="text-xs text-muted-foreground mt-2 flex items-center gap-2">
                        <span>Instructor: <strong className="text-foreground font-medium">{course.instructor}</strong></span>
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-border">
                      <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                        <span>{course.lessons}</span>
                        <span>•</span>
                        <span>{course.duration}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1 font-semibold text-warning">
                          ★ {course.rating}
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-primary">
                          {course.price}
                        </span>
                        <button className="px-3.5 py-1.5 text-xs font-semibold rounded-md bg-primary text-primary-foreground hover:bg-primary-hover transition-colors">
                          Enroll Now
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features / Why Asquala Section */}
        <section id="features" className="py-16 md:py-24 bg-background border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto text-center mb-16">
              <h2 className="text-xs font-bold uppercase tracking-wider text-primary">
                Why Asquala
              </h2>
              <h3 className="text-2xl md:text-3xl font-bold text-foreground mt-1">
                Built for Serious Learning
              </h3>
              <p className="mt-3 text-sm text-muted-foreground">
                We replace shallow video dumps with structured, mastery-based education.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-8 rounded-xl border border-border bg-card">
                <div className="w-10 h-10 rounded-lg bg-primary-light text-primary flex items-center justify-center font-bold text-lg mb-5">
                  1
                </div>
                <h4 className="font-bold text-lg text-foreground mb-2">
                  Modular Curricula
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Courses are logically subdivided into sections and bite-sized lessons so you always know where you stand and what comes next.
                </p>
              </div>

              <div className="p-8 rounded-xl border border-border bg-card">
                <div className="w-10 h-10 rounded-lg bg-primary-light text-primary flex items-center justify-center font-bold text-lg mb-5">
                  2
                </div>
                <h4 className="font-bold text-lg text-foreground mb-2">
                  Targeted Assessments
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Validate knowledge retention through interactive quizzes, coding questions, and automated instant feedback.
                </p>
              </div>

              <div className="p-8 rounded-xl border border-border bg-card">
                <div className="w-10 h-10 rounded-lg bg-primary-light text-primary flex items-center justify-center font-bold text-lg mb-5">
                  3
                </div>
                <h4 className="font-bold text-lg text-foreground mb-2">
                  Verified Completion
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Upon finishing all lessons and meeting assessment thresholds, earn digitally verifiable certificates for your career portfolio.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Strip */}
        <section className="py-16 bg-card">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h3 className="text-2xl sm:text-3xl font-bold text-foreground">
              Ready to Accelerate Your Learning?
            </h3>
            <p className="mt-3 text-base text-muted-foreground max-w-xl mx-auto">
              Create an account in seconds and gain immediate access to our introductory courses and community.
            </p>
            <div className="mt-8 flex items-center justify-center gap-4">
              <Link
                href="/register"
                className="px-6 py-3 text-sm font-semibold rounded-lg bg-primary text-primary-foreground hover:bg-primary-hover shadow-xs transition-colors"
              >
                Join Asquala Today
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-background py-12 text-sm text-muted-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <span className="font-bold text-foreground">Asquala</span>
              <span>— Modern Online Learning Platform</span>
            </div>
            <div className="flex items-center gap-6 text-xs">
              <Link href="#courses" className="hover:text-foreground">Courses</Link>
              <Link href="#categories" className="hover:text-foreground">Categories</Link>
              <Link href="/privacy" className="hover:text-foreground">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-foreground">Terms of Service</Link>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-border text-center text-xs text-muted-foreground">
            © {new Date().getFullYear()} Asquala. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
