import fetch from "node-fetch";
import { Tool } from "./types";
import { tavily } from "@tavily/core";

export const tools: Tool[] = [
  {
    name: "search",
    description: "Search the web for up-to-date information. Input: a search query string.",
    execute: async (query: string) => {
      const tavilyClient = tavily({ apiKey: process.env.TAVILY_API_KEY });
      const response = await tavilyClient.search(query, { searchDepth: "basic", maxResults: 5 });
	  console.log("TOOL search raw response:", JSON.stringify(response, null, 2));
      return JSON.stringify(
        response.results.map((r: any) => ({ title: r.title, url: r.url, content: r.content })),
        null,
        2
      );
    },
  },

  {
    name: "fetch",
    description: "Fetch raw text content from a URL. Input: a valid URL.",
    execute: async (url: string) => {
      const res = await fetch(url);
      const html = await res.text();
	  console.log("TOOL fetch raw HTML length:", html.length);
      return html
        .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, "")
        .replace(/<style[\s\S]*?>[\s\S]*?<\/style>/gi, "")
        .replace(/<[^>]+>/g, "")
        .slice(0, 3000);
    },
  },

  {
    name: "calculator",
    description: "Evaluate a math expression. Input: an arithmetic expression like '(12 * 3) / 4'.",
    execute: async (expr: string) => {
      if (!/^[\d\s+\-*/().]+$/.test(expr)) return "Error: invalid expression";
	  // calculate 446846 * 26
	  console.log("TOOL calculator evaluating:", expr);
      try {
        return eval(expr).toString();
      } catch {
        return "Error: could not evaluate";
      }
    },
  },
];
