"use client";

import React, { useRef, useState } from "react";
import { UploadCloud, FileText, CheckCircle2, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DocumentUploadZoneProps {
  label: string;
  helperText?: string;
  acceptedFormats?: string;
  currentFileName?: string;
  onFileSelect: (file: { name: string; size: string }) => void;
  onFileRemove: () => void;
  required?: boolean;
}

export function DocumentUploadZone({
  label,
  helperText = "Supported formats: PDF, PNG, JPG (Max 10MB)",
  acceptedFormats = ".pdf,.png,.jpg,.jpeg",
  currentFileName,
  onFileSelect,
  onFileRemove,
  required = false,
}: DocumentUploadZoneProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const sizeMB = (file.size / (1024 * 1024)).toFixed(1);
      onFileSelect({
        name: file.name,
        size: `${sizeMB} MB`,
      });
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      const sizeMB = (file.size / (1024 * 1024)).toFixed(1);
      onFileSelect({
        name: file.name,
        size: `${sizeMB} MB`,
      });
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-xs font-semibold text-foreground">
        <label className="flex items-center gap-1">
          <span>{label}</span>
          {required && <span className="text-destructive">*</span>}
        </label>
        <span className="text-[11px] font-normal text-muted-foreground">
          Academic Proof Document
        </span>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept={acceptedFormats}
        onChange={handleFileChange}
        className="hidden"
      />

      {currentFileName ? (
        <div className="flex items-center justify-between p-3.5 rounded-xl border border-primary-border bg-primary-light/40 transition-all">
          <div className="flex items-center gap-3 min-w-0">
            <div className="p-2 rounded-lg bg-primary text-white shrink-0">
              <FileText className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-semibold text-foreground truncate max-w-[220px] sm:max-w-xs">
                  {currentFileName}
                </span>
                <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" />
              </div>
              <span className="text-[11px] text-muted-foreground block">
                Ready for academic board verification
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              onFileRemove();
              if (fileInputRef.current) fileInputRef.current.value = "";
            }}
            className="p-1.5 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors cursor-pointer"
            aria-label="Remove attached document"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-xl p-5 sm:p-6 text-center cursor-pointer transition-all ${
            isDragging
              ? "border-primary bg-primary-light/50"
              : "border-border hover:border-primary/50 hover:bg-secondary/40 bg-card"
          }`}
        >
          <div className="flex flex-col items-center justify-center gap-2">
            <div className="w-10 h-10 rounded-full bg-primary-light text-primary flex items-center justify-center border border-primary-border">
              <UploadCloud className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <p className="text-xs font-semibold text-foreground">
                <span className="text-primary hover:underline">Click to upload document</span> or drag & drop file
              </p>
              <p className="text-[11px] text-muted-foreground">{helperText}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
