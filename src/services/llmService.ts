import axios from "axios";
import { ENV } from "../config/env";

export async function callLLM(prompt: string): Promise<string> {
    try {
        const response = await axios.post(
            ENV.LLM_API_URL,
            {
                model: "gpt-3.5-turbo",
                messages: [{ role: "user", content: prompt }],
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${ENV.LLM_API_KEY}`,
                },
            }
        );

        return response.data.choices[0].message.content;
    } catch (error) {
        console.error("Error calling LLM API:", error);
        throw new Error("Failed to call LLM API");
    }
}