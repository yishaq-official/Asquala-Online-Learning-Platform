"use client";

import React from "react";
import { BookOpen, Sparkles, Award } from "lucide-react";
import {
  CourseDifficultyLevel,
  CourseLanguage,
} from "@/types/instructor";

interface CourseBasicInfoFormProps {
  title: string;
  subtitle: string;
  description: string;
  category: string;
  level: CourseDifficultyLevel;
  language: CourseLanguage;
  certificateAvailable: boolean;
  onChange: (fields: Partial<{
    title: string;
    subtitle: string;
    description: string;
    category: string;
    level: CourseDifficultyLevel;
    language: CourseLanguage;
    certificateAvailable: boolean;
  }>) => void;
}

const CATEGORIES = [
  "Web Development",
  "Backend & DB",
  "Mobile Apps",
  "UI/UX Design",
  "Cloud & DevOps",
  "Data Science",
  "Software Engineering",
];

const LEVELS: CourseDifficultyLevel[] = [
  "Beginner",
  "Intermediate",
  "Advanced",
  "All Levels",
];

const LANGUAGES: CourseLanguage[] = ["English", "Amharic", "Afaan Oromoo"];

export function CourseBasicInfoForm({
  title,
  subtitle,
  description,
  category,
  level,
  language,
  certificateAvailable,
  onChange,
}: CourseBasicInfoFormProps) {
  return (
    <div className="bg-card border border-border rounded-2xl p-5 sm:p-6 shadow-xs space-y-5">
      <div className="flex items-center gap-2.5 pb-2 border-b border-border/80">
        <div className="w-8 h-8 rounded-lg bg-primary-light text-primary flex items-center justify-center font-bold">
          <BookOpen className="w-4 h-4" />
        </div>
        <div>
          <h2 className="text-base font-bold text-foreground">
            Course Basic Information
          </h2>
          <p className="text-xs text-muted-foreground">
            Define your course title, category classification, and difficulty level
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {/* Title */}
        <div>
          <label className="block text-xs font-semibold text-foreground mb-1.5">
            Course Title <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => onChange({ title: e.target.value })}
            placeholder="e.g. Next.js 16 Full-Stack Mastery"
            className="w-full px-3.5 py-2.5 rounded-xl border border-border focus:border-primary text-sm bg-card text-foreground focus:outline-hidden ring-2 ring-primary/20"
          />
        </div>

        {/* Subtitle */}
        <div>
          <label className="block text-xs font-semibold text-foreground mb-1.5">
            Course Subtitle / Tagline
          </label>
          <input
            type="text"
            value={subtitle}
            onChange={(e) => onChange({ subtitle: e.target.value })}
            placeholder="e.g. Production Architecture, Drizzle ORM, Docker & Tailwind CSS"
            className="w-full px-3.5 py-2.5 rounded-xl border border-border focus:border-primary text-sm bg-card text-foreground focus:outline-hidden ring-2 ring-primary/20"
          />
          <p className="text-[11px] text-muted-foreground mt-1">
            A concise one-liner displayed on course cards and catalog search results.
          </p>
        </div>

        {/* Category, Level, Language Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-foreground mb-1.5">
              Category <span className="text-rose-500">*</span>
            </label>
            <select
              value={category}
              onChange={(e) => onChange({ category: e.target.value })}
              className="w-full px-3 py-2.5 rounded-xl border border-border focus:border-primary text-sm bg-card text-foreground focus:outline-hidden"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-foreground mb-1.5">
              Difficulty Level
            </label>
            <select
              value={level}
              onChange={(e) =>
                onChange({ level: e.target.value as CourseDifficultyLevel })
              }
              className="w-full px-3 py-2.5 rounded-xl border border-border focus:border-primary text-sm bg-card text-foreground focus:outline-hidden"
            >
              {LEVELS.map((lvl) => (
                <option key={lvl} value={lvl}>
                  {lvl}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-foreground mb-1.5">
              Teaching Language
            </label>
            <select
              value={language}
              onChange={(e) =>
                onChange({ language: e.target.value as CourseLanguage })
              }
              className="w-full px-3 py-2.5 rounded-xl border border-border focus:border-primary text-sm bg-card text-foreground focus:outline-hidden"
            >
              {LANGUAGES.map((lang) => (
                <option key={lang} value={lang}>
                  {lang}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Full Description */}
        <div>
          <label className="block text-xs font-semibold text-foreground mb-1.5">
            Full Course Description
          </label>
          <textarea
            rows={5}
            value={description}
            onChange={(e) => onChange({ description: e.target.value })}
            placeholder="Detailed overview explaining why students should take this course, architecture covered, and career impact..."
            className="w-full p-3.5 rounded-xl border border-border focus:border-primary text-sm bg-card text-foreground focus:outline-hidden ring-2 ring-primary/20 leading-relaxed resize-y"
          />
        </div>

        {/* Certificate of Completion Toggle */}
        <div className="p-4 rounded-xl border border-border bg-secondary/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 border border-emerald-200">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-foreground">
                Issue Verified Certificate of Completion
              </h4>
              <p className="text-[11px] text-muted-foreground">
                Students receive a digitally verifiable Asquala Certificate upon completing 100% of lectures and milestone quizzes.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() =>
              onChange({ certificateAvailable: !certificateAvailable })
            }
            className={`w-10 h-6 rounded-full p-0.5 transition-colors shrink-0 ${
              certificateAvailable ? "bg-primary" : "bg-muted"
            }`}
          >
            <span
              className={`block w-5 h-5 rounded-full bg-white shadow-xs transition-transform ${
                certificateAvailable ? "translate-x-4" : "translate-x-0"
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
