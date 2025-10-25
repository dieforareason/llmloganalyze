import { Router, Request, Response } from "express";
import { analyzeLogs } from "../services/llmWithPromptService";

const router = Router();

// Test route to verify server is working
router.get("/test", (req: Request, res: Response) => {
    res.json({ message: "LLM service is working!", timestamp: new Date().toISOString() });
});

// Main analyze route using the log analyzer prompt
router.post("/analyze", async (req: Request, res: Response) => {
    if (!req.body) {
        return res.status(400).json({ error: "Request body is missing. Make sure to send JSON with Content-Type: application/json" });
    }

    const { prompt } = req.body;

    if (!prompt) {
        return res.status(400).json({ error: "Prompt is required" });
    }

    try {
        const response = await analyzeLogs(prompt);
        res.json({ 
            response,
            metadata: {
                promptType: "logAnalyzer",
                timestamp: new Date().toISOString()
            }
        });
    } catch(error) {
        console.error("Error in analyze route:", error);
        res.status(500).json({ error: "Failed to analyze prompt" });
    }
});


export default router;