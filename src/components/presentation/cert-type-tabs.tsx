"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CertType } from "@/lib/types/data";

interface CertTypeTabsProps {
  currentCertType: CertType;
  setCurrentCertType: (type: CertType) => void;
}

export function CertTypeTabs({
  currentCertType,
  setCurrentCertType,
}: CertTypeTabsProps) {
  return (
    <div className="flex">
      <Tabs
        value={currentCertType}
        onValueChange={(value) => setCurrentCertType(value as CertType)}
        className="w-fit"
      >
        <TabsList className="bg-[#0f172a] border border-[#3b82f6] p-0 h-10 rounded-md overflow-hidden flex gap-0">
          <TabsTrigger
            value="blue"
            className="rounded-none border-r border-[#3b82f6] px-6 py-2 text-sm font-semibold data-[state=active]:bg-[#5b8def] data-[state=active]:text-white text-[#5b8def] hover:text-white transition-colors h-full"
          >
            Blue Team
          </TabsTrigger>
          <TabsTrigger
            value="red"
            className="rounded-none border-r border-[#3b82f6] px-6 py-2 text-sm font-semibold data-[state=active]:bg-[#5b8def] data-[state=active]:text-white text-[#5b8def] hover:text-white transition-colors h-full"
          >
            Red Team
          </TabsTrigger>
          <TabsTrigger
            value="infoSec"
            className="rounded-none px-6 py-2 text-sm font-semibold data-[state=active]:bg-[#5b8def] data-[state=active]:text-white text-[#5b8def] hover:text-white transition-colors h-full"
          >
            InfoSec
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
}
