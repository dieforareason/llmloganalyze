import { Router, Request, Response } from "express";
import { callLLM } from "../services/llmService";

const router = Router();

// Test route to verify server is working
router.get("/test", (req: Request, res: Response) => {
    res.json({ message: "LLM service is working!", timestamp: new Date().toISOString() });
});

router.post("/analyze", async (req: Request, res: Response) => {
    // Check if req.body exists
    if (!req.body) {
        return res.status(400).json({ error: "Request body is missing. Make sure to send JSON with Content-Type: application/json" });
    }

    const { prompt } = req.body;

    if (!prompt) {
        return res.status(400).json({ error: "Prompt is required" });
    }

    try {
        const response = await callLLM(prompt);
        res.json({ response });
    } catch(error) {
        console.error("Error in analyze route:", error);
        res.status(500).json({ error: "Failed to analyze prompt" });
    }
});

export default router;