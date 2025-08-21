import { User, SignedInUser } from "./userService.js";

// In-memory storage for users when database is not available
let users: (User & { id: number })[] = [];
let nextUserId = 1;

export class MockUserService {
  // Register new user
  static async registerUser(userData: User): Promise<number> {
    // Check if user already exists
    const existingUser = users.find(u => u.email === userData.email);
    if (existingUser) {
      throw new Error("User already exists with this email");
    }

    const newUser = {
      ...userData,
      id: nextUserId++,
      registeredAt: new Date(),
      lastLogin: new Date(),
      status: "Online"
    };

    users.push(newUser);
    return newUser.id;
  }

  // Authenticate user
  static async authenticateUser(email: string, password: string): Promise<User | null> {
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      // Update last login
      user.lastLogin = new Date();
      user.status = "Online";
      return { ...user, password: "" }; // Don't return password
    }
    return null;
  }

  // Update user login status
  static async updateUserLoginStatus(email: string, status: "Online" | "Offline"): Promise<void> {
    const user = users.find(u => u.email === email);
    if (user) {
      user.status = status;
      if (status === "Online") {
        user.lastLogin = new Date();
      } else {
        user.lastLogout = new Date();
      }
    }
  }

  // Get all signed-in users
  static async getSignedInUsers(): Promise<SignedInUser[]> {
    return users
      .filter(user => user.lastLogin)
      .map(user => ({
        id: user.id!,
        name: user.name,
        email: user.email,
        department: user.department || "Unknown",
        lastLogin: user.lastLogin?.toISOString() || "Never",
        lastLogout: user.lastLogout?.toISOString() || "Never",
        status: user.status || "Offline",
        totalLeaves: user.totalLeaves || 20,
        usedLeaves: user.usedLeaves || 0,
        weekOffs: user.weekOffs || 52,
        usedWeekOffs: user.usedWeekOffs || 0,
        employeeId: user.employeeId || "",
        role: user.role
      }));
  }

  // Get user by email
  static async getUserByEmail(email: string): Promise<User | null> {
    const user = users.find(u => u.email === email);
    if (user) {
      return { ...user, password: "" }; // Don't return password
    }
    return null;
  }

  // Initialize with a default admin user for testing
  static initializeDefaultUsers() {
    if (users.length === 0) {
      users.push({
        id: nextUserId++,
        name: "Admin User",
        username: "admin",
        email: "admin@example.com",
        password: "admin123",
        employeeId: "EMP001",
        role: "admin",
        department: "Management",
        totalLeaves: 20,
        usedLeaves: 0,
        weekOffs: 52,
        usedWeekOffs: 0,
        status: "Offline",
        registeredAt: new Date()
      });
    }
  }
}
