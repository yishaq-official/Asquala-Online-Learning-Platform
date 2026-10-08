"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, BookOpen, Sparkles, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MOCK_INSTRUCTOR_COURSES } from "@/lib/mock-instructor-data";

const CATEGORIES = [
  "Web Development",
  "Database & Backend",
  "DevOps & Cloud",
  "Software Engineering",
  "Mobile App Development",
  "Cybersecurity",
  "Machine Learning",
];

export default function CreateCoursePage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Web Development");
  const [targetAudience, setTargetAudience] = useState("");
  const [estimatedPrice, setEstimatedPrice] = useState("1500");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError("Please enter a working title for your course.");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      // Simulate creating new course
      await new Promise((resolve) => setTimeout(resolve, 600));

      const newId = `inst-course-${Date.now()}`;
      const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

      // Push into mock courses
      MOCK_INSTRUCTOR_COURSES.unshift({
        id: newId,
        title,
        slug,
        thumbnailUrl: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80",
        category,
        status: "draft",
        price: Number(estimatedPrice) || 0,
        enrolledStudentsCount: 0,
        averageRating: 0,
        reviewsCount: 0,
        totalLessonsCount: 0,
        totalDurationMinutes: 0,
        lastUpdatedAt: "Just now",
      });

      // Route to curriculum builder
      router.push(`/instructor/courses/${newId}/curriculum`);
    } catch {
      setError("Failed to initialize course. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 py-4">
      {/* Back button */}
      <div>
        <Link
          href="/instructor/courses"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Courses</span>
        </Link>
      </div>

      {/* Main Creation Card */}
      <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-primary-light text-primary border border-primary-border mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>NEW COURSE WIZARD</span>
          </div>

          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
            Start Building Your New Course
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
            Give your course a working title and primary category. You can customize the curriculum, video lessons, and pricing next.
          </p>
        </div>

        {error && (
          <div className="p-3.5 rounded-xl border border-destructive/20 bg-destructive/10 text-destructive text-xs font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="courseTitle" required>
              Course Title
            </Label>
            <Input
              id="courseTitle"
              placeholder="e.g. Distributed PostgreSQL & Drizzle in Production"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              autoFocus
            />
            <p className="text-[11px] text-muted-foreground">
              A catchy, clear title explaining what technology or skill students will master.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="category" required>
                Primary Category
              </Label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full rounded-lg border border-border bg-card px-3.5 py-2.5 text-sm text-foreground transition-all focus:outline-hidden focus:border-primary focus:ring-2 focus:ring-primary/20"
                required
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="price">
                Estimated Price (ETB)
              </Label>
              <Input
                id="price"
                type="number"
                min={0}
                step={50}
                placeholder="1500"
                value={estimatedPrice}
                onChange={(e) => setEstimatedPrice(e.target.value)}
              />
              <p className="text-[11px] text-muted-foreground">
                Set 0 for a free community course.
              </p>
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="audience">
              Who is this course for?
            </Label>
            <Input
              id="audience"
              placeholder="e.g. Junior developers looking to architect scalable production databases"
              value={targetAudience}
              onChange={(e) => setTargetAudience(e.target.value)}
            />
          </div>

          <div className="pt-4 flex items-center justify-end gap-3 border-t border-border">
            <Link href="/instructor/courses">
              <Button type="button" variant="outline" size="md">
                Cancel
              </Button>
            </Link>

            <Button
              type="submit"
              variant="primary"
              size="md"
              isLoading={isSubmitting}
              className="gap-2 shadow-xs"
            >
              <span>Continue to Curriculum Builder</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
