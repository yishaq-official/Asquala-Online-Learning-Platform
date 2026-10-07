"use client";

import * as React from "react";
import Image from "next/image";
import { Award, Users, BookOpen, Star } from "lucide-react";
import { Instructor } from "@/types/student";

interface InstructorProfileCardProps {
  instructor: Instructor;
}

export function InstructorProfileCard({ instructor }: InstructorProfileCardProps) {
  return (
    <div className="bg-card border border-border rounded-2xl p-6 sm:p-7 shadow-2xs space-y-4">
      <div className="flex items-center gap-2 text-foreground font-bold text-base sm:text-lg pb-1">
        <Award className="w-5 h-5 text-primary" />
        <h2>Your Instructor</h2>
      </div>

      <div className="flex flex-col sm:flex-row items-start gap-4 pt-1">
        {/* Avatar */}
        {instructor.avatarUrl ? (
          <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden bg-secondary shrink-0 border border-border shadow-xs">
            <Image
              src={instructor.avatarUrl}
              alt={instructor.name}
              fill
              className="object-cover"
              sizes="80px"
            />
          </div>
        ) : (
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-primary-light text-primary font-bold text-xl flex items-center justify-center border border-primary-border shrink-0 shadow-xs">
            {instructor.name[0]}
          </div>
        )}

        <div className="space-y-2 flex-1 min-w-0">
          <div>
            <h3 className="font-bold text-base sm:text-lg text-foreground">
              {instructor.name}
            </h3>
            <p className="text-xs sm:text-sm text-primary font-semibold">{instructor.role}</p>
          </div>

          {/* Instructor metrics */}
          <div className="flex items-center gap-4 text-xs text-muted-foreground flex-wrap">
            <span className="flex items-center gap-1 font-semibold text-foreground">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              4.9 Instructor Rating
            </span>
            <span className="flex items-center gap-1">
              <Users className="w-3.5 h-3.5" />
              12,400+ Students
            </span>
            <span className="flex items-center gap-1">
              <BookOpen className="w-3.5 h-3.5" />
              4 Authored Courses
            </span>
          </div>

          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed pt-1">
            {instructor.bio ||
              `${instructor.name} is a dedicated educator and senior engineer with over a decade of real-world production experience. They specialize in simplifying complex engineering topics into clear, project-driven modules.`}
          </p>
        </div>
      </div>
    </div>
  );
}
