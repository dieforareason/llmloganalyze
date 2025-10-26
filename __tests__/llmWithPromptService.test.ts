import { createPromptService, defaultLogAnalyzerConfig, PromptConfig } from '../src/services/promptService';
import * as llmService from '../src/services/llmService';
import {
  analyzeLogs,
  analyzeLogsWithCustomPrompt,
  analyzeLogsWithCustomConfig,
} from '../src/services/llmWithPromptService';

jest.mock('../src/services/llmService');

const mockedCallLLM = (llmService as unknown as { callLLM: jest.Mock }).callLLM;

beforeEach(() => {
  jest.clearAllMocks();
});

describe('LLM with Prompt Service (integration-style tests)', () => {
  it('should analyze logs using default prompt and return LLM output', async () => {
    
    const logContent = 'Error: Something went wrong at line 42';
    
    mockedCallLLM.mockResolvedValueOnce('Detected Issue: Error at line 42\nRoot Cause: X\nRecommended: Y');
    
    const result = await analyzeLogs(logContent);
    
    expect(mockedCallLLM).toHaveBeenCalled();
    expect(typeof result).toBe('string');
    expect(result).toContain('Detected Issue: Error at line 42');
  });

  it('should analyze logs with a custom PromptService instance', async () => {
    const logContent = 'Warning: Deprecated API usage';
    
    const customConfig: PromptConfig = {
      ...defaultLogAnalyzerConfig,
      name: 'CustomAnalyzer',
      instructions: [
        ...defaultLogAnalyzerConfig.instructions,
        { role: 'system', content: 'Custom system instruction for this test' },
      ],
    };
    const customPrompt = createPromptService(customConfig);

    mockedCallLLM.mockResolvedValueOnce('Detected Issue: Deprecated API usage\nConfidence Level: Medium');

    const result = await analyzeLogsWithCustomPrompt(logContent, customPrompt);

    expect(mockedCallLLM).toHaveBeenCalled();
    expect(result).toContain('Deprecated API');
  });

  it('should analyze logs with custom config and handle empty logs ', async () => {
    const emptyLog = '';
    // If your implementation returns a specific message/throws, adapt accordingly.
    mockedCallLLM.mockResolvedValueOnce('No logs provided; please send more context.');

    const result = await analyzeLogsWithCustomConfig(emptyLog);

    expect(mockedCallLLM).toHaveBeenCalled();
    expect(result).toContain('No logs');
  });
});
