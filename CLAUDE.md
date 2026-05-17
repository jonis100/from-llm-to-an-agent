# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository purpose

This repo backs a talk titled **"The Agentic Era: From LLM to a Superpower Agent."** It contains two distinct kinds of artifact:

1. **A minimal working ReAct agent** in `agent/` — used as the live code example for the talk.
2. **Presentation content** at the repo root (`slides.md` outline, `slides_content.md` / `new_slides_content.md` long-form, `new_slides_content.pptx` export, `slide-intro-bold-editorial.html` mockup, `agentic-era-style-guide-Claude.md` design system).

When the user asks about "the agent," they mean `agent/`. When they mention slides, decks, or styling, they mean the root-level content files.

## Running the agent

Working dir: `agent/`. Env file: `agent/src/.env` (loaded explicitly relative to the compiled module — `dotenv.config` resolves the path from `import.meta.url`, so the `.env` must live next to `agent.ts`, not at the repo root or `agent/`).

Required env vars:
- `GEMINI_API_KEY` — Google Generative Language API
- `TAVILY_API_KEY` — used by the `search` tool

Commands (run from `agent/`):
```bash
npm start                  # interactive: prompts "You: "
npm start -- "your query"  # one-shot: passes argv[2] as the user input
```

There is no build step, lint, or test suite. `npm test` is a placeholder that exits 1. `tsx` runs the TypeScript directly.

## Agent architecture

The agent is a textbook ReAct loop implemented by hand — no SDK, no function-calling API. Understand these pieces together:

- **`src/index.ts`** — entry point. Reads input from argv or readline, calls `runAgent`, prints `FinalAnswer`.
- **`src/agent.ts`** — the loop. Builds a `Message[]` history seeded with `SYSTEM_PROMPT` + user input, then iterates up to `MAX_ITERATIONS` (5). Each iteration: call LLM → regex-parse the response for `Action:` / `Action Input:` → if no tool call, return the raw text → otherwise execute the tool and push a `{role: "tool", ...}` message back into history.
- **`src/llm.ts`** — Gemini REST adapter. **The model is hard-coded to `gemini-3-flash-preview`** in a `MODEL` constant. It maps the OpenAI-style `Message[]` to Gemini's `contents` shape (`assistant` → `model`), and lifts the system message into `systemInstruction`.
- **`src/tools.ts`** — three tools: `search` (Tavily), `fetch` (URL → stripped HTML, capped at 3000 chars), `calculator` (regex-guarded `eval`). Each tool is `{name, description, execute(input: string) => Promise<string>}`. Tool `description`s are interpolated directly into the system prompt, so editing a description changes how the LLM picks tools.
- **`src/types.ts`** — `Message` and `Tool` types only.

Key invariants to preserve when editing:

- The protocol is **text-based**, not Gemini function calling. Tool calls are parsed from prose using two regexes in `parseToolCall`. If you change the prompt's `Action:` / `Action Input:` / `Observation:` format, update the regexes in lockstep — they are the contract.
- The system prompt explicitly forbids the model from filling in `Observation:` itself; the orchestrator injects it. The regex stops `Action Input` capture at `\n\s*Observation:` to defend against models that ignore that instruction.
- Tool `role: "tool"` messages are mapped to `"user"` when sent to Gemini (since Gemini has no `tool` role) — `llm.ts` collapses anything non-`assistant`/non-`system` to `user`.
- Unknown tool names don't throw; they push an error observation back into history so the model can self-correct on the next iteration.

## Slides workflow

`slides.md` is the short outline. `slides_content.md` and `new_slides_content.md` are Marp-flavored markdown decks (the `_no-marp.md` variant strips Marp directives). `new_slides_content.pptx` is the exported deck — regenerated from the markdown, not edited directly. `agentic-era-style-guide-Claude.md` defines the visual system (Bold Editorial / Magazine theme, terracotta accent `#D85A30` on cream `#F7F4EF`); follow it when generating any new slide HTML or markdown.
