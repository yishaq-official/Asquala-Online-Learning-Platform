"use client";

import * as React from "react";
import { CourseCategory } from "@/types/student";

const CATEGORIES: CourseCategory[] = [
  "All",
  "Web Development",
  "Backend & DB",
  "Mobile Apps",
  "UI/UX Design",
  "Cloud & DevOps",
  "Data Science",
];

interface CourseCategoryPillsProps {
  selectedCategory: string;
  onSelectCategory: (category: CourseCategory) => void;
}

export function CourseCategoryPills({
  selectedCategory,
  onSelectCategory,
}: CourseCategoryPillsProps) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none scroll-smooth">
      {CATEGORIES.map((cat) => {
        const isSelected = selectedCategory === cat;

        return (
          <button
            key={cat}
            type="button"
            onClick={() => onSelectCategory(cat)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer shrink-0 border ${
              isSelected
                ? "bg-primary text-white border-primary shadow-xs"
                : "bg-card text-muted-foreground hover:text-foreground hover:bg-secondary border-border"
            }`}
          >
            {cat}
          </button>
        );
      })}
    </div>
  );
}
