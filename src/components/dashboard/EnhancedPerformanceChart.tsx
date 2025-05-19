
import React, { useState } from 'react';
import { Card } from '@tremor/react';
import { AreaChart } from '@tremor/react';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ArrowUp, ArrowDown, Download } from 'lucide-react';

// Enhanced mock chart data with trend indicators
const chartdata = {
  '7d': [
    { date: "Seg", "Cliques": 34, "Conversões": 12 },
    { date: "Ter", "Cliques": 25, "Conversões": 10 },
    { date: "Qua", "Cliques": 43, "Conversões": 15 },
    { date: "Qui", "Cliques": 68, "Conversões": 20 },
    { date: "Sex", "Cliques": 50, "Conversões": 18 },
    { date: "Sab", "Cliques": 60, "Conversões": 22 },
    { date: "Dom", "Cliques": 45, "Conversões": 16 },
  ],
  '30d': [
    { date: "Sem 1", "Cliques": 180, "Conversões": 65 },
    { date: "Sem 2", "Cliques": 220, "Conversões": 78 },
    { date: "Sem 3", "Cliques": 195, "Conversões": 70 },
    { date: "Sem 4", "Cliques": 250, "Conversões": 90 },
  ],
  '90d': [
    { date: "Jan", "Cliques": 580, "Conversões": 210 },
    { date: "Fev", "Cliques": 620, "Conversões": 230 },
    { date: "Mar", "Cliques": 750, "Conversões": 260 },
  ]
};

// Function to format numbers with K, M suffix
const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
};

const EnhancedPerformanceChart: React.FC = () => {
  const [period, setPeriod] = useState<'7d' | '30d' | '90d'>('7d');
  const [showConversions, setShowConversions] = useState(true);
  
  // Calculate trends
  const currentPeriodData = chartdata[period];
  const totalClicks = currentPeriodData.reduce((sum, item) => sum + item.Cliques, 0);
  
  // Mock previous period for comparison (simplified for demo)
  const prevPeriodClicks = totalClicks * 0.85; // Assuming 15% growth
  const clicksTrend = totalClicks > prevPeriodClicks ? 
    { direction: 'up', percentage: ((totalClicks / prevPeriodClicks - 1) * 100).toFixed(1) } : 
    { direction: 'down', percentage: ((1 - totalClicks / prevPeriodClicks) * 100).toFixed(1) };

  const categories = showConversions ? ["Cliques", "Conversões"] : ["Cliques"];
  
  const exportChart = () => {
    // In a real implementation, this would generate a PNG or PDF
    alert("Exportando dados do gráfico...");
  };

  return (
    <Card className="bg-pantog-gray border-pantog-gray h-full hover-elevate transition-all">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-medium text-white mb-1">Performance</h3>
          <div className="flex items-center">
            <span className="text-gray-400 text-sm mr-2">Total: {formatNumber(totalClicks)} cliques</span>
            <div className={`flex items-center ${clicksTrend.direction === 'up' ? 'text-green-500' : 'text-red-500'}`}>
              {clicksTrend.direction === 'up' ? <ArrowUp size={14} /> : <ArrowDown size={14} />}
              <span className="text-xs ml-1">{clicksTrend.percentage}%</span>
            </div>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 mt-3 md:mt-0">
          <div className="flex">
            <Button 
              size="sm" 
              variant={period === '7d' ? 'default' : 'outline'} 
              onClick={() => setPeriod('7d')}
              className={period === '7d' ? 'bg-pantog-green text-pantog-black' : 'border-pantog-gray'}
            >
              7D
            </Button>
            <Button 
              size="sm" 
              variant={period === '30d' ? 'default' : 'outline'} 
              onClick={() => setPeriod('30d')}
              className={period === '30d' ? 'bg-pantog-green text-pantog-black' : 'border-pantog-gray'}
            >
              30D
            </Button>
            <Button 
              size="sm" 
              variant={period === '90d' ? 'default' : 'outline'} 
              onClick={() => setPeriod('90d')}
              className={period === '90d' ? 'bg-pantog-green text-pantog-black' : 'border-pantog-gray'}
            >
              90D
            </Button>
          </div>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button size="sm" variant="ghost" onClick={exportChart}>
                  <Download size={16} className="text-gray-400" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p>Exportar dados</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
      
      <AreaChart
        className="h-64"
        data={chartdata[period]}
        index="date"
        categories={categories}
        colors={["green", "blue"]}
        showLegend={true}
        showXAxis={true}
        showYAxis={true}
        showGridLines={false}
        startEndOnly={period === '90d'}
        valueFormatter={(value) => formatNumber(value)}
      />
      
      <div className="flex gap-2 mt-3">
        <Button 
          size="sm" 
          variant={showConversions ? "default" : "outline"}
          className={showConversions ? "bg-pantog-green text-pantog-black" : "border-pantog-gray"}
          onClick={() => setShowConversions(!showConversions)}
        >
          {showConversions ? "Ocultar Conversões" : "Mostrar Conversões"}
        </Button>
      </div>
    </Card>
  );
};

export default EnhancedPerformanceChart;
