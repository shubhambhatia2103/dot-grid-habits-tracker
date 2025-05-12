
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

export type DotState = 'unmarked' | 'gym' | 'diet' | 'both';

interface HabitDotProps {
  day: number;
  initialState?: DotState;
  onChange: (day: number, state: DotState) => void;
}

const HabitDot: React.FC<HabitDotProps> = ({ day, initialState = 'unmarked', onChange }) => {
  const [state, setState] = useState<DotState>(initialState);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = () => {
    const newState: DotState = state === 'unmarked' 
      ? 'gym' 
      : state === 'gym' 
        ? 'diet' 
        : state === 'diet' 
          ? 'both' 
          : 'unmarked';
    
    setState(newState);
    onChange(day, newState);
    
    // Trigger animation
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 500);
  };

  // Determine the classes based on state
  const dotClasses = cn(
    'w-8 h-8 rounded-full cursor-pointer transition-all duration-200 flex items-center justify-center',
    isAnimating && 'animate-pulse-dot',
    {
      'bg-gray-200 hover:bg-gray-300': state === 'unmarked',
      'bg-gym': state === 'gym',
      'bg-diet': state === 'diet',
      'bg-gradient-to-r from-gym to-diet': state === 'both',
    }
  );

  return (
    <div 
      className={dotClasses}
      onClick={handleClick}
      title={`Day ${day}`}
      aria-label={`Day ${day}: ${state}`}
    >
      <span className="text-xs font-semibold text-gray-700">{day}</span>
    </div>
  );
};

export default HabitDot;
