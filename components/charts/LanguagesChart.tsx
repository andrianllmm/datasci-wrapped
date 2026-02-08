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
} from "@icons-pack/react-simple-icons";
import { LanguageEntry } from "@/data/types";
import { useIsMobile } from "@/hooks/useIsMobile";

const LanguageIcions = {
  python: <SiPython className="inline-block mr-2" size={24} color="white" />,
  sql: <SiSqlite className="inline-block mr-2" size={24} color="white" />,
  r: <SiR className="inline-block mr-2" size={24} color="white" />,
  java: null,
  scala: <SiScala className="inline-block mr-2" size={24} color="white" />,
  go: <SiGo className="inline-block mr-2" size={24} color="white" />,
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
          Required Programming Languages
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
  const icon = LanguageIcions[language as keyof typeof LanguageIcions];
  const iconOffset = isMobile ? -24 : -40;

  return (
    <g transform={`translate(${x},${y})`}>
      {icon && <g transform={`translate(${iconOffset}, -12)`}>{icon}</g>}
    </g>
  );
};
