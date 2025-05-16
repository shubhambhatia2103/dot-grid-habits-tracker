
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import Stats from './Stats';
import QuoteDisplay from './QuoteDisplay';
import WeeklyView from './WeeklyView';
import DarkModeToggle from './DarkModeToggle';
import ExportImport from './ExportImport';
import { Activity, Dumbbell, Salad, ChartBar } from 'lucide-react';
import { DotState } from './HabitDot';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const Dashboard = () => {
  const { toast } = useToast();
  const [stats, setStats] = useState({
    gymDays: 0,
    dietDays: 0,
    perfectDays: 0,
    currentStreak: 0,
  });
  
  const [completionRate, setCompletionRate] = useState({
    gym: 0,
    diet: 0,
    overall: 0
  });
  
  useEffect(() => {
    // Load dot states from localStorage
    const savedDotStates = localStorage.getItem('habitDotStates');
    if (savedDotStates) {
      const dotStates = JSON.parse(savedDotStates) as Record<number, DotState>;
      
      // Calculate statistics
      let gymDays = 0;
      let dietDays = 0;
      let perfectDays = 0;
      let currentStreak = 0;
      let tempStreak = 0;
      let markedDays = 0;
      
      for (let day = 1; day <= 30; day++) {
        const state = dotStates[day] || 'unmarked';
        
        if (state !== 'unmarked') {
          markedDays++;
        }
        
        // Count gym days (gym or both)
        if (state === 'gym' || state === 'both') {
          gymDays++;
        }
        
        // Count diet days (diet or both)
        if (state === 'diet' || state === 'both') {
          dietDays++;
        }
        
        // Count perfect days (both)
        if (state === 'both') {
          perfectDays++;
        }
        
        // Calculate current streak
        if (state !== 'unmarked') {
          tempStreak++;
        } else {
          // Reset streak on unmarked days
          tempStreak = 0;
        }
        
        // Update current streak if this is the latest consecutive streak
        if (tempStreak > currentStreak) {
          currentStreak = tempStreak;
        }
      }
      
      setStats({
        gymDays,
        dietDays,
        perfectDays,
        currentStreak,
      });
      
      // Calculate completion rates
      const totalDays = 30;
      setCompletionRate({
        gym: (gymDays / totalDays) * 100,
        diet: (dietDays / totalDays) * 100,
        overall: (markedDays / totalDays) * 100
      });
    }
  }, []);
  
  // Reset all habit data
  const handleReset = () => {
    // Clear localStorage
    localStorage.removeItem('habitDotStates');
    
    // Reset stats
    setStats({
      gymDays: 0,
      dietDays: 0,
      perfectDays: 0,
      currentStreak: 0,
    });
    
    setCompletionRate({
      gym: 0,
      diet: 0,
      overall: 0
    });
    
    // Show toast
    toast({
      title: "Reset successful",
      description: "Your habit grid has been reset for a fresh start.",
    });
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Activity className="h-6 w-6" /> Overview
        </h2>
        <DarkModeToggle />
      </div>
      
      <QuoteDisplay />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Dumbbell className="h-5 w-5 text-gym" /> Gym Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">{stats.gymDays}/30 days</span>
                <span className="text-sm font-medium">{Math.round(completionRate.gym)}%</span>
              </div>
              <Progress value={completionRate.gym} className="h-2 bg-gray-200" indicatorClassName="bg-gym" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Salad className="h-5 w-5 text-diet" /> Diet Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">{stats.dietDays}/30 days</span>
                <span className="text-sm font-medium">{Math.round(completionRate.diet)}%</span>
              </div>
              <Progress value={completionRate.diet} className="h-2 bg-gray-200" indicatorClassName="bg-diet" />
            </div>
          </CardContent>
        </Card>
      </div>
      
      <WeeklyView />
      
      <div className="my-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <ChartBar className="h-5 w-5" /> Overall Statistics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Stats 
              gymDays={stats.gymDays} 
              dietDays={stats.dietDays} 
              perfectDays={stats.perfectDays} 
              currentStreak={stats.currentStreak} 
            />
          </CardContent>
        </Card>
      </div>
      
      <div className="mt-6 flex justify-between items-center">
        <Button 
          variant="outline" 
          onClick={handleReset}
          className="border-red-200 text-red-500 hover:bg-red-50 dark:border-red-900 dark:text-red-400 dark:hover:bg-red-950"
        >
          Reset All Data
        </Button>
        
        <ExportImport />
      </div>
    </div>
  );
};

export default Dashboard;
