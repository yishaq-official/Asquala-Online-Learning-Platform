"use client";

import React, { useState, useEffect } from "react";
import {
  X,
  PlayCircle,
  BookOpen,
  CheckSquare,
  Save,
  Clock,
  Eye,
  Paperclip,
  Plus,
  Trash2,
  ExternalLink,
  Code,
  List,
  Heading,
  Bold,
  Italic,
  FileText,
  FileArchive,
  Link2,
} from "lucide-react";
import { CourseLesson, CourseResource } from "@/types/student";
import { Button } from "@/components/ui/button";

interface LessonEditorDrawerProps {
  isOpen: boolean;
  lesson: CourseLesson | null;
  onClose: () => void;
  onSave: (updatedLesson: CourseLesson) => void;
  courseId?: string;
}

type TabType = "general" | "content" | "resources";

export function LessonEditorDrawer({
  isOpen,
  lesson,
  onClose,
  onSave,
  courseId,
}: LessonEditorDrawerProps) {
  const [activeTab, setActiveTab] = useState<TabType>("content");

  // Form states initialized when lesson changes
  const [title, setTitle] = useState("");
  const [durationMinutes, setDurationMinutes] = useState(10);
  const [isPreview, setIsPreview] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");
  const [readingContent, setReadingContent] = useState("");
  const [readingViewMode, setReadingViewMode] = useState<"write" | "preview">("write");
  const [resources, setResources] = useState<CourseResource[]>([]);

  // New resource state
  const [isAddingResource, setIsAddingResource] = useState(false);
  const [newResTitle, setNewResTitle] = useState("");
  const [newResType, setNewResType] = useState<"pdf" | "zip" | "github" | "link">("pdf");
  const [newResUrl, setNewResUrl] = useState("");
  const [newResSize, setNewResSize] = useState("");

  useEffect(() => {
    if (lesson) {
      setTitle(lesson.title || "");
      setDurationMinutes(lesson.durationMinutes || 10);
      setIsPreview(Boolean(lesson.isPreview));
      setVideoUrl(lesson.videoUrl || "");
      setReadingContent(
        lesson.readingContent ||
          `# ${lesson.title}\n\nProvide technical context, step-by-step instructions, and code blocks for your students.\n\n\`\`\`typescript\n// Example Code Implementation\nexport function example() {\n  return "production-ready code";\n}\n\`\`\``
      );
      setResources(lesson.resources ? [...lesson.resources] : []);
      setActiveTab("content");
      setIsAddingResource(false);
    }
  }, [lesson]);

  if (!isOpen || !lesson) return null;

  const handleSave = () => {
    const updated: CourseLesson = {
      ...lesson,
      title: title.trim() || lesson.title,
      durationMinutes: Number(durationMinutes) || lesson.durationMinutes,
      isPreview,
      videoUrl: lesson.type === "video" ? videoUrl.trim() : lesson.videoUrl,
      readingContent: lesson.type === "reading" ? readingContent : lesson.readingContent,
      resources: resources.length > 0 ? resources : undefined,
    };
    onSave(updated);
    onClose();
  };

  const handleAddResource = () => {
    if (!newResTitle.trim() || !newResUrl.trim()) return;
    const res: CourseResource = {
      id: `res-${Date.now()}`,
      title: newResTitle.trim(),
      type: newResType,
      url: newResUrl.trim(),
      size: newResSize.trim() || undefined,
    };
    setResources([...resources, res]);
    setNewResTitle("");
    setNewResUrl("");
    setNewResSize("");
    setIsAddingResource(false);
  };

  const handleDeleteResource = (resId: string) => {
    setResources(resources.filter((r) => r.id !== resId));
  };

  const insertMarkdownSnippet = (prefix: string, suffix = "") => {
    setReadingContent((prev) => `${prev}\n${prefix}sample text${suffix}\n`);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      <div className="w-full max-w-2xl bg-card border-l border-border h-full flex flex-col shadow-2xl animate-in slide-in-from-right duration-200">
        {/* Drawer Header */}
        <div className="p-5 border-b border-border bg-secondary/30 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3 min-w-0 pr-4">
            <div
              className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                lesson.type === "video"
                  ? "bg-primary-light text-primary border border-primary-border"
                  : lesson.type === "reading"
                  ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                  : "bg-amber-50 text-amber-800 border border-amber-200"
              }`}
            >
              {lesson.type === "video" && <PlayCircle className="w-5 h-5" />}
              {lesson.type === "reading" && <BookOpen className="w-5 h-5" />}
              {lesson.type === "quiz" && <CheckSquare className="w-5 h-5" />}
            </div>

            <div className="min-w-0">
              <span className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground block">
                Edit {lesson.type} Lesson
              </span>
              <h2 className="text-base font-extrabold text-foreground truncate">
                {title || lesson.title}
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center px-5 border-b border-border bg-card shrink-0 gap-6">
          <button
            type="button"
            onClick={() => setActiveTab("content")}
            className={`py-3 text-xs sm:text-sm font-semibold border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTab === "content"
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            <span>Content Editor</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("general")}
            className={`py-3 text-xs sm:text-sm font-semibold border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTab === "general"
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            <span>General &amp; Access</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("resources")}
            className={`py-3 text-xs sm:text-sm font-semibold border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTab === "resources"
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            <span>Resources ({resources.length})</span>
          </button>
        </div>

        {/* Drawer Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5">
          {/* TAB 1: CONTENT EDITOR */}
          {activeTab === "content" && (
            <div className="space-y-5">
              {/* VIDEO LESSON EDITOR */}
              {lesson.type === "video" && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-foreground mb-1.5">
                      Video Stream or Embed URL
                    </label>
                    <input
                      type="url"
                      value={videoUrl}
                      onChange={(e) => setVideoUrl(e.target.value)}
                      placeholder="https://www.youtube.com/watch?v=... or MP4 URL"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-border focus:border-primary text-sm bg-card text-foreground focus:outline-hidden ring-2 ring-primary/20"
                    />
                    <p className="text-[11px] text-muted-foreground mt-1">
                      Supports direct MP4 links, YouTube, Vimeo, and Cloudflare Stream CDN URLs.
                    </p>
                  </div>

                  {/* Video Preview Frame */}
                  <div className="rounded-xl overflow-hidden border border-border bg-slate-900 aspect-video relative flex items-center justify-center text-white">
                    {videoUrl ? (
                      <div className="text-center p-4">
                        <PlayCircle className="w-12 h-12 text-primary mx-auto mb-2 opacity-90" />
                        <p className="text-xs font-mono text-slate-300 truncate max-w-md">
                          {videoUrl}
                        </p>
                        <span className="inline-block mt-2 px-2.5 py-1 rounded-full text-[10px] font-bold bg-primary text-white">
                          Video Linked • Ready for Students
                        </span>
                      </div>
                    ) : (
                      <div className="text-center p-4 text-slate-400">
                        <PlayCircle className="w-10 h-10 mx-auto mb-2 opacity-40" />
                        <p className="text-xs">No video link attached yet</p>
                        <p className="text-[11px] text-slate-500 mt-1">
                          Paste a video stream or embed URL above.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* READING LESSON EDITOR */}
              {lesson.type === "reading" && (
                <div className="space-y-3">
                  {/* Markdown Editor Toolbar */}
                  <div className="flex items-center justify-between border-b border-border pb-2">
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => insertMarkdownSnippet("**", "**")}
                        className="p-1.5 rounded hover:bg-secondary text-muted-foreground hover:text-foreground text-xs font-bold"
                        title="Bold"
                      >
                        <Bold className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => insertMarkdownSnippet("*", "*")}
                        className="p-1.5 rounded hover:bg-secondary text-muted-foreground hover:text-foreground text-xs"
                        title="Italic"
                      >
                        <Italic className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => insertMarkdownSnippet("### ")}
                        className="p-1.5 rounded hover:bg-secondary text-muted-foreground hover:text-foreground text-xs"
                        title="Heading"
                      >
                        <Heading className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => insertMarkdownSnippet("- ")}
                        className="p-1.5 rounded hover:bg-secondary text-muted-foreground hover:text-foreground text-xs"
                        title="Bullet List"
                      >
                        <List className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => insertMarkdownSnippet("```typescript\n", "\n```")}
                        className="p-1.5 rounded hover:bg-secondary text-muted-foreground hover:text-foreground text-xs"
                        title="Code Block"
                      >
                        <Code className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Write vs Preview Mode Toggle */}
                    <div className="flex items-center rounded-lg border border-border p-0.5 bg-secondary/50">
                      <button
                        type="button"
                        onClick={() => setReadingViewMode("write")}
                        className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all ${
                          readingViewMode === "write"
                            ? "bg-card text-foreground shadow-2xs"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        Write
                      </button>
                      <button
                        type="button"
                        onClick={() => setReadingViewMode("preview")}
                        className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all ${
                          readingViewMode === "preview"
                            ? "bg-card text-foreground shadow-2xs"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        Live Preview
                      </button>
                    </div>
                  </div>

                  {readingViewMode === "write" ? (
                    <textarea
                      rows={14}
                      value={readingContent}
                      onChange={(e) => setReadingContent(e.target.value)}
                      className="w-full p-4 rounded-xl border border-border focus:border-primary font-mono text-xs sm:text-sm bg-card text-foreground focus:outline-hidden ring-2 ring-primary/20 leading-relaxed resize-y"
                      placeholder="Type markdown article here..."
                    />
                  ) : (
                    <div className="p-4 rounded-xl border border-border bg-secondary/20 min-h-[300px] text-xs sm:text-sm space-y-3 leading-relaxed">
                      <div className="font-sans font-extrabold text-lg text-foreground">
                        {title}
                      </div>
                      <div className="whitespace-pre-wrap font-sans text-muted-foreground">
                        {readingContent}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* QUIZ LESSON DETAILS */}
              {lesson.type === "quiz" && (
                <div className="space-y-4 p-5 rounded-2xl border border-border bg-secondary/20">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-700 border border-amber-200 flex items-center justify-center">
                      <CheckSquare className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-foreground">
                        Linked Assessment Milestone
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        Assess students with interactive multiple-choice coding challenges.
                      </p>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-card border border-border space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Passing Score Threshold</span>
                      <span className="font-bold text-foreground">80% Required</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Quiz Identifier</span>
                      <span className="font-mono font-medium text-foreground">
                        {lesson.quizId || "quiz-mod-1"}
                      </span>
                    </div>
                  </div>

                  {courseId && (
                    <a
                      href={`/instructor/courses/${courseId}/quizzes`}
                      className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-primary text-primary-foreground hover:bg-primary-hover text-xs font-semibold transition-colors shadow-2xs"
                    >
                      <span>Open Quiz Assessment Builder</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: GENERAL & ACCESS */}
          {activeTab === "general" && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-foreground mb-1.5">
                  Lesson Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-border focus:border-primary text-sm bg-card text-foreground focus:outline-hidden ring-2 ring-primary/20"
                />
              </div>

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

              {/* Free Preview Switch */}
              <div className="p-4 rounded-xl border border-border bg-secondary/30 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-foreground">
                    Allow Free Public Preview
                  </h4>
                  <p className="text-[11px] text-muted-foreground mt-0.5">
                    Prospective students can watch or read this lesson before purchasing the course.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setIsPreview(!isPreview)}
                  className={`w-10 h-6 rounded-full p-0.5 transition-colors shrink-0 ${
                    isPreview ? "bg-emerald-600" : "bg-muted"
                  }`}
                >
                  <span
                    className={`block w-5 h-5 rounded-full bg-white shadow-xs transition-transform ${
                      isPreview ? "translate-x-4" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>
            </div>
          )}

          {/* TAB 3: DOWNLOADABLE RESOURCES */}
          {activeTab === "resources" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xs font-bold text-foreground">
                    Lesson Attachments &amp; Assets
                  </h3>
                  <p className="text-[11px] text-muted-foreground">
                    Provide supplementary PDF slides, code repositories, or reference links.
                  </p>
                </div>

                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setIsAddingResource(true)}
                  className="gap-1.5 text-xs"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Asset</span>
                </Button>
              </div>

              {/* Resource Creation Form */}
              {isAddingResource && (
                <div className="p-4 rounded-xl border border-primary/40 bg-primary-light/20 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-primary">
                      New Attachment
                    </span>
                    <button
                      type="button"
                      onClick={() => setIsAddingResource(false)}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-foreground mb-1">
                        Attachment Title
                      </label>
                      <input
                        type="text"
                        value={newResTitle}
                        onChange={(e) => setNewResTitle(e.target.value)}
                        placeholder="e.g., Schema Diagrams.pdf"
                        className="w-full px-3 py-1.5 rounded-lg border border-border text-xs bg-card text-foreground focus:outline-hidden"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-foreground mb-1">
                        Type
                      </label>
                      <select
                        value={newResType}
                        onChange={(e) =>
                          setNewResType(e.target.value as "pdf" | "zip" | "github" | "link")
                        }
                        className="w-full px-3 py-1.5 rounded-lg border border-border text-xs bg-card text-foreground focus:outline-hidden"
                      >
                        <option value="pdf">PDF Document</option>
                        <option value="zip">Source Code ZIP</option>
                        <option value="github">GitHub Repository</option>
                        <option value="link">External Link</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="sm:col-span-2">
                      <label className="block text-[11px] font-semibold text-foreground mb-1">
                        Download URL or Web Link
                      </label>
                      <input
                        type="url"
                        value={newResUrl}
                        onChange={(e) => setNewResUrl(e.target.value)}
                        placeholder="https://..."
                        className="w-full px-3 py-1.5 rounded-lg border border-border text-xs bg-card text-foreground focus:outline-hidden"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-foreground mb-1">
                        File Size (Optional)
                      </label>
                      <input
                        type="text"
                        value={newResSize}
                        onChange={(e) => setNewResSize(e.target.value)}
                        placeholder="e.g., 3.8 MB"
                        className="w-full px-3 py-1.5 rounded-lg border border-border text-xs bg-card text-foreground focus:outline-hidden"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 pt-1">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setIsAddingResource(false)}
                      className="text-xs"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="button"
                      variant="primary"
                      size="sm"
                      onClick={handleAddResource}
                      className="text-xs"
                    >
                      Attach File
                    </Button>
                  </div>
                </div>
              )}

              {/* Resource List */}
              {resources.length > 0 ? (
                <div className="space-y-2">
                  {resources.map((res) => (
                    <div
                      key={res.id}
                      className="flex items-center justify-between p-3 rounded-xl border border-border bg-card"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="w-7 h-7 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground shrink-0">
                          {res.type === "pdf" && <FileText className="w-3.5 h-3.5" />}
                          {res.type === "zip" && <FileArchive className="w-3.5 h-3.5" />}
                          {(res.type === "github" || res.type === "link") && (
                            <Link2 className="w-3.5 h-3.5" />
                          )}
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-foreground truncate">
                            {res.title}
                          </p>
                          <span className="text-[10px] text-muted-foreground uppercase font-mono">
                            {res.type} {res.size ? `• ${res.size}` : ""}
                          </span>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleDeleteResource(res.id)}
                        className="p-1.5 text-muted-foreground hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                        title="Remove attachment"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 rounded-xl border border-dashed border-border bg-secondary/20">
                  <Paperclip className="w-7 h-7 text-muted-foreground/60 mx-auto mb-2" />
                  <p className="text-xs font-semibold text-foreground">
                    No downloadable assets attached
                  </p>
                  <p className="text-[11px] text-muted-foreground mt-0.5">
                    Click &apos;Add Asset&apos; to attach slides or repository links.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Drawer Footer Actions */}
        <div className="p-4 border-t border-border bg-secondary/30 flex items-center justify-between gap-3 shrink-0">
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
            type="button"
            variant="primary"
            size="sm"
            onClick={handleSave}
            className="gap-2 text-xs shadow-xs"
          >
            <Save className="w-4 h-4" />
            <span>Save Lesson Changes</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
