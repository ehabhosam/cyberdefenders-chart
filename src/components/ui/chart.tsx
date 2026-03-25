"use client";

import { useMemo } from "react";
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  ChartOptions,
  Plugin,
} from "chart.js";
import { Scatter } from "react-chartjs-2";
import { cn } from "@/lib/utils";

// register necessary components for chart.js v3 and above
// as it uses tree shaking and doesn't include everything by default
ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);

export interface ChartDataPoint {
  x: number;
  y: number;
  label: string;
}

export interface ScatterChartProps {
  data: ChartDataPoint[];
  className?: string;
  xLabel?: string;
  yLabel?: string;
  xMax?: number;
  yMax?: number;
}

const quadrantPlugin: Plugin<"scatter"> = {
  id: "quadrants", // unique indentifier for the plugin
  // custom lifecycle method that runs before data points are drawn
  // used to draw the quadrant lines and labels on the chart
  beforeDraw(chart) {
    const { ctx, chartArea } = chart;
    if (!chartArea) return;

    const { left, top, right, bottom, width, height } = chartArea;
    const midX = left + width / 2;
    const midY = top + height / 2;

    ctx.save();

    // Draw quadrant backgrounds
    ctx.fillStyle = "rgba(51, 65, 85, 0.5)";
    // Top-Right (LEADERS)
    ctx.fillRect(midX, top, width / 2, height / 2);
    // Bottom-Left (NICHE PLAYERS)
    ctx.fillRect(left, midY, width / 2, height / 2);

    // Draw quadrant dividing lines
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.strokeStyle = "rgba(51, 65, 85, 0.5)"; // Tailwind slate-700 with opacity

    // Vertical line
    ctx.moveTo(midX, top);
    ctx.lineTo(midX, bottom);
    // Horizontal line
    ctx.moveTo(left, midY);
    ctx.lineTo(right, midY);
    ctx.stroke();

    // Draw quadrant labels
    ctx.font = "12px sans-serif";
    ctx.fillStyle = "#7e92af"; // var(--muted-foreground)
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    const labelPadding = 20;

    // CHALLENGERS (Top-Left)
    ctx.fillText("CHALLENGERS", left + width / 4, top + labelPadding);
    // LEADERS (Top-Right)
    ctx.fillText("LEADERS", left + (width * 3) / 4, top + labelPadding);
    // NICHE PLAYERS (Bottom-Left)
    ctx.fillText("NICHE PLAYERS", left + width / 4, bottom - labelPadding);
    // VISIONARIES (Bottom-Right)
    ctx.fillText("VISIONARIES", left + (width * 3) / 4, bottom - labelPadding);

    ctx.restore();
  },
};

const pointLabelsPlugin: Plugin<"scatter"> = {
  id: "pointLabels",
  // custom lifecycle method that runs after data points are drawn
  // used to draw labels next to each data point on the chart
  afterDatasetsDraw(chart) {
    const { ctx } = chart;
    chart.data.datasets.forEach((dataset, i) => {
      const meta = chart.getDatasetMeta(i);
      if (!meta.hidden) {
        meta.data.forEach((element: any, index) => {
          const dataPoint = dataset.data[index] as any;
          if (dataPoint && dataPoint.label) {
            ctx.fillStyle = "#dce1e7"; // var(--foreground)
            ctx.font = "10px sans-serif";
            ctx.textAlign = "center";
            ctx.textBaseline = "top";

            const position = element.tooltipPosition();
            ctx.fillText(dataPoint.label, position.x, position.y + 8);
          }
        });
      }
    });
  },
};

export function Chart({
  data,
  className,
  xLabel = "MARKET PRESENCE",
  yLabel = "SATISFACTION",
  xMax = 100,
  yMax = 100,
}: ScatterChartProps) {
  // chartData & options are memoized to prevent unnecessary re-renders and improve performance.
  // as the chart can be complex and re-rendering can be expensive, especially with plugins and custom options.

  const chartData = useMemo(() => {
    return {
      datasets: [
        {
          label: "Entities",
          data: data,
          backgroundColor: "#4d77ff", // var(--primary)
          borderColor: "#99aff5",
          borderWidth: 1,
          pointRadius: 6,
          pointHoverRadius: 8,
        },
      ],
    };
  }, [data]);

  const options: ChartOptions<"scatter"> = useMemo(() => {
    return {
      responsive: true,
      maintainAspectRatio: false,
      layout: {
        padding: {
          top: 20,
          right: 20,
          bottom: 20,
          left: 20,
        },
      },
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          callbacks: {
            label: (context) => {
              const point = context.raw as ChartDataPoint;
              return `${point.label}: (${point.x}, ${point.y})`;
            },
          },
          backgroundColor: "#1e293b", // var(--card)
          titleColor: "#dce1e7", // var(--foreground)
          bodyColor: "#dce1e7",
          borderColor: "#334155", // var(--border)
          borderWidth: 1,
        },
      },
      scales: {
        x: {
          type: "linear",
          position: "bottom",
          min: 0,
          max: xMax,
          title: {
            display: !!xLabel,
            text: xLabel,
            color: "#dce1e7",
            font: {
              size: 14,
              weight: "bold",
            },
            align: "start",
          },
          grid: {
            display: false,
          },
          border: {
            color: "#dce1e7",
          },
          ticks: {
            display: false,
          },
        },
        y: {
          type: "linear",
          position: "left",
          min: 0,
          max: yMax,
          title: {
            display: !!yLabel,
            text: yLabel,
            color: "#dce1e7",
            font: {
              size: 14,
              weight: "bold",
            },
            align: "end",
          },
          grid: {
            display: false,
          },
          border: {
            color: "#dce1e7",
          },
          ticks: {
            display: false,
          },
        },
      },
    };
  }, [xLabel, yLabel, xMax, yMax]);

  return (
    <div className={cn("relative w-full h-200 bg-background", className)}>
      <Scatter
        data={chartData}
        options={options}
        plugins={[quadrantPlugin, pointLabelsPlugin]}
      />
    </div>
  );
}
