// In-memory storage for tasks when database is not available
export interface Task {
  id?: number;
  title: string;
  description?: string;
  product: string;
  issueType: string;
  status?: string;
  priority?: string;
  developer?: string;
  uatPerson?: string;
  productionPerson?: string;
  reportedDate?: string;
  fixedDate?: string;
  closedDate?: string;
  taskDate?: string;
  timeInfo?: string;
  createdBy?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

let tasks: (Task & { id: number })[] = [];
let nextTaskId = 1;

export class MockTaskService {
  // Create new task
  static async createTask(taskData: Task, userId: number): Promise<number> {
    const newTask = {
      ...taskData,
      id: nextTaskId++,
      createdBy: userId,
      status: taskData.status || "pending",
      createdAt: new Date(),
      updatedAt: new Date()
    };

    tasks.push(newTask);
    return newTask.id;
  }

  // Get all tasks with optional filtering
  static async getTasks(filters?: {
    dateFrom?: string;
    dateTo?: string;
    product?: string;
    issueType?: string;
    status?: string;
  }): Promise<Task[]> {
    let filteredTasks = [...tasks];

    if (filters?.dateFrom) {
      filteredTasks = filteredTasks.filter(task =>
        task.taskDate && task.taskDate >= filters.dateFrom!
      );
    }

    if (filters?.dateTo) {
      filteredTasks = filteredTasks.filter(task =>
        task.taskDate && task.taskDate <= filters.dateTo!
      );
    }

    if (filters?.product && filters.product !== "all") {
      filteredTasks = filteredTasks.filter(task => task.product === filters.product);
    }

    if (filters?.issueType && filters.issueType !== "all") {
      filteredTasks = filteredTasks.filter(task => task.issueType === filters.issueType);
    }

    if (filters?.status && filters.status !== "all") {
      filteredTasks = filteredTasks.filter(task => task.status === filters.status);
    }

    return filteredTasks.map(task => ({ ...task }));
  }

  // Get task by ID
  static async getTaskById(taskId: number): Promise<Task | null> {
    const task = tasks.find(t => t.id === taskId);
    return task ? { ...task } : null;
  }

  // Update task
  static async updateTask(taskId: number, taskData: Partial<Task>): Promise<void> {
    const taskIndex = tasks.findIndex(t => t.id === taskId);
    if (taskIndex !== -1) {
      tasks[taskIndex] = {
        ...tasks[taskIndex],
        ...taskData,
        updatedAt: new Date()
      };
    }
  }

  // Delete task
  static async deleteTask(taskId: number): Promise<void> {
    const taskIndex = tasks.findIndex(t => t.id === taskId);
    if (taskIndex !== -1) {
      tasks.splice(taskIndex, 1);
    }
  }

  // Initialize with some sample tasks
  static initializeDefaultTasks() {
    if (tasks.length === 0) {
      const today = new Date().toISOString().split('T')[0];

      tasks.push({
        id: nextTaskId++,
        title: "Setup Project",
        description: "Initialize the project structure and dependencies",
        product: "Internal",
        issueType: "Enhancement",
        status: "completed",
        priority: "high",
        developer: "admin@example.com",
        taskDate: today,
        timeInfo: "2h",
        createdBy: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      });

      tasks.push({
        id: nextTaskId++,
        title: "Database Configuration",
        description: "Configure Oracle database connection",
        product: "Core System",
        issueType: "Bug",
        status: "in-progress",
        priority: "medium",
        developer: "admin@example.com",
        taskDate: today,
        timeInfo: "4h",
        createdBy: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }
  }
}
