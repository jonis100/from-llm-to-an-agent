import dotenv from "dotenv";
import { fileURLToPath } from "url";
import path from "path";
dotenv.config({ path: path.join(path.dirname(fileURLToPath(import.meta.url)), ".env") });
import { callLLM } from "./llm";
import { tools } from "./tools";
import { Message } from "./types";

const SYSTEM_PROMPT = `
You are an AI agent that answers questions and completes tasks.

You have access to these tools ONLY from this list:
${tools.map((t) => `- ${t.name}: ${t.description}`).join("\n")}

If the tool you need doesn’t exist, answer with what you know without calling a tool.

Rules:
- If you need external or real-time information, use a tool.
- If you already know the answer, respond directly without using a tool.
- To call a tool, respond with EXACTLY this format (nothing else):
  TOOL: tool_name(input)
- After receiving a tool result, use it to form your final answer as plain text.
- Never call a tool if you already have enough information to answer.
`;

const MAX_ITERATIONS = 5;

function parseToolCall(text: string) {
  const match = text.trim().match(/^TOOL:\s*(\w+)\((.*)\)$/s);
  if (!match) return null;
  return { name: match[1], input: match[2].trim() };
}

export async function runAgent(userInput: string) {
  const messages: Message[] = [
    { role: "system", content: SYSTEM_PROMPT },
    { role: "user", content: userInput },
  ];

  for (let i = 0; i < MAX_ITERATIONS; i++) {
    const response = await callLLM(messages);

    console.log("\nLLM:", response);

    const toolCall = parseToolCall(response);

    if (!toolCall) {
      return response;
    }

    const tool = tools.find((t) => t.name === toolCall.name);

    messages.push({ role: "assistant", content: response });

    if (!tool) {
      messages.push({
        role: "tool",
        name: toolCall.name,
        content: `Error: unknown tool "${toolCall.name}". Available tools: ${tools.map((t) => t.name).join(", ")}.`,
      });
      continue;
    }

    const result = await tool.execute(toolCall.input);
    messages.push({ role: "tool", name: tool.name, content: result });
  }

  return "Stopped after max iterations";
}