import { runAgent } from "./agent";
import * as readline from "readline";

async function getUserInput(): Promise<string> {
  const arg = process.argv[2];
  if (arg) return arg;

  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  return new Promise((resolve) => {
    rl.question("You: ", (answer: string) => {
      rl.close();
      resolve(answer);
    });
  });
}

(async () => {
  const input = await getUserInput();
  if (!input.trim()) {
    console.error("No input provided.");
    process.exit(1);
  }

  const result = await runAgent(input);
  console.log("\nFINAL:\n", result.FinalAnswer || result);
})();