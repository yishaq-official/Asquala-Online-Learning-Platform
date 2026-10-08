"use client";

import React from "react";
import { Search, X } from "lucide-react";

interface CourseSearchBarProps {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
}

export function CourseSearchBar({
  value,
  onChange,
  placeholder = "Search courses by title, topic, or keyword...",
}: CourseSearchBarProps) {
  return (
    <div className="relative w-full sm:max-w-xs">
      <Search className="w-4 h-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-9 pr-8 py-2 text-xs sm:text-sm rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-hidden focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all shadow-2xs"
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-0.5 rounded cursor-pointer"
          aria-label="Clear search"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
}
