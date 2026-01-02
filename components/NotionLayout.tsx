
import React from 'react';
import { ViewType } from '../types';

interface NotionLayoutProps {
  children: React.ReactNode;
  activeView: ViewType;
  onViewChange: (view: ViewType) => void;
  onExport: () => void;
  onImport: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const NotionLayout: React.FC<NotionLayoutProps> = ({ 
  children, 
  activeView, 
  onViewChange,
  onExport,
  onImport
}) => {
  const titles = {
    habits: { title: 'Routine Habit Tracker Dashboard', icon: '🎨', banner: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=1600' },
    tasks: { title: 'Daily Work Task Tracker', icon: '💼', banner: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&q=80&w=1600' },
    analytics: { title: 'Performance Analytics', icon: '📈', banner: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1600' },
  };

  const current = titles[activeView];

  return (
    <div className="flex flex-col w-full min-h-screen bg-white">
      {/* Cover Image */}
      <div className="relative h-[250px] w-full overflow-hidden group">
        <img 
          src={current.banner} 
          alt="Page Cover" 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/10" />
        
        {/* Top Actions */}
        <div className="absolute top-4 right-6 flex items-center space-x-2">
          <label className="cursor-pointer bg-white/90 hover:bg-white px-3 py-1.5 rounded-md text-[10px] font-bold text-gray-600 shadow-sm transition-all flex items-center space-x-1 backdrop-blur-sm">
            <span>📥 Import Data</span>
            <input type="file" className="hidden" accept=".json" onChange={onImport} />
          </label>
          <button 
            onClick={onExport}
            className="bg-white/90 hover:bg-white px-3 py-1.5 rounded-md text-[10px] font-bold text-gray-600 shadow-sm transition-all flex items-center space-x-1 backdrop-blur-sm"
          >
            <span>📤 Download Proof (JSON)</span>
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="max-w-6xl w-full mx-auto px-6 pb-20 -mt-16 relative z-10">
        {/* Page Icon */}
        <div className="text-8xl mb-4 bg-white rounded-2xl w-32 h-32 flex items-center justify-center shadow-xl border border-gray-100 animate-in fade-in slide-in-from-bottom-4 duration-500">
          {current.icon}
        </div>

        {/* Header Section */}
        <div className="mb-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-4xl font-bold text-[#37352f] mb-2">{current.title}</h1>
              <p className="text-xs text-gray-400 mb-4 flex items-center">
                <span className="w-2 h-2 rounded-full bg-green-400 mr-2 animate-pulse"></span>
                Local Sync Active • Ready for GitHub Deployment
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-6 border-b border-gray-100 pb-2 mb-6">
            <button 
              onClick={() => onViewChange('habits')}
              className={`pb-2 px-1 text-sm font-medium transition-colors ${activeView === 'habits' ? 'border-b-2 border-gray-900 text-gray-900' : 'text-gray-400 hover:text-gray-600'}`}
            >
              Habit Tracker
            </button>
            <button 
              onClick={() => onViewChange('tasks')}
              className={`pb-2 px-1 text-sm font-medium transition-colors ${activeView === 'tasks' ? 'border-b-2 border-gray-900 text-gray-900' : 'text-gray-400 hover:text-gray-600'}`}
            >
              Task Manager
            </button>
            <button 
              onClick={() => onViewChange('analytics')}
              className={`pb-2 px-1 text-sm font-medium transition-colors ${activeView === 'analytics' ? 'border-b-2 border-gray-900 text-gray-900' : 'text-gray-400 hover:text-gray-600'}`}
            >
              Analytics
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="animate-in fade-in duration-500 min-h-[400px]">
          {children}
        </div>

        {/* Footer */}
        <footer className="mt-20 pt-8 border-t border-gray-50 flex flex-col md:flex-row justify-between items-center text-gray-300 text-[10px] font-bold uppercase tracking-widest">
          <div className="flex items-center space-x-4 mb-4 md:mb-0">
            <span>Built with React & Tailwind</span>
            <span className="w-1 h-1 bg-gray-200 rounded-full"></span>
            <span>Local Persistence Enabled</span>
          </div>
          <div className="flex items-center space-x-6">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-600 transition-colors">GitHub Repository</a>
            <a href="https://ai.google.dev" target="_blank" rel="noopener noreferrer" className="hover:text-gray-600 transition-colors">Documentation</a>
            <span className="text-gray-200">v1.0.0</span>
          </div>
        </footer>
      </div>
    </div>
  );
};
