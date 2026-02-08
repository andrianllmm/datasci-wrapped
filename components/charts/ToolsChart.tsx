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
import {
  SiPandas,
  SiNumpy,
  SiApacheairflow,
  SiApachespark,
  SiDask,
  SiPolars,
  SiReact,
  SiDjango,
  SiVuedotjs,
  SiAngular,
  SiFlask,
  SiSpringboot,
  SiNodedotjs,
  SiExpress,
  SiFastapi,
  SiTensorflow,
  SiPytorch,
  SiScikitlearn,
  SiApachekafka,
  SiPostgresql,
  SiMongodb,
  SiDocker,
  SiKubernetes,
} from "@icons-pack/react-simple-icons";
import { DataToolEntry } from "@/types/wrapped";
import { useIsMobile } from "@/hooks/useIsMobile";

const iconColor = "var(--color-foreground)";

const ToolIcons = {
  pandas: (
    <SiPandas className="inline-block mr-2" size={24} color={iconColor} />
  ),
  numpy: <SiNumpy className="inline-block mr-2" size={24} color={iconColor} />,
  spark: (
    <SiApachespark className="inline-block mr-2" size={24} color={iconColor} />
  ),
  airflow: (
    <SiApacheairflow
      className="inline-block mr-2"
      size={24}
      color={iconColor}
    />
  ),
  polars: (
    <SiPolars className="inline-block mr-2" size={24} color={iconColor} />
  ),
  dask: <SiDask className="inline-block mr-2" size={24} color={iconColor} />,
  react: <SiReact className="inline-block mr-2" size={24} color={iconColor} />,
  django: (
    <SiDjango className="inline-block mr-2" size={24} color={iconColor} />
  ),
  vue: <SiVuedotjs className="inline-block mr-2" size={24} color={iconColor} />,
  angular: (
    <SiAngular className="inline-block mr-2" size={24} color={iconColor} />
  ),
  flask: <SiFlask className="inline-block mr-2" size={24} color={iconColor} />,
  fastapi: (
    <SiFastapi className="inline-block mr-2" size={24} color={iconColor} />
  ),
  spring: (
    <SiSpringboot className="inline-block mr-2" size={24} color={iconColor} />
  ),
  "spring boot": (
    <SiSpringboot className="inline-block mr-2" size={24} color={iconColor} />
  ),
  node: (
    <SiNodedotjs className="inline-block mr-2" size={24} color={iconColor} />
  ),
  "node.js": (
    <SiNodedotjs className="inline-block mr-2" size={24} color={iconColor} />
  ),
  express: (
    <SiExpress className="inline-block mr-2" size={24} color={iconColor} />
  ),
  tensorflow: (
    <SiTensorflow className="inline-block mr-2" size={24} color={iconColor} />
  ),
  pytorch: (
    <SiPytorch className="inline-block mr-2" size={24} color={iconColor} />
  ),
  "scikit-learn": (
    <SiScikitlearn className="inline-block mr-2" size={24} color={iconColor} />
  ),
  scikit: (
    <SiScikitlearn className="inline-block mr-2" size={24} color={iconColor} />
  ),
  kafka: (
    <SiApachekafka className="inline-block mr-2" size={24} color={iconColor} />
  ),
  postgresql: (
    <SiPostgresql className="inline-block mr-2" size={24} color={iconColor} />
  ),
  postgres: (
    <SiPostgresql className="inline-block mr-2" size={24} color={iconColor} />
  ),
  mongodb: (
    <SiMongodb className="inline-block mr-2" size={24} color={iconColor} />
  ),
  docker: (
    <SiDocker className="inline-block mr-2" size={24} color={iconColor} />
  ),
  kubernetes: (
    <SiKubernetes className="inline-block mr-2" size={24} color={iconColor} />
  ),
};

export default function ToolsChart({ data }: { data: DataToolEntry[] }) {
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
        <CardTitle className="text-center text-foreground text-md md:text-lg">
          Tools For Data Exploration And Processing
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
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis
              type="number"
              tick={{ fill: "var(--color-foreground)" }}
              axisLine={{ stroke: "var(--color-foreground)" }}
              tickLine={{ stroke: "var(--color-foreground)" }}
              domain={[0, 100]}
              tickFormatter={(value) => `${value}%`}
            />
            <YAxis
              type="category"
              dataKey="tool"
              axisLine={{ stroke: "var(--color-foreground)" }}
              tickLine={false}
              width={isMobile ? 40 : 160}
              tick={(props) => (
                <CustomYAxisTick {...props} isMobile={isMobile} />
              )}
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
                  fill={
                    index < 2 ? "var(--color-chart-2)" : "var(--color-chart-4)"
                  }
                />
              ))}
              <LabelList
                dataKey="value"
                position="right"
                fill="var(--color-foreground)"
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
  const tool = String(payload?.value).toLowerCase();
  const icon = ToolIcons[tool as keyof typeof ToolIcons];
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
          fill="var(--color-foreground)"
          fontSize="12"
          dy="0.3em"
        >
          {payload?.value}
        </text>
      )}
    </g>
  );
};
