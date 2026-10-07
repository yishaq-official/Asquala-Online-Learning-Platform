"use client";

import * as React from "react";
import { Download, FileText, Code2, FolderArchive, ExternalLink, Check } from "lucide-react";
import { CourseResource } from "@/types/student";

interface CourseResourcesListProps {
  resources: CourseResource[];
}

export function CourseResourcesList({ resources }: CourseResourcesListProps) {
  const [downloadedId, setDownloadedId] = React.useState<string | null>(null);

  const handleDownload = (id: string) => {
    setDownloadedId(id);
    setTimeout(() => setDownloadedId(null), 2000);
  };

  const getResourceIcon = (type: string) => {
    switch (type) {
      case "github":
        return <Code2 className="w-5 h-5 text-primary" />;
      case "pdf":
        return <FileText className="w-5 h-5 text-rose-500" />;
      case "zip":
        return <FolderArchive className="w-5 h-5 text-amber-500" />;
      default:
        return <FileText className="w-5 h-5 text-primary" />;
    }
  };

  return (
    <div className="space-y-4">
      <div className="pb-1">
        <h2 className="text-base sm:text-lg font-bold text-foreground">Course Materials & Downloads</h2>
        <p className="text-xs text-muted-foreground mt-0.5">
          Download supplementary architectural notes, slide decks, and project starter code.
        </p>
      </div>

      <div className="space-y-3">
        {resources.map((resource) => (
          <div
            key={resource.id}
            className="p-4 rounded-xl border border-border bg-card hover:border-primary-border/70 hover:shadow-2xs transition-all flex items-center justify-between gap-4"
          >
            <div className="flex items-center gap-3.5 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center shrink-0 border border-border">
                {getResourceIcon(resource.type)}
              </div>

              <div className="min-w-0 space-y-0.5">
                <h3 className="text-xs sm:text-sm font-bold text-foreground truncate">
                  {resource.title}
                </h3>
                <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
                  <span className="uppercase font-semibold">{resource.type}</span>
                  {resource.size && (
                    <>
                      <span>•</span>
                      <span>{resource.size}</span>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="shrink-0">
              {resource.type === "github" ? (
                <a
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border hover:bg-secondary text-xs font-semibold text-foreground transition-colors"
                >
                  <span>Repository</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              ) : (
                <button
                  type="button"
                  onClick={() => handleDownload(resource.id)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary-light text-primary hover:bg-primary hover:text-white border border-primary-border/80 text-xs font-semibold transition-all cursor-pointer"
                >
                  {downloadedId === resource.id ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Downloaded</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-3.5 h-3.5" />
                      <span>Download</span>
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
