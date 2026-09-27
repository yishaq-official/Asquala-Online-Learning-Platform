export function CategoriesSection() {
  const categories = [
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
  ];

  return (
    <section
      id="categories"
      className="py-16 md:py-20 bg-background border-b border-border"
    >
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
            Curated specializations aligned with industry standards and
            real-world execution.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <div
              key={index}
              className="p-6 rounded-xl border border-border bg-card hover:border-primary-border hover:shadow-xs transition-all flex flex-col justify-between group cursor-pointer"
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
                <span className="group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
