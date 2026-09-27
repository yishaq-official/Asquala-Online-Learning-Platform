import Link from "next/link";

export function CtaBanner() {
  return (
    <section className="py-16 bg-card">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h3 className="text-2xl sm:text-3xl font-bold text-foreground">
          Ready to Accelerate Your Learning?
        </h3>
        <p className="mt-3 text-base text-muted-foreground max-w-xl mx-auto">
          Create an account in seconds and gain immediate access to our
          introductory courses and community.
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
  );
}
