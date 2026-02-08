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
import { MarketSizeEntry } from "@/types/wrapped";

export default function MarketSizeChart({ data }: { data: MarketSizeEntry[] }) {
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
          Global Data Science Platform Market Size
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
              dataKey="year"
              tick={{ fill: "white" }}
              axisLine={{ stroke: "white" }}
              tickLine={{ stroke: "white" }}
            />
            <YAxis
              tick={{ fill: "white" }}
              axisLine={{ stroke: "white" }}
              tickLine={{ stroke: "white" }}
              label={{
                value: "USD (Billion)",
                angle: -90,
                position: "insideLeft",
                fill: "white",
              }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(31, 41, 55, 0.8)",
                border: "none",
              }}
              labelStyle={{ color: "white" }}
              itemStyle={{ color: "#A78BFA" }}
              cursor={{ fill: "rgba(255, 255, 255, 0.1)" }}
              formatter={(value: number) => `$${value.toLocaleString()} B`}
            />
            <Bar
              dataKey="usd"
              radius={[4, 4, 0, 0]}
              isAnimationActive={animate}
              animationDuration={1500}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  className="hover-target"
                  fill={
                    entry.year === new Date().getFullYear()
                      ? colors.purple[400]
                      : colors.purple[600]
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
