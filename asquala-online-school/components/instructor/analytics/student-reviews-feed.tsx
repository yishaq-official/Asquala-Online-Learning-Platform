"use client";

import React, { useState } from "react";
import { Star, MessageSquare, CornerDownRight, Check, Send } from "lucide-react";
import { StudentReviewItem } from "@/lib/mock-instructor-data";
import { Button } from "@/components/ui/button";

interface StudentReviewsFeedProps {
  initialReviews: StudentReviewItem[];
}

export function StudentReviewsFeed({ initialReviews }: StudentReviewsFeedProps) {
  const [reviews, setReviews] = useState<StudentReviewItem[]>(initialReviews);
  const [selectedStarFilter, setSelectedStarFilter] = useState<number | "all">("all");
  const [replyingToId, setReplyingToId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");

  const filteredReviews = reviews.filter((r) => {
    if (selectedStarFilter === "all") return true;
    return r.rating === selectedStarFilter;
  });

  const handleSendReply = (reviewId: string) => {
    if (!replyText.trim()) return;

    setReviews((prev) =>
      prev.map((r) =>
        r.id === reviewId
          ? {
              ...r,
              instructorReply: {
                date: "Just now",
                content: replyText.trim(),
              },
            }
          : r
      )
    );

    setReplyingToId(null);
    setReplyText("");
  };

  return (
    <div className="bg-card border border-border rounded-2xl p-5 sm:p-6 shadow-xs space-y-6">
      {/* Header & Filter Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border/80">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-600 border border-amber-200 flex items-center justify-center font-bold">
            <Star className="w-4 h-4 fill-amber-500" />
          </div>
          <div>
            <h3 className="text-base font-bold text-foreground">
              Student Reviews &amp; Course Feedback
            </h3>
            <p className="text-xs text-muted-foreground">
              Read authentic learner evaluations and engage directly with your students
            </p>
          </div>
        </div>

        {/* Star Rating Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          <button
            type="button"
            onClick={() => setSelectedStarFilter("all")}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
              selectedStarFilter === "all"
                ? "border-primary bg-primary text-primary-foreground shadow-2xs"
                : "border-border bg-card text-muted-foreground hover:text-foreground"
            }`}
          >
            All Ratings ({reviews.length})
          </button>

          {[5, 4, 3].map((stars) => (
            <button
              key={stars}
              type="button"
              onClick={() => setSelectedStarFilter(stars)}
              className={`px-2.5 py-1.5 rounded-xl text-xs font-semibold border transition-all flex items-center gap-1 ${
                selectedStarFilter === stars
                  ? "border-primary bg-primary text-primary-foreground shadow-2xs"
                  : "border-border bg-card text-muted-foreground hover:text-foreground"
              }`}
            >
              <span>{stars}</span>
              <Star className="w-3 h-3 fill-current" />
            </button>
          ))}
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {filteredReviews.length > 0 ? (
          filteredReviews.map((review) => (
            <div
              key={review.id}
              className="p-4 sm:p-5 rounded-xl border border-border bg-secondary/20 hover:bg-secondary/40 transition-all space-y-3"
            >
              {/* Reviewer Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-primary-light text-primary font-bold text-xs flex items-center justify-center border border-primary-border shrink-0">
                    {review.studentName
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-foreground">
                      {review.studentName}
                    </h4>
                    <p className="text-[11px] text-muted-foreground">
                      {review.studentRole} •{" "}
                      <span className="font-semibold text-foreground">
                        {review.courseTitle}
                      </span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-start sm:self-auto">
                  <div className="flex items-center text-amber-500">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < review.rating
                            ? "fill-amber-500 text-amber-500"
                            : "text-muted-foreground/30"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-[11px] text-muted-foreground">
                    {review.date}
                  </span>
                </div>
              </div>

              {/* Review Text */}
              <p className="text-xs sm:text-sm text-foreground/90 leading-relaxed pl-1 sm:pl-12">
                &ldquo;{review.content}&rdquo;
              </p>

              {/* Instructor Reply (if already exists) */}
              {review.instructorReply && (
                <div className="ml-2 sm:ml-12 p-3.5 rounded-xl bg-card border border-primary/20 space-y-1.5 text-xs">
                  <div className="flex items-center justify-between font-semibold text-primary">
                    <span className="flex items-center gap-1.5">
                      <CornerDownRight className="w-3.5 h-3.5" />
                      <span>Your Response as Instructor</span>
                    </span>
                    <span className="text-[10px] text-muted-foreground">
                      {review.instructorReply.date}
                    </span>
                  </div>
                  <p className="text-muted-foreground leading-relaxed pl-5">
                    {review.instructorReply.content}
                  </p>
                </div>
              )}

              {/* Reply Form or Trigger */}
              {!review.instructorReply && (
                <div className="pl-1 sm:pl-12 pt-1">
                  {replyingToId === review.id ? (
                    <div className="space-y-2 pt-1">
                      <textarea
                        rows={2}
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        placeholder={`Reply to ${review.studentName}...`}
                        className="w-full p-3 rounded-xl border border-primary text-xs bg-card text-foreground focus:outline-hidden ring-2 ring-primary/20"
                        autoFocus
                      />
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setReplyingToId(null);
                            setReplyText("");
                          }}
                          className="text-xs"
                        >
                          Cancel
                        </Button>
                        <Button
                          type="button"
                          variant="primary"
                          size="sm"
                          onClick={() => handleSendReply(review.id)}
                          className="gap-1.5 text-xs shadow-xs"
                        >
                          <Send className="w-3 h-3" />
                          <span>Publish Reply</span>
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setReplyingToId(review.id)}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Reply to this student</span>
                    </button>
                  )}
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-xs text-muted-foreground">
            No reviews match the selected star rating filter.
          </div>
        )}
      </div>
    </div>
  );
}
