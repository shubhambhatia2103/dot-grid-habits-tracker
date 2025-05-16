
import { cn } from '@/lib/utils';
import { Activity, Dumbbell, Salad } from 'lucide-react';

interface StatsProps {
  gymDays: number;
  dietDays: number;
  perfectDays: number;
  currentStreak: number;
}

const Stats: React.FC<StatsProps> = ({ gymDays, dietDays, perfectDays, currentStreak }) => {
  const statItemClasses = "flex flex-col items-center p-3 rounded-lg";
  
  return (
    <div className="w-full mx-auto animate-bounce-in">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className={cn(statItemClasses, "bg-gym bg-opacity-20")}>
          <span className="text-2xl font-bold">{gymDays}</span>
          <span className="text-sm text-muted-foreground flex items-center gap-1">
            <Dumbbell className="h-3 w-3" /> Gym Days
          </span>
        </div>
        
        <div className={cn(statItemClasses, "bg-diet bg-opacity-20")}>
          <span className="text-2xl font-bold">{dietDays}</span>
          <span className="text-sm text-muted-foreground flex items-center gap-1">
            <Salad className="h-3 w-3" /> Diet Days
          </span>
        </div>
        
        <div className={cn(statItemClasses, "bg-gradient-to-r from-gym to-diet bg-opacity-20")}>
          <span className="text-2xl font-bold">{perfectDays}</span>
          <span className="text-sm text-muted-foreground">Perfect Days</span>
        </div>
        
        <div className={cn(statItemClasses, "bg-gray-100 dark:bg-gray-800")}>
          <span className="text-2xl font-bold">{currentStreak}</span>
          <span className="text-sm text-muted-foreground">Current Streak</span>
        </div>
      </div>
    </div>
  );
};

export default Stats;
