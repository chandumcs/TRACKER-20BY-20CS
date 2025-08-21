import { getConnection } from '../database/connection.js';

export interface User {
  id?: number;
  name: string;
  username?: string;
  email: string;
  password: string;
  employeeId?: string;
  role: string;
  department?: string;
  totalLeaves?: number;
  usedLeaves?: number;
  weekOffs?: number;
  usedWeekOffs?: number;
  status?: string;
  lastLogin?: Date;
  lastLogout?: Date;
  registeredAt?: Date;
}

export interface SignedInUser {
  id: number;
  name: string;
  email: string;
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
}

export class UserService {
  
  // Register new user
  static async registerUser(userData: User): Promise<number> {
    let connection;
    try {
      connection = await getConnection();
      
      const result = await connection.execute(
        `INSERT INTO users (
          name, username, email, password, employee_id, role, department,
          total_leaves, used_leaves, week_offs, used_week_offs, status,
          registered_at
        ) VALUES (
          :name, :username, :email, :password, :employeeId, :role, :department,
          :totalLeaves, :usedLeaves, :weekOffs, :usedWeekOffs, :status,
          CURRENT_TIMESTAMP
        ) RETURNING id INTO :id`,
        {
          name: userData.name,
          username: userData.username,
          email: userData.email,
          password: userData.password,
          employeeId: userData.employeeId,
          role: userData.role,
          department: userData.department,
          totalLeaves: userData.totalLeaves || 20,
          usedLeaves: userData.usedLeaves || 0,
          weekOffs: userData.weekOffs || 52,
          usedWeekOffs: userData.usedWeekOffs || 0,
          status: 'Online',
          id: { type: 'NUMBER', dir: 'OUT' }
        }
      );
      
      await connection.commit();
      return (result.outBinds as any).id[0];
      
    } catch (err: any) {
      console.error('Error registering user:', err);
      throw err;
    } finally {
      if (connection) {
        try {
          await connection.close();
        } catch (err) {
          console.error('Error closing connection:', err);
        }
      }
    }
  }

  // Authenticate user
  static async authenticateUser(email: string, password: string): Promise<User | null> {
    let connection;
    try {
      connection = await getConnection();
      
      const result = await connection.execute(
        `SELECT id, name, username, email, employee_id, role, department,
                total_leaves, used_leaves, week_offs, used_week_offs, status,
                last_login, last_logout, registered_at
         FROM users 
         WHERE email = :email AND password = :password`,
        { email, password }
      );
      
      if (result.rows && result.rows.length > 0) {
        const row = result.rows[0] as any[];
        return {
          id: row[0],
          name: row[1],
          username: row[2],
          email: row[3],
          employeeId: row[4],
          role: row[5],
          department: row[6],
          totalLeaves: row[7],
          usedLeaves: row[8],
          weekOffs: row[9],
          usedWeekOffs: row[10],
          status: row[11],
          lastLogin: row[12],
          lastLogout: row[13],
          registeredAt: row[14],
          password: '' // Don't return password
        };
      }
      
      return null;
      
    } catch (err: any) {
      console.error('Error authenticating user:', err);
      throw err;
    } finally {
      if (connection) {
        try {
          await connection.close();
        } catch (err) {
          console.error('Error closing connection:', err);
        }
      }
    }
  }

  // Update user login status
  static async updateUserLoginStatus(email: string, status: 'Online' | 'Offline'): Promise<void> {
    let connection;
    try {
      connection = await getConnection();
      
      const timeField = status === 'Online' ? 'last_login' : 'last_logout';
      
      await connection.execute(
        `UPDATE users 
         SET status = :status, ${timeField} = CURRENT_TIMESTAMP, updated_at = CURRENT_TIMESTAMP
         WHERE email = :email`,
        { status, email }
      );
      
      await connection.commit();
      
    } catch (err: any) {
      console.error('Error updating user login status:', err);
      throw err;
    } finally {
      if (connection) {
        try {
          await connection.close();
        } catch (err) {
          console.error('Error closing connection:', err);
        }
      }
    }
  }

  // Get all signed-in users (for All Users Data page)
  static async getSignedInUsers(): Promise<SignedInUser[]> {
    let connection;
    try {
      connection = await getConnection();
      
      const result = await connection.execute(
        `SELECT id, name, email, department, 
                TO_CHAR(last_login, 'YYYY-MM-DD HH24:MI:SS') as last_login,
                TO_CHAR(last_logout, 'YYYY-MM-DD HH24:MI:SS') as last_logout,
                status, total_leaves, used_leaves, week_offs, used_week_offs,
                employee_id, role
         FROM users 
         WHERE last_login IS NOT NULL
         ORDER BY last_login DESC`
      );
      
      if (result.rows) {
        return result.rows.map((row: any[]) => ({
          id: row[0],
          name: row[1],
          email: row[2],
          department: row[3],
          lastLogin: row[4] || 'Never',
          lastLogout: row[5] || 'Never',
          status: row[6],
          totalLeaves: row[7],
          usedLeaves: row[8],
          weekOffs: row[9],
          usedWeekOffs: row[10],
          employeeId: row[11],
          role: row[12]
        }));
      }
      
      return [];
      
    } catch (err: any) {
      console.error('Error getting signed-in users:', err);
      throw err;
    } finally {
      if (connection) {
        try {
          await connection.close();
        } catch (err) {
          console.error('Error closing connection:', err);
        }
      }
    }
  }

  // Get user by email
  static async getUserByEmail(email: string): Promise<User | null> {
    let connection;
    try {
      connection = await getConnection();
      
      const result = await connection.execute(
        `SELECT id, name, username, email, employee_id, role, department,
                total_leaves, used_leaves, week_offs, used_week_offs, status,
                last_login, last_logout, registered_at
         FROM users 
         WHERE email = :email`,
        { email }
      );
      
      if (result.rows && result.rows.length > 0) {
        const row = result.rows[0] as any[];
        return {
          id: row[0],
          name: row[1],
          username: row[2],
          email: row[3],
          employeeId: row[4],
          role: row[5],
          department: row[6],
          totalLeaves: row[7],
          usedLeaves: row[8],
          weekOffs: row[9],
          usedWeekOffs: row[10],
          status: row[11],
          lastLogin: row[12],
          lastLogout: row[13],
          registeredAt: row[14],
          password: '' // Don't return password
        };
      }
      
      return null;
      
    } catch (err: any) {
      console.error('Error getting user by email:', err);
      throw err;
    } finally {
      if (connection) {
        try {
          await connection.close();
        } catch (err) {
          console.error('Error closing connection:', err);
        }
      }
    }
  }
}
