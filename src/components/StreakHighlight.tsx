
import { useEffect, useState } from "react";
import { Trophy } from "lucide-react";
import { cn } from "@/lib/utils";

interface StreakHighlightProps {
  currentStreak: number;
}

const StreakHighlight: React.FC<StreakHighlightProps> = ({ currentStreak }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [previousStreak, setPreviousStreak] = useState(0);
  
  useEffect(() => {
    // Only show animation when streak increases
    if (currentStreak > previousStreak && currentStreak > 0) {
      setPreviousStreak(currentStreak);
      setIsVisible(true);
      
      // Hide after animation
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [currentStreak, previousStreak]);
  
  if (!isVisible) return null;
  
  return (
    <div className={cn(
      "fixed bottom-4 right-4 bg-gradient-to-r from-gym to-diet text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-2",
      "animate-in slide-in-from-bottom duration-300"
    )}>
      <Trophy className="h-5 w-5" />
      <div>
        <div className="text-sm font-bold">Streak: {currentStreak} days!</div>
        <div className="text-xs">Keep it up! 🔥</div>
      </div>
    </div>
  );
};

export default StreakHighlight;
