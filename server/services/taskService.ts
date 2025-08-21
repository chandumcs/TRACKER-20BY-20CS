import { getConnection } from "../database/connection.js";
import { MockTaskService } from "./mockTaskService.js";

// Flag to track if database is available
let isDatabaseAvailable = true;

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

export class TaskService {
  // Create new task
  static async createTask(taskData: Task, userId: number): Promise<number> {
    let connection;
    try {
      connection = await getConnection();

      const result = await connection.execute(
        `INSERT INTO daily_tasks (
          title, description, product, issue_type, status, priority,
          developer, uat_person, production_person, reported_date, fixed_date,
          closed_date, task_date, time_info, created_by
        ) VALUES (
          :title, :description, :product, :issueType, :status, :priority,
          :developer, :uatPerson, :productionPerson, 
          TO_DATE(:reportedDate, 'YYYY-MM-DD'), TO_DATE(:fixedDate, 'YYYY-MM-DD'),
          TO_DATE(:closedDate, 'YYYY-MM-DD'), TO_DATE(:taskDate, 'YYYY-MM-DD'),
          :timeInfo, :createdBy
        ) RETURNING id INTO :id`,
        {
          title: taskData.title,
          description: taskData.description,
          product: taskData.product,
          issueType: taskData.issueType,
          status: taskData.status || "pending",
          priority: taskData.priority,
          developer: taskData.developer,
          uatPerson: taskData.uatPerson,
          productionPerson: taskData.productionPerson,
          reportedDate: taskData.reportedDate || null,
          fixedDate: taskData.fixedDate || null,
          closedDate: taskData.closedDate || null,
          taskDate: taskData.taskDate,
          timeInfo: taskData.timeInfo,
          createdBy: userId,
          id: { type: "NUMBER", dir: "OUT" },
        },
      );

      await connection.commit();
      return (result.outBinds as any).id[0];
    } catch (err: any) {
      console.error("Error creating task:", err);
      throw err;
    } finally {
      if (connection) {
        try {
          await connection.close();
        } catch (err) {
          console.error("Error closing connection:", err);
        }
      }
    }
  }

  // Get all tasks with optional filtering
  static async getTasks(filters?: {
    dateFrom?: string;
    dateTo?: string;
    product?: string;
    issueType?: string;
    status?: string;
  }): Promise<Task[]> {
    let connection;
    try {
      connection = await getConnection();

      let whereClause = " WHERE 1=1";
      const binds: any = {};

      if (filters?.dateFrom) {
        whereClause += " AND task_date >= TO_DATE(:dateFrom, 'YYYY-MM-DD')";
        binds.dateFrom = filters.dateFrom;
      }

      if (filters?.dateTo) {
        whereClause += " AND task_date <= TO_DATE(:dateTo, 'YYYY-MM-DD')";
        binds.dateTo = filters.dateTo;
      }

      if (filters?.product && filters.product !== "all") {
        whereClause += " AND product = :product";
        binds.product = filters.product;
      }

      if (filters?.issueType && filters.issueType !== "all") {
        whereClause += " AND issue_type = :issueType";
        binds.issueType = filters.issueType;
      }

      if (filters?.status && filters.status !== "all") {
        whereClause += " AND status = :status";
        binds.status = filters.status;
      }

      const result = await connection.execute(
        `SELECT id, title, description, product, issue_type, status, priority,
                developer, uat_person, production_person,
                TO_CHAR(reported_date, 'YYYY-MM-DD') as reported_date,
                TO_CHAR(fixed_date, 'YYYY-MM-DD') as fixed_date,
                TO_CHAR(closed_date, 'YYYY-MM-DD') as closed_date,
                TO_CHAR(task_date, 'YYYY-MM-DD') as task_date,
                time_info, created_by,
                TO_CHAR(created_at, 'YYYY-MM-DD HH24:MI:SS') as created_at,
                TO_CHAR(updated_at, 'YYYY-MM-DD HH24:MI:SS') as updated_at
         FROM daily_tasks${whereClause}
         ORDER BY created_at DESC`,
        binds,
      );

      if (result.rows) {
        return result.rows.map((row: any[]) => ({
          id: row[0],
          title: row[1],
          description: row[2],
          product: row[3],
          issueType: row[4],
          status: row[5],
          priority: row[6],
          developer: row[7],
          uatPerson: row[8],
          productionPerson: row[9],
          reportedDate: row[10],
          fixedDate: row[11],
          closedDate: row[12],
          taskDate: row[13],
          timeInfo: row[14],
          createdBy: row[15],
          createdAt: new Date(row[16]),
          updatedAt: new Date(row[17]),
        }));
      }

      return [];
    } catch (err: any) {
      console.error("Error getting tasks:", err);
      throw err;
    } finally {
      if (connection) {
        try {
          await connection.close();
        } catch (err) {
          console.error("Error closing connection:", err);
        }
      }
    }
  }

