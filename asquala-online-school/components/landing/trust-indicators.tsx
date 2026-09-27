export function TrustIndicators() {
  return (
    <section className="border-b border-border bg-card py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
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
  );
}
