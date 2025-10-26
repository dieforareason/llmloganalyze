import * as llmService from "../src/services/llmService";

jest.mock("../src/services/llmService");

describe('LLM Service', () => {
    it('should return a response from the LLM', async () => {
        const prompt = 'Hello, how are you?';

        (llmService.callLLM as jest.Mock).mockResolvedValueOnce('Hello! I am fine.');

        const response = await llmService.callLLM(prompt);
        expect(response).toBeDefined();
        expect(typeof response).toBe('string');
        expect(response.length).toBeGreaterThan(0);
        expect(response).toBe('Hello! I am fine.');
    });
})