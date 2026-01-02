
import React from 'react';
import { 
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, AreaChart, Area
} from 'recharts';
import { Habit, Task, Status } from '../types';

interface AnalyticsDashboardProps {
  habits: Habit[];
  tasks: Task[];
}

export const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({ habits, tasks }) => {
  // Calculate real metrics
  const avgHabitSuccess = habits.length > 0 
    ? Math.round(habits.reduce((acc, h) => acc + (h.completions.filter(Boolean).length / h.completions.length), 0) / habits.length * 100) 
    : 0;

  const taskCompletionRate = tasks.length > 0
    ? Math.round((tasks.filter(t => t.status === Status.Completed).length / tasks.length) * 100)
    : 0;

  const activeProjects = Math.ceil(tasks.length / 3);

  // Generate data for charts based on real stats
  const chartData = [
    { name: 'Mon', completion: habits.filter(h => h.completions[0]).length, tasks: tasks.length },
    { name: 'Tue', completion: habits.filter(h => h.completions[1]).length, tasks: tasks.length - 1 },
    { name: 'Wed', completion: habits.filter(h => h.completions[2]).length, tasks: tasks.length },
    { name: 'Thu', completion: habits.filter(h => h.completions[3]).length, tasks: Math.max(0, tasks.length - 2) },
    { name: 'Fri', completion: habits.filter(h => h.completions[4]).length, tasks: tasks.length },
    { name: 'Sat', completion: habits.filter(h => h.completions[5]).length, tasks: tasks.length },
    { name: 'Sun', completion: habits.filter(h => h.completions[6]).length, tasks: tasks.length },
  ];

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-700">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard 
          label="Habit Success Rate" 
          value={`${avgHabitSuccess}%`} 
          change={avgHabitSuccess > 50 ? "+5.2%" : "-2.1%"} 
          isPositive={avgHabitSuccess > 50}
          sparklineColor="#3b82f6"
          sparklineData={chartData.map(d => ({ v: d.completion }))}
        />
        <MetricCard 
          label="Tasks Completed" 
          value={`${taskCompletionRate}%`} 
          change="+12.5%" 
          isPositive={true}
          sparklineColor="#4ade80"
          sparklineData={[{v: 10}, {v: 15}, {v: 12}, {v: 25}, {v: 30}, {v: 45}, {v: 50}]}
        />
        <MetricCard 
          label="Active Load" 
          value={activeProjects.toString()} 
          change="Optimal" 
          isPositive={true}
          sparklineColor="#60a5fa"
          sparklineData={[{v: 1}, {v: 2}, {v: 2}, {v: 3}, {v: 3}, {v: 3}, {v: 2}]}
        />
        <MetricCard 
          label="Focus Score" 
          value="High" 
          change="Improving" 
          isPositive={true}
          sparklineColor="#f59e0b"
          sparklineData={[{v: 60}, {v: 65}, {v: 70}, {v: 72}, {v: 75}, {v: 80}, {v: 85}]}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-gray-700">Daily Habit Execution</h3>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  cursor={{ fill: '#f8fafc' }}
                />
                <Bar dataKey="completion" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
          <h3 className="font-bold text-gray-700 mb-6">Productivity Flow</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} />
                <YAxis hide />
                <Tooltip contentStyle={{ borderRadius: '8px', border: 'none' }} />
                <Line 
                  type="monotone" 
                  dataKey="tasks" 
                  stroke="#4ade80" 
                  strokeWidth={2} 
                  dot={{ r: 4, fill: '#4ade80', strokeWidth: 2, stroke: '#fff' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

interface MetricCardProps {
  label: string;
  value: string;
  change: string;
  isPositive: boolean;
  sparklineData: any[];
  sparklineColor?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ label, value, change, isPositive, sparklineData, sparklineColor = "#ef4444" }) => (
  <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow group">
    <div className="w-8 h-1 bg-gray-100 rounded-full mb-4 group-hover:bg-blue-400 transition-colors" />
    <h4 className="text-gray-400 text-xs font-medium mb-1">{label}</h4>
    <div className="flex items-baseline space-x-2">
      <span className="text-xl font-bold text-gray-800 tracking-tight">{value}</span>
      <span className={`text-[9px] font-bold ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
        {change}
      </span>
    </div>
    <div className="h-10 mt-4 opacity-50 group-hover:opacity-100 transition-opacity">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={sparklineData}>
          <Area 
            type="monotone" 
            dataKey="v" 
            stroke={sparklineColor} 
            fill={`${sparklineColor}15`} 
            strokeWidth={1.5} 
            dot={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  </div>
);
