import "dotenv/config";
import express from "express";
import cors from "cors";
<<<<<<< HEAD
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
=======
import { uploadToS3, downloadFromS3 } from "./services/s3Service";
>>>>>>> refs/remotes/origin/main

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

<<<<<<< HEAD
  // Initialize database on server start (optional)
  initializeDatabase().catch((error) => {
    console.warn(
      "Database initialization failed, continuing without database:",
      error.message,
    );
  });

=======
>>>>>>> refs/remotes/origin/main
  // Health check
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

<<<<<<< HEAD
  // Database health check
  app.get("/api/health", async (_req, res) => {
=======
  // Basic health check
  app.get("/api/health", (_req, res) => {
    res.json({
      status: "ok",
      database: "localStorage",
      timestamp: new Date().toISOString(),
    });
  });

  // ✅ Upload file to S3
  app.post("/api/s3/upload", async (req, res) => {
>>>>>>> refs/remotes/origin/main
    try {
      const { filename, content } = req.body;
      if (!filename || !content) {
        return res.status(400).json({ error: "filename and content are required" });
      }
      const url = await uploadToS3(filename, content);
      res.json({ message: "Uploaded", url });
    } catch (err) {
      res.status(500).json({ error: "Upload failed", details: err });
    }
  });

  // ✅ Download file from S3
  app.get("/api/s3/download/:filename", async (req, res) => {
    try {
      const data = await downloadFromS3(req.params.filename);
      res.json({ content: data });
    } catch (err) {
      res.status(500).json({ error: "Download failed", details: err });
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
<<<<<<< HEAD

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
=======
>>>>>>> refs/remotes/origin/main
