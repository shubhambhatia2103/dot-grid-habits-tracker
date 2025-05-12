
import { cn } from '@/lib/utils';

interface StatsProps {
  gymDays: number;
  dietDays: number;
  perfectDays: number;
  currentStreak: number;
}

const Stats: React.FC<StatsProps> = ({ gymDays, dietDays, perfectDays, currentStreak }) => {
  const statItemClasses = "flex flex-col items-center p-3 rounded-lg";
  
  return (
    <div className="w-full max-w-md mx-auto mt-6 animate-bounce-in">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className={cn(statItemClasses, "bg-gym bg-opacity-20")}>
          <span className="text-2xl font-bold">{gymDays}</span>
          <span className="text-sm text-gray-600">Gym Days</span>
        </div>
        
        <div className={cn(statItemClasses, "bg-diet bg-opacity-20")}>
          <span className="text-2xl font-bold">{dietDays}</span>
          <span className="text-sm text-gray-600">Diet Days</span>
        </div>
        
        <div className={cn(statItemClasses, "bg-gradient-to-r from-gym to-diet bg-opacity-20")}>
          <span className="text-2xl font-bold">{perfectDays}</span>
          <span className="text-sm text-gray-600">Perfect Days</span>
        </div>
        
        <div className={cn(statItemClasses, "bg-gray-100")}>
          <span className="text-2xl font-bold">{currentStreak}</span>
          <span className="text-sm text-gray-600">Current Streak</span>
        </div>
      </div>
    </div>
  );
};

export default Stats;
