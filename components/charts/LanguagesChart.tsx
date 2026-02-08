"use client";

import { useState } from "react";
import { useInView } from "react-intersection-observer";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  LabelList,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import colors from "tailwindcss/colors";
import {
  SiPython,
  SiSqlite,
  SiR,
  SiScala,
  SiGo,
  SiJavascript,
  SiTypescript,
  SiCplusplus,
  SiSwift,
  SiKotlin,
  SiPhp,
  SiRuby,
  SiRust,
  SiJulia,
  SiHtml5,
  SiCss,
  SiJupyter,
} from "@icons-pack/react-simple-icons";
import { LanguageEntry } from "@/types/wrapped";
import { useIsMobile } from "@/hooks/useIsMobile";

const LanguageIcons = {
  python: <SiPython className="inline-block mr-2" size={24} color="white" />,
  sql: <SiSqlite className="inline-block mr-2" size={24} color="white" />,
  r: <SiR className="inline-block mr-2" size={24} color="white" />,
  scala: <SiScala className="inline-block mr-2" size={24} color="white" />,
  go: <SiGo className="inline-block mr-2" size={24} color="white" />,
  javascript: (
    <SiJavascript className="inline-block mr-2" size={24} color="white" />
  ),
  typescript: (
    <SiTypescript className="inline-block mr-2" size={24} color="white" />
  ),
  "c++": <SiCplusplus className="inline-block mr-2" size={24} color="white" />,
  swift: <SiSwift className="inline-block mr-2" size={24} color="white" />,
  kotlin: <SiKotlin className="inline-block mr-2" size={24} color="white" />,
  php: <SiPhp className="inline-block mr-2" size={24} color="white" />,
  ruby: <SiRuby className="inline-block mr-2" size={24} color="white" />,
  rust: <SiRust className="inline-block mr-2" size={24} color="white" />,
  julia: <SiJulia className="inline-block mr-2" size={24} color="white" />,
  html: <SiHtml5 className="inline-block mr-2" size={24} color="white" />,
  css: <SiCss className="inline-block mr-2" size={24} color="white" />,
  jupyter: <SiJupyter className="inline-block mr-2" size={24} color="white" />,
  "jupyter-notebook": (
    <SiJupyter className="inline-block mr-2" size={24} color="white" />
  ),
};

export default function LanguagesChart({ data }: { data: LanguageEntry[] }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });
  const [animate, setAnimate] = useState(false);
  const isMobile = useIsMobile(640);

  if (inView && !animate) setAnimate(true);

  return (
    <Card
      ref={ref}
      className="w-full max-w-4xl mx-auto bg-transparent border-none shadow-none"
    >
      <CardHeader>
        <CardTitle className="text-center text-white text-md md:text-lg">
          Programming Languages
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            layout="vertical"
            data={data}
            margin={{
              top: 20,
              right: 30,
              left: isMobile ? 24 : 100,
              bottom: 20,
            }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(255,255,255,0.2)"
            />
            <XAxis
              type="number"
              tick={{ fill: "white" }}
              axisLine={{ stroke: "white" }}
              tickLine={{ stroke: "white" }}
              domain={[0, 100]}
              tickFormatter={(value) => `${value}%`}
            />
            <YAxis
              type="category"
              dataKey="language"
              axisLine={{ stroke: "white" }}
              tickLine={false}
              width={isMobile ? 40 : 160}
              tick={(props) => (
                <CustomYAxisTick {...props} isMobile={isMobile} />
              )}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(31, 41, 55, 0.8)",
                border: "none",
              }}
              labelStyle={{ color: "white" }}
              itemStyle={{ color: colors.purple[400] }}
              cursor={{ fill: "rgba(255, 255, 255, 0.1)" }}
              formatter={(value: number) => `${value.toLocaleString()}%`}
            />
            <Bar
              dataKey="value"
              isAnimationActive={animate}
              animationDuration={1500}
              radius={[4, 4, 4, 4]}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  className="hover-target"
                  fill={index < 2 ? colors.purple[400] : colors.purple[600]}
                />
              ))}
              <LabelList
                dataKey="value"
                position="right"
                fill="white"
                formatter={(val: number) => `${val}%`}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

interface CustomTickProps {
  x?: number;
  y?: number;
  payload?: {
    value?: string | number;
  };
  isMobile?: boolean;
}

const CustomYAxisTick = ({ x, y, payload, isMobile }: CustomTickProps) => {
  const language = String(payload?.value).toLowerCase();
  const icon = LanguageIcons[language as keyof typeof LanguageIcons];
  const iconOffset = isMobile ? -24 : -40;

  return (
    <g transform={`translate(${x},${y})`}>
      {icon ? (
        <g transform={`translate(${iconOffset}, -12)`}>{icon}</g>
      ) : (
        // Fallback to text label
        <text
          x={iconOffset}
          y={0}
          textAnchor="end"
          fill="white"
          fontSize="12"
          dy="0.3em"
        >
          {payload?.value}
        </text>
      )}
    </g>
  );
};
