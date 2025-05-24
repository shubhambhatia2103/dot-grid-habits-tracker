
import { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Target, Trophy, Edit } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface GoalsProps {
  currentStats: {
    gymDays: number;
    dietDays: number;
    perfectDays: number;
    currentStreak: number;
  };
}

interface Goal {
  gymTarget: number;
  dietTarget: number;
  perfectTarget: number;
  streakTarget: number;
}

const Goals: React.FC<GoalsProps> = ({ currentStats }) => {
  const { toast } = useToast();
  const [goals, setGoals] = useState<Goal>({
    gymTarget: 20,
    dietTarget: 20,
    perfectTarget: 15,
    streakTarget: 7
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editGoals, setEditGoals] = useState(goals);

  useEffect(() => {
    const savedGoals = localStorage.getItem('habitGoals');
    if (savedGoals) {
      const parsed = JSON.parse(savedGoals);
      setGoals(parsed);
      setEditGoals(parsed);
    }
  }, []);

  const saveGoals = () => {
    setGoals(editGoals);
    localStorage.setItem('habitGoals', JSON.stringify(editGoals));
    setIsEditing(false);
    toast({
      title: "Goals Updated!",
      description: "Your new targets have been saved.",
    });
  };

  const getProgressColor = (current: number, target: number) => {
    const percentage = (current / target) * 100;
    if (percentage >= 100) return "bg-green-500";
    if (percentage >= 75) return "bg-yellow-500";
    return "bg-blue-500";
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Target className="h-5 w-5 text-blue-500" />
          <h3 className="text-lg font-semibold">Monthly Goals</h3>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsEditing(!isEditing)}
        >
          <Edit className="h-4 w-4 mr-1" />
          {isEditing ? 'Cancel' : 'Edit'}
        </Button>
      </div>

      {isEditing ? (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="gymTarget">Gym Days Target</Label>
              <Input
                id="gymTarget"
                type="number"
                value={editGoals.gymTarget}
                onChange={(e) => setEditGoals(prev => ({
                  ...prev,
                  gymTarget: parseInt(e.target.value) || 0
                }))}
              />
            </div>
            <div>
              <Label htmlFor="dietTarget">Diet Days Target</Label>
              <Input
                id="dietTarget"
                type="number"
                value={editGoals.dietTarget}
                onChange={(e) => setEditGoals(prev => ({
                  ...prev,
                  dietTarget: parseInt(e.target.value) || 0
                }))}
              />
            </div>
            <div>
              <Label htmlFor="perfectTarget">Perfect Days Target</Label>
              <Input
                id="perfectTarget"
                type="number"
                value={editGoals.perfectTarget}
                onChange={(e) => setEditGoals(prev => ({
                  ...prev,
                  perfectTarget: parseInt(e.target.value) || 0
                }))}
              />
            </div>
            <div>
              <Label htmlFor="streakTarget">Streak Target</Label>
              <Input
                id="streakTarget"
                type="number"
                value={editGoals.streakTarget}
                onChange={(e) => setEditGoals(prev => ({
                  ...prev,
                  streakTarget: parseInt(e.target.value) || 0
                }))}
              />
            </div>
          </div>
          <Button onClick={saveGoals} className="w-full">
            Save Goals
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Gym Days</span>
                <span>{currentStats.gymDays}/{goals.gymTarget}</span>
              </div>
              <Progress 
                value={(currentStats.gymDays / goals.gymTarget) * 100} 
                indicatorClassName={getProgressColor(currentStats.gymDays, goals.gymTarget)}
              />
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Diet Days</span>
                <span>{currentStats.dietDays}/{goals.dietTarget}</span>
              </div>
              <Progress 
                value={(currentStats.dietDays / goals.dietTarget) * 100}
                indicatorClassName={getProgressColor(currentStats.dietDays, goals.dietTarget)}
              />
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Perfect Days</span>
                <span>{currentStats.perfectDays}/{goals.perfectTarget}</span>
              </div>
              <Progress 
                value={(currentStats.perfectDays / goals.perfectTarget) * 100}
                indicatorClassName={getProgressColor(currentStats.perfectDays, goals.perfectTarget)}
              />
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Current Streak</span>
                <span>{currentStats.currentStreak}/{goals.streakTarget}</span>
              </div>
              <Progress 
                value={(currentStats.currentStreak / goals.streakTarget) * 100}
                indicatorClassName={getProgressColor(currentStats.currentStreak, goals.streakTarget)}
              />
            </div>
          </div>
          
          {/* Achievement alerts */}
          {currentStats.gymDays >= goals.gymTarget && (
            <div className="flex items-center gap-2 p-2 bg-green-100 dark:bg-green-900 rounded-lg">
              <Trophy className="h-4 w-4 text-green-600" />
              <span className="text-sm text-green-700 dark:text-green-300">Gym goal achieved! 🎉</span>
            </div>
          )}
          
          {currentStats.dietDays >= goals.dietTarget && (
            <div className="flex items-center gap-2 p-2 bg-green-100 dark:bg-green-900 rounded-lg">
              <Trophy className="h-4 w-4 text-green-600" />
              <span className="text-sm text-green-700 dark:text-green-300">Diet goal achieved! 🥗</span>
            </div>
          )}
        </div>
      )}
    </Card>
  );
};

export default Goals;
