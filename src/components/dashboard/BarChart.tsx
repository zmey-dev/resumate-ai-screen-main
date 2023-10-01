
import React from 'react';
import * as RechartsPrimitive from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

interface BarChartProps {
  data: Array<{
    name: string;
    value: number;
    [key: string]: any;
  }>;
  index: string;
  categories: string[];
  colors?: string[];
  valueFormatter?: (value: number) => string;
  showLegend?: boolean;
  showAnimation?: boolean;
  height?: string | number;
  className?: string;
}

export const BarChart = ({
  data,
  index,
  categories,
  colors = ['#3b82f6'],
  valueFormatter = (value: number) => `${value}`,
  showLegend = true,
  showAnimation = false,
  height = '100%',
  className,
}: BarChartProps) => {
  const config = categories.reduce((acc, category, i) => {
    acc[category] = {
      color: colors[i % colors.length],
    };
    return acc;
  }, {} as Record<string, { color: string }>);

  return (
    <ChartContainer config={config} className={className}>
      <RechartsPrimitive.BarChart data={data} style={{ width: '100%', height }}>
        <RechartsPrimitive.XAxis
          dataKey={index}
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <RechartsPrimitive.YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => valueFormatter(value)}
        />
        <RechartsPrimitive.CartesianGrid strokeDasharray="3 3" vertical={false} />
        {showLegend && <RechartsPrimitive.Legend />}
        <ChartTooltip
          content={
            <ChartTooltipContent
              formatter={(value: any) => valueFormatter(value)}
            />
          }
        />
        {categories.map((category, i) => (
          <RechartsPrimitive.Bar
            key={category}
            dataKey={category}
            fill={colors[i % colors.length]}
            radius={[4, 4, 0, 0]}
            {...(showAnimation
              ? {
                  isAnimationActive: true,
                  animationDuration: 800,
                  animationEasing: 'ease-in-out',
                }
              : {
                  isAnimationActive: false,
                })}
          />
        ))}
      </RechartsPrimitive.BarChart>
    </ChartContainer>
  );
};
