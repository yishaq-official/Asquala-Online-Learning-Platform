"use client";

import React, { useState } from "react";
import { Send, ShieldCheck, Sparkles, Check, Code, Bold, Italic } from "lucide-react";
import { Button } from "@/components/ui/button";

interface QaReplyComposerProps {
  onPostReply: (content: string, isOfficial: boolean) => void;
  studentName: string;
}

const TEMPLATE_SNIPPETS = [
  "Make sure to inspect your local port mappings.",
  "Check the official documentation link attached in the lesson resources.",
  "Try running with DEBUG=* or verbose logging enabled to isolate the error.",
];

export function QaReplyComposer({
  onPostReply,
  studentName,
}: QaReplyComposerProps) {
  const [content, setContent] = useState("");
  const [isOfficial, setIsOfficial] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    onPostReply(content.trim(), isOfficial);
    setContent("");
  };

  const handleApplySnippet = (snippet: string) => {
    setContent((prev) => (prev ? `${prev}\n\n${snippet}` : snippet));
  };

  return (
    <div className="bg-card border border-border rounded-2xl p-5 shadow-xs space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
          <span>Reply as Instructor to {studentName}</span>
        </h3>

        {/* Official answer toggle */}
        <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-foreground">
          <input
            type="checkbox"
            checked={isOfficial}
            onChange={(e) => setIsOfficial(e.target.checked)}
            className="w-4 h-4 rounded text-primary border-border focus:ring-primary accent-primary"
          />
          <span className="flex items-center gap-1 text-emerald-800">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Mark as Official Solution</span>
          </span>
        </label>
      </div>

      {/* Quick Snippets */}
      <div className="flex flex-wrap items-center gap-1.5">
        <span className="text-[11px] text-muted-foreground font-semibold mr-1">
          Quick Snippets:
        </span>
        {TEMPLATE_SNIPPETS.map((snippet, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => handleApplySnippet(snippet)}
            className="px-2.5 py-1 rounded-lg text-[11px] font-medium bg-secondary/50 text-muted-foreground hover:text-foreground hover:bg-secondary border border-border/60 transition-all truncate max-w-[280px]"
          >
            {snippet}
          </button>
        ))}
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-3">
        <textarea
          rows={4}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Provide clear technical guidance, code snippets, or reference links..."
          className="w-full p-3.5 rounded-xl border border-border focus:border-primary text-xs sm:text-sm bg-card text-foreground focus:outline-hidden ring-2 ring-primary/20 leading-relaxed resize-y"
        />

        <div className="flex items-center justify-between pt-1">
          <span className="text-[11px] text-muted-foreground">
            Supports markdown formatting and inline code.
          </span>

          <Button
            type="submit"
            variant="primary"
            size="sm"
            disabled={!content.trim()}
            className="gap-1.5 text-xs shadow-xs"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Publish Solution</span>
          </Button>
        </div>
      </form>
    </div>
  );
}
