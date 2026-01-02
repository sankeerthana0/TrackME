
import { Priority, Status, Task, Habit } from './types';

export const INITIAL_HABITS: Habit[] = [
  { id: '1', emoji: '🌈', name: 'Learn design', difficulty: 'Daily', completions: [false, false, false, false, false, false, false] },
  { id: '2', emoji: '♨️', name: '10 min relaxing', difficulty: 'Daily', completions: [false, false, true, true, false, false, false] },
  { id: '3', emoji: '🥦', name: 'Eat Healthy', difficulty: 'Daily', completions: [false, false, false, false, false, false, false] },
  { id: '4', emoji: '📖', name: 'Read 20 pages of a book', difficulty: 'Challenging', completions: [false, false, false, false, false, false, false] },
  { id: '5', emoji: '✍️', name: 'Write a page blog', difficulty: 'Challenging', completions: [false, true, true, true, true, true, false] },
  { id: '6', emoji: '🏋️', name: 'Do exercise', difficulty: 'Hard', completions: [false, false, false, false, false, false, false] },
];

export const INITIAL_TASKS: Task[] = [
  { id: 't1', name: 'Task 5', priority: Priority.High, dueDate: '2024-03-07', status: Status.NotStarted },
  { id: 't2', name: 'Task 1', priority: Priority.High, dueDate: '2024-03-08', status: Status.InProgress },
  { id: 't3', name: 'Task 2', priority: Priority.Low, dueDate: '2024-03-11', status: Status.InProgress },
  { id: 't4', name: 'Task 4', priority: Priority.Low, dueDate: '2024-03-14', status: Status.NotStarted },
];

export const MOCK_CHART_DATA = [
  { name: 'Mon', completion: 40, target: 80, focus: 60 },
  { name: 'Tue', completion: 60, target: 80, focus: 75 },
  { name: 'Wed', completion: 85, target: 80, focus: 90 },
  { name: 'Thu', completion: 70, target: 80, focus: 65 },
  { name: 'Fri', completion: 90, target: 80, focus: 95 },
  { name: 'Sat', completion: 50, target: 80, focus: 40 },
  { name: 'Sun', completion: 30, target: 80, focus: 20 },
];
