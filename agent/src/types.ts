export type Message = {
  role: "system" | "user" | "assistant" | "tool";
  content: string;
  name?: string;
};

export type Tool = {
  name: string;
  description: string;
  execute: (input: string) => Promise<string>;
};