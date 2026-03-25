"use client";

import { MultiSelect } from "@/components/ui/multi-select";
import { SkillLevel } from "@/lib/types/data";

const skillLevels: SkillLevel[] = [
  "Novice",
  "Beginner",
  "Intermediate",
  "Advanced",
  "Expert",
];

interface SkillLevelSelectProps {
  selectedLevels: SkillLevel[];
  onChange: (levels: SkillLevel[]) => void;
  className?: string;
}

export function SkillLevelSelect({
  selectedLevels,
  onChange,
  className,
}: SkillLevelSelectProps) {
  return (
    <MultiSelect
      options={skillLevels}
      selected={selectedLevels}
      onChange={(selected) => onChange(selected as SkillLevel[])}
      placeholder="Select Skill Level"
      className={className}
    />
  );
}
