"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import VChart from "@visactor/vchart";

type CategoryChartProps = {
  data: { category: string; count: number }[];
};

// Colores para el gráfico
const CHART_COLORS_DARK = ["#6366f1", "#8b5cf6", "#ec4899", "#f59e0b", "#10b981", "#06b6d4", "#3b82f6"];
const CHART_COLORS_LIGHT = ["#4f46e5", "#7c3aed", "#ec4899", "#f59e0b", "#10b981", "#06b6d4", "#3b82f6"];

// Constantes de temas
const THEME_CONFIG = {
  dark: {
    background: "#111827",
    text: "#f3f4f6",
    textSecondary: "#d1d5db",
    border: "#4b5563",
    grid: "#374151",
    shadow: "rgba(0,0,0,0.3)",
  },
  light: {
    background: "#ffffff",
    text: "#1f2937",
    textSecondary: "#6b7280",
    border: "#e5e7eb",
    grid: "#f3f4f6",
    shadow: "rgba(0,0,0,0.05)",
  },
};

export default function CategoryChart({ data }: CategoryChartProps) {
  const chartRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    if (!chartRef.current || !theme) return;

    const isDark = theme === "dark";
    const themeConfig = isDark ? THEME_CONFIG.dark : THEME_CONFIG.light;
    const colors = isDark ? CHART_COLORS_DARK : CHART_COLORS_LIGHT;

    const spec: any = {
      type: "bar",
      data: {
        values: data,
      },
      xField: "category",
      yField: "count",
      seriesField: "category",
      
      // Colores y estilos visuales
      color: colors,
      background: themeConfig.background,
      
      // Espaciado
      padding: [40, 60, 60, 80],
      
      // Etiquetas con valores
      label: {
        visible: true,
        position: "top",
        style: {
          fontSize: 16,
          fill: themeConfig.text,
          fontWeight: "bold",
        },
      },
      
      // Configuración de ejes
      axes: [
        {
          orient: "bottom",
          type: "band",
          label: {
            style: {
              fontSize: 12,
              fill: themeConfig.textSecondary,
            },
          },
          domainLine: {
            visible: true,
            style: {
              stroke: themeConfig.border,
              strokeWidth: 1,
            },
          },
          grid: { visible: false },
        },
        {
          orient: "left",
          type: "linear",
          label: {
            style: {
              fontSize: 12,
              fill: themeConfig.textSecondary,
            },
          },
          domainLine: {
            visible: true,
            style: {
              stroke: themeConfig.border,
              strokeWidth: 1,
            },
          },
          grid: {
            visible: true,
            style: {
              stroke: themeConfig.grid,
              strokeWidth: 0.5,
            },
          },
        },
      ],
      
      // Tooltip interactivo
      tooltip: {
        visible: true,
        content: [
          {
            key: "count",
            value: "{count} productos",
          },
        ],
      },
      
      // Estilos de las barras
      bar: {
        style: {
          radius: [4, 4, 0, 0],
          shadowBlur: isDark ? 8 : 4,
          shadowColor: themeConfig.shadow,
        },
      },
      
      // Animaciones suaves
      animationAppear: {
        type: "scaleInY",
        duration: 400,
        easing: "easeOutElastic",
      },
    };

    const vchart = new VChart(spec, { dom: chartRef.current });
    vchart.renderAsync();

    return () => {
      vchart.release();
    };
  }, [data, theme]);

  return (
    <div 
      ref={chartRef} 
      className="w-full h-96 rounded-xl"
      style={{
        minHeight: "400px",
      }}
    />
  );
}