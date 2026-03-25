"use client";

import { useState, useMemo } from "react";
import { Certification, CertType } from "@/lib/types/data";
import { CertTypeTabs } from "./cert-type-tabs";
import { CertificationsChart } from "./certifications-chart";

interface CertificationsProps {
  blueCertifications: Certification[];
  redCertifications: Certification[];
  infoSecCertifications: Certification[];
}

export function Certifications({
  blueCertifications,
  redCertifications,
  infoSecCertifications,
}: CertificationsProps) {
  const [currentCertType, setCurrentCertType] = useState<CertType>("blue");

  const currentCertifications = useMemo(() => {
    switch (currentCertType) {
      case "blue":
        return blueCertifications;
      case "red":
        return redCertifications;
      case "infoSec":
        return infoSecCertifications;
      default:
        return blueCertifications;
    }
  }, [
    currentCertType,
    blueCertifications,
    redCertifications,
    infoSecCertifications,
  ]);

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="ml-10">
        <CertTypeTabs
          currentCertType={currentCertType}
          setCurrentCertType={setCurrentCertType}
        />
      </div>
      <div className="w-full">
        <CertificationsChart
          certifications={currentCertifications}
          certType={currentCertType}
        />
      </div>
    </div>
  );
}
