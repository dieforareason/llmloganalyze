import { callLLM } from "./llmService";
import { logAnalyzerPrompt, PromptService, createPromptService } from "./promptService";

/**
 * Analyze logs using the configured log analyzer prompt
 */
export async function analyzeLogs(logContent: string): Promise<string> {
    // Build messages with system prompts
    const messages = logAnalyzerPrompt.buildMessages(logContent);
    
    // Call LLM with structured messages
    return await callLLM(messages);
}

/**
 * Analyze logs with a custom prompt configuration
 */
export async function analyzeLogsWithCustomPrompt(
    logContent: string,
    customPromptService: PromptService
): Promise<string> {
    const messages = customPromptService.buildMessages(logContent);
    return await callLLM(messages);
}

/**
 * Example of how to create and use a completely custom prompt
 */
export async function analyzeLogsWithCustomConfig(logContent: string): Promise<string> {
    // Example custom configuration
    const customConfig = {
        name: "CustomLogAnalyzer",
        description: "Custom analyzer for specific use case",
        instructions: [
            {
                role: "system" as const,
                content: "You are a specialized error detection assistant focused on security issues."
            },
            {
                role: "system" as const,
                content: "Always prioritize security vulnerabilities in your analysis."
            },
            {
                role: "assistant" as const,
                content: "Format: Security Level, Threat Type, Recommendation"
            }
        ]
    };

    const customPrompt = new PromptService(customConfig);
    const messages = customPrompt.buildMessages(logContent);
    
    return await callLLM(messages);
}
