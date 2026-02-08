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
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import colors from "tailwindcss/colors";
import { AchievementEntry } from "@/types/wrapped";
import { useIsMobile } from "@/hooks/useIsMobile";

const colorPalette = [
  colors.purple[300],
  colors.purple[400],
  colors.purple[500],
  colors.purple[600],
];

const formatNumber = (value: number) => value.toLocaleString("en-US");

export default function AchievementsChart({
  data,
}: {
  data: AchievementEntry[];
}) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });
  const [animate, setAnimate] = useState(false);
  const isMobile = useIsMobile(640);

  if (inView && !animate) {
    setAnimate(true);
  }

  return (
    <Card
      ref={ref}
      className="w-full max-w-4xl mx-auto bg-transparent border-none shadow-none"
    >
      <CardHeader>
        <CardTitle className="text-center text-white text-md md:text-lg">
          Your Personal Achievements
        </CardTitle>
      </CardHeader>

      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={data}
            layout="vertical"
            margin={{
              top: 20,
              right: 30,
              left: isMobile ? 10 : 20,
              bottom: 20,
            }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(255,255,255,0.1)"
              vertical={false}
            />
            <XAxis
              type="number"
              tick={{ fill: "white", fontSize: 12 }}
              axisLine={{ stroke: "white" }}
              tickLine={{ stroke: "white" }}
            />
            <YAxis
              dataKey="label"
              type="category"
              tick={{
                fill: "white",
                fontSize: isMobile ? 10 : 12,
              }}
              axisLine={{ stroke: "white" }}
              tickLine={{ stroke: "white" }}
              width={isMobile ? 100 : 140}
              interval={0}
            />
            <Tooltip
              formatter={(value: number) => formatNumber(value)}
              contentStyle={{
                backgroundColor: "rgba(31, 41, 55, 0.85)",
                border: "none",
              }}
              labelStyle={{ color: "white" }}
              itemStyle={{ color: colors.purple[400] }}
              cursor={{ fill: "rgba(255,255,255,0.1)" }}
            />
            <Bar
              dataKey="value"
              radius={[0, 4, 4, 0]}
              isAnimationActive={animate}
              animationDuration={1500}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={colorPalette[index % colorPalette.length]}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
