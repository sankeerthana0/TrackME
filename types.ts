
export enum Priority {
  High = 'High',
  Medium = 'Medium',
  Low = 'Low'
}

export enum Status {
  NotStarted = 'Not started',
  InProgress = 'In progress',
  Completed = 'Completed'
}

export interface Task {
  id: string;
  name: string;
  priority: Priority;
  dueDate: string;
  status: Status;
}

export interface Habit {
  id: string;
  name: string;
  emoji: string;
  difficulty: 'Daily' | 'Challenging' | 'Hard';
  completions: boolean[]; // 7 days: Mon-Sun
}

export type ViewType = 'habits' | 'tasks' | 'analytics';
