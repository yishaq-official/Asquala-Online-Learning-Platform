"use client";

import * as React from "react";
import Link from "next/link";
import { MOCK_CERTIFICATES, MOCK_ENROLLED_COURSES } from "@/lib/mock-student-data";
import { CertificateGridCard } from "@/components/student/certificates/certificate-grid-card";
import { CertificatePreviewModal } from "@/components/student/certificates/certificate-preview-modal";
import { UpcomingCertificatesWidget } from "@/components/student/certificates/upcoming-certificates-widget";
import { CertificateEmptyState } from "@/components/student/certificates/certificate-empty-state";
import { Award, ShieldCheck } from "lucide-react";
import { CertificateItem } from "@/types/student";

export default function StudentCertificatesPage() {
  const [selectedCertificate, setSelectedCertificate] = React.useState<CertificateItem | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const handleOpenPreview = (cert: CertificateItem) => {
    setSelectedCertificate(cert);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCertificate(null);
  };

  const inProgressCourses = React.useMemo(() => {
    return MOCK_ENROLLED_COURSES.filter(
      (c) => !c.isCompleted && c.progressPercentage < 100
    );
  }, []);

  return (
    <div className="space-y-8 animate-in fade-in-0 duration-300">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-light text-primary text-xs font-semibold mb-2 border border-primary-border">
            <Award className="w-3.5 h-3.5" />
            <span>Accredited Credentials & Industry Seals</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            My Certificates & Credentials
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1 max-w-2xl">
            View, download high-resolution PDFs, and share your official credentials on LinkedIn or your portfolio.
          </p>
        </div>

        {/* Count Badge */}
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-card border border-border text-xs font-semibold text-muted-foreground w-fit">
          <ShieldCheck className="w-4 h-4 text-primary" />
          <span>
            <strong className="text-foreground">{MOCK_CERTIFICATES.length}</strong> Verified Credentials
          </span>
        </div>
      </div>

      {/* Main Grid of Certificates */}
      {MOCK_CERTIFICATES.length > 0 ? (
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {MOCK_CERTIFICATES.map((cert) => (
              <CertificateGridCard
                key={cert.id}
                certificate={cert}
                onPreview={handleOpenPreview}
              />
            ))}
          </div>

          {/* Upcoming Certificates Section */}
          <UpcomingCertificatesWidget inProgressCourses={inProgressCourses} />
        </div>
      ) : (
        <CertificateEmptyState />
      )}

      {/* Full-Screen Printable Preview Modal */}
      <CertificatePreviewModal
        certificate={selectedCertificate}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}
