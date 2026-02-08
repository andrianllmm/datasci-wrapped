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
import { RepoEntry } from "@/types/wrapped";

const activityColorPalette = [
  colors.purple[400],
  colors.purple[500],
  colors.purple[600],
];

const formatMonth = (month: string) => {
  const [year, monthNum] = month.split("-");
  const date = new Date(parseInt(year), parseInt(monthNum) - 1);
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
};

export default function RepoChart({ data }: { data: RepoEntry[] }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });
  const [animate, setAnimate] = useState(false);

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
          Your Repository Creation Timeline
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 0, bottom: 20 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(255,255,255,0.2)"
            />
            <XAxis
              dataKey="month"
              tick={{ fill: "white", fontSize: 11 }}
              axisLine={{ stroke: "white" }}
              tickLine={{ stroke: "white" }}
              angle={-45}
              textAnchor="end"
              height={80}
              tickFormatter={formatMonth}
              interval="preserveStartEnd"
            />
            <YAxis
              tick={{ fill: "white" }}
              axisLine={{ stroke: "white" }}
              tickLine={{ stroke: "white" }}
              label={{
                value: "Repositories",
                angle: -90,
                position: "insideLeft",
                fill: "white",
              }}
            />
            <Tooltip
              formatter={(value) => `${value} repos`}
              contentStyle={{
                backgroundColor: "rgba(31, 41, 55, 0.85)",
                border: "none",
              }}
              labelStyle={{ color: "white" }}
              itemStyle={{ color: colors.purple[400] }}
              cursor={{ fill: "rgba(255,255,255,0.1)" }}
            />
            {animate && (
              <Bar
                dataKey="count"
                fill={colors.purple[400]}
                isAnimationActive={true}
                animationDuration={800}
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={
                      activityColorPalette[index % activityColorPalette.length]
                    }
                  />
                ))}
              </Bar>
            )}
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
