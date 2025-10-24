import express, { Request, Response } from "express";
import multer from "multer";
import { PDFParse } from "pdf-parse";

const upload = multer({ storage: multer.memoryStorage() });

const router = express.Router();

interface MulterRequest extends Request {
  file?: Express.Multer.File;
}

router.post(
  "/to-text",
  upload.single("pdf"),
  async (req: MulterRequest, res: Response) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }
      
      const parser = new PDFParse({ data: req.file.buffer });
      const data = await parser.getText();

      return res.json({
        text: data.text,
      });
    } catch (err) {
      console.error("PDF parsing error:", err);
      return res.status(500).json({ error: "Failed to parse PDF" });
    }
  }
);

export default router;
