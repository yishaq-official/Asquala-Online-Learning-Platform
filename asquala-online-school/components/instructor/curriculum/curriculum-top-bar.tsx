"use client";

import React from "react";
import {
  Plus,
  CheckCircle2,
  Clock,
  Layers,
  ChevronDown,
  ChevronUp,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface CurriculumTopBarProps {
  totalModules: number;
  totalLessons: number;
  totalDurationMinutes: number;
  saveStatus: "saved" | "saving" | "unsaved";
  lastSavedTime?: string;
  onAddModule: () => void;
  allExpanded: boolean;
  onToggleExpandAll: () => void;
}

export function CurriculumTopBar({
  totalModules,
  totalLessons,
  totalDurationMinutes,
  saveStatus,
  lastSavedTime,
  onAddModule,
  allExpanded,
  onToggleExpandAll,
}: CurriculumTopBarProps) {
  const hours = Math.floor(totalDurationMinutes / 60);
  const minutes = totalDurationMinutes % 60;
  const formattedDuration =
    hours > 0 ? `${hours}h ${minutes > 0 ? `${minutes}m` : ""}` : `${minutes}m`;

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-card border border-border shadow-xs">
      {/* Left: Autosave status & Curriculum metrics */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Save Status Indicator */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border transition-all">
          {saveStatus === "saving" && (
            <span className="flex items-center gap-1.5 text-amber-700 bg-amber-50 border-amber-200">
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
              <span>Saving changes...</span>
            </span>
          )}
          {saveStatus === "saved" && (
            <span className="flex items-center gap-1.5 text-emerald-700">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>All changes saved {lastSavedTime ? `(${lastSavedTime})` : ""}</span>
            </span>
          )}
          {saveStatus === "unsaved" && (
            <span className="flex items-center gap-1.5 text-amber-700">
              <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
              <span>Unsaved changes</span>
            </span>
          )}
        </div>

        {/* Counts summary */}
        <div className="hidden sm:flex items-center gap-2 text-xs font-medium text-muted-foreground">
          <span>•</span>
          <span className="flex items-center gap-1 font-semibold text-foreground">
            <Layers className="w-3.5 h-3.5 text-primary" />
            <span>{totalModules} Modules</span>
          </span>
          <span>•</span>
          <span>{totalLessons} Lessons</span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-muted-foreground" />
            <span>{formattedDuration} total</span>
          </span>
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={onToggleExpandAll}
          className="gap-1.5 text-xs text-muted-foreground hover:text-foreground"
        >
          {allExpanded ? (
            <>
              <ChevronUp className="w-3.5 h-3.5" />
              <span>Collapse All</span>
            </>
          ) : (
            <>
              <ChevronDown className="w-3.5 h-3.5" />
              <span>Expand All</span>
            </>
          )}
        </Button>

        <Button
          type="button"
          variant="primary"
          size="sm"
          onClick={onAddModule}
          className="gap-1.5 text-xs shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Add Module</span>
        </Button>
      </div>
    </div>
  );
}
