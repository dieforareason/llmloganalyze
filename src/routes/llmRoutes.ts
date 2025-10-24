import { Router, Request, Response } from "express";
import { callLLM } from "../services/llmService";

const router = Router();

router.post("/analyze", async (req: Request, res: Response) => {
    const { prompt } = req.body;

    if (!prompt) {
        return res.status(400).json({ error: "Prompt is required" });
    }

    try {
        const response = await callLLM(prompt);
        res.json({ response });
    } catch(error) {
        res.status(500).json({ error: "Failed to analyze prompt" });
    }
});

export default router;