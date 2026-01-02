
import React, { useState } from 'react';
import { Habit } from '../types';

interface HabitTrackerProps {
  habits: Habit[];
  setHabits: React.Dispatch<React.SetStateAction<Habit[]>>;
}

export const HabitTracker: React.FC<HabitTrackerProps> = ({ habits, setHabits }) => {
  const [newHabitName, setNewHabitName] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const toggleHabit = (habitId: string, dayIndex: number) => {
    setHabits(prev => prev.map(h => {
      if (h.id === habitId) {
        const newCompletions = [...h.completions];
        newCompletions[dayIndex] = !newCompletions[dayIndex];
        return { ...h, completions: newCompletions };
      }
      return h;
    }));
  };

  const updateHabitProperty = (id: string, field: keyof Habit, value: string) => {
    setHabits(prev => prev.map(h => h.id === id ? { ...h, [field]: value } : h));
  };

  const addHabit = () => {
    if (!newHabitName.trim()) return;
    const newHabit: Habit = {
      id: Date.now().toString(),
      emoji: '✨',
      name: newHabitName,
      difficulty: 'Daily',
      completions: [false, false, false, false, false, false, false]
    };
    setHabits([...habits, newHabit]);
    setNewHabitName('');
    setIsAdding(false);
  };

  const deleteHabit = (id: string) => {
    if (confirm('Delete this habit and all its progress?')) {
      setHabits(habits.filter(h => h.id !== id));
    }
  };

  const getSuccessRate = (completions: boolean[]) => {
    const completedCount = completions.filter(Boolean).length;
    return Math.round((completedCount / completions.length) * 100);
  };

  const getDayStats = (dayIndex: number) => {
    if (habits.length === 0) return 0;
    const completed = habits.filter(h => h.completions[dayIndex]).length;
    return Math.round((completed / habits.length) * 100);
  };

  return (
    <div className="space-y-6">
      <div className="bg-[#ebf5fb] p-3 rounded text-sm flex items-center justify-between text-gray-700">
        <div className="flex items-center space-x-2">
          <span>🦄</span>
          <span>Click on any name or emoji to edit. Your changes save automatically.</span>
        </div>
        <button 
          onClick={() => setIsAdding(!isAdding)}
          className="bg-white border border-blue-200 px-3 py-1 rounded-md text-xs font-semibold text-blue-600 hover:bg-blue-50 transition-colors"
        >
          {isAdding ? 'Cancel' : '+ Add Habit'}
        </button>
      </div>

      {isAdding && (
        <div className="flex items-center space-x-2 p-4 bg-gray-50 rounded-lg animate-in fade-in zoom-in duration-200 border border-gray-100">
          <input 
            autoFocus
            type="text" 
            placeholder="What is your new goal?"
            value={newHabitName}
            onChange={(e) => setNewHabitName(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addHabit()}
            className="flex-1 bg-white border border-gray-200 rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100"
          />
          <button 
            onClick={addHabit}
            className="bg-blue-500 text-white px-4 py-1.5 rounded text-sm font-medium hover:bg-blue-600 transition-colors"
          >
            Add Goal
          </button>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left border-collapse min-w-[600px]">
          <thead>
            <tr className="text-gray-400 font-normal border-b border-gray-100">
              <th className="py-2 px-4 font-normal w-1/4">Aa Habit Name</th>
              <th className="py-2 px-4 font-normal">Freq</th>
              {days.map(day => (
                <th key={day} className="py-2 px-4 font-normal text-center">{day}</th>
              ))}
              <th className="py-2 px-4 font-normal text-right">Success</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {habits.map(habit => (
              <tr key={habit.id} className="group hover:bg-gray-50/50 transition-colors">
                <td className="py-3 px-4">
                  <div className="flex items-center space-x-2">
                    <button 
                       onClick={() => deleteHabit(habit.id)}
                       className="opacity-0 group-hover:opacity-100 transition-opacity text-red-300 hover:text-red-500 p-1"
                    >
                      ✕
                    </button>
                    <input 
                      className="w-6 bg-transparent border-none p-0 focus:ring-0 text-center cursor-pointer hover:bg-gray-200 rounded"
                      value={habit.emoji}
                      onChange={(e) => updateHabitProperty(habit.id, 'emoji', e.target.value)}
                    />
                    {editingId === habit.id ? (
                      <input 
                        autoFocus
                        className="flex-1 bg-white border border-blue-200 rounded px-1 focus:outline-none text-sm font-medium"
                        value={habit.name}
                        onBlur={() => setEditingId(null)}
                        onKeyDown={(e) => e.key === 'Enter' && setEditingId(null)}
                        onChange={(e) => updateHabitProperty(habit.id, 'name', e.target.value)}
                      />
                    ) : (
                      <span 
                        onClick={() => setEditingId(habit.id)}
                        className="font-medium underline decoration-gray-200 underline-offset-4 cursor-text hover:decoration-blue-400 truncate max-w-[150px]"
                      >
                        {habit.name}
                      </span>
                    )}
                  </div>
                </td>
                <td className="py-3 px-4">
                  <select 
                    value={habit.difficulty}
                    onChange={(e) => updateHabitProperty(habit.id, 'difficulty', e.target.value)}
                    className="bg-transparent border-none text-[10px] font-bold uppercase p-0 focus:ring-0 cursor-pointer text-gray-400 hover:text-gray-600"
                  >
                    <option value="Daily">Daily</option>
                    <option value="Challenging">Medium</option>
                    <option value="Hard">Hard</option>
                  </select>
                </td>
                {habit.completions.map((completed, idx) => (
                  <td key={idx} className="py-3 px-4 text-center">
                    <input 
                      type="checkbox" 
                      checked={completed}
                      onChange={() => toggleHabit(habit.id, idx)}
                      className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer transition-all hover:scale-110"
                    />
                  </td>
                ))}
                <td className="py-3 px-4 text-right font-bold text-gray-400 tabular-nums">
                  {getSuccessRate(habit.completions)}%
                </td>
              </tr>
            ))}
          </tbody>
          {habits.length > 0 && (
            <tfoot>
              <tr className="bg-gray-50/30">
                <td colSpan={2} className="py-4 px-4 text-[10px] font-bold text-gray-400 text-right uppercase tracking-widest">Momentum</td>
                {days.map((_, idx) => (
                  <td key={idx} className="py-4 px-4 text-center text-xs font-black text-gray-400">
                    {getDayStats(idx)}%
                  </td>
                ))}
                <td className="py-4 px-4 text-right text-xs font-black text-blue-500">
                  {Math.round(habits.reduce((acc, h) => acc + getSuccessRate(h.completions), 0) / habits.length)}%
                </td>
              </tr>
            </tfoot>
          )}
        </table>
        {habits.length === 0 && (
          <div className="text-center py-20 text-gray-300 italic border-2 border-dashed border-gray-50 rounded-xl mt-4">
            No habits yet. Click "+ Add Habit" to start your proof of work.
          </div>
        )}
      </div>
    </div>
  );
};
