"use client";

import * as React from "react";
import { Search, X } from "lucide-react";

interface CourseSearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function CourseSearchInput({
  value,
  onChange,
  placeholder = "Search courses by title, keywords, or instructor...",
}: CourseSearchInputProps) {
  return (
    <div className="relative w-full">
      <Search className="w-4 h-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-10 pr-10 py-2.5 text-xs sm:text-sm rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-hidden focus:ring-2 focus:ring-ring focus:border-transparent transition-all shadow-2xs"
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          className="p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer transition-colors"
          aria-label="Clear search text"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
