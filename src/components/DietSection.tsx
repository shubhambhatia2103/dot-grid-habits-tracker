
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Salad } from 'lucide-react';
import { DotState } from './HabitDot';
import DietTracker from './DietTracker';

const DietSection = () => {
  const [dietStats, setDietStats] = useState({
    totalDietDays: 0,
    weekdayDistribution: {
      Monday: 0, Tuesday: 0, Wednesday: 0, Thursday: 0, Friday: 0, Saturday: 0, Sunday: 0
    },
    consistencyRate: 0
  });
  
  useEffect(() => {
    // Load dot states from localStorage
    const savedDotStates = localStorage.getItem('habitDotStates');
    if (savedDotStates) {
      const dotStates = JSON.parse(savedDotStates) as Record<number, DotState>;
      
      // Calculate diet statistics
      let totalDietDays = 0;
      const weekdayDistribution = {
        Monday: 0, Tuesday: 0, Wednesday: 0, Thursday: 0, Friday: 0, Saturday: 0, Sunday: 0
      };
      
      // Use current month to calculate dates
      const today = new Date();
      const currentMonth = today.getMonth();
      const currentYear = today.getFullYear();
      
      for (let day = 1; day <= 30; day++) {
        const state = dotStates[day] || 'unmarked';
        
        // Count diet days (diet or both)
        if (state === 'diet' || state === 'both') {
          totalDietDays++;
          
          // Calculate the weekday for this day
          const date = new Date(currentYear, currentMonth, day);
          const weekday = date.toLocaleDateString('en-US', { weekday: 'long' });
          
          // Increment the count for this weekday
          if (weekday in weekdayDistribution) {
            weekdayDistribution[weekday as keyof typeof weekdayDistribution]++;
          }
        }
      }
      
      // Calculate consistency rate
      const consistencyRate = (totalDietDays / 30) * 100;
      
      setDietStats({
        totalDietDays,
        weekdayDistribution,
        consistencyRate
      });
    }
  }, []);
  
  return (
    <div className="w-full">
      <div className="flex items-center gap-2 mb-6">
        <Salad className="h-6 w-6 text-diet" />
        <h2 className="text-2xl font-bold">Diet Tracking</h2>
      </div>
      
      <DietTracker />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Diet Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Total Diet Days</p>
                <p className="text-2xl font-bold text-diet">{dietStats.totalDietDays} days</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Consistency Rate</p>
                <p className="text-2xl font-bold">{Math.round(dietStats.consistencyRate)}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Weekly Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Day</TableHead>
                  <TableHead className="text-right">Diet Success</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Object.entries(dietStats.weekdayDistribution).map(([day, count]) => (
                  <TableRow key={day}>
                    <TableCell>{day}</TableCell>
                    <TableCell className="text-right">{count}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DietSection;
