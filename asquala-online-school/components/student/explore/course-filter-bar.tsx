"use client";

import * as React from "react";
import { SlidersHorizontal, ArrowUpDown } from "lucide-react";
import { DifficultyLevel } from "@/types/student";

export type SortOption = "popular" | "highest_rated" | "newest" | "duration";

interface CourseFilterBarProps {
  selectedLevel: string;
  onSelectLevel: (level: string) => void;
  selectedSort: SortOption;
  onSelectSort: (sort: SortOption) => void;
  hideEnrolled: boolean;
  onToggleHideEnrolled: (val: boolean) => void;
}

const LEVELS: ("All" | DifficultyLevel)[] = [
  "All",
  "Beginner",
  "Intermediate",
  "Advanced",
];

export function CourseFilterBar({
  selectedLevel,
  onSelectLevel,
  selectedSort,
  onSelectSort,
  hideEnrolled,
  onToggleHideEnrolled,
}: CourseFilterBarProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1 text-xs">
      {/* Level Filters */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
        <span className="text-muted-foreground font-semibold flex items-center gap-1 mr-1 shrink-0">
          <SlidersHorizontal className="w-3.5 h-3.5" />
          Level:
        </span>
        {LEVELS.map((level) => {
          const isSelected = selectedLevel === level;
          return (
            <button
              key={level}
              type="button"
              onClick={() => onSelectLevel(level)}
              className={`px-3 py-1 rounded-lg font-semibold transition-all cursor-pointer shrink-0 border ${
                isSelected
                  ? "bg-secondary text-foreground border-primary-border shadow-2xs"
                  : "bg-card text-muted-foreground hover:text-foreground hover:bg-secondary/60 border-border"
              }`}
            >
              {level}
            </button>
          );
        })}
      </div>

      {/* Sort & Enrolled Checkbox */}
      <div className="flex items-center gap-4 shrink-0 justify-between sm:justify-end">
        {/* Hide Enrolled Toggle */}
        <label className="inline-flex items-center gap-2 cursor-pointer select-none text-muted-foreground hover:text-foreground transition-colors">
          <input
            type="checkbox"
            checked={hideEnrolled}
            onChange={(e) => onToggleHideEnrolled(e.target.checked)}
            className="w-3.5 h-3.5 rounded border-border text-primary focus:ring-ring accent-primary cursor-pointer"
          />
          <span className="font-semibold text-xs">Hide Enrolled</span>
        </label>

        {/* Sort Selector */}
        <div className="flex items-center gap-1.5">
          <ArrowUpDown className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
          <select
            value={selectedSort}
            onChange={(e) => onSelectSort(e.target.value as SortOption)}
            className="bg-card border border-border text-foreground rounded-lg px-2.5 py-1 text-xs font-semibold focus:outline-hidden focus:ring-1 focus:ring-ring cursor-pointer"
          >
            <option value="popular">Most Popular</option>
            <option value="highest_rated">Highest Rated</option>
            <option value="newest">Newest</option>
            <option value="duration">Shortest Duration</option>
          </select>
        </div>
      </div>
    </div>
  );
}
