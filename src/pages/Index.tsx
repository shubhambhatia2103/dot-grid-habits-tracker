
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import HabitGrid from "@/components/HabitGrid";
import Dashboard from "@/components/Dashboard";
import GymSection from "@/components/GymSection";
import DietSection from "@/components/DietSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-6">Habit Dot Grid</h1>
        
        <Tabs defaultValue="dashboard" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="gym">Gym</TabsTrigger>
            <TabsTrigger value="diet">Diet</TabsTrigger>
          </TabsList>
          
          <TabsContent value="dashboard" className="mt-0">
            <Dashboard />
          </TabsContent>
          
          <TabsContent value="gym" className="mt-0">
            <GymSection />
          </TabsContent>
          
          <TabsContent value="diet" className="mt-0">
            <DietSection />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
