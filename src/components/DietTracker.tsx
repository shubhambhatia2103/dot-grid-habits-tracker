
import { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { DotState } from './HabitDot';

const DietTracker = () => {
  const [dietDotStates, setDietDotStates] = useState<Record<number, boolean>>({});

  // Load dot states from localStorage on component mount
  useEffect(() => {
    const savedDotStates = localStorage.getItem('habitDotStates');
    if (savedDotStates) {
      const allDotStates = JSON.parse(savedDotStates) as Record<number, DotState>;
      
      // Extract only diet-related data (diet or both)
      const dietStates: Record<number, boolean> = {};
      
      for (const [day, state] of Object.entries(allDotStates)) {
        dietStates[parseInt(day)] = state === 'diet' || state === 'both';
      }
      
      setDietDotStates(dietStates);
    }
  }, []);

  const handleDotClick = (day: number) => {
    // Toggle diet state
    const newDietState = !dietDotStates[day];
    
    // Update local state
    setDietDotStates(prev => ({
      ...prev,
      [day]: newDietState
    }));
    
    // Also update localStorage with the combined data
    const savedDotStates = localStorage.getItem('habitDotStates');
    if (savedDotStates) {
      const allDotStates = JSON.parse(savedDotStates) as Record<number, DotState>;
      
      // Get current gym state
      const currentDotState = allDotStates[day] || 'unmarked';
      const hasGym = currentDotState === 'gym' || currentDotState === 'both';
      
      // Determine new state based on gym and new diet state
      let newState: DotState;
      if (hasGym && newDietState) {
        newState = 'both';
      } else if (hasGym) {
        newState = 'gym';
      } else if (newDietState) {
        newState = 'diet';
      } else {
        newState = 'unmarked';
      }
      
      // Update localStorage
      const updatedStates = {
        ...allDotStates,
        [day]: newState
      };
      
      localStorage.setItem('habitDotStates', JSON.stringify(updatedStates));
    } else {
      // If no existing data, create new
      const newStates: Record<number, DotState> = {
        [day]: newDietState ? 'diet' : 'unmarked'
      };
      
      localStorage.setItem('habitDotStates', JSON.stringify(newStates));
    }
  };

  return (
    <Card className="p-4">
      <div className="w-full">
        <div className="mb-4 text-sm text-muted-foreground text-center">
          Track your diet habits for the month - click to toggle
        </div>
        <div className="grid grid-cols-6 gap-3 md:gap-4">
          {Array.from({ length: 30 }, (_, i) => i + 1).map((day) => (
            <div
              key={day}
              className={`w-8 h-8 rounded-full cursor-pointer flex items-center justify-center transition-all duration-200 ${
                dietDotStates[day] ? 'bg-diet text-white' : 'bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600'
              }`}
              onClick={() => handleDotClick(day)}
              title={`Day ${day}: ${dietDotStates[day] ? 'Diet Done' : 'No Diet'}`}
            >
              <span className="text-xs font-semibold">
                {day}
              </span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default DietTracker;
