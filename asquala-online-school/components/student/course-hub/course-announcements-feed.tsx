"use client";

import * as React from "react";
import { Megaphone, Pin, Clock, User } from "lucide-react";
import { CourseAnnouncement } from "@/types/student";

interface CourseAnnouncementsFeedProps {
  announcements: CourseAnnouncement[];
}

export function CourseAnnouncementsFeed({
  announcements,
}: CourseAnnouncementsFeedProps) {
  return (
    <div className="space-y-4">
      <div className="pb-1">
        <h2 className="text-base sm:text-lg font-bold text-foreground">Course Announcements & Updates</h2>
        <p className="text-xs text-muted-foreground mt-0.5">
          Important notices, live session schedules, and curriculum updates from your instructor.
        </p>
      </div>

      <div className="space-y-3.5">
        {announcements.map((item) => (
          <div
            key={item.id}
            className={`p-5 rounded-2xl border transition-all ${
              item.isPinned
                ? "bg-primary-light/20 border-primary-border/80 shadow-2xs"
                : "bg-card border-border"
            }`}
          >
            <div className="flex items-center justify-between gap-3 mb-2 flex-wrap">
              <div className="flex items-center gap-2">
                {item.isPinned && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-primary text-white shadow-2xs">
                    <Pin className="w-2.5 h-2.5" />
                    Pinned Notice
                  </span>
                )}
                <h3 className="font-bold text-sm sm:text-base text-foreground">
                  {item.title}
                </h3>
              </div>

              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <User className="w-3.5 h-3.5" />
                  {item.authorName}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {item.date}
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-foreground/90 leading-relaxed pt-1">
              {item.content}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
