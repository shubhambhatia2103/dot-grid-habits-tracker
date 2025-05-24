
import { Card } from "@/components/ui/card";
import { Trophy, Target, Zap, Calendar, Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AchievementsProps {
  stats: {
    gymDays: number;
    dietDays: number;
    perfectDays: number;
    currentStreak: number;
  };
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  condition: (stats: any) => boolean;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

const achievements: Achievement[] = [
  {
    id: 'first-gym',
    title: 'First Steps',
    description: 'Complete your first gym day',
    icon: <Target className="h-6 w-6" />,
    condition: (stats) => stats.gymDays >= 1,
    rarity: 'common'
  },
  {
    id: 'first-diet',
    title: 'Healthy Choice',
    description: 'Complete your first diet day',
    icon: <Star className="h-6 w-6" />,
    condition: (stats) => stats.dietDays >= 1,
    rarity: 'common'
  },
  {
    id: 'week-warrior',
    title: 'Week Warrior',
    description: 'Maintain a 7-day streak',
    icon: <Zap className="h-6 w-6" />,
    condition: (stats) => stats.currentStreak >= 7,
    rarity: 'rare'
  },
  {
    id: 'perfect-week',
    title: 'Perfect Week',
    description: 'Complete 7 perfect days',
    icon: <Calendar className="h-6 w-6" />,
    condition: (stats) => stats.perfectDays >= 7,
    rarity: 'epic'
  },
  {
    id: 'gym-enthusiast',
    title: 'Gym Enthusiast',
    description: 'Complete 15 gym days',
    icon: <Trophy className="h-6 w-6" />,
    condition: (stats) => stats.gymDays >= 15,
    rarity: 'rare'
  },
  {
    id: 'nutrition-master',
    title: 'Nutrition Master',
    description: 'Complete 15 diet days',
    icon: <Star className="h-6 w-6" />,
    condition: (stats) => stats.dietDays >= 15,
    rarity: 'rare'
  },
  {
    id: 'consistency-king',
    title: 'Consistency King',
    description: 'Maintain a 14-day streak',
    icon: <Zap className="h-6 w-6" />,
    condition: (stats) => stats.currentStreak >= 14,
    rarity: 'epic'
  },
  {
    id: 'perfection-seeker',
    title: 'Perfection Seeker',
    description: 'Complete 15 perfect days',
    icon: <Trophy className="h-6 w-6" />,
    condition: (stats) => stats.perfectDays >= 15,
    rarity: 'legendary'
  }
];

const Achievements: React.FC<AchievementsProps> = ({ stats }) => {
  const unlockedAchievements = achievements.filter(achievement => 
    achievement.condition(stats)
  );

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'border-gray-300 bg-gray-50 dark:bg-gray-800';
      case 'rare': return 'border-blue-300 bg-blue-50 dark:bg-blue-900';
      case 'epic': return 'border-purple-300 bg-purple-50 dark:bg-purple-900';
      case 'legendary': return 'border-yellow-300 bg-yellow-50 dark:bg-yellow-900';
      default: return 'border-gray-300 bg-gray-50 dark:bg-gray-800';
    }
  };

  const getRarityTextColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'text-gray-600 dark:text-gray-400';
      case 'rare': return 'text-blue-600 dark:text-blue-400';
      case 'epic': return 'text-purple-600 dark:text-purple-400';
      case 'legendary': return 'text-yellow-600 dark:text-yellow-400';
      default: return 'text-gray-600 dark:text-gray-400';
    }
  };

  return (
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-4">
        <Trophy className="h-5 w-5 text-yellow-500" />
        <h3 className="text-lg font-semibold">Achievements</h3>
        <span className="text-sm text-muted-foreground">
          ({unlockedAchievements.length}/{achievements.length})
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {achievements.map(achievement => {
          const isUnlocked = achievement.condition(stats);
          return (
            <div
              key={achievement.id}
              className={cn(
                "p-3 rounded-lg border-2 transition-all",
                isUnlocked 
                  ? getRarityColor(achievement.rarity)
                  : "border-gray-200 bg-gray-100 dark:bg-gray-800 opacity-50"
              )}
            >
              <div className="flex items-start gap-3">
                <div className={cn(
                  "p-2 rounded-full",
                  isUnlocked 
                    ? getRarityTextColor(achievement.rarity)
                    : "text-gray-400"
                )}>
                  {achievement.icon}
                </div>
                <div className="flex-1">
                  <h4 className={cn(
                    "font-semibold text-sm",
                    isUnlocked ? "" : "text-gray-500"
                  )}>
                    {achievement.title}
                  </h4>
                  <p className={cn(
                    "text-xs",
                    isUnlocked ? "text-muted-foreground" : "text-gray-400"
                  )}>
                    {achievement.description}
                  </p>
                  <span className={cn(
                    "text-xs font-medium capitalize",
                    isUnlocked 
                      ? getRarityTextColor(achievement.rarity)
                      : "text-gray-400"
                  )}>
                    {achievement.rarity}
                  </span>
                </div>
                {isUnlocked && (
                  <div className="text-green-500 text-xs">✓</div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};

export default Achievements;
