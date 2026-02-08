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
import { RoleEntry } from "@/types/wrapped";
import { useIsMobile } from "@/hooks/useIsMobile";

const formatUSD = (value: number) => `$${value.toLocaleString("en-US")}`;

export default function RolesChart({ data }: { data: RoleEntry[] }) {
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
        <CardTitle className="text-center text-foreground text-md md:text-lg">
          Top 7 Data Science Roles
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
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis
              type="number"
              tickFormatter={formatUSD}
              tick={{ fill: "var(--color-foreground)", fontSize: 12 }}
              axisLine={{ stroke: "var(--color-foreground)" }}
              tickLine={{ stroke: "var(--color-foreground)" }}
              label={{
                value: "Salary (USD)",
                position: "insideBottom",
                offset: -10,
                fill: "var(--color-foreground)",
                fontSize: 12,
              }}
            />
            <YAxis
              type="category"
              dataKey="role"
              width={isMobile ? 100 : 140}
              interval={0}
              tick={{
                fill: "var(--color-foreground)",
                fontSize: isMobile ? 10 : 12,
                style: { whiteSpace: isMobile ? "normal" : "nowrap" },
              }}
              axisLine={{ stroke: "var(--color-foreground)" }}
              tickLine={{ stroke: "var(--color-foreground)" }}
            />
            <Tooltip
              formatter={(value: number) => formatUSD(value)}
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
              dataKey="salary"
              radius={[0, 4, 4, 0]}
              isAnimationActive={animate}
              animationDuration={1500}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  className="hover-target"
                  fill={
                    entry.role === "Data Scientist"
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
