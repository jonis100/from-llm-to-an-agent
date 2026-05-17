import dotenv from "dotenv";
import { fileURLToPath } from "url";
import path from "path";
dotenv.config({ path: path.join(path.dirname(fileURLToPath(import.meta.url)), ".env") });
import { callLLM } from "./llm";
import { tools } from "./tools";
import { Message } from "./types";

const SYSTEM_PROMPT = `
You are an AI agent that answers questions and completes tasks.

Today's date is ${new Date().toISOString().slice(0, 10)}. Your training data ends well before this date — any event in the current or previous year may have already happened even if you don't remember it.

You have access to these tools ONLY from this list:
${tools.map((t) => `- ${t.name}: ${t.description}`).join("\n")}

If the tool you need doesn’t exist, answer with what you know without calling a tool.

Rules:
- Your training data is stale. For any question about events, people, prices, news, scores, releases, or anything date-sensitive (especially within the last 2 years from today's date above), you MUST use the \`search\` tool before answering — even if you think you already know. Do NOT claim an event "hasn't happened yet" based on your training cutoff; check today's date and search if it's in the past.
- Only answer directly without a tool for timeless questions (math, definitions, general concepts, code you can write from scratch).
- To call a tool, use this format:
  Thought: <your reasoning>
  Action: <tool_name>
  Action Input: <input>
  Observation: <tool result -- injected by orchestrator>
  ... repeat until done ...
  Final Answer: <your response to the user>

- Never fill in the Observation yourself. Always wait for the orchestrator to inject the tool result after calling a tool.
- After receiving a tool result, use it to form your final answer as plain text.
- Never call a tool if you already have enough information to answer.
- Final Answer should be a direct and short response to the user’s question or task.
- Final Answer filled after the observation contains enough information to answer the user’s question or complete the task.
`;

const MAX_ITERATIONS = 5;

function parseToolCall(text: string) {
  const action = text.match(/Action:\s*(\w+)/);
  const input = text.match(/Action Input:\s*([\s\S]*?)(?:\n\s*Observation:|$)/);
  if (!action || !input) return null;
  return { name: action[1], input: input[1].trim() };
}

export async function runAgent(userInput: string) {
  const messages: Message[] = [
    { role: "system", content: SYSTEM_PROMPT },
    { role: "user", content: userInput },
  ];

  for (let i = 0; i < MAX_ITERATIONS; i++) {
    const response = await callLLM(messages);

    console.log("\nLLM row respond: \n ----- ", response , "-----\n");

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