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
import { DataVolumeEntry } from "@/types/wrapped";

export default function DataVolumeChart({
  data,
  year,
}: {
  data: DataVolumeEntry[];
  year: number;
}) {
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
          Volume of Data Created, Captured, Copied And Consumed Worldwide
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
              dataKey="year"
              tick={{ fill: "var(--color-foreground)" }}
              axisLine={{ stroke: "var(--color-foreground)" }}
              tickLine={{ stroke: "var(--color-foreground)" }}
            />
            <YAxis
              tick={{ fill: "var(--color-foreground)" }}
              axisLine={{ stroke: "var(--color-foreground)" }}
              tickLine={{ stroke: "var(--color-foreground)" }}
              label={{
                value: "(in zettabytes)",
                angle: -90,
                position: "insideLeft",
                fill: "var(--color-foreground)",
              }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor:
                  "color-mix(in srgb, var(--color-secondary) 85%, transparent)",
                border: "none",
              }}
              labelStyle={{ color: "var(--color-foreground)" }}
              itemStyle={{ color: "var(--color-chart-2)" }}
              cursor={{ fill: "var(--color-border)" }}
            />
            <Bar
              dataKey="zettabytes"
              radius={[4, 4, 0, 0]}
              isAnimationActive={animate}
              animationDuration={1500}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  className="hover-target"
                  fill={
                    entry.year === year
                      ? "var(--color-chart-2)"
                      : "var(--color-chart-4)"
                  }
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
