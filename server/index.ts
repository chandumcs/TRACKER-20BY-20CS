import "dotenv/config";
import express from "express";
import cors from "cors";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Health check
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  // Basic health check
  app.get("/api/health", (_req, res) => {
    res.json({
      status: "ok",
      database: "localStorage",
      timestamp: new Date().toISOString(),
    });
  });

  return app;
}
