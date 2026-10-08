"use client";

import * as React from "react";
import Image from "next/image";
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  FileText,
  Clock,
  Sparkles,
  CheckCircle,
} from "lucide-react";

interface LessonPlayerFrameProps {
  type: "video" | "reading" | "quiz";
  title: string;
  durationMinutes: number;
  thumbnailUrl?: string;
  readingContent?: string;
  onEnded?: () => void;
  isTheaterMode?: boolean;
  onToggleTheater?: () => void;
}

export function LessonPlayerFrame({
  type,
  title,
  durationMinutes,
  thumbnailUrl = "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80",
  readingContent,
  onEnded,
  isTheaterMode = false,
  onToggleTheater,
}: LessonPlayerFrameProps) {
  // Video player simulation state
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [isMuted, setIsMuted] = React.useState(false);
  const [playbackSpeed, setPlaybackSpeed] = React.useState<number>(1);
  const [progressPercent, setProgressPercent] = React.useState<number>(18);
  const [showControls, setShowControls] = React.useState(true);

  // Toggle play/pause
  const togglePlay = () => setIsPlaying(!isPlaying);

  // Cycle speed
  const cycleSpeed = () => {
    const speeds = [1, 1.25, 1.5, 2];
    const nextIdx = (speeds.indexOf(playbackSpeed) + 1) % speeds.length;
    setPlaybackSpeed(speeds[nextIdx]);
  };

  if (type === "reading") {
    return (
      <div className="bg-card border border-border rounded-2xl p-6 sm:p-10 shadow-xs space-y-6">
        <div className="flex items-center gap-2 text-xs font-semibold text-primary pb-2 border-b border-border/80">
          <FileText className="w-4 h-4" />
          <span>Interactive Reading & Architectural Guide • {durationMinutes} min read</span>
        </div>

        <div className="space-y-4 max-w-4xl">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">
            {title}
          </h1>

          <div className="prose prose-slate max-w-none text-foreground/90 space-y-4 text-sm sm:text-base leading-relaxed">
            {readingContent ? (
              <div dangerouslySetInnerHTML={{ __html: readingContent }} />
            ) : (
              <>
                <p>
                  In this reading lesson, we explore the deep architectural patterns underlying Next.js 16 Server Actions, connection pooling with Drizzle ORM, and safe cryptographic session tokens.
                </p>

                <h3 className="text-lg font-bold text-foreground pt-2">1. Connection Pooling & Node-Postgres</h3>
                <p>
                  When deploying Node.js applications that interface with relational databases like PostgreSQL, opening new connections on every incoming HTTP request causes socket exhaustion under high load. A singleton connection pool maintains a persistent set of open connections that are leased and returned seamlessly.
                </p>

                <div className="bg-slate-900 text-slate-100 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-border">
                  <pre>{`// db/index.ts - Singleton Database Connection
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 20, // Max concurrent sockets
  idleTimeoutMillis: 30000,
});

export const db = drizzle(pool);`}</pre>
                </div>

                <h3 className="text-lg font-bold text-foreground pt-2">2. Key Takeaways</h3>
                <ul className="list-disc pl-5 space-y-1.5 text-sm">
                  <li>Never instantiate database connections inside dynamic route handlers.</li>
                  <li>Always configure connection pools with explicit idle timeouts and pool sizing.</li>
                  <li>Use schema inference plugins with better-auth for end-to-end type safety.</li>
                </ul>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`relative w-full rounded-2xl overflow-hidden bg-slate-950 border border-border shadow-lg group select-none transition-all duration-300 ${
        isTheaterMode ? "aspect-21/9" : "aspect-video"
      }`}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => isPlaying && setShowControls(false)}
    >
      {/* Video Background / Poster */}
      <div className="absolute inset-0">
        <Image
          src={thumbnailUrl}
          alt={title}
          fill
          className={`object-cover transition-opacity duration-500 ${
            isPlaying ? "opacity-30 blur-2xs" : "opacity-75"
          }`}
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-slate-950/40" />
      </div>

      {/* Center Play Button Overlay (when paused) */}
      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <button
            type="button"
            onClick={togglePlay}
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-primary text-white flex items-center justify-center shadow-2xl hover:scale-110 hover:bg-primary-hover transition-all cursor-pointer ring-4 ring-white/20"
            aria-label="Play video"
          >
            <Play className="w-8 h-8 fill-current ml-1" />
          </button>
        </div>
      )}

      {/* Top Overlay: Title & Duration */}
      <div
        className={`absolute top-0 inset-x-0 p-4 sm:p-5 flex items-center justify-between z-20 transition-opacity duration-300 ${
          showControls ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex items-center gap-2.5 text-white">
          <div className="relative w-5 h-5 shrink-0 opacity-90">
            <Image
              src="/images/logo.png"
              alt="Asquala"
              fill
              className="object-contain"
            />
          </div>
          <h2 className="font-bold text-sm sm:text-base drop-shadow truncate max-w-lg">
            {title}
          </h2>
        </div>

        <div className="flex items-center gap-2">
          {onToggleTheater && (
            <button
              type="button"
              onClick={onToggleTheater}
              className="p-1.5 rounded-lg bg-black/40 hover:bg-black/70 text-white/90 hover:text-white transition-colors cursor-pointer text-xs flex items-center gap-1 backdrop-blur-xs border border-white/10"
              title={isTheaterMode ? "Exit theater mode" : "Theater mode"}
            >
              {isTheaterMode ? <Minimize className="w-3.5 h-3.5" /> : <Maximize className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline text-[11px] font-medium">
                {isTheaterMode ? "Default" : "Theater"}
              </span>
            </button>
          )}
        </div>
      </div>

      {/* Bottom Overlay: Video Controls Bar */}
      <div
        className={`absolute bottom-0 inset-x-0 p-3 sm:p-5 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent z-20 space-y-2.5 transition-opacity duration-300 ${
          showControls ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Scrubber Progress Bar */}
        <div
          className="relative h-1.5 hover:h-2.5 bg-white/25 rounded-full cursor-pointer transition-all overflow-hidden"
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const pct = Math.round(((e.clientX - rect.left) / rect.width) * 100);
            setProgressPercent(pct);
          }}
        >
          <div
            className="h-full bg-primary rounded-full transition-all duration-100"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Buttons Row */}
        <div className="flex items-center justify-between text-white text-xs">
          <div className="flex items-center gap-3">
            {/* Play/Pause */}
            <button
              type="button"
              onClick={togglePlay}
              className="p-1.5 rounded-lg hover:bg-white/20 transition-colors cursor-pointer"
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
            </button>

            {/* Replay 10s */}
            <button
              type="button"
              onClick={() => setProgressPercent(Math.max(0, progressPercent - 5))}
              className="p-1.5 rounded-lg hover:bg-white/20 transition-colors cursor-pointer hidden sm:block"
              title="Rewind 10s"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            {/* Mute */}
            <button
              type="button"
              onClick={() => setIsMuted(!isMuted)}
              className="p-1.5 rounded-lg hover:bg-white/20 transition-colors cursor-pointer"
              aria-label={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>

            {/* Time Indicator */}
            <span className="text-[11px] font-mono text-white/80 hidden sm:inline">
              03:45 / {durationMinutes}:00
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Speed toggle */}
            <button
              type="button"
              onClick={cycleSpeed}
              className="px-2 py-1 rounded-md bg-white/10 hover:bg-white/20 font-bold text-[11px] transition-colors cursor-pointer"
              title="Playback speed"
            >
              {playbackSpeed}x
            </button>

            {/* 1080p Badge */}
            <span className="px-1.5 py-0.5 rounded bg-primary/80 font-bold text-[10px] text-white">
              HD
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
