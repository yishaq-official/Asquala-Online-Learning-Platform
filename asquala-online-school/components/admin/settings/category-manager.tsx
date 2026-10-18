"use client";

import React, { useState } from "react";
import {
  Globe,
  Cloud,
  Smartphone,
  Cpu,
  Shield,
  Palette,
  Layers,
  Plus,
  CheckCircle2,
  X,
  Sparkles,
  BookOpen,
  Tag,
} from "lucide-react";
import { CurriculumCategory } from "@/types/admin";
import { useAdminUiStore } from "@/stores/admin-ui-store";

const ICON_MAP: Record<string, React.ElementType> = {
  Globe,
  Cloud,
  Smartphone,
  Cpu,
  Shield,
  Palette,
  Layers,
};

export function CategoryManager() {
  const { curriculumCategories, addCurriculumCategory, toggleCategoryActive, addSecurityAuditLog, activeAuditor } =
    useAdminUiStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [iconName, setIconName] = useState("Layers");
  const [tagsInput, setTagsInput] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleOpenModal = () => {
    setName("");
    setDescription("");
    setIconName("Layers");
    setTagsInput("");
    setError(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleCreateCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("Please specify a category name.");
      return;
    }
    if (!description.trim()) {
      setError("Please provide a pedagogical description.");
      return;
    }

    const slug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    const popularTags = tagsInput
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    addCurriculumCategory({
      name: name.trim(),
      slug,
      description: description.trim(),
      iconName,
      popularTags: popularTags.length > 0 ? popularTags : [name.trim()],
      isActive: true,
    });

    addSecurityAuditLog({
      actorName: activeAuditor.name,
      actorRole: activeAuditor.roleTitle,
      actorAvatar: activeAuditor.avatarUrl || "",
      actionType: "category_created",
      targetEntity: "Curriculum Taxonomy",
      targetId: slug,
      summary: `Introduced new technology discipline: ${name.trim()} into educator curriculum authoring studio.`,
      ipAddress: "197.156.104.22 (Addis Ababa, Ethio Telecom)",
    });

    setIsModalOpen(false);
  };

  return (
    <div className="bg-card border border-border rounded-3xl p-5 sm:p-6 shadow-2xs space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-border">
        <div>
          <h2 className="text-base font-bold text-foreground flex items-center gap-2">
            <Layers className="w-4 h-4 text-emerald-800" />
            Curriculum Taxonomy & Academic Disciplines
          </h2>
          <p className="text-xs text-muted-foreground">
            Manage official technology tracks available for instructors authoring courses
          </p>
        </div>

        <button
          onClick={handleOpenModal}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-primary text-primary-foreground hover:bg-primary-hover shadow-2xs transition-all self-start sm:self-auto"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Technology Track</span>
        </button>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {curriculumCategories.map((cat) => {
          const IconComponent = ICON_MAP[cat.iconName] || Layers;

          return (
            <div
              key={cat.id}
              className={`p-4 rounded-2xl border transition-all ${
                cat.isActive
                  ? "bg-card border-border hover:border-emerald-300 hover:shadow-xs"
                  : "bg-muted/30 border-dashed border-border opacity-60"
              }`}
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-800 shrink-0">
                  <IconComponent className="w-4 h-4" />
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-950 border border-emerald-200">
                    {cat.courseCount} {cat.courseCount === 1 ? "Course" : "Courses"}
                  </span>
                  <button
                    onClick={() => toggleCategoryActive(cat.id)}
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-md transition-colors ${
                      cat.isActive
                        ? "text-muted-foreground hover:text-foreground"
                        : "text-emerald-800 hover:text-emerald-950"
                    }`}
                  >
                    {cat.isActive ? "Deactivate" : "Activate"}
                  </button>
                </div>
              </div>

              <h3 className="text-sm font-bold text-foreground mb-1">
                {cat.name}
              </h3>
              <p className="text-xs text-muted-foreground line-clamp-2 mb-3">
                {cat.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 pt-2 border-t border-border/60">
                {cat.popularTags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-medium px-2 py-0.5 rounded bg-muted/60 text-muted-foreground border border-border"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Category Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
          aria-labelledby="category-modal-title"
        >
          <div className="bg-card border border-border rounded-3xl w-full max-w-md shadow-xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-5 border-b border-border flex items-center justify-between bg-muted/30">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-800">
                  <Layers className="w-4 h-4" />
                </div>
                <h3 id="category-modal-title" className="text-sm font-bold text-foreground">
                  Add Technology Curriculum Track
                </h3>
              </div>
              <button
                onClick={handleCloseModal}
                className="w-7 h-7 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateCategory} className="p-5 space-y-4 text-xs">
              {error && (
                <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 font-semibold text-[11px]">
                  {error}
                </div>
              )}

              <div className="space-y-1">
                <label className="font-bold text-foreground block">
                  Discipline Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Distributed Database Systems"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-border bg-background text-foreground text-xs focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-foreground block">
                  Pedagogical Description <span className="text-rose-500">*</span>
                </label>
                <textarea
                  rows={3}
                  placeholder="e.g. High-availability distributed storage, Raft consensus, and shard topology..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-border bg-background text-foreground text-xs focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-foreground block">
                    Discipline Icon
                  </label>
                  <select
                    value={iconName}
                    onChange={(e) => setIconName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-border bg-background text-foreground text-xs focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
                  >
                    <option value="Globe">Globe (Web)</option>
                    <option value="Cloud">Cloud (DevOps)</option>
                    <option value="Smartphone">Smartphone (Mobile)</option>
                    <option value="Cpu">Cpu (AI / ML)</option>
                    <option value="Shield">Shield (Security)</option>
                    <option value="Palette">Palette (UI/UX)</option>
                    <option value="Layers">Layers (General)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-foreground block">
                    Curriculum Tags
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Raft, Redis, CockroachDB"
                    value={tagsInput}
                    onChange={(e) => setTagsInput(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-border bg-background text-foreground text-xs focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2 border-t border-border">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-3.5 py-2 rounded-xl font-bold text-muted-foreground hover:bg-muted border border-border"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl font-bold bg-primary text-primary-foreground hover:bg-primary-hover shadow-2xs"
                >
                  Save Discipline
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
