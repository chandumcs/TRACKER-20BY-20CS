// Utility to migrate data from localStorage to Oracle database

const API_BASE = '/api';

export class DataMigration {
  
  // Migrate users from localStorage to database
  static async migrateUsers() {
    try {
      // Get registered users from localStorage
      const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
      
      if (registeredUsers.length === 0) {
        console.log('No users to migrate');
        return { success: true, message: 'No users to migrate' };
      }

      let migratedCount = 0;
      const errors: string[] = [];

      for (const user of registeredUsers) {
        try {
          // Split name into firstName and lastName
          const nameParts = user.name.split(' ');
          const firstName = nameParts[0] || '';
          const lastName = nameParts.slice(1).join(' ') || '';

          const registrationData = {
            firstName,
            lastName,
            userName: user.userName || user.name.toLowerCase().replace(' ', ''),
            employeeId: user.employeeId || '',
            email: user.email,
            role: user.role,
            password: user.password
          };

          const response = await fetch(`${API_BASE}/users/register`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(registrationData)
          });

          if (response.ok) {
            migratedCount++;
            console.log(`✅ Migrated user: ${user.email}`);
          } else {
            const error = await response.text();
            errors.push(`Failed to migrate ${user.email}: ${error}`);
          }

        } catch (error) {
          errors.push(`Error migrating ${user.email}: ${(error as Error).message}`);
        }
      }

      return {
        success: true,
        migratedCount,
        errors,
        message: `Migrated ${migratedCount} users successfully`
      };

    } catch (error) {
      console.error('User migration error:', error);
      return {
        success: false,
        message: `Migration failed: ${(error as Error).message}`
      };
    }
  }

  // Migrate tasks from localStorage to database
  static async migrateTasks() {
    try {
      // Get tasks from localStorage
      const dailyTasks = JSON.parse(localStorage.getItem('dailyTasks') || '[]');
      
      if (dailyTasks.length === 0) {
        console.log('No tasks to migrate');
        return { success: true, message: 'No tasks to migrate' };
      }

      let migratedCount = 0;
      const errors: string[] = [];

      for (const task of dailyTasks) {
        try {
          const taskData = {
            title: task.title,
            description: task.description || '',
            product: task.product,
            issueType: task.issueType,
            priority: task.priority || 'medium',
            developer: task.developer || '',
            uatPerson: task.uatPerson || '',
            productionPerson: task.productionPerson || '',
            reportedDate: task.reportedDate || null,
            fixedDate: task.fixedDate || null,
            closedDate: task.closedDate || null,
            userEmail: 'system@olivecrypto.com' // System migration
          };

          const response = await fetch(`${API_BASE}/tasks`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(taskData)
          });

          if (response.ok) {
            migratedCount++;
            console.log(`✅ Migrated task: ${task.title}`);
          } else {
            const error = await response.text();
            errors.push(`Failed to migrate task "${task.title}": ${error}`);
          }

        } catch (error) {
          errors.push(`Error migrating task "${task.title}": ${(error as Error).message}`);
        }
      }

      return {
        success: true,
        migratedCount,
        errors,
        message: `Migrated ${migratedCount} tasks successfully`
      };

    } catch (error) {
      console.error('Task migration error:', error);
      return {
        success: false,
        message: `Migration failed: ${(error as Error).message}`
      };
    }
  }

  // Run complete migration
  static async migrateAllData() {
    console.log('🔄 Starting data migration from localStorage to Oracle database...');
    
    const results = {
      users: await this.migrateUsers(),
      tasks: await this.migrateTasks(),
    };

    console.log('📊 Migration Results:', results);
    
    return results;
  }

  // Clear localStorage after successful migration
  static clearLocalStorageData() {
    const keysToRemove = [
      'registeredUsers',
      'signedInUsers',
      'dailyTasks',
      'handoverHistory',
      'leaveRequests',
      'pagePermissions'
    ];

    keysToRemove.forEach(key => {
      localStorage.removeItem(key);
      console.log(`🗑️ Cleared localStorage key: ${key}`);
    });

    console.log('✅ localStorage data cleared');
  }
}

// Utility functions for API calls
export class DatabaseAPI {
  
  static async getUsers() {
    try {
      const response = await fetch(`${API_BASE}/users/signed-in`);
      if (response.ok) {
        return await response.json();
      }
      throw new Error('Failed to fetch users');
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  }

  static async getTasks(filters?: any) {
    try {
      const queryParams = new URLSearchParams();
      if (filters) {
        Object.keys(filters).forEach(key => {
          if (filters[key] && filters[key] !== 'all') {
            queryParams.append(key, filters[key]);
          }
        });
      }
      
      const url = `${API_BASE}/tasks${queryParams.toString() ? '?' + queryParams.toString() : ''}`;
      const response = await fetch(url);
      
      if (response.ok) {
        return await response.json();
      }
      throw new Error('Failed to fetch tasks');
    } catch (error) {
      console.error('Error fetching tasks:', error);
      throw error;
    }
  }

  static async createTask(taskData: any) {
    try {
      const response = await fetch(`${API_BASE}/tasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(taskData)
      });
      
      if (response.ok) {
        return await response.json();
      }
      throw new Error('Failed to create task');
    } catch (error) {
      console.error('Error creating task:', error);
      throw error;
    }
  }

  static async loginUser(email: string, password: string) {
    try {
      const response = await fetch(`${API_BASE}/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password })
      });
      
      if (response.ok) {
        return await response.json();
      }
      const error = await response.json();
      throw new Error(error.message || 'Login failed');
    } catch (error) {
      console.error('Error logging in:', error);
      throw error;
    }
  }

  static async registerUser(userData: any) {
    try {
      const response = await fetch(`${API_BASE}/users/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData)
      });
      
      if (response.ok) {
        return await response.json();
      }
      const error = await response.json();
      throw new Error(error.message || 'Registration failed');
    } catch (error) {
      console.error('Error registering user:', error);
      throw error;
    }
  }
}
