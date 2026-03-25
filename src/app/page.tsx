import { HeroTitle } from "@/components/hero-title";
import { CertificationsChart } from "@/components/presentation/certifications-chart";
import certificationsData from "@/data/certifications.json";
import { Certification } from "@/lib/types/data";

export default function Home() {
  return (
    <main className="flex-1 py-10">
      <HeroTitle />
      <div className="max-w-5xl mx-auto">
        <CertificationsChart
          certifications={certificationsData.data as Certification[]}
        />
      </div>
    </main>
  );
}
