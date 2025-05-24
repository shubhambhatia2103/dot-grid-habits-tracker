
import { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Quote, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MotivationalQuotesProps {
  stats: {
    gymDays: number;
    dietDays: number;
    perfectDays: number;
    currentStreak: number;
  };
}

const motivationalQuotes = {
  beginner: [
    "Every journey begins with a single step. You've got this! 💪",
    "Progress, not perfection. Keep moving forward! 🌟",
    "Small steps every day lead to big changes! ✨",
    "Your only competition is who you were yesterday! 🚀"
  ],
  intermediate: [
    "Consistency is the mother of mastery. Keep going! 🔥",
    "You're building momentum - don't stop now! ⚡",
    "Discipline is choosing between what you want now and what you want most! 🎯",
    "Your dedication is inspiring! Keep pushing! 💫"
  ],
  advanced: [
    "Champions are made from something deep inside - the will to win! 🏆",
    "Excellence is not a skill, it's an attitude. You've got it! 👑",
    "You're not just building habits, you're building character! 💎",
    "Your consistency is your superpower! Keep dominating! ⚡"
  ],
  streak: [
    "🔥 You're on fire! This streak is incredible!",
    "⚡ Unstoppable! Your consistency is paying off!",
    "🚀 Sky's the limit when you're this dedicated!",
    "💪 Your willpower is absolutely inspiring!"
  ]
};

const MotivationalQuotes: React.FC<MotivationalQuotesProps> = ({ stats }) => {
  const [currentQuote, setCurrentQuote] = useState('');

  const getQuoteCategory = () => {
    if (stats.currentStreak >= 7) return 'streak';
    if (stats.perfectDays >= 10) return 'advanced';
    if (stats.gymDays >= 5 || stats.dietDays >= 5) return 'intermediate';
    return 'beginner';
  };

  const getRandomQuote = () => {
    const category = getQuoteCategory();
    const quotes = motivationalQuotes[category];
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
  };

  useEffect(() => {
    setCurrentQuote(getRandomQuote());
  }, [stats]);

  const refreshQuote = () => {
    setCurrentQuote(getRandomQuote());
  };

  return (
    <Card className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 border-blue-200 dark:border-blue-800">
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3 flex-1">
          <Quote className="h-5 w-5 text-blue-500 mt-1 flex-shrink-0" />
          <p className="text-sm font-medium text-blue-800 dark:text-blue-200 italic">
            {currentQuote}
          </p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={refreshQuote}
          className="ml-2 h-8 w-8 p-0 text-blue-600 hover:text-blue-800"
        >
          <RefreshCw className="h-4 w-4" />
        </Button>
      </div>
    </Card>
  );
};

export default MotivationalQuotes;
