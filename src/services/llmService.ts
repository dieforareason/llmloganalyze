import axios from "axios";
import { ENV } from "../config/env";

interface Message {
    role: "system" | "user" | "assistant";
    content: string;
}

export async function callLLM(prompt: string): Promise<string>;
export async function callLLM(messages: Message[]): Promise<string>;
export async function callLLM(input: string | Message[]): Promise<string> {
    const apiUrl = ENV.LLM_API_URL;
    const apiKey = ENV.LLM_API_KEY;
    const model = "qwen/qwen3-32b";

    // Convert string prompt to messages array if needed
    const messages: Message[] = typeof input === "string" 
        ? [{ role: "user", content: input }]
        : input;

    try {

        const response = await axios.post(
            apiUrl,
            {
                model: model,
                messages: messages,
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