import * as promptService from "../src/services/promptService";

const instructions: promptService.Instruction[] = [
  { role: "system", content: "You are a helpful assistant." },
  { role: "assistant", content: "How can I assist you today?" },
  { role: "user", content: "Provide concise answers." },
];

const promptConfig: promptService.PromptConfig = {
  name: "Test Prompt",
  description: "A prompt configuration for testing purposes.",
  instructions,
  capabilities: {
    log_types: ["text", "code"],
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

const service = new promptService.PromptService(promptConfig);

describe("promptService", () => {
  it("should get system messages", () => {
    const systemMessages = service.getSystemMessages();
    expect(systemMessages).toBeDefined();
    expect(systemMessages[0].role).toBe("system");
  });

  it("should builds full message array with system prompts and user content", () => {
    const userPrompts = service.buildMessages("Analyze this log for errors.");
    expect(userPrompts).toBeDefined();
    expect(userPrompts[userPrompts.length - 1].role).toBe("user");
    expect(userPrompts[userPrompts.length - 1].content).toBe(
      "Analyze this log for errors."
    );
  });

  it("should builds a formatted prompt for simple LLM calls", () => {
    const prompt = service.buildPrompt("What issues are present in this log?");
    expect(prompt).toBeDefined();
    expect(prompt).toContain("You are a helpful assistant.");
    expect(prompt).toContain(
      "User Input:\nWhat issues are present in this log?"
    );
  });

  it("should get the assistant example", () => {
    const assistantExample = service.getAssistantExample();

    expect(assistantExample).toBeDefined();
    expect(assistantExample).toBe("How can I assist you today?");
  });

  it("should return null if no assistant example is available", () => {
    const configWithoutAssistant: promptService.PromptConfig = {
      name: "No Assistant Prompt",
      description: "A prompt configuration without assistant example.",
      instructions: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: "Provide concise answers." },
      ],
    };
    const serviceWithoutAssistant = new promptService.PromptService(
      configWithoutAssistant
    );
    const assistantExample = serviceWithoutAssistant.getAssistantExample();

    expect(assistantExample).toBeNull();
  });

  it("should get prompt metadata", () => {
    const metadata = service.getMetadata();
    expect(metadata).toBeDefined();
    expect(metadata.name).toBe("Test Prompt");
    expect(metadata.description).toBe(
      "A prompt configuration for testing purposes."
    );
  });

  it("should create a prompt service instance", () => {
    const myService = promptService.createPromptService(promptConfig);
    expect(myService).toBeDefined();
    expect(myService).toBeInstanceOf(promptService.PromptService);
  });
});
