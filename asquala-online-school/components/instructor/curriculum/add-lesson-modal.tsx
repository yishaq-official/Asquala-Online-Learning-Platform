"use client";

import React, { useState } from "react";
import {
  X,
  PlayCircle,
  BookOpen,
  CheckSquare,
  Plus,
  Eye,
  Clock,
  Video,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface AddLessonModalProps {
  isOpen: boolean;
  targetModuleTitle: string;
  onClose: () => void;
  onAddLesson: (lessonData: {
    title: string;
    type: "video" | "reading" | "quiz";
    durationMinutes: number;
    isPreview: boolean;
    videoUrl?: string;
  }) => void;
}

type LessonType = "video" | "reading" | "quiz";

export function AddLessonModal({
  isOpen,
  targetModuleTitle,
  onClose,
  onAddLesson,
}: AddLessonModalProps) {
  const [selectedType, setSelectedType] = useState<LessonType>("video");
  const [title, setTitle] = useState("");
  const [durationMinutes, setDurationMinutes] = useState(12);
  const [isPreview, setIsPreview] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError("Lesson title is required.");
      return;
    }

    onAddLesson({
      title: title.trim(),
      type: selectedType,
      durationMinutes: Number(durationMinutes) || 10,
      isPreview,
      videoUrl: selectedType === "video" && videoUrl.trim() ? videoUrl.trim() : undefined,
    });

    setTitle("");
    setVideoUrl("");
    setIsPreview(false);
    setError("");
    onClose();
  };

  const lessonTypeOptions = [
    {
      id: "video" as LessonType,
      title: "Video Lecture",
      description: "HD video recording with downloadable source code and slides",
      icon: PlayCircle,
    },
    {
      id: "reading" as LessonType,
      title: "Reading Guide",
      description: "Structured markdown article, code snippets, and cheat sheets",
      icon: BookOpen,
    },
    {
      id: "quiz" as LessonType,
      title: "Milestone Quiz",
      description: "Automated assessment questions to verify student comprehension",
      icon: CheckSquare,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-card border border-border rounded-2xl w-full max-w-lg shadow-xl overflow-hidden animate-in zoom-in-95 duration-150 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-border bg-secondary/30 shrink-0">
          <div className="min-w-0 pr-3">
            <h2 className="text-base font-bold text-foreground">
              Add New Lesson
            </h2>
            <p className="text-xs text-muted-foreground truncate">
              Adding to <span className="font-semibold text-foreground">{targetModuleTitle}</span>
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4 overflow-y-auto flex-1">
          {/* Lesson Type Cards */}
          <div>
            <label className="block text-xs font-semibold text-foreground mb-2">
              Select Lesson Type
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {lessonTypeOptions.map((opt) => {
                const Icon = opt.icon;
                const isSelected = selectedType === opt.id;

                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setSelectedType(opt.id)}
                    className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between ${
                      isSelected
                        ? "border-primary bg-primary-light/50 ring-1 ring-primary"
                        : "border-border bg-card hover:bg-secondary/40 hover:border-border"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <div
                        className={`w-6 h-6 rounded-lg flex items-center justify-center ${
                          isSelected
                            ? "bg-primary text-primary-foreground"
                            : "bg-secondary text-muted-foreground"
                        }`}
                      >
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-xs font-bold text-foreground">
                        {opt.title}
                      </span>
                    </div>
                    <p className="text-[11px] text-muted-foreground line-clamp-2 leading-tight">
                      {opt.description}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Lesson Title */}
          <div>
            <label className="block text-xs font-semibold text-foreground mb-1.5">
              Lesson Title <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (error) setError("");
              }}
              placeholder={
                selectedType === "video"
                  ? "e.g., Setting Up Drizzle Connection Pool"
                  : selectedType === "reading"
                  ? "e.g., Schema Migrations Deep Dive"
                  : "e.g., Module 2 Comprehension Quiz"
              }
              className={`w-full px-3.5 py-2.5 rounded-xl border text-sm bg-card text-foreground focus:outline-hidden ring-2 ring-primary/20 ${
                error ? "border-rose-400" : "border-border focus:border-primary"
              }`}
              autoFocus
            />
            {error && (
              <p className="text-xs text-rose-500 mt-1 font-medium">{error}</p>
            )}
          </div>

          {/* Duration & Free Preview Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-foreground mb-1.5">
                Estimated Duration (Minutes)
              </label>
              <div className="relative">
                <input
                  type="number"
                  min={1}
                  max={240}
                  value={durationMinutes}
                  onChange={(e) => setDurationMinutes(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-border focus:border-primary text-sm bg-card text-foreground focus:outline-hidden ring-2 ring-primary/20 pl-9"
                />
                <Clock className="w-4 h-4 text-muted-foreground absolute left-3 top-3" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-foreground mb-1.5">
                Access Level
              </label>
              <button
                type="button"
                onClick={() => setIsPreview(!isPreview)}
                className={`w-full p-2.5 rounded-xl border text-left transition-all flex items-center justify-between text-xs font-semibold ${
                  isPreview
                    ? "bg-emerald-50 text-emerald-800 border-emerald-300"
                    : "bg-secondary text-muted-foreground border-border hover:text-foreground"
                }`}
              >
                <span className="flex items-center gap-1.5">
                  <Eye className="w-4 h-4 text-emerald-600" />
                  <span>Free Preview</span>
                </span>
                <span
                  className={`w-8 h-4 rounded-full p-0.5 transition-colors ${
                    isPreview ? "bg-emerald-600" : "bg-muted"
                  }`}
                >
                  <span
                    className={`block w-3 h-3 rounded-full bg-white transition-transform ${
                      isPreview ? "translate-x-4" : "translate-x-0"
                    }`}
                  />
                </span>
              </button>
            </div>
          </div>

          {/* If Video: Optional Video URL */}
          {selectedType === "video" && (
            <div>
              <label className="block text-xs font-semibold text-foreground mb-1.5">
                Video URL or CDN Stream{" "}
                <span className="text-muted-foreground font-normal">(Optional now, can add later)</span>
              </label>
              <input
                type="url"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                placeholder="https://www.youtube.com/watch?v=... or MP4 URL"
                className="w-full px-3.5 py-2.5 rounded-xl border border-border focus:border-primary text-sm bg-card text-foreground focus:outline-hidden ring-2 ring-primary/20"
              />
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center justify-end gap-2.5 pt-4 border-t border-border/80">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={onClose}
              className="text-xs"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="sm"
              className="gap-1.5 text-xs shadow-xs"
            >
              <Plus className="w-4 h-4" />
              <span>Create Lesson</span>
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
