import { getCertifications } from "@/lib/api/certifications";
import { Certification } from "@/lib/types/data";
import { Certifications } from "../presentation/certifications";

export default async function CertificationsContainer() {
  let certifications: Certification[];
  try {
    const response = await getCertifications();
    certifications = response.data.certifications;
  } catch (error) {
    console.error("Error fetching certifications:", error);
    return (
      <div className="text-red-500">Failed to load certifications data.</div>
    );
  }

  const blueCertifications: Certification[] = [];
  const redCertifications: Certification[] = [];
  const infoSecCertifications: Certification[] = [];

  for (const cert of certifications) {
    if (cert.cert_type === "blue") {
      blueCertifications.push(cert);
    } else if (cert.cert_type === "red") {
      redCertifications.push(cert);
    } else if (cert.cert_type === "infoSec") {
      infoSecCertifications.push(cert);
    }
  }

  return (
    <Certifications
      blueCertifications={blueCertifications}
      redCertifications={redCertifications}
      infoSecCertifications={infoSecCertifications}
    />
  );
}
