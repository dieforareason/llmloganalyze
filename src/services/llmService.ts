import axios from "axios";
import { ENV } from "../config/env";

export async function callLLM(prompt: string): Promise<string> {
    const apiUrl = ENV.LLM_API_URL;
    const apiKey = ENV.LLM_API_KEY;
    const model = "qwen/qwen3-32b";

    try {

        const response = await axios.post(
            apiUrl,
            {
                model: model,
                messages: [{ role: "user", content: prompt }],
                max_completion_tokens: 1000,
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${apiKey}`,
                },
            }
        );

        return response.data.choices[0].message.content;
    } catch (error: any) {
        console.error("Error calling LLM API:", error);
        throw new Error(`Failed to call LLM API: ${error.response?.data?.error?.message || error.message}`);
    }
}