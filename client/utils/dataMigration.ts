/**
 * Data Migration Utility
 * Migrates existing localStorage data to Oracle database
 */

interface LocalStorageUser {
  id: number;
  name: string;
  userName: string;
  email: string;
  password: string;
  department: string;
  lastLogin: string;
  lastLogout: string;
  status: string;
  totalLeaves: number;
  usedLeaves: number;
  weekOffs: number;
  usedWeekOffs: number;
  employeeId: string;
  role: string;
  registeredAt: string;
}

interface LocalStorageTask {
  id: number;
  title: string;
  product: string;
  issueType: string;
  description?: string;
  developer?: string;
  uatPerson?: string;
  productionPerson?: string;
  priority?: string;
  reportedDate?: string;
  fixedDate?: string;
  closedDate?: string;
  date: string;
  time: string;
  status: string;
  userEmail: string;
}

export class DataMigration {
  private static migrationLog: string[] = [];

  /**
   * Migrate all localStorage data to Oracle database
   */
  static async migrateAllData(): Promise<{ success: boolean; log: string[] }> {
    this.migrationLog = [];
    this.log("🚀 Starting data migration from localStorage to Oracle database...");

    try {
      // Check database connectivity
      const healthCheck = await this.checkDatabaseHealth();
      if (!healthCheck) {
        throw new Error("Database not available");
      }

      // Migrate users
      await this.migrateUsers();

      // Migrate tasks
      await this.migrateTasks();

      this.log("✅ Data migration completed successfully!");
      return { success: true, log: [...this.migrationLog] };
    } catch (error) {
      this.log(`❌ Migration failed: ${error.message}`);
      return { success: false, log: [...this.migrationLog] };
    }
  }

  /**
   * Check if Oracle database is available
   */
  private static async checkDatabaseHealth(): Promise<boolean> {
    try {
      const response = await fetch("/api/health");
      const result = await response.json();
      
      if (result.database === "connected") {
        this.log("✅ Oracle database connection verified");
        return true;
      } else {
        this.log(`⚠️ Database status: ${result.database}`);
        return false;
      }
    } catch (error) {
      this.log(`❌ Database health check failed: ${error.message}`);
      return false;
    }
  }

  /**
   * Migrate users from localStorage to Oracle database
   */
  private static async migrateUsers(): Promise<void> {
    this.log("👥 Starting user migration...");
    
    const usersJson = localStorage.getItem("registeredUsers");
    if (!usersJson) {
      this.log("ℹ️ No users found in localStorage");
      return;
    }

    const users: LocalStorageUser[] = JSON.parse(usersJson);
    this.log(`📊 Found ${users.length} users in localStorage`);

    let successCount = 0;
    let errorCount = 0;

    for (const user of users) {
      try {
        // Check if user already exists in database
        const existingUserResponse = await fetch(`/api/users/${user.email}`);
        const existingUserResult = await existingUserResponse.json();

        if (existingUserResult.success && existingUserResult.user) {
          this.log(`⏭️ User ${user.email} already exists in database, skipping...`);
          continue;
        }

        // Register user in database
        const registrationData = {
          firstName: user.name.split(" ")[0] || user.name,
          lastName: user.name.split(" ").slice(1).join(" ") || "",
          userName: user.userName,
          employeeId: user.employeeId,
          email: user.email,
          role: user.role,
          password: user.password
        };

        const response = await fetch("/api/users/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(registrationData),
        });

        const result = await response.json();

        if (result.success) {
          this.log(`✅ Successfully migrated user: ${user.email}`);
          successCount++;
        } else {
          this.log(`❌ Failed to migrate user ${user.email}: ${result.message}`);
          errorCount++;
        }
      } catch (error) {
        this.log(`❌ Error migrating user ${user.email}: ${error.message}`);
        errorCount++;
      }
    }

