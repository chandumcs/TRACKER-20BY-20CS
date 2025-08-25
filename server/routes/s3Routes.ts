import { Router } from "express";
import { uploadToS3, downloadFromS3 } from "../services/s3Service";

const router = Router();

// Upload test route
router.post("/upload", async (req, res) => {
  try {
    const { filename, content } = req.body; // JSON body
    const location = await uploadToS3(filename, content);
    res.json({ message: "Uploaded", url: location });
  } catch (err) {
    res.status(500).json({ error: "Upload failed" });
  }
});

// Download test route
router.get("/download/:filename", async (req, res) => {
  try {
    const data = await downloadFromS3(req.params.filename);
    res.json({ content: data });
  } catch (err) {
    res.status(500).json({ error: "Download failed" });
  }
});

export default router;
