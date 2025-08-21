import { Request, Response } from "express";
import { UserService } from "../services/userService.js";

// Register new user
export async function registerUser(req: Request, res: Response) {
  try {
    const { firstName, lastName, userName, employeeId, email, role, password } =
      req.body;

    if (!firstName || !lastName || !email || !password || !role) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    // Check if user already exists
    const existingUser = await UserService.getUserByEmail(email);
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User already exists with this email",
      });
    }

    // Map role to department
    const department =
      role === "admin"
        ? "Management"
        : role === "developer"
          ? "Development"
          : role === "production-support"
            ? "Production"
            : role === "uat-support"
              ? "Testing"
              : role === "manager"
                ? "Management"
                : "Unknown";

    const userData = {
      name: `${firstName} ${lastName}`,
      username: userName,
      email,
      password,
      employeeId,
      role,
      department,
      totalLeaves: 20,
      usedLeaves: 0,
      weekOffs: 52,
      usedWeekOffs: 0,
      status: "Online",
    };

    const userId = await UserService.registerUser(userData);

    // Update login status
    await UserService.updateUserLoginStatus(email, "Online");

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      userId,
    });
  } catch (error: any) {
    console.error("Registration error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
}

// Login user
export async function loginUser(req: Request, res: Response) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const user = await UserService.authenticateUser(email, password);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Update login status
    await UserService.updateUserLoginStatus(email, "Online");

    // Don't return password
    const { password: _, ...userWithoutPassword } = user;

    res.status(200).json({
      success: true,
      message: "Login successful",
      user: userWithoutPassword,
    });
  } catch (error: any) {
    console.error("Login error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
}

// Logout user
export async function logoutUser(req: Request, res: Response) {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    await UserService.updateUserLoginStatus(email, "Offline");

    res.status(200).json({
      success: true,
      message: "Logout successful",
    });
  } catch (error: any) {
    console.error("Logout error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
}

// Get all signed-in users
export async function getSignedInUsers(req: Request, res: Response) {
  try {
    const users = await UserService.getSignedInUsers();

    res.status(200).json({
      success: true,
      users,
    });
  } catch (error: any) {
    console.error("Get signed-in users error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
}

// Get user by email
export async function getUserByEmail(req: Request, res: Response) {
  try {
    const { email } = req.params;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    const user = await UserService.getUserByEmail(email);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Don't return password
    const { password: _, ...userWithoutPassword } = user;

    res.status(200).json({
      success: true,
      user: userWithoutPassword,
    });
  } catch (error: any) {
    console.error("Get user error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
}
