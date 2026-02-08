"use client";

import { useState } from "react";
import { useInView } from "react-intersection-observer";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ReputationEntry } from "@/types/wrapped";

const formatNumber = (value: number) => value.toLocaleString("en-US");

const formatMonth = (month: string) => {
  const [year, monthNum] = month.split("-");
  const date = new Date(parseInt(year), parseInt(monthNum) - 1);
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
};

export default function ReputationChart({ data }: { data: ReputationEntry[] }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });
  const [animate, setAnimate] = useState(false);

  if (inView && !animate) {
    setAnimate(true);
  }

  if (data.length === 0 || data.every((d) => d.reputation === 0)) {
    return (
      <Card className="w-full max-w-4xl mx-auto bg-transparent border-none shadow-none">
        <CardContent className="flex items-center justify-center h-96 text-muted-foreground">
          <p>No StackOverflow data available</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card
      ref={ref}
      className="w-full max-w-4xl mx-auto bg-transparent border-none shadow-none"
    >
      <CardHeader>
        <CardTitle className="text-center text-foreground text-md md:text-lg">
          Your StackOverflow Reputation Growth
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart
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
              label={{
                value: "Reputation",
                angle: -90,
                position: "insideLeft",
                fill: "var(--color-foreground)",
              }}
            />
            <Tooltip
              formatter={(value: number) => formatNumber(value)}
              contentStyle={{
                backgroundColor:
                  "color-mix(in srgb, var(--color-secondary) 85%, transparent)",
                border: "none",
              }}
              labelStyle={{ color: "var(--color-foreground)" }}
              itemStyle={{ color: "var(--color-chart-1)" }}
              cursor={{ strokeDasharray: "3 3" }}
            />
            {animate && (
              <Line
                type="monotone"
                dataKey="reputation"
                stroke="var(--color-chart-1)"
                strokeWidth={3}
                dot={{ fill: "var(--color-chart-2)", r: 5 }}
                activeDot={{ r: 7 }}
                isAnimationActive={true}
                animationDuration={800}
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
