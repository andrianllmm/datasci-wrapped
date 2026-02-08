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
  react: <SiReact className="inline-block mr-2" size={24} color="white" />,
  django: <SiDjango className="inline-block mr-2" size={24} color="white" />,
  vue: <SiVuedotjs className="inline-block mr-2" size={24} color="white" />,
  angular: <SiAngular className="inline-block mr-2" size={24} color="white" />,
  flask: <SiFlask className="inline-block mr-2" size={24} color="white" />,
  fastapi: <SiFastapi className="inline-block mr-2" size={24} color="white" />,
  spring: (
    <SiSpringboot className="inline-block mr-2" size={24} color="white" />
  ),
  "spring boot": (
    <SiSpringboot className="inline-block mr-2" size={24} color="white" />
  ),
  node: <SiNodedotjs className="inline-block mr-2" size={24} color="white" />,
  "node.js": (
    <SiNodedotjs className="inline-block mr-2" size={24} color="white" />
  ),
  express: <SiExpress className="inline-block mr-2" size={24} color="white" />,
  tensorflow: (
    <SiTensorflow className="inline-block mr-2" size={24} color="white" />
  ),
  pytorch: <SiPytorch className="inline-block mr-2" size={24} color="white" />,
  "scikit-learn": (
    <SiScikitlearn className="inline-block mr-2" size={24} color="white" />
  ),
  scikit: (
    <SiScikitlearn className="inline-block mr-2" size={24} color="white" />
  ),
  kafka: (
    <SiApachekafka className="inline-block mr-2" size={24} color="white" />
  ),
  postgresql: (
    <SiPostgresql className="inline-block mr-2" size={24} color="white" />
  ),
  postgres: (
    <SiPostgresql className="inline-block mr-2" size={24} color="white" />
  ),
  mongodb: <SiMongodb className="inline-block mr-2" size={24} color="white" />,
  docker: <SiDocker className="inline-block mr-2" size={24} color="white" />,
  kubernetes: (
    <SiKubernetes className="inline-block mr-2" size={24} color="white" />
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
        <CardTitle className="text-center text-white text-md md:text-lg">
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
          fill="white"
          fontSize="12"
          dy="0.3em"
        >
          {payload?.value}
        </text>
      )}
    </g>
  );
};
