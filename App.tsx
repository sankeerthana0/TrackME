
import React, { useState, useEffect } from 'react';
import { NotionLayout } from './components/NotionLayout';
import { HabitTracker } from './components/HabitTracker';
import { TaskTracker } from './components/TaskTracker';
import { AnalyticsDashboard } from './components/AnalyticsDashboard';
import { ViewType, Habit, Task } from './types';
import { INITIAL_HABITS, INITIAL_TASKS } from './constants';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<ViewType>('habits');
  
  // Persistence logic
  const [habits, setHabits] = useState<Habit[]>(() => {
    const saved = localStorage.getItem('prod_habits');
    return saved ? JSON.parse(saved) : INITIAL_HABITS;
  });

  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem('prod_tasks');
    return saved ? JSON.parse(saved) : INITIAL_TASKS;
  });

  useEffect(() => {
    localStorage.setItem('prod_habits', JSON.stringify(habits));
  }, [habits]);

  useEffect(() => {
    localStorage.setItem('prod_tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Data Management Functions
  const exportData = () => {
    const data = {
      habits,
      tasks,
      exportDate: new Date().toISOString(),
      version: "1.0"
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `productivity_backup_${new Date().toLocaleDateString().replace(/\//g, '-')}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const importData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const json = JSON.parse(e.target?.result as string);
        if (json.habits && json.tasks) {
          if (confirm('Importing will overwrite your current data. Continue?')) {
            setHabits(json.habits);
            setTasks(json.tasks);
            alert('Data imported successfully!');
          }
        } else {
          alert('Invalid backup file format.');
        }
      } catch (err) {
        alert('Error reading the backup file.');
      }
    };
    reader.readAsText(file);
  };

  const renderContent = () => {
    switch (activeView) {
      case 'habits':
        return <HabitTracker habits={habits} setHabits={setHabits} />;
      case 'tasks':
        return <TaskTracker tasks={tasks} setTasks={setTasks} />;
      case 'analytics':
        return <AnalyticsDashboard habits={habits} tasks={tasks} />;
      default:
        return <HabitTracker habits={habits} setHabits={setHabits} />;
    }
  };

  return (
    <div className="min-h-screen selection:bg-blue-100 selection:text-blue-900">
      <NotionLayout 
        activeView={activeView} 
        onViewChange={setActiveView}
        onExport={exportData}
        onImport={importData}
      >
        {renderContent()}
      </NotionLayout>
    </div>
  );
};

export default App;
