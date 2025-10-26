export interface Instruction {
    role: "system" | "user" | "assistant";
    content: string;
}

export interface PromptConfig {
    name: string;
    description: string;
    instructions: Instruction[];
    capabilities?: {
        log_types?: string[];
        actions?: string[];
        response_format?: Record<string, string>;
    };
}

export class PromptService {
    private config: PromptConfig;

    constructor(config: PromptConfig) {
        this.config = config;
    }

    /**
     * Builds system messages from the prompt configuration
     */
    getSystemMessages(): Instruction[] {
        return this.config.instructions.filter((inst) => inst.role === "system");
    }

    /**
     * Builds the full message array with system prompts and user content
     */
    buildMessages(userContent: string): Instruction[] {
        const messages: Instruction[] = [];

        // Add all system instructions from config
        this.getSystemMessages().forEach((systemMsg) => {
            messages.push(systemMsg);
        });

        // Add user content
        messages.push({
            role: "user",
            content: userContent,
        });

        return messages;
    }

    /**
     * Builds a formatted prompt for simple LLM calls (when only user message is expected)
     */
    buildPrompt(userContent: string): string {
        const systemPrompts = this.getSystemMessages()
            .map((msg) => msg.content)
            .join("\n\n");

        return `${systemPrompts}\n\nUser Input:\n${userContent}`;
    }

    /**
     * Get the assistant example if available
     */
    getAssistantExample(): string | null {
        const assistantMsg = this.config.instructions.find(
            (inst) => inst.role === "assistant"
        );
        return assistantMsg?.content || null;
    }

    /**
     * Get prompt metadata
     */
    getMetadata() {
        return {
            name: this.config.name,
            description: this.config.description,
            capabilities: this.config.capabilities,
        };
    }
}

// Default configuration for log analyzer
export const defaultLogAnalyzerConfig: PromptConfig = {
    name: "LogAnalyzerAssistant",
    description:
        "AI specialized in analyzing logs from Node.js, Java applications, and Linux servers. It helps detect issues, explain errors, and suggest possible fixes or next steps.",
    instructions: [
        {
            role: "system",
            content:
                "You are an expert log analysis assistant. Your task is to read logs from Node.js, Java, or Linux server applications, identify issues, explain root causes, and suggest actionable resolutions. Always provide concise, step-by-step reasoning when explaining problems.",
        },
        {
            role: "user",
            content:
                "Example logs or context provided by the user may include stack traces, process errors, or service failures. Analyze them clearly and output structured insights.",
        },
        {
            role: "assistant",
            content:
                "For each log input, follow this format in your response:\n\n1. **Detected Issue:** Short summary of the problem.\n2. **Root Cause Analysis:** Explain why it likely happened.\n3. **Recommended Action:** Suggest what to do to fix or prevent it.\n4. **Confidence Level:** Low / Medium / High.",
        },
        {
            role: "system",
            content:
                "If the logs are ambiguous, ask for additional context before assuming the cause. Keep responses technical, relevant, and avoid unnecessary explanations.",
        },
    ],
    capabilities: {
        log_types: ["nodejs", "java", "linux"],
        actions: [
            "detect_error_patterns",
            "explain_exceptions",
            "recommend_fixes",
            "suggest_prevention_steps",
        ],
        response_format: {
            "Detected Issue": "string",
            "Root Cause Analysis": "string",
            "Recommended Action": "string",
            "Confidence Level": "Low | Medium | High",
        },
    },
};

// Export a default instance
export const logAnalyzerPrompt = new PromptService(defaultLogAnalyzerConfig);

// Export factory function for custom prompts
export function createPromptService(config: PromptConfig): PromptService {
    return new PromptService(config);
}
