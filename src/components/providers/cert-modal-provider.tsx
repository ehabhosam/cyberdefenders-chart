"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { Certification } from "@/lib/types/data";

interface CertModalContextType {
  openModal: (cert: Certification) => void;
  closeModal: () => void;
}

const CertModalContext = createContext<CertModalContextType | undefined>(
  undefined
);

export function useCertModal() {
  const context = useContext(CertModalContext);
  if (!context) {
    throw new Error("useCertModal must be used within a CertModalProvider");
  }
  return context;
}

export function CertModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);

  const openModal = (cert: Certification) => {
    setSelectedCert(cert);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedCert(null);
  };

  return (
    <CertModalContext.Provider value={{ openModal, closeModal }}>
      {children}

      {isOpen && selectedCert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm">
          <div className="bg-[#1e293b] text-slate-200 border border-slate-700 w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-xl shadow-2xl relative flex flex-col">

            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white transition-colors rounded-full hover:bg-slate-700/50"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>

            <div className="p-6 md:p-8">
              {/* Header */}
              <div className="flex flex-col-reverse md:flex-row justify-between items-start gap-6 mb-8">
                <div className="flex-1 pr-8">
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                    {selectedCert.title} - {selectedCert.abbreviation}
                  </h2>
                  <p className="text-slate-400 leading-relaxed">
                    {selectedCert.description}
                  </p>
                </div>
                {selectedCert.image && (
                  <div className="flex-shrink-0 w-32 h-32 md:w-40 md:h-40 bg-slate-800/50 rounded-lg p-2 flex items-center justify-center border border-slate-700/50">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={selectedCert.image} alt={selectedCert.abbreviation} className="max-w-full max-h-full object-contain" />
                  </div>
                )}
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-y-6 gap-x-4 text-sm md:text-base">

                <div className="font-semibold text-slate-300">Provider:</div>
                <div>{selectedCert.provider?.name || "N/A"}</div>

                <div className="font-semibold text-slate-300">Cost:</div>
                <div>{selectedCert.cost}</div>

                <div className="font-semibold text-slate-300">Training:</div>
                <div>{selectedCert.training_included ? "Included in cost" : "Not included"}</div>

                <div className="font-semibold text-slate-300">Valid for:</div>
                <div>{selectedCert.valid_for || "N/A"}</div>

                <div className="font-semibold text-slate-300 pt-1">Job Roles:</div>
                <div className="flex flex-wrap gap-2">
                  {selectedCert.job_roles_titles.map((role, i) => (
                    <span key={i} className="bg-slate-700 text-slate-300 px-3 py-1 rounded-md text-sm">
                      {role}
                    </span>
                  ))}
                </div>

                <div className="font-semibold text-slate-300 pt-1">Requirements:</div>
                <div className="space-y-4">
                  {selectedCert.requirements_data?.knowledge && (
                    <div className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-slate-400 mt-0.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 18h6" /><path d="M10 22h4" /><path d="M12 2v1" /><path d="M12 7a5 5 0 1 0 5 5 5 5 0 0 0-5-5z" />
                      </svg>
                      <div>
                        <strong className="text-slate-200">Knowledge:</strong> <span className="text-slate-400">{selectedCert.requirements_data.knowledge}</span>
                      </div>
                    </div>
                  )}
                  {selectedCert.requirements_data?.work_experience && (
                    <div className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-slate-400 mt-0.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="7" width="20" height="14" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                      </svg>
                      <div>
                        <strong className="text-slate-200">Work Experience:</strong> <span className="text-slate-400">{selectedCert.requirements_data.work_experience}</span>
                      </div>
                    </div>
                  )}
                  {selectedCert.requirements_data?.prior_courses_and_certifications && (
                    <div className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-slate-400 mt-0.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" />
                      </svg>
                      <div>
                        <strong className="text-slate-200">Prior Courses/Certifications:</strong> <span className="text-slate-400">{selectedCert.requirements_data.prior_courses_and_certifications}</span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="font-semibold text-slate-300 pt-1">Domains covered:</div>
                <div className="flex flex-wrap gap-2">
                  {selectedCert.domains_covered_titles.map((domain, i) => (
                    <span key={i} className="bg-slate-700/50 border border-slate-600 text-slate-300 px-3 py-1 rounded-md text-sm">
                      {domain}
                    </span>
                  ))}
                </div>

                <div className="font-semibold text-slate-300">Exam Attempts:</div>
                <div>{selectedCert.number_of_attempts} Attempts</div>

                <div className="font-semibold text-slate-300">Exam Format:</div>
                <div>{selectedCert.exam_details_data?.format || "N/A"}</div>

                <div className="font-semibold text-slate-300">Exam Duration:</div>
                <div>{selectedCert.exam_details_data?.duration || "N/A"}</div>

                <div className="font-semibold text-slate-300">Exam Report:</div>
                <div className={selectedCert.exam_details_data?.report_required ? "text-emerald-500 font-medium" : "text-slate-400"}>
                  {selectedCert.exam_details_data?.report_required ? "Required" : "Not Required"}
                </div>

              </div>
            </div>
          </div>
        </div>
      )}
    </CertModalContext.Provider>
  );
}
