
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const ExportImport = () => {
  const { toast } = useToast();
  const [isImporting, setIsImporting] = useState(false);
  
  const handleExport = () => {
    try {
      const habitData = localStorage.getItem('habitDotStates') || '{}';
      const dataStr = JSON.stringify(habitData);
      const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
      
      const exportFileDefaultName = `habit-tracker-backup-${new Date().toISOString().slice(0, 10)}.json`;
      
      const linkElement = document.createElement('a');
      linkElement.setAttribute('href', dataUri);
      linkElement.setAttribute('download', exportFileDefaultName);
      linkElement.click();
      
      toast({
        title: "Export successful",
        description: "Your habit data has been exported successfully.",
      });
    } catch (error) {
      toast({
        title: "Export failed",
        description: "There was an error exporting your data.",
        variant: "destructive",
      });
    }
  };
  
  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const parsedData = JSON.parse(content);
        
        // Store the data
        localStorage.setItem('habitDotStates', parsedData);
        
        // Reset the input
        setIsImporting(false);
        if (event.target) event.target.value = '';
        
        // Show success message
        toast({
          title: "Import successful",
          description: "Your habit data has been imported. Refreshing the page...",
        });
        
        // Reload the page to apply imported data
        setTimeout(() => window.location.reload(), 1500);
      } catch (error) {
        toast({
          title: "Import failed",
          description: "There was an error importing your data. Please check the file format.",
          variant: "destructive",
        });
      }
    };
    reader.readAsText(file);
  };
  
  return (
    <div className="flex items-center space-x-2">
      <Button 
        variant="outline" 
        onClick={handleExport}
        size="sm"
        className="text-xs"
      >
        Export Data
      </Button>
      
      {isImporting ? (
        <input
          type="file"
          accept=".json"
          onChange={handleImport}
          className="text-xs w-24"
        />
      ) : (
        <Button 
          variant="outline" 
          onClick={() => setIsImporting(true)}
          size="sm"
          className="text-xs"
        >
          Import Data
        </Button>
      )}
    </div>
  );
};

export default ExportImport;
