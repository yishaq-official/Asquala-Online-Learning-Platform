"use client";

import * as React from "react";
import { Share2, Copy, Check } from "lucide-react";

interface CertificateSharePopoverProps {
  verificationCode: string;
  courseTitle: string;
}

export function CertificateSharePopover({
  verificationCode,
  courseTitle,
}: CertificateSharePopoverProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [copied, setCopied] = React.useState(false);
  const menuRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const verifyUrl = typeof window !== "undefined"
    ? `${window.location.origin}/verify/${verificationCode}`
    : `https://asquala.edu/verify/${verificationCode}`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(verifyUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy link:", err);
    }
  };

  const handleLinkedInShare = () => {
    const linkedInUrl = `https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&name=${encodeURIComponent(
      courseTitle
    )}&organizationName=Asquala+Online+School&certUrl=${encodeURIComponent(
      verifyUrl
    )}&certId=${encodeURIComponent(verificationCode)}`;
    window.open(linkedInUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="relative inline-block" ref={menuRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-border bg-card hover:bg-secondary text-xs font-semibold text-foreground transition-colors cursor-pointer"
        title="Share certificate"
        aria-label="Share certificate"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <Share2 className="w-3.5 h-3.5 text-muted-foreground" />
        <span>Share</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 bottom-full mb-2 w-56 rounded-xl bg-card border border-border shadow-lg p-1.5 z-50 animate-in fade-in-0 zoom-in-95 space-y-1">
          <button
            type="button"
            onClick={handleCopyLink}
            className="w-full flex items-center justify-between px-3 py-2 text-xs font-medium text-foreground hover:bg-secondary rounded-lg transition-colors cursor-pointer"
          >
            <span className="flex items-center gap-2">
              {copied ? (
                <Check className="w-3.5 h-3.5 text-primary" />
              ) : (
                <Copy className="w-3.5 h-3.5 text-muted-foreground" />
              )}
              <span>{copied ? "Link Copied!" : "Copy Verification URL"}</span>
            </span>
          </button>

          <button
            type="button"
            onClick={handleLinkedInShare}
            className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-foreground hover:bg-secondary rounded-lg transition-colors cursor-pointer"
          >
            <svg
              className="w-3.5 h-3.5 text-foreground fill-current"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37h2.79V10.9H6.46M7.86 6.54a1.62 1.62 0 1 0 0 3.24 1.62 1.62 0 0 0 0-3.24" />
            </svg>
            <span>Add to LinkedIn</span>
          </button>
        </div>
      )}
    </div>
  );
}
