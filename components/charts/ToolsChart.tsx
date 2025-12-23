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
  SiPandas,
  SiNumpy,
  SiApacheairflow,
  SiApachespark,
  SiDask,
  SiPolars,
} from "@icons-pack/react-simple-icons";
import { DataToolEntry } from "@/data/types";

const ToolIcons = {
  pandas: <SiPandas className="inline-block mr-2" size={24} color="white" />,
  numpy: <SiNumpy className="inline-block mr-2" size={24} color="white" />,
  spark: (
    <SiApachespark className="inline-block mr-2" size={24} color="white" />
  ),
  airflow: (
    <SiApacheairflow className="inline-block mr-2" size={24} color="white" />
  ),
  polars: <SiPolars className="inline-block mr-2" size={24} color="white" />,
  dask: <SiDask className="inline-block mr-2" size={24} color="white" />,
  "in-house": null,
};

export default function ToolsChart({ data }: { data: DataToolEntry[] }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });
  const [animate, setAnimate] = useState(false);

  if (inView && !animate) setAnimate(true);

  return (
    <Card
      ref={ref}
      className="w-full max-w-4xl mx-auto bg-transparent border-none shadow-none"
    >
      <CardHeader>
        <CardTitle className="text-center text-white text-md md:text-lg">
          Tools For Data Exploration And Processing
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            layout="vertical"
            data={data}
            margin={{ top: 20, right: 30, left: 100, bottom: 20 }}
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
              dataKey="tool"
              axisLine={{ stroke: "white" }}
              tickLine={false}
              width={160}
              tick={CustomYAxisTick}
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
}

const CustomYAxisTick = ({ x, y, payload }: CustomTickProps) => {
  const tool = String(payload?.value).toLowerCase();
  const icon = ToolIcons[tool as keyof typeof ToolIcons];

  return (
    <g transform={`translate(${x},${y})`}>
      {icon && <g transform="translate(-40, -12)">{icon}</g>}
    </g>
  );
};
