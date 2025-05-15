
import { useState, useEffect } from 'react';
import { DotState } from './HabitDot';

const WeeklyView = () => {
  const [weeklyStats, setWeeklyStats] = useState({
    gymDays: 0,
    dietDays: 0,
    perfectDays: 0
  });
  
  useEffect(() => {
    // Get current day of the month
    const today = new Date();
    const currentDate = today.getDate();
    
    // Calculate the first day of the current week (Sunday-based)
    const dayOfWeek = today.getDay();
    const startOfWeek = currentDate - dayOfWeek;
    
    // Load dot states from localStorage
    const savedDotStates = localStorage.getItem('habitDotStates');
    if (savedDotStates) {
      const dotStates = JSON.parse(savedDotStates) as Record<number, DotState>;
      
      // Calculate stats for current week only
      let gymDays = 0;
      let dietDays = 0;
      let perfectDays = 0;
      
      for (let day = startOfWeek; day <= startOfWeek + 6; day++) {
        if (day > 0 && day <= 30) {
          const state = dotStates[day] || 'unmarked';
          
          if (state === 'gym' || state === 'both') {
            gymDays++;
          }
          
          if (state === 'diet' || state === 'both') {
            dietDays++;
          }
          
          if (state === 'both') {
            perfectDays++;
          }
        }
      }
      
      setWeeklyStats({
        gymDays,
        dietDays,
        perfectDays
      });
    }
  }, []);
  
  return (
    <div className="w-full max-w-md mx-auto mt-4 bg-secondary p-4 rounded-lg">
      <h3 className="text-sm font-medium mb-2">This Week's Progress</h3>
      <div className="flex justify-between">
        <div className="text-center">
          <span className="text-xl font-bold text-gym">{weeklyStats.gymDays}</span>
          <p className="text-xs text-gray-600">Gym</p>
        </div>
        <div className="text-center">
          <span className="text-xl font-bold text-diet">{weeklyStats.dietDays}</span>
          <p className="text-xs text-gray-600">Diet</p>
        </div>
        <div className="text-center">
          <span className="text-xl font-bold bg-gradient-to-r from-gym to-diet bg-clip-text text-transparent">
            {weeklyStats.perfectDays}
          </span>
          <p className="text-xs text-gray-600">Perfect</p>
        </div>
        <div className="text-center">
          <span className="text-xl font-bold">
            {Math.round((weeklyStats.gymDays + weeklyStats.dietDays) / 14 * 100)}%
          </span>
          <p className="text-xs text-gray-600">Completion</p>
        </div>
      </div>
    </div>
  );
};

export default WeeklyView;