  // Update task
  static async updateTask(
    taskId: number,
    taskData: Partial<Task>,
  ): Promise<void> {
    let connection;
    try {
      connection = await getConnection();

      const setClauses = [];
      const binds: any = { id: taskId };

      if (taskData.title !== undefined) {
        setClauses.push("title = :title");
        binds.title = taskData.title;
      }

      if (taskData.description !== undefined) {
        setClauses.push("description = :description");
        binds.description = taskData.description;
      }

      if (taskData.product !== undefined) {
        setClauses.push("product = :product");
        binds.product = taskData.product;
      }

      if (taskData.issueType !== undefined) {
        setClauses.push("issue_type = :issueType");
        binds.issueType = taskData.issueType;
      }

      if (taskData.status !== undefined) {
        setClauses.push("status = :status");
        binds.status = taskData.status;
      }

      if (taskData.priority !== undefined) {
        setClauses.push("priority = :priority");
        binds.priority = taskData.priority;
      }

      if (taskData.developer !== undefined) {
        setClauses.push("developer = :developer");
        binds.developer = taskData.developer;
      }

      if (taskData.uatPerson !== undefined) {
        setClauses.push("uat_person = :uatPerson");
        binds.uatPerson = taskData.uatPerson;
      }

      if (taskData.productionPerson !== undefined) {
        setClauses.push("production_person = :productionPerson");
        binds.productionPerson = taskData.productionPerson;
      }

      if (taskData.reportedDate !== undefined) {
        setClauses.push("reported_date = TO_DATE(:reportedDate, 'YYYY-MM-DD')");
        binds.reportedDate = taskData.reportedDate;
      }

      if (taskData.fixedDate !== undefined) {
        setClauses.push("fixed_date = TO_DATE(:fixedDate, 'YYYY-MM-DD')");
        binds.fixedDate = taskData.fixedDate;
      }

      if (taskData.closedDate !== undefined) {
        setClauses.push("closed_date = TO_DATE(:closedDate, 'YYYY-MM-DD')");
        binds.closedDate = taskData.closedDate;
      }

      if (taskData.timeInfo !== undefined) {
        setClauses.push("time_info = :timeInfo");
        binds.timeInfo = taskData.timeInfo;
      }

      setClauses.push("updated_at = CURRENT_TIMESTAMP");

      if (setClauses.length > 1) {
        // More than just updated_at
        await connection.execute(
          `UPDATE daily_tasks SET ${setClauses.join(", ")} WHERE id = :id`,
          binds,
        );

        await connection.commit();
      }
    } catch (err: any) {
      console.error("Error updating task:", err);
      throw err;
    } finally {
      if (connection) {
        try {
          await connection.close();
        } catch (err) {
          console.error("Error closing connection:", err);
        }
      }
    }
  }

  // Delete task
  static async deleteTask(taskId: number): Promise<void> {
    let connection;
    try {
      connection = await getConnection();

      await connection.execute("DELETE FROM daily_tasks WHERE id = :id", {
        id: taskId,
      });

      await connection.commit();
    } catch (err: any) {
      console.error("Error deleting task:", err);
      throw err;
    } finally {
      if (connection) {
        try {
          await connection.close();
        } catch (err) {
          console.error("Error closing connection:", err);
        }
      }
    }
  }

  // Get task by ID
  static async getTaskById(taskId: number): Promise<Task | null> {
    let connection;
    try {
      connection = await getConnection();

      const result = await connection.execute(
        `SELECT id, title, description, product, issue_type, status, priority,
                developer, uat_person, production_person,
                TO_CHAR(reported_date, 'YYYY-MM-DD') as reported_date,
                TO_CHAR(fixed_date, 'YYYY-MM-DD') as fixed_date,
                TO_CHAR(closed_date, 'YYYY-MM-DD') as closed_date,
                TO_CHAR(task_date, 'YYYY-MM-DD') as task_date,
                time_info, created_by,
                TO_CHAR(created_at, 'YYYY-MM-DD HH24:MI:SS') as created_at,
                TO_CHAR(updated_at, 'YYYY-MM-DD HH24:MI:SS') as updated_at
         FROM daily_tasks 
         WHERE id = :id`,
        { id: taskId },
      );

      if (result.rows && result.rows.length > 0) {
        const row = result.rows[0] as any[];
        return {
          id: row[0],
          title: row[1],
          description: row[2],
          product: row[3],
          issueType: row[4],
          status: row[5],
          priority: row[6],
          developer: row[7],
          uatPerson: row[8],
          productionPerson: row[9],
          reportedDate: row[10],
          fixedDate: row[11],
          closedDate: row[12],
          taskDate: row[13],
          timeInfo: row[14],
          createdBy: row[15],
          createdAt: new Date(row[16]),
          updatedAt: new Date(row[17]),
        };
      }

      return null;
    } catch (err: any) {
      console.error("Error getting task by ID:", err);
      throw err;
    } finally {
      if (connection) {
        try {
          await connection.close();
        } catch (err) {
          console.error("Error closing connection:", err);
        }
      }
    }
  }
}
