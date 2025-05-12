
import { useEffect, useState } from 'react';
import HabitDot, { DotState } from './HabitDot';

interface DotGridProps {
  onStatsChange: (stats: {
    gymDays: number;
    dietDays: number;
    perfectDays: number;
    currentStreak: number;
  }) => void;
}

const DotGrid: React.FC<DotGridProps> = ({ onStatsChange }) => {
  const [dotStates, setDotStates] = useState<Record<number, DotState>>({});

  // Load dot states from localStorage on component mount
  useEffect(() => {
    const savedDotStates = localStorage.getItem('habitDotStates');
    if (savedDotStates) {
      setDotStates(JSON.parse(savedDotStates));
    }
  }, []);

  // Update stats whenever dot states change
  useEffect(() => {
    if (Object.keys(dotStates).length === 0) return;
    
    // Save to localStorage
    localStorage.setItem('habitDotStates', JSON.stringify(dotStates));
    
    // Calculate statistics
    let gymDays = 0;
    let dietDays = 0;
    let perfectDays = 0;
    let currentStreak = 0;
    let tempStreak = 0;
    
    for (let day = 1; day <= 30; day++) {
      const state = dotStates[day] || 'unmarked';
      
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
    
    // Update parent component with stats
    onStatsChange({
      gymDays,
      dietDays,
      perfectDays,
      currentStreak,
    });
  }, [dotStates, onStatsChange]);

  const handleDotChange = (day: number, state: DotState) => {
    setDotStates(prev => ({
      ...prev,
      [day]: state
    }));
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="grid grid-cols-6 gap-3 md:gap-4">
        {Array.from({ length: 30 }, (_, i) => i + 1).map((day) => (
          <HabitDot
            key={day}
            day={day}
            initialState={dotStates[day] || 'unmarked'}
            onChange={handleDotChange}
          />
        ))}
      </div>
    </div>
  );
};

export default DotGrid;
