import { HeroTitle } from "@/components/hero-title";
import CertificationsContainer from "@/components/integration/certifications-container";

export default function Home() {
  return (
    <main className="flex-1 py-10 space-y-4">
      <HeroTitle />
      <div className="max-w-5xl mx-auto">
        <CertificationsContainer />
      </div>
    </main>
  );
}
