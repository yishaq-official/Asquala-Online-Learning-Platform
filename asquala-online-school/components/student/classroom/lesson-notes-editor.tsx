"use client";

import * as React from "react";
import { useCourseProgressStore } from "@/stores/course-progress-store";
import { Copy, Check, Save } from "lucide-react";

interface LessonNotesEditorProps {
  lessonId: string;
}

export function LessonNotesEditor({ lessonId }: LessonNotesEditorProps) {
  const { lessonNotes, saveLessonNote } = useCourseProgressStore();
  const currentNote = lessonNotes[lessonId] || "";

  const [noteText, setNoteText] = React.useState(currentNote);
  const [isCopied, setIsCopied] = React.useState(false);
  const [isSaved, setIsSaved] = React.useState(false);

  // Sync when active lesson changes
  React.useEffect(() => {
    setNoteText(lessonNotes[lessonId] || "");
  }, [lessonId, lessonNotes]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setNoteText(val);
    saveLessonNote(lessonId, val);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 1500);
  };

  const handleCopy = async () => {
    if (!noteText) return;
    try {
      await navigator.clipboard.writeText(noteText);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy notes:", err);
    }
  };

  return (
    <div className="bg-card border border-border rounded-2xl p-5 shadow-2xs space-y-4">
      <div className="flex items-center justify-between pb-1 border-b border-border/80">
        <div>
          <h3 className="font-bold text-sm text-foreground">My Personal Lesson Notes</h3>
          <p className="text-xs text-muted-foreground">
            Notes are saved automatically to your profile for this lesson.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {isSaved && (
            <span className="text-[11px] font-semibold text-primary flex items-center gap-1 animate-in fade-in-0">
              <Check className="w-3 h-3" />
              Auto-saved
            </span>
          )}

          <button
            type="button"
            onClick={handleCopy}
            disabled={!noteText}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border hover:bg-secondary text-xs font-semibold text-foreground transition-colors cursor-pointer disabled:opacity-40"
            title="Copy notes to clipboard"
          >
            {isCopied ? (
              <>
                <Check className="w-3.5 h-3.5 text-primary" />
                <span className="text-primary font-bold">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-muted-foreground" />
                <span>Copy Notes</span>
              </>
            )}
          </button>
        </div>
      </div>

      <textarea
        value={noteText}
        onChange={handleChange}
        rows={7}
        placeholder="Type key learnings, code snippets, or ideas to remember from this lesson..."
        className="w-full p-4 rounded-xl bg-secondary/50 border border-border text-foreground placeholder:text-muted-foreground text-xs sm:text-sm font-sans focus:outline-hidden focus:ring-2 focus:ring-ring focus:bg-card transition-all resize-y"
      />
    </div>
  );
}
