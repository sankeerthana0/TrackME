
import React, { useState } from 'react';
import { Task, Priority, Status } from '../types';

interface TaskTrackerProps {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

export const TaskTracker: React.FC<TaskTrackerProps> = ({ tasks, setTasks }) => {
  const [isAdding, setIsAdding] = useState<Priority | null>(null);
  const [newTaskName, setNewTaskName] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);

  const toggleStatus = (taskId: string) => {
    setTasks(prev => prev.map(t => {
      if (t.id === taskId) {
        const nextStatus = 
          t.status === Status.NotStarted ? Status.InProgress : 
          t.status === Status.InProgress ? Status.Completed : Status.NotStarted;
        return { ...t, status: nextStatus };
      }
      return t;
    }));
  };

  // Fixed the reference from 'h' to 't' as 'h' was not defined in this scope
  const updateTaskName = (id: string, newName: string) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, name: newName } : t));
  };

  const addTask = (priority: Priority) => {
    if (!newTaskName.trim()) return;
    const newTask: Task = {
      id: Date.now().toString(),
      name: newTaskName,
      priority,
      dueDate: new Date().toISOString().split('T')[0],
      status: Status.NotStarted
    };
    setTasks([...tasks, newTask]);
    setNewTaskName('');
    setIsAdding(null);
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const tasksByPriority = {
    [Priority.High]: tasks.filter(t => t.priority === Priority.High),
    [Priority.Medium]: tasks.filter(t => t.priority === Priority.Medium),
    [Priority.Low]: tasks.filter(t => t.priority === Priority.Low),
  };

  const renderTaskSection = (priority: Priority, label: string, color: string) => (
    <div className="mb-8 animate-in fade-in duration-300">
      <div className="flex items-center justify-between mb-2 group cursor-pointer pr-4">
        <div className="flex items-center space-x-2">
          <span className="text-gray-400 text-[10px]">▼</span>
          <span className={`w-2 h-2 rounded-full ${color}`} />
          <h3 className="text-[11px] font-black uppercase tracking-wider text-gray-500">{label} Priority</h3>
          <span className="bg-gray-100 text-gray-400 text-[9px] px-1.5 rounded-full">{tasksByPriority[priority].length}</span>
        </div>
        <button 
          onClick={() => setIsAdding(priority)}
          className="text-[10px] font-bold text-blue-400 opacity-0 group-hover:opacity-100 hover:text-blue-600 transition-all uppercase"
        >
          + Add Task
        </button>
      </div>
      <div className="ml-4 overflow-hidden">
        {isAdding === priority && (
          <div className="flex items-center space-x-2 mb-2 p-2 bg-blue-50/50 rounded border border-blue-100 border-dashed animate-in slide-in-from-left-2 duration-200">
            <input 
              autoFocus
              className="flex-1 bg-transparent border-none text-xs focus:ring-0 p-0 placeholder:text-blue-300"
              placeholder="What's next on the list?"
              value={newTaskName}
              onChange={(e) => setNewTaskName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addTask(priority)}
              onBlur={() => !newTaskName && setIsAdding(null)}
            />
            <button 
              className="text-[10px] bg-blue-500 text-white px-2 py-0.5 rounded shadow-sm font-bold uppercase" 
              onClick={() => addTask(priority)}
            >
              Add
            </button>
          </div>
        )}
        <div className="space-y-0.5">
          {tasksByPriority[priority].map(task => (
            <div key={task.id} className="group flex items-center justify-between py-2 px-2 hover:bg-gray-50 rounded-md transition-colors border-b border-gray-50 last:border-0">
              <div className="flex items-center space-x-3 flex-1">
                <button 
                  onClick={() => toggleStatus(task.id)}
                  className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                    task.status === Status.Completed ? 'bg-green-500 border-green-500 text-white' : 
                    task.status === Status.InProgress ? 'bg-blue-100 border-blue-300 text-blue-600' : 
                    'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  {task.status === Status.Completed && <span className="text-[10px]">✓</span>}
                  {task.status === Status.InProgress && <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>}
                </button>
                
                {editingId === task.id ? (
                  <input 
                    autoFocus
                    className="flex-1 bg-white border border-blue-200 rounded px-1 text-xs focus:outline-none"
                    value={task.name}
                    onBlur={() => setEditingId(null)}
                    onKeyDown={(e) => e.key === 'Enter' && setEditingId(null)}
                    onChange={(e) => updateTaskName(task.id, e.target.value)}
                  />
                ) : (
                  <span 
                    onClick={() => setEditingId(task.id)}
                    className={`text-xs cursor-text transition-all ${
                      task.status === Status.Completed ? 'text-gray-300 line-through' : 'text-gray-700 font-medium'
                    }`}
                  >
                    {task.name}
                  </span>
                )}
              </div>
              
              <div className="flex items-center space-x-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-[9px] text-gray-300 font-mono">{task.dueDate.split('-').slice(1).join('/')}</span>
                <button 
                  onClick={() => deleteTask(task.id)} 
                  className="text-gray-300 hover:text-red-400 p-1"
                >
                  ✕
                </button>
              </div>
            </div>
          ))}
        </div>
        {tasksByPriority[priority].length === 0 && !isAdding && (
          <div className="py-2 text-gray-300 text-[10px] italic">No active tasks.</div>
        )}
      </div>
    </div>
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
      {/* Calendar: Takes 5/12 columns */}
      <div className="lg:col-span-5 space-y-4">
        <h2 className="text-xl font-black text-gray-800 tracking-tight">Calendar Visualization</h2>
        <div className="border border-gray-100 rounded-xl overflow-hidden bg-white shadow-sm ring-1 ring-black/5">
          <div className="flex justify-between items-center p-4 border-b border-gray-50 bg-gray-50/50">
            <span className="font-bold text-sm text-gray-600">March 2024</span>
            <div className="flex space-x-2">
              <button className="w-6 h-6 flex items-center justify-center rounded-md hover:bg-gray-200 text-gray-400">‹</button>
              <button className="px-2 h-6 flex items-center justify-center rounded-md hover:bg-gray-200 text-gray-800 text-[10px] font-bold uppercase">Today</button>
              <button className="w-6 h-6 flex items-center justify-center rounded-md hover:bg-gray-200 text-gray-400">›</button>
            </div>
          </div>
          <div className="grid grid-cols-7 text-center text-[9px] font-black uppercase text-gray-300 py-3 border-b border-gray-50">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => <div key={d}>{d}</div>)}
          </div>
          <div className="grid grid-cols-7 h-72">
            {Array.from({ length: 35 }).map((_, i) => {
              const day = i - 4;
              const isToday = day === 7;
              const hasTask = tasks.some(t => t.dueDate === `2024-03-${day < 10 ? '0'+day : day}`);
              return (
                <div key={i} className="border-r border-b border-gray-50 p-1 relative hover:bg-blue-50/30 cursor-pointer group transition-all">
                  <span className={`text-[10px] font-bold ${isToday ? 'bg-blue-500 text-white w-5 h-5 flex items-center justify-center rounded-full shadow-lg shadow-blue-200' : 'text-gray-400 group-hover:text-blue-400'}`}>
                    {day > 0 && day <= 31 ? day : ''}
                  </span>
                  {hasTask && (
                    <div className="absolute bottom-1 right-1 w-1.5 h-1.5 bg-blue-400 rounded-full ring-2 ring-white"></div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Task List: Takes 7/12 columns */}
      <div className="lg:col-span-7 space-y-6">
        <div className="flex justify-between items-end">
          <div>
            <h2 className="text-3xl font-black text-gray-900 tracking-tighter">My Workflow</h2>
            <p className="text-[11px] text-gray-400 font-medium uppercase tracking-widest mt-1">Focus on what matters most</p>
          </div>
          <div className="text-right">
            <span className="block text-2xl font-black text-blue-500">{Math.round((tasks.filter(t => t.status === Status.Completed).length / (tasks.length || 1)) * 100)}%</span>
            <span className="text-[9px] font-bold text-gray-300 uppercase">Velocity</span>
          </div>
        </div>
        
        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm ring-1 ring-black/5">
          {renderTaskSection(Priority.High, 'Immediate', 'bg-red-400')}
          {renderTaskSection(Priority.Medium, 'Secondary', 'bg-orange-300')}
          {renderTaskSection(Priority.Low, 'Backlog', 'bg-yellow-200')}
        </div>
      </div>
    </div>
  );
};
