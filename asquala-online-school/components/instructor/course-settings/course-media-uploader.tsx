"use client";

import React from "react";
import Image from "next/image";
import { Image as ImageIcon, Video, PlayCircle, Sparkles } from "lucide-react";

interface CourseMediaUploaderProps {
  thumbnailUrl: string;
  promotionalVideoUrl?: string;
  onChange: (fields: Partial<{
    thumbnailUrl: string;
    promotionalVideoUrl: string;
  }>) => void;
}

const PRESET_THUMBNAILS = [
  {
    name: "Full-Stack Web & Next.js",
    url: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "PostgreSQL & Database",
    url: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "TypeScript & Code Architecture",
    url: "https://images.unsplash.com/photo-1516116211227-bbc042be68e7?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Docker & Cloud Containers",
    url: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&w=800&q=80",
  },
];

export function CourseMediaUploader({
  thumbnailUrl,
  promotionalVideoUrl = "",
  onChange,
}: CourseMediaUploaderProps) {
  return (
    <div className="bg-card border border-border rounded-2xl p-5 sm:p-6 shadow-xs space-y-6">
      <div className="flex items-center gap-2.5 pb-2 border-b border-border/80">
        <div className="w-8 h-8 rounded-lg bg-primary-light text-primary flex items-center justify-center font-bold">
          <ImageIcon className="w-4 h-4" />
        </div>
        <div>
          <h2 className="text-base font-bold text-foreground">
            Course Media &amp; Thumbnail
          </h2>
          <p className="text-xs text-muted-foreground">
            Upload your course cover art (16:9) and promotional video teaser
          </p>
        </div>
      </div>

      {/* Thumbnail Section */}
      <div className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-foreground mb-1.5">
            Course Cover Art (16:9 Aspect Ratio) <span className="text-rose-500">*</span>
          </label>
          <p className="text-[11px] text-muted-foreground mb-3">
            Recommended size: 1280 × 720 pixels. Your thumbnail is the first thing students see across Asquala search and explore catalogs.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-start">
            {/* Live 16:9 Thumbnail Preview */}
            <div className="relative aspect-video w-full rounded-xl overflow-hidden border border-border bg-secondary shadow-2xs group">
              {thumbnailUrl ? (
                <Image
                  src={thumbnailUrl}
                  alt="Course Thumbnail Preview"
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-muted-foreground">
                  <ImageIcon className="w-8 h-8 mb-1 opacity-50" />
                  <span className="text-xs">No image uploaded</span>
                </div>
              )}
              <div className="absolute top-2 right-2 px-2 py-0.5 rounded-md bg-black/70 text-white text-[10px] font-mono font-bold backdrop-blur-xs">
                16:9 HD
              </div>
            </div>

            {/* Input & Presets */}
            <div className="space-y-3">
              <div>
                <label className="block text-[11px] font-medium text-foreground mb-1">
                  Thumbnail Image URL
                </label>
                <input
                  type="url"
                  value={thumbnailUrl}
                  onChange={(e) => onChange({ thumbnailUrl: e.target.value })}
                  placeholder="https://images.unsplash.com/photo-..."
                  className="w-full px-3 py-2 rounded-xl border border-border focus:border-primary text-xs bg-card text-foreground focus:outline-hidden"
                />
              </div>

              <div>
                <span className="block text-[11px] font-semibold text-muted-foreground mb-2">
                  Or select a curated technical background:
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {PRESET_THUMBNAILS.map((preset) => (
                    <button
                      key={preset.url}
                      type="button"
                      onClick={() => onChange({ thumbnailUrl: preset.url })}
                      className={`p-2 rounded-lg border text-left text-[11px] font-medium transition-all ${
                        thumbnailUrl === preset.url
                          ? "border-primary bg-primary-light text-primary font-bold ring-1 ring-primary"
                          : "border-border bg-secondary/30 text-muted-foreground hover:text-foreground hover:bg-secondary"
                      }`}
                    >
                      <span className="truncate block">{preset.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Promotional Teaser Video Section */}
      <div className="pt-4 border-t border-border/80 space-y-3">
        <div className="flex items-center gap-2">
          <Video className="w-4 h-4 text-primary" />
          <label className="text-xs font-semibold text-foreground">
            Promotional Teaser Video{" "}
            <span className="text-muted-foreground font-normal">(Optional)</span>
          </label>
        </div>
        <p className="text-[11px] text-muted-foreground">
          A 1–2 minute preview video where you explain the course roadmap to prospective students.
        </p>

        <input
          type="url"
          value={promotionalVideoUrl}
          onChange={(e) => onChange({ promotionalVideoUrl: e.target.value })}
          placeholder="https://www.youtube.com/watch?v=... or MP4 URL"
          className="w-full px-3.5 py-2.5 rounded-xl border border-border focus:border-primary text-sm bg-card text-foreground focus:outline-hidden ring-2 ring-primary/20"
        />

        {promotionalVideoUrl && (
          <div className="p-3 rounded-xl border border-border bg-secondary/20 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 min-w-0">
              <PlayCircle className="w-4 h-4 text-primary shrink-0" />
              <span className="font-mono text-muted-foreground truncate">
                {promotionalVideoUrl}
              </span>
            </div>
            <a
              href={promotionalVideoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-primary hover:underline shrink-0 ml-2"
            >
              Test Link
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
