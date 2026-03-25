import { HeroTitle } from "@/components/hero-title";
import { Chart } from "@/components/ui/chart";

export default function Home() {
  const chartData = [
    { x: 75, y: 75, label: "CCD" },
    { x: 55, y: 80, label: "CDSA" },
    { x: 95, y: 65, label: "BTL1" },
    { x: 55, y: 45, label: "Security+" },
    // ... insert your real data here
  ];
  return (
    <main className="flex-1 py-10">
      <HeroTitle />
      <div className="max-w-5xl mx-auto">
        <Chart
          data={chartData}
          xMax={100}
          yMax={100}
          xLabel="MARKET PRESENCE"
          yLabel="SATISFACTION"
        />
      </div>
    </main>
  );
}
