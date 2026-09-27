export function WhyAsquala() {
  const pillars = [
    {
      step: 1,
      title: "Modular Curricula",
      desc: "Courses are logically subdivided into sections and bite-sized lessons so you always know where you stand and what comes next.",
    },
    {
      step: 2,
      title: "Targeted Assessments",
      desc: "Validate knowledge retention through interactive quizzes, coding questions, and automated instant feedback.",
    },
    {
      step: 3,
      title: "Verified Completion",
      desc: "Upon finishing all lessons and meeting assessment thresholds, earn digitally verifiable certificates for your career portfolio.",
    },
  ];

  return (
    <section
      id="features"
      className="py-16 md:py-24 bg-background border-b border-border"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <h2 className="text-xs font-bold uppercase tracking-wider text-primary">
            Why Asquala
          </h2>
          <h3 className="text-2xl md:text-3xl font-bold text-foreground mt-1">
            Built for Serious Learning
          </h3>
          <p className="mt-3 text-sm text-muted-foreground">
            We replace shallow video dumps with structured, mastery-based
            education.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((pillar) => (
            <div
              key={pillar.step}
              className="p-8 rounded-xl border border-border bg-card shadow-2xs hover:border-primary-border transition-colors"
            >
              <div className="w-10 h-10 rounded-lg bg-primary-light text-primary flex items-center justify-center font-bold text-lg mb-5">
                {pillar.step}
              </div>
              <h4 className="font-bold text-lg text-foreground mb-2">
                {pillar.title}
              </h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {pillar.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
