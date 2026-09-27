import Link from "next/link";
import Image from "next/image";

export function HeroSection() {
  return (
    <section className="relative pt-12 pb-16 md:pt-16 md:pb-20 border-b border-border bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Text & CTAs */}
          <div className="lg:col-span-6 flex flex-col items-start">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground leading-[1.18]">
              Structured learning for{" "}
              <span className="text-primary underline decoration-primary-border underline-offset-6">
                real-world mastery
              </span>
            </h1>

            <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed max-w-lg">
              Master in-demand skills through modular lessons, practical
              assessments, and verified completion certificates.
            </p>

            {/* Action Buttons */}
            <div className="mt-7 flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
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

            {/* Minimal, compact perks */}
            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-muted-foreground font-medium">
              <span className="flex items-center gap-1.5">
                <span className="text-primary font-bold">✓</span> Free & paid
                tracks
              </span>
              <span className="flex items-center gap-1.5">
                <span className="text-primary font-bold">✓</span> Self-paced
              </span>
              <span className="flex items-center gap-1.5">
                <span className="text-primary font-bold">✓</span> Verified
                credentials
              </span>
            </div>
          </div>

          {/* Right Column: Illustration & Visual Anchor */}
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

              {/* Floating Quality Badge */}
              <div className="absolute bottom-5 left-5 right-5 sm:right-auto bg-card/95 backdrop-blur-xs border border-border rounded-lg px-4 py-2.5 shadow-xs flex items-center gap-3">
                <div className="w-8 h-8 rounded-md bg-primary-light text-primary flex items-center justify-center font-bold text-sm">
                  ★
                </div>
                <div className="text-xs">
                  <div className="font-bold text-foreground">
                    Curated Course Catalog
                  </div>
                  <div className="text-muted-foreground">
                    Certified & verified instructors
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
