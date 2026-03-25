"use client";

import { useState, useMemo } from "react";
import { Certification, CertType, SkillLevel } from "@/lib/types/data";
import { CertTypeTabs } from "./cert-type-tabs";
import { CertificationsChart } from "./certifications-chart";
import { SkillLevelSelect } from "./skill-level-select";

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
  const [selectedSkillLevels, setSelectedSkillLevels] = useState<SkillLevel[]>([
    "Novice",
    "Beginner",
    "Intermediate",
    "Advanced",
    "Expert",
  ]);

  const currentCertifications = useMemo(() => {
    let certs = [];
    switch (currentCertType) {
      case "blue":
        certs = blueCertifications;
        break;
      case "red":
        certs = redCertifications;
        break;
      case "infoSec":
        certs = infoSecCertifications;
        break;
      default:
        certs = blueCertifications;
    }

    if (selectedSkillLevels.length === 0) {
      return [];
    }

    return certs.filter((cert) =>
      selectedSkillLevels.includes(cert.skill_level),
    );
  }, [
    currentCertType,
    blueCertifications,
    redCertifications,
    infoSecCertifications,
    selectedSkillLevels,
  ]);

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="flex flex-row items-center gap-5 ml-10 mr-10 z-10">
        <CertTypeTabs
          currentCertType={currentCertType}
          setCurrentCertType={setCurrentCertType}
        />
        <SkillLevelSelect
          selectedLevels={selectedSkillLevels}
          onChange={setSelectedSkillLevels}
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
