
import React from 'react';
import { Card } from '@tremor/react';
import { AreaChart } from '@tremor/react';

// Mock chart data
const chartdata = [
  {
    date: "Jan",
    "Cliques": 34,
  },
  {
    date: "Fev",
    "Cliques": 25,
  },
  {
    date: "Mar",
    "Cliques": 43,
  },
  {
    date: "Abr",
    "Cliques": 68,
  },
  {
    date: "Mai",
    "Cliques": 50,
  },
  {
    date: "Jun",
    "Cliques": 82,
  },
  {
    date: "Jul",
    "Cliques": 95,
  },
];

const PerformanceChart: React.FC = () => {
  return (
    <Card className="bg-pantog-gray border-pantog-gray h-full hover-elevate transition-all">
      <h3 className="text-lg font-medium text-white mb-4">Performance</h3>
      <AreaChart
        className="h-64"
        data={chartdata}
        index="date"
        categories={["Cliques"]}
        colors={["green"]}
        showLegend={false}
        showXAxis={true}
        showYAxis={true}
        showGridLines={false}
        startEndOnly={true}
      />
    </Card>
  );
};

export default PerformanceChart;
