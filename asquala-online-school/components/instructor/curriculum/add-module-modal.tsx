"use client";

import React, { useState } from "react";
import { X, Layers, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AddModuleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddModule: (title: string, description?: string) => void;
  nextModuleNumber: number;
}

export function AddModuleModal({
  isOpen,
  onClose,
  onAddModule,
  nextModuleNumber,
}: AddModuleModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError("Module title is required.");
      return;
    }

    onAddModule(title.trim(), description.trim() || undefined);
    setTitle("");
    setDescription("");
    setError("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-card border border-border rounded-2xl w-full max-w-lg shadow-xl overflow-hidden animate-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-border bg-secondary/30">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-primary-light border border-primary-border flex items-center justify-center text-primary">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-foreground">
                Add New Module
              </h2>
              <p className="text-xs text-muted-foreground">
                Organize your curriculum into sequential learning milestones
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-foreground mb-1.5">
              Module Title <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (error) setError("");
              }}
              placeholder={`Module ${nextModuleNumber}: e.g. Server Actions & Mutations`}
              className={`w-full px-3.5 py-2.5 rounded-xl border text-sm bg-card text-foreground focus:outline-hidden ring-2 ring-primary/20 ${
                error ? "border-rose-400" : "border-border focus:border-primary"
              }`}
              autoFocus
            />
            {error && (
              <p className="text-xs text-rose-500 mt-1 font-medium">{error}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-foreground mb-1.5">
              Module Objective or Summary{" "}
              <span className="text-muted-foreground font-normal">(Optional)</span>
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief description of skills or architectural concepts taught in this module..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-border focus:border-primary text-sm bg-card text-foreground focus:outline-hidden ring-2 ring-primary/20 resize-none"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-border/80">
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
              type="submit"
              variant="primary"
              size="sm"
              className="gap-1.5 text-xs shadow-xs"
            >
              <Plus className="w-4 h-4" />
              <span>Create Module</span>
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
