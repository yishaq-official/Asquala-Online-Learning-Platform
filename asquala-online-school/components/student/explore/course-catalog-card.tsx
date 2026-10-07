"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Star, Clock, BookOpen, CheckCircle, ArrowRight } from "lucide-react";
import { CourseCatalogItem } from "@/types/student";

interface CourseCatalogCardProps {
  course: CourseCatalogItem;
}

export function CourseCatalogCard({ course }: CourseCatalogCardProps) {
  const levelStyles = {
    Beginner: "bg-primary-light text-primary border-primary-border/70",
    Intermediate: "bg-secondary text-secondary-foreground border-border",
    Advanced: "bg-amber-50 text-amber-700 border-amber-200",
  }[course.level];

  return (
    <div className="group bg-card border border-border hover:border-primary-border/80 rounded-2xl overflow-hidden shadow-2xs hover:shadow-md transition-all duration-300 flex flex-col justify-between h-full">
      {/* Thumbnail & Badges Container */}
      <div>
        <div className="relative aspect-video w-full bg-secondary overflow-hidden">
          <Image
            src={course.thumbnailUrl}
            alt={course.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-60" />

          {/* Category Pill Overlay */}
          <div className="absolute top-3 left-3">
            <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-card/90 backdrop-blur-xs text-foreground shadow-xs border border-border/80">
              {course.category}
            </span>
          </div>

          {/* Difficulty Level Overlay */}
          <div className="absolute top-3 right-3">
            <span
              className={`px-2.5 py-1 rounded-full text-[11px] font-bold border shadow-xs ${levelStyles}`}
            >
              {course.level}
            </span>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-5 space-y-3">
          {/* Rating & Stats */}
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-1.5 text-amber-500 font-bold">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span>{course.rating.toFixed(1)}</span>
              <span className="text-muted-foreground font-normal">
                ({course.reviewCount.toLocaleString()})
              </span>
            </div>

            <div className="flex items-center gap-3 text-muted-foreground font-medium">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {course.durationHours}h
              </span>
              <span className="flex items-center gap-1">
                <BookOpen className="w-3.5 h-3.5" />
                {course.lessonsCount} lessons
              </span>
            </div>
          </div>

          {/* Title & Summary */}
          <div>
            <h3 className="font-bold text-base text-foreground leading-snug line-clamp-1 group-hover:text-primary transition-colors">
              {course.title}
            </h3>
            <p className="text-xs text-muted-foreground mt-1.5 line-clamp-2 leading-relaxed">
              {course.summary}
            </p>
          </div>

          {/* Instructor Byline */}
          <div className="flex items-center gap-2 pt-1 border-t border-border/60">
            {course.instructor.avatarUrl ? (
              <div className="relative w-6 h-6 rounded-full overflow-hidden bg-secondary border border-border">
                <Image
                  src={course.instructor.avatarUrl}
                  alt={course.instructor.name}
                  fill
                  className="object-cover"
                  sizes="24px"
                />
              </div>
            ) : (
              <div className="w-6 h-6 rounded-full bg-primary-light text-primary font-bold text-[10px] flex items-center justify-center border border-primary-border">
                {course.instructor.name[0]}
              </div>
            )}
            <span className="text-xs font-semibold text-foreground truncate">
              {course.instructor.name}
            </span>
            <span className="text-[10px] text-muted-foreground ml-auto">
              {course.instructor.role}
            </span>
          </div>
        </div>
      </div>

      {/* Card Action Footer */}
      <div className="px-5 pb-5 pt-1">
        {course.isEnrolled ? (
          <Link
            href={`/student/courses/${course.slug}`}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-primary-light text-primary border border-primary-border/80 text-xs font-semibold hover:bg-primary hover:text-white transition-all shadow-2xs group/btn"
          >
            <CheckCircle className="w-4 h-4 text-primary group-hover/btn:text-white transition-colors" />
            <span>Already Enrolled • Go to Course</span>
          </Link>
        ) : (
          <Link
            href={`/student/explore/${course.slug}`}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-primary text-white text-xs font-semibold hover:bg-primary-hover shadow-2xs hover:shadow transition-all group/btn"
          >
            <span>Explore Course</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
          </Link>
        )}
      </div>
    </div>
  );
}
