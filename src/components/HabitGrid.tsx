
import { useState } from 'react';
import DotGrid from './DotGrid';
import Stats from './Stats';
import QuoteDisplay from './QuoteDisplay';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const HabitGrid: React.FC = () => {
  const { toast } = useToast();
  const [stats, setStats] = useState({
    gymDays: 0,
    dietDays: 0,
    perfectDays: 0,
    currentStreak: 0,
  });
  
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
    
    // Force reload to reset all components
    window.location.reload();
    
    // Show toast
    toast({
      title: "Reset successful",
      description: "Your habit grid has been reset for a fresh start.",
    });
  };
  
  return (
    <div className="w-full max-w-md mx-auto px-4">
      <h1 className="text-3xl font-bold text-center mb-2">Habit Dot Grid</h1>
      <div className="mb-4 text-center text-gray-600">
        <p>Track your gym and diet habits with a simple click</p>
      </div>
      
      <QuoteDisplay />
      
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-gray-200"></div>
            <span className="text-sm text-gray-600">Unmarked</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-gym"></div>
            <span className="text-sm text-gray-600">Gym</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-diet"></div>
            <span className="text-sm text-gray-600">Diet</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-gradient-to-r from-gym to-diet"></div>
            <span className="text-sm text-gray-600">Both</span>
          </div>
        </div>
      </div>
      
      <DotGrid onStatsChange={setStats} />
      
      <Stats 
        gymDays={stats.gymDays} 
        dietDays={stats.dietDays} 
        perfectDays={stats.perfectDays} 
        currentStreak={stats.currentStreak} 
      />
      
      <div className="mt-6 text-center">
        <Button 
          variant="outline" 
          onClick={handleReset}
          className="border-red-200 text-red-500 hover:bg-red-50"
        >
          Reset Grid
        </Button>
      </div>
    </div>
  );
};

export default HabitGrid;
