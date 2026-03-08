"use client";

import { useEffect, useRef } from "react";
import VChart from "@visactor/vchart";

type CategoryChartProps = {
  data: { category: string; count: number }[];
};

export default function CategoryChart({ data }: CategoryChartProps) {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chartRef.current) {
      const spec = {
        type: "bar",
        data: {
          values: data,
        },
        xField: "category",
        yField: "count",
        color: ["#4f46e5", "#7c3aed", "#ec4899", "#f59e0b", "#10b981"],
      };

      const vchart = new VChart(spec, { dom: chartRef.current });
      vchart.renderAsync();

      return () => {
        vchart.release();
      };
    }
  }, [data]);

  return <div ref={chartRef} className="w-full h-64" />;
}