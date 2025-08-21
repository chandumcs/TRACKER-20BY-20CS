// In-memory storage for tasks when database is not available
export interface Task {
  id?: number;
  title: string;
  description?: string;
  status: string;
  priority: string;
  assignedTo: string;
  createdBy: string;
  createdAt?: Date;
  updatedAt?: Date;
  dueDate?: Date;
}

let tasks: (Task & { id: number })[] = [];
let nextTaskId = 1;

export class MockTaskService {
  // Create new task
  static async createTask(taskData: Task): Promise<number> {
    const newTask = {
      ...taskData,
      id: nextTaskId++,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    tasks.push(newTask);
    return newTask.id;
  }

  // Get all tasks
  static async getTasks(): Promise<Task[]> {
    return tasks.map(task => ({ ...task }));
  }

  // Get task by ID
  static async getTaskById(id: number): Promise<Task | null> {
    const task = tasks.find(t => t.id === id);
    return task ? { ...task } : null;
  }

  // Update task
  static async updateTask(id: number, updates: Partial<Task>): Promise<boolean> {
    const taskIndex = tasks.findIndex(t => t.id === id);
    if (taskIndex !== -1) {
      tasks[taskIndex] = {
        ...tasks[taskIndex],
        ...updates,
        updatedAt: new Date()
      };
      return true;
    }
    return false;
  }

  // Delete task
  static async deleteTask(id: number): Promise<boolean> {
    const taskIndex = tasks.findIndex(t => t.id === id);
    if (taskIndex !== -1) {
      tasks.splice(taskIndex, 1);
      return true;
    }
    return false;
  }

  // Initialize with some sample tasks
  static initializeDefaultTasks() {
    if (tasks.length === 0) {
      tasks.push({
        id: nextTaskId++,
        title: "Setup Project",
        description: "Initialize the project structure and dependencies",
        status: "completed",
        priority: "high",
        assignedTo: "admin@example.com",
        createdBy: "admin@example.com",
        createdAt: new Date(),
        updatedAt: new Date()
      });

      tasks.push({
        id: nextTaskId++,
        title: "Database Configuration",
        description: "Configure Oracle database connection",
        status: "in-progress",
        priority: "medium",
        assignedTo: "admin@example.com",
        createdBy: "admin@example.com",
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }
  }
}
