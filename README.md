# From LLM to an Agent

Companion repo for the talk **"The Agentic Era: From LLM to a Superpower Agent."**

It contains two things:

- [agent/](agent/) — a minimal, hand-rolled **ReAct agent** in TypeScript, used as the live code example during the talk.
- [presentation/](presentation/) — the slide deck (Marp markdown + exported `.pptx` / `.pdf`) and the visual style guide.

## The agent

A textbook ReAct loop with no SDK and no native function-calling API — tool calls are parsed out of the model's prose with a regex. It talks to Google's Gemini REST API and ships with three tools: web `search` (Tavily), URL `fetch`, and a `calculator`.

Source layout:

| File | Role |
| --- | --- |
| [agent/src/index.ts](agent/src/index.ts) | Entry point — reads input from argv or stdin |
| [agent/src/agent.ts](agent/src/agent.ts) | The ReAct loop and system prompt |
| [agent/src/llm.ts](agent/src/llm.ts) | Gemini REST adapter |
| [agent/src/tools.ts](agent/src/tools.ts) | `search`, `fetch`, `calculator` |
| [agent/src/types.ts](agent/src/types.ts) | `Message` and `Tool` types |

### Setup

Copy the example env file and fill in your keys. It must sit at the `agent/` package root — `dotenv` resolves the path as `../.env` from [agent/src/agent.ts](agent/src/agent.ts), so `agent/.env` (not `agent/src/.env` and not the repo root):

```bash
cd agent
cp .env.example .env
```

Then edit `agent/.env` and fill in both values:

```
GEMINI_API_KEY=your-google-generative-language-key
TAVILY_API_KEY=your-tavily-key
```

- `GEMINI_API_KEY` — get one from [Google AI Studio](https://aistudio.google.com/apikey).
- `TAVILY_API_KEY` — sign up at [tavily.com](https://tavily.com/) and grab a key from the dashboard. Used by the `search` tool.

Install dependencies:

```bash
npm install
```

### Run

```bash
npm start                  # interactive prompt: "You: "
npm start -- "your query"  # one-shot
```

There is no build step, lint, or test suite — `tsx` runs the TypeScript directly.

### How the loop works

1. Seed history with the system prompt + user input.
2. Call the LLM; regex-parse the response for `Action:` and `Action Input:`.
3. No tool call → return the text as the final answer.
4. Tool call → execute it, push the result back into history as a `tool` message, and loop.
5. Stop after `MAX_ITERATIONS` (5).

The `Action:` / `Action Input:` / `Observation:` format is the contract between the prompt and the orchestrator — if you change one, change the regex in [agent/src/agent.ts](agent/src/agent.ts) to match.

## Presentation

- [presentation/slides_content.md](presentation/slides_content.md) — Marp-flavored markdown deck (long form).
- [presentation/slides_content_no-marp.md](presentation/slides_content_no-marp.md) — same content, Marp directives stripped.
- [presentation/slides_content.pptx](presentation/slides_content.pptx) / [presentation/slides_content.pdf](presentation/slides_content.pdf) — exported deck (regenerated from the markdown, not edited directly).
- [presentation/agentic-era-style-guide-Claude.md](presentation/agentic-era-style-guide-Claude.md) — Bold Editorial / Magazine theme, terracotta `#D85A30` on cream `#F7F4EF`. Follow it when generating new slide HTML or markdown.
- [presentation/images/](presentation/images/) — slide assets.
