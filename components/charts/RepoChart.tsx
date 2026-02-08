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
import { RepoEntry } from "@/types/wrapped";

const activityColorPalette = [
  "var(--color-chart-2)",
  "var(--color-chart-3)",
  "var(--color-chart-4)",
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
        <CardTitle className="text-center text-foreground text-md md:text-lg">
          Your Repository Creation Timeline
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 0, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis
              dataKey="month"
              tick={{ fill: "var(--color-foreground)", fontSize: 11 }}
              axisLine={{ stroke: "var(--color-foreground)" }}
              tickLine={{ stroke: "var(--color-foreground)" }}
              angle={-45}
              textAnchor="end"
              height={80}
              tickFormatter={formatMonth}
              interval="preserveStartEnd"
            />
            <YAxis
              tick={{ fill: "var(--color-foreground)" }}
              axisLine={{ stroke: "var(--color-foreground)" }}
              tickLine={{ stroke: "var(--color-foreground)" }}
              label={{
                value: "Repositories",
                angle: -90,
                position: "insideLeft",
                fill: "var(--color-foreground)",
              }}
            />
            <Tooltip
              formatter={(value) => `${value} repos`}
              contentStyle={{
                backgroundColor:
                  "color-mix(in srgb, var(--color-secondary) 85%, transparent)",
                border: "none",
              }}
              labelStyle={{ color: "var(--color-foreground)" }}
              itemStyle={{ color: "var(--color-chart-2)" }}
              cursor={{ fill: "var(--color-border)" }}
            />
            {animate && (
              <Bar
                dataKey="count"
                fill="var(--color-chart-2)"
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
