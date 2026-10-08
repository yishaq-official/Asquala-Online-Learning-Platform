"use client";

import React, { useState } from "react";
import { Code, Check, Copy } from "lucide-react";

interface CodeSnippetInputProps {
  code: string;
  language?: string;
  onChange: (code: string) => void;
  onLanguageChange?: (lang: string) => void;
  placeholder?: string;
}

const SUPPORTED_LANGUAGES = ["typescript", "javascript", "sql", "bash", "python"];

export function CodeSnippetInput({
  code,
  language = "typescript",
  onChange,
  onLanguageChange,
  placeholder = "// Paste or write code snippet here...",
}: CodeSnippetInputProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (!code) return;
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-xl border border-border bg-slate-950 overflow-hidden shadow-xs">
      {/* Code Editor Header */}
      <div className="flex items-center justify-between px-3.5 py-2 bg-slate-900 border-b border-slate-800 text-xs">
        <div className="flex items-center gap-2">
          <Code className="w-3.5 h-3.5 text-primary" />
          {onLanguageChange ? (
            <select
              value={language}
              onChange={(e) => onLanguageChange(e.target.value)}
              className="bg-slate-800 text-slate-200 text-[11px] font-mono px-2 py-0.5 rounded border border-slate-700 focus:outline-hidden"
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option key={lang} value={lang}>
                  {lang}
                </option>
              ))}
            </select>
          ) : (
            <span className="font-mono text-[11px] text-slate-400 uppercase">
              {language}
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={handleCopy}
          className="p-1 rounded text-slate-400 hover:text-slate-200 transition-colors"
          title="Copy code"
        >
          {copied ? (
            <Check className="w-3.5 h-3.5 text-emerald-400" />
          ) : (
            <Copy className="w-3.5 h-3.5" />
          )}
        </button>
      </div>

      {/* Textarea */}
      <textarea
        rows={5}
        value={code}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full p-3.5 bg-slate-950 text-slate-100 font-mono text-xs leading-relaxed focus:outline-hidden resize-y placeholder:text-slate-600"
        spellCheck={false}
      />
    </div>
  );
}
