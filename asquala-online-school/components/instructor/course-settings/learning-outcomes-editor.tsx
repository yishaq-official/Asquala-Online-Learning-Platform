"use client";

import React, { useState } from "react";
import { CheckCircle2, ListChecks, Plus, Trash2, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LearningOutcomesEditorProps {
  whatYouWillLearn: string[];
  prerequisites: string[];
  onChange: (fields: Partial<{
    whatYouWillLearn: string[];
    prerequisites: string[];
  }>) => void;
}

export function LearningOutcomesEditor({
  whatYouWillLearn,
  prerequisites,
  onChange,
}: LearningOutcomesEditorProps) {
  const [newOutcome, setNewOutcome] = useState("");
  const [newPrereq, setNewPrereq] = useState("");

  const handleAddOutcome = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (newOutcome.trim()) {
      onChange({
        whatYouWillLearn: [...whatYouWillLearn, newOutcome.trim()],
      });
      setNewOutcome("");
    }
  };

  const handleDeleteOutcome = (index: number) => {
    onChange({
      whatYouWillLearn: whatYouWillLearn.filter((_, idx) => idx !== index),
    });
  };

  const handleAddPrereq = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (newPrereq.trim()) {
      onChange({
        prerequisites: [...prerequisites, newPrereq.trim()],
      });
      setNewPrereq("");
    }
  };

  const handleDeletePrereq = (index: number) => {
    onChange({
      prerequisites: prerequisites.filter((_, idx) => idx !== index),
    });
  };

  return (
    <div className="bg-card border border-border rounded-2xl p-5 sm:p-6 shadow-xs space-y-8">
      {/* SECTION 1: WHAT YOU WILL LEARN */}
      <div className="space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-border/80">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold border border-emerald-200">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-foreground">
                What Students Will Learn
              </h2>
              <p className="text-xs text-muted-foreground">
                Specify 4–8 concrete learning outcomes students will achieve upon completion
              </p>
            </div>
          </div>

          <span
            className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
              whatYouWillLearn.length >= 4 && whatYouWillLearn.length <= 8
                ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                : "bg-secondary text-muted-foreground"
            }`}
          >
            {whatYouWillLearn.length} Added
          </span>
        </div>

        {/* Input Form */}
        <form onSubmit={handleAddOutcome} className="flex gap-2">
          <input
            type="text"
            value={newOutcome}
            onChange={(e) => setNewOutcome(e.target.value)}
            placeholder="e.g., Architect production Next.js 16 applications using Server Actions"
            className="flex-1 px-3.5 py-2.5 rounded-xl border border-border focus:border-primary text-sm bg-card text-foreground focus:outline-hidden ring-2 ring-primary/20"
          />
          <Button
            type="submit"
            variant="primary"
            size="md"
            className="gap-1.5 text-xs shrink-0 shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Add Outcome</span>
          </Button>
        </form>

        {/* Outcome List */}
        {whatYouWillLearn.length > 0 ? (
          <div className="space-y-2">
            {whatYouWillLearn.map((item, index) => (
              <div
                key={index}
                className="flex items-start justify-between gap-3 p-3 rounded-xl border border-border bg-secondary/30 hover:bg-secondary/60 transition-colors"
              >
                <div className="flex items-start gap-2.5 min-w-0">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {index + 1}
                  </span>
                  <p className="text-xs sm:text-sm text-foreground leading-snug">
                    {item}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => handleDeleteOutcome(index)}
                  className="p-1 rounded-lg text-muted-foreground hover:text-rose-600 hover:bg-rose-50 transition-colors shrink-0"
                  title="Remove outcome"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-muted-foreground italic py-2">
            No learning outcomes added yet. Enter an outcome above.
          </p>
        )}
      </div>

      {/* SECTION 2: COURSE PREREQUISITES */}
      <div className="space-y-4 pt-4 border-t border-border/80">
        <div className="flex items-center justify-between pb-2 border-b border-border/80">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-primary-light text-primary flex items-center justify-center font-bold">
              <ListChecks className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-foreground">
                Course Prerequisites &amp; Requirements
              </h2>
              <p className="text-xs text-muted-foreground">
                List foundational knowledge or required tools students need before enrolling
              </p>
            </div>
          </div>

          <span className="text-xs text-muted-foreground font-semibold">
            {prerequisites.length} Requirements
          </span>
        </div>

        {/* Input Form */}
        <form onSubmit={handleAddPrereq} className="flex gap-2">
          <input
            type="text"
            value={newPrereq}
            onChange={(e) => setNewPrereq(e.target.value)}
            placeholder="e.g., Basic familiarity with JavaScript (ES6+) and modern terminal commands"
            className="flex-1 px-3.5 py-2.5 rounded-xl border border-border focus:border-primary text-sm bg-card text-foreground focus:outline-hidden ring-2 ring-primary/20"
          />
          <Button
            type="submit"
            variant="outline"
            size="md"
            className="gap-1.5 text-xs shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Add Prerequisite</span>
          </Button>
        </form>

        {/* Prerequisites List */}
        {prerequisites.length > 0 ? (
          <div className="space-y-2">
            {prerequisites.map((prereq, index) => (
              <div
                key={index}
                className="flex items-start justify-between gap-3 p-3 rounded-xl border border-border bg-secondary/30 hover:bg-secondary/60 transition-colors"
              >
                <div className="flex items-start gap-2.5 min-w-0">
                  <span className="text-xs text-muted-foreground font-mono mt-0.5">•</span>
                  <p className="text-xs sm:text-sm text-foreground leading-snug">
                    {prereq}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => handleDeletePrereq(index)}
                  className="p-1 rounded-lg text-muted-foreground hover:text-rose-600 hover:bg-rose-50 transition-colors shrink-0"
                  title="Remove requirement"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-muted-foreground italic py-2">
            No prerequisites listed. Enter a requirement above (e.g. &apos;No prior coding experience required&apos;).
          </p>
        )}
      </div>
    </div>
  );
}
