"use client";

import { Chart } from "@/components/ui/chart";
import { certColor } from "@/lib/constants";
import { Certification, CertType } from "@/lib/types/data";

interface CertificationsChartProps {
  certifications: Certification[];
  certType: CertType;
}

export function CertificationsChart({
  certifications,
  certType,
}: CertificationsChartProps) {
  const chartData = certifications.map((cert) => ({
    // Scale down and add offset to prevent points from hugging the edges
    x: 5 + cert.market_presence * 90,
    y: 5 + (cert.satisfaction / 5) * 90 - 15, // 15 shift down to better fit the chart
    label: cert.abbreviation,
  }));

  return (
    <Chart
      data={chartData}
      xMax={100}
      yMax={100}
      xLabel="MARKET PRESENCE"
      yLabel="SATISFACTION"
      pointColor={certColor[certType]}
    />
  );
}
