
import { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { DotState } from './HabitDot';
import Stats from './Stats';
import Goals from './Goals';
import Achievements from './Achievements';
import TrendChart from './TrendChart';
import MotivationalQuotes from './MotivationalQuotes';

const Dashboard = () => {
  const [dotStates, setDotStates] = useState<Record<number, DotState>>({});
  const [stats, setStats] = useState({
    gymDays: 0,
    dietDays: 0,
    perfectDays: 0,
    currentStreak: 0,
  });

  // Load dot states from localStorage on component mount
  useEffect(() => {
    const savedDotStates = localStorage.getItem('habitDotStates');
    if (savedDotStates) {
      const parsed = JSON.parse(savedDotStates);
      setDotStates(parsed);
      
      // Calculate stats from saved data
      let gymDays = 0;
      let dietDays = 0;
      let perfectDays = 0;
      let currentStreak = 0;
      let tempStreak = 0;
      
      for (let day = 1; day <= 30; day++) {
        const state = parsed[day] || 'unmarked';
        
        if (state === 'gym' || state === 'both') gymDays++;
        if (state === 'diet' || state === 'both') dietDays++;
        if (state === 'both') perfectDays++;
        
        if (state !== 'unmarked') {
          tempStreak++;
        } else {
          tempStreak = 0;
        }
        
        if (tempStreak > currentStreak) {
          currentStreak = tempStreak;
        }
      }
      
      setStats({ gymDays, dietDays, perfectDays, currentStreak });
    }
  }, []);

  const completionRate = Math.round(((stats.gymDays + stats.dietDays) / 60) * 100);
  const perfectRate = stats.gymDays > 0 ? Math.round((stats.perfectDays / Math.max(stats.gymDays, stats.dietDays)) * 100) : 0;

  return (
    <div className="space-y-6">
      {/* Motivational Quote */}
      <MotivationalQuotes stats={stats} />

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{completionRate}%</div>
            <div className="text-sm text-muted-foreground">Overall Completion</div>
            <Progress 
              value={completionRate} 
              className="mt-2"
              indicatorClassName="bg-blue-500"
            />
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">{perfectRate}%</div>
            <div className="text-sm text-muted-foreground">Perfect Day Rate</div>
            <Progress 
              value={perfectRate} 
              className="mt-2"
              indicatorClassName="bg-purple-500"
            />
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{stats.currentStreak}</div>
            <div className="text-sm text-muted-foreground">Current Streak</div>
            <Progress 
              value={Math.min((stats.currentStreak / 30) * 100, 100)} 
              className="mt-2"
              indicatorClassName="bg-green-500"
            />
          </div>
        </Card>
      </div>

      {/* Goals Section */}
      <Goals currentStats={stats} />

      {/* Stats Section */}
      <Stats 
        gymDays={stats.gymDays} 
        dietDays={stats.dietDays} 
        perfectDays={stats.perfectDays} 
        currentStreak={stats.currentStreak} 
      />

      {/* Achievements Section */}
      <Achievements stats={stats} />

      {/* Trend Charts */}
      <TrendChart dotStates={dotStates} />
    </div>
  );
};

export default Dashboard;
