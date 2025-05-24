
import { Card } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { TrendingUp, BarChart3 } from 'lucide-react';

interface TrendChartProps {
  dotStates: Record<number, string>;
}

const TrendChart: React.FC<TrendChartProps> = ({ dotStates }) => {
  // Generate weekly data
  const weeklyData = [];
  for (let week = 1; week <= 4; week++) {
    const startDay = (week - 1) * 7 + 1;
    const endDay = Math.min(week * 7, 30);
    
    let gymDays = 0;
    let dietDays = 0;
    let perfectDays = 0;
    
    for (let day = startDay; day <= endDay; day++) {
      const state = dotStates[day] || 'unmarked';
      if (state === 'gym' || state === 'both') gymDays++;
      if (state === 'diet' || state === 'both') dietDays++;
      if (state === 'both') perfectDays++;
    }
    
    weeklyData.push({
      week: `Week ${week}`,
      gym: gymDays,
      diet: dietDays,
      perfect: perfectDays
    });
  }

  // Generate daily pattern data (day of week analysis)
  const dayPatterns = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((dayName, index) => {
    let gymCount = 0;
    let dietCount = 0;
    let totalDays = 0;
    
    // Check all days that fall on this weekday
    for (let day = 1; day <= 30; day++) {
      if ((day - 1) % 7 === index) {
        totalDays++;
        const state = dotStates[day] || 'unmarked';
        if (state === 'gym' || state === 'both') gymCount++;
        if (state === 'diet' || state === 'both') dietCount++;
      }
    }
    
    return {
      day: dayName,
      gymRate: totalDays > 0 ? Math.round((gymCount / totalDays) * 100) : 0,
      dietRate: totalDays > 0 ? Math.round((dietCount / totalDays) * 100) : 0
    };
  });

  const chartConfig = {
    gym: {
      label: "Gym",
      color: "#4ade80",
    },
    diet: {
      label: "Diet", 
      color: "#60a5fa",
    },
    perfect: {
      label: "Perfect",
      color: "#a855f7",
    },
    gymRate: {
      label: "Gym Success Rate",
      color: "#4ade80",
    },
    dietRate: {
      label: "Diet Success Rate",
      color: "#60a5fa",
    },
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="h-5 w-5 text-blue-500" />
          <h3 className="text-lg font-semibold">Weekly Progress</h3>
        </div>
        
        <ChartContainer config={chartConfig} className="h-[300px]">
          <LineChart data={weeklyData}>
            <XAxis dataKey="week" />
            <YAxis />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Line 
              type="monotone" 
              dataKey="gym" 
              stroke="var(--color-gym)" 
              strokeWidth={3}
              dot={{ fill: "var(--color-gym)", strokeWidth: 2, r: 4 }}
            />
            <Line 
              type="monotone" 
              dataKey="diet" 
              stroke="var(--color-diet)" 
              strokeWidth={3}
              dot={{ fill: "var(--color-diet)", strokeWidth: 2, r: 4 }}
            />
            <Line 
              type="monotone" 
              dataKey="perfect" 
              stroke="var(--color-perfect)" 
              strokeWidth={3}
              dot={{ fill: "var(--color-perfect)", strokeWidth: 2, r: 4 }}
            />
          </LineChart>
        </ChartContainer>
      </Card>

      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <BarChart3 className="h-5 w-5 text-purple-500" />
          <h3 className="text-lg font-semibold">Success Rate by Day of Week</h3>
        </div>
        
        <ChartContainer config={chartConfig} className="h-[300px]">
          <BarChart data={dayPatterns}>
            <XAxis dataKey="day" />
            <YAxis />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="gymRate" fill="var(--color-gymRate)" radius={4} />
            <Bar dataKey="dietRate" fill="var(--color-dietRate)" radius={4} />
          </BarChart>
        </ChartContainer>
      </Card>
    </div>
  );
};

export default TrendChart;
