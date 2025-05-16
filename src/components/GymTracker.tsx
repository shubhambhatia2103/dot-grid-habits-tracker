
import { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { DotState } from './HabitDot';

const GymTracker = () => {
  const [gymDotStates, setGymDotStates] = useState<Record<number, boolean>>({});

  // Load dot states from localStorage on component mount
  useEffect(() => {
    const savedDotStates = localStorage.getItem('habitDotStates');
    if (savedDotStates) {
      const allDotStates = JSON.parse(savedDotStates) as Record<number, DotState>;
      
      // Extract only gym-related data (gym or both)
      const gymStates: Record<number, boolean> = {};
      
      for (const [day, state] of Object.entries(allDotStates)) {
        gymStates[parseInt(day)] = state === 'gym' || state === 'both';
      }
      
      setGymDotStates(gymStates);
    }
  }, []);

  const handleDotClick = (day: number) => {
    // Toggle gym state
    const newGymState = !gymDotStates[day];
    
    // Update local state
    setGymDotStates(prev => ({
      ...prev,
      [day]: newGymState
    }));
    
    // Also update localStorage with the combined data
    const savedDotStates = localStorage.getItem('habitDotStates');
    if (savedDotStates) {
      const allDotStates = JSON.parse(savedDotStates) as Record<number, DotState>;
      
      // Get current diet state
      const currentDotState = allDotStates[day] || 'unmarked';
      const hasDiet = currentDotState === 'diet' || currentDotState === 'both';
      
      // Determine new state based on diet and new gym state
      let newState: DotState;
      if (newGymState && hasDiet) {
        newState = 'both';
      } else if (newGymState) {
        newState = 'gym';
      } else if (hasDiet) {
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
        [day]: newGymState ? 'gym' : 'unmarked'
      };
      
      localStorage.setItem('habitDotStates', JSON.stringify(newStates));
    }
  };

  return (
    <Card className="p-4">
      <div className="w-full">
        <div className="mb-4 text-sm text-muted-foreground text-center">
          Track your gym habits for the month - click to toggle
        </div>
        <div className="grid grid-cols-6 gap-3 md:gap-4">
          {Array.from({ length: 30 }, (_, i) => i + 1).map((day) => (
            <div
              key={day}
              className={`w-8 h-8 rounded-full cursor-pointer flex items-center justify-center transition-all duration-200 ${
                gymDotStates[day] ? 'bg-gym text-white' : 'bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600'
              }`}
              onClick={() => handleDotClick(day)}
              title={`Day ${day}: ${gymDotStates[day] ? 'Gym Done' : 'No Gym'}`}
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

export default GymTracker;
