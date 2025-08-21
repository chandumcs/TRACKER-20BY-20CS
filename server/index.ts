import "dotenv/config";
import express from "express";
import cors from "cors";
import { uploadToS3, downloadFromS3 } from "./services/s3Service";

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

  // ✅ Upload file to S3
  app.post("/api/s3/upload", async (req, res) => {
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

  return app;
}
