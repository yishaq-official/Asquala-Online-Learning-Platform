import * as React from "react";
import Link from "next/link";
import { Sparkles, ArrowRight, BookOpen, Compass, Award } from "lucide-react";

export default function StudentDashboardPage() {
  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-card border border-primary-border/60 rounded-xl p-6 sm:p-8 shadow-xs relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-light text-primary text-xs font-semibold mb-3 border border-primary-border">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Welcome to Asquala Student Portal</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">
            Welcome back, Learner! 👋
          </h1>
          <p className="mt-2 text-sm sm:text-base text-muted-foreground leading-relaxed">
            Your learning hub is live. Explore our catalog of expert-led courses, resume your active modules, and track your industry-recognized certificates.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link
              href="/student/explore"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-primary text-white text-sm font-semibold hover:bg-primary-hover shadow-xs transition-colors"
            >
              <Compass className="w-4 h-4" />
              <span>Explore Courses</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/student/courses"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-secondary border border-border text-foreground text-sm font-semibold hover:bg-card transition-colors"
            >
              <BookOpen className="w-4 h-4 text-primary" />
              <span>My Enrolled Courses</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Quick Navigation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <Link
          href="/student/courses"
          className="group p-5 rounded-xl bg-card border border-border hover:border-primary-border hover:shadow-xs transition-all"
        >
          <div className="w-10 h-10 rounded-lg bg-primary-light text-primary flex items-center justify-center border border-primary-border mb-3 group-hover:scale-105 transition-transform">
            <BookOpen className="w-5 h-5" />
          </div>
          <h3 className="font-semibold text-foreground text-base">My Course Library</h3>
          <p className="text-xs text-muted-foreground mt-1">
            Access in-progress and completed learning modules.
          </p>
        </Link>

        <Link
          href="/student/explore"
          className="group p-5 rounded-xl bg-card border border-border hover:border-primary-border hover:shadow-xs transition-all"
        >
          <div className="w-10 h-10 rounded-lg bg-primary-light text-primary flex items-center justify-center border border-primary-border mb-3 group-hover:scale-105 transition-transform">
            <Compass className="w-5 h-5" />
          </div>
          <h3 className="font-semibold text-foreground text-base">Explore Catalog</h3>
          <p className="text-xs text-muted-foreground mt-1">
            Discover new courses across web, backend, design, and cloud.
          </p>
        </Link>

        <Link
          href="/student/certificates"
          className="group p-5 rounded-xl bg-card border border-border hover:border-primary-border hover:shadow-xs transition-all"
        >
          <div className="w-10 h-10 rounded-lg bg-primary-light text-primary flex items-center justify-center border border-primary-border mb-3 group-hover:scale-105 transition-transform">
            <Award className="w-5 h-5" />
          </div>
          <h3 className="font-semibold text-foreground text-base">Verified Certificates</h3>
          <p className="text-xs text-muted-foreground mt-1">
            View, share, and export your accredited course credentials.
          </p>
        </Link>
      </div>
    </div>
  );
}