    this.log(`📈 User migration summary: ${successCount} successful, ${errorCount} failed`);
  }

  /**
   * Migrate tasks from localStorage to Oracle database
   */
  private static async migrateTasks(): Promise<void> {
    this.log("📋 Starting task migration...");
    
    const tasksJson = localStorage.getItem("dailyTasks");
    if (!tasksJson) {
      this.log("ℹ️ No tasks found in localStorage");
      return;
    }

    const tasks: LocalStorageTask[] = JSON.parse(tasksJson);
    this.log(`📊 Found ${tasks.length} tasks in localStorage`);

    let successCount = 0;
    let errorCount = 0;

    for (const task of tasks) {
      try {
        const taskData = {
          title: task.title,
          product: task.product,
          issueType: task.issueType,
          description: task.description || "",
          developer: task.developer || "",
          uatPerson: task.uatPerson || "",
          productionPerson: task.productionPerson || "",
          priority: task.priority || "",
          reportedDate: task.reportedDate || "",
          fixedDate: task.fixedDate || "",
          closedDate: task.closedDate || "",
          taskDate: task.date,
          timeInfo: task.time,
          status: task.status,
          userEmail: task.userEmail
        };

        const response = await fetch("/api/tasks", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(taskData),
        });

        const result = await response.json();

        if (result.success) {
          this.log(`✅ Successfully migrated task: ${task.title}`);
          successCount++;
        } else {
          this.log(`❌ Failed to migrate task ${task.title}: ${result.message}`);
          errorCount++;
        }
      } catch (error) {
        this.log(`❌ Error migrating task ${task.title}: ${error.message}`);
        errorCount++;
      }
    }

    this.log(`📈 Task migration summary: ${successCount} successful, ${errorCount} failed`);
  }

  /**
   * Backup localStorage data before migration
   */
  static backupLocalStorageData(): string {
    const backup = {
      users: localStorage.getItem("registeredUsers"),
      tasks: localStorage.getItem("dailyTasks"),
      signedInUsers: localStorage.getItem("signedInUsers"),
      leaveRequests: localStorage.getItem("leaveRequests"),
      currentUser: localStorage.getItem("currentUser"),
      userEmail: localStorage.getItem("userEmail"),
      timestamp: new Date().toISOString()
    };

    const backupString = JSON.stringify(backup, null, 2);
    this.log("💾 LocalStorage data backup created");
    return backupString;
  }

  /**
   * Restore localStorage data from backup
   */
  static restoreLocalStorageData(backupString: string): boolean {
    try {
      const backup = JSON.parse(backupString);
      
      Object.keys(backup).forEach(key => {
        if (key !== "timestamp" && backup[key]) {
          localStorage.setItem(key, backup[key]);
        }
      });

      this.log("🔄 LocalStorage data restored from backup");
      return true;
    } catch (error) {
      this.log(`❌ Failed to restore backup: ${error.message}`);
      return false;
    }
  }

  /**
   * Clear localStorage data after successful migration
   */
  static clearLocalStorageData(): void {
    const keysToRemove = [
      "registeredUsers",
      "dailyTasks",
      "signedInUsers",
      "leaveRequests"
    ];

    keysToRemove.forEach(key => {
      localStorage.removeItem(key);
    });

    this.log("🗑️ LocalStorage migration data cleared");
  }

  /**
   * Get migration status
   */
  static async getMigrationStatus(): Promise<{
    localStorageHasData: boolean;
    databaseAvailable: boolean;
    recommendMigration: boolean;
  }> {
    const localStorageHasData = !!(
      localStorage.getItem("registeredUsers") || 
      localStorage.getItem("dailyTasks")
    );

    const databaseAvailable = await this.checkDatabaseHealth();

    return {
      localStorageHasData,
      databaseAvailable,
      recommendMigration: localStorageHasData && databaseAvailable
    };
  }

  private static log(message: string): void {
    const timestamp = new Date().toLocaleTimeString();
    const logMessage = `[${timestamp}] ${message}`;
    this.migrationLog.push(logMessage);
    console.log(logMessage);
  }
}
