import axios from "axios";
import { callLLM } from "../src/services/llmService";

jest.mock("axios");

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("callLLM", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should call axios.post and return the LLM response with string input", async () => {
    
    mockedAxios.post.mockResolvedValueOnce({
      data: {
        choices: [
          { message: { content: "Mocked response from LLM" } }
        ]
      }
    });
    
    const result = await callLLM("Hello, model!");
    
    expect(mockedAxios.post).toHaveBeenCalledTimes(1);
    expect(mockedAxios.post).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        model: expect.any(String),
        messages: [{ role: "user", content: "Hello, model!" }],
      }),
      expect.any(Object)
    );
    expect(result).toBe("Mocked response from LLM");
  });

  it("should call axios.post and return the LLM response with Message[] input", async () => {
    const messages = [
      { role: "system" as const, content: "You are a helpful assistant." },
      { role: "user" as const, content: "What is this log do?" }
    ];
    mockedAxios.post.mockResolvedValueOnce({
      data: {
        choices: [
          { message: { content: "Mocked response from LLM" } }
        ]
      }
    });

    const result = await callLLM(messages);

    expect(mockedAxios.post).toHaveBeenCalledTimes(1);
    expect(mockedAxios.post).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        model: expect.any(String),
        messages: messages,
      }),
      expect.any(Object)
    );
    expect(result).toBe("Mocked response from LLM");
  });

  it("should throw an error when axios.post fails", async () => {
    mockedAxios.post.mockRejectedValueOnce(new Error("Invalid API key"));

    await expect(callLLM("test")).rejects.toThrow("Failed to call LLM API: Invalid API key");
  });
});
