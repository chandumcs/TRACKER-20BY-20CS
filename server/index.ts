import "dotenv/config";
import express from "express";
import cors from "cors";
import {
  initializeOracleClient,
  createPool,
  testConnection,
} from "./database/connection.js";
import { createTables } from "./database/schema.js";
import {
  registerUser,
  loginUser,
  logoutUser,
  getSignedInUsers,
  getUserByEmail,
} from "./routes/users.js";
import {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
  getTaskById,
} from "./routes/tasks.js";
import { UserService } from "./services/userService.js";
import { TaskService } from "./services/taskService.js";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Initialize database on server start (optional)
  initializeDatabase().catch((error) => {
    console.warn(
      "Database initialization failed, continuing without database:",
      error.message,
    );
  });

  // Health check
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  // Database health check
  app.get("/api/health", async (_req, res) => {
    try {
      const dbConnected = await testConnection();
      res.json({
        status: "ok",
        database: dbConnected ? "connected" : "disconnected",
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      res.json({
        status: "ok",
        database: "unavailable",
        error: (error as Error).message,
        timestamp: new Date().toISOString(),
      });
    }
  });

  // User routes
  app.post("/api/register", registerUser);
  app.post("/api/login", loginUser);
  app.post("/api/logout", logoutUser);
  app.get("/api/users/signed-in", getSignedInUsers);
  app.get("/api/users/:email", getUserByEmail);

  // Task routes
  app.post("/api/tasks", createTask);
  app.get("/api/tasks", getTasks);
  app.get("/api/tasks/:id", getTaskById);
  app.put("/api/tasks/:id", updateTask);
  app.delete("/api/tasks/:id", deleteTask);

  return app;
}

// Initialize database connection and schema
async function initializeDatabase() {
  try {
    console.log("🔌 Initializing Oracle database...");

    // Initialize Oracle client
    await initializeOracleClient();

    // Create connection pool
    await createPool();

    // Test connection
    const connected = await testConnection();
    if (!connected) {
      throw new Error("Database connection test failed");
    }

    // Create tables if they don't exist
    await createTables();

    console.log("✅ Database initialization completed successfully!");
  } catch (error) {
    console.error("❌ Database initialization failed:", error);
    console.error(
      "📋 Please check your Oracle database credentials and connectivity",
    );
    // Don't exit process, let the app run without database
  } finally {
    // Initialize service availability checks regardless of database status
    await UserService.checkDatabaseAvailability();
    await TaskService.checkDatabaseAvailability();
  }
}
