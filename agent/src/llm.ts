import fetch from "node-fetch";

const MODEL = "gemini-2.5-flash-lite";

function toGeminiRequestBody(messages: any[]) {
  const systemMsg = messages.find((m) => m.role === "system");
  const contents = messages
    .filter((m) => m.role !== "system")
    .map((m) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    }));

  const body: any = {
    contents,
    generationConfig: { stopSequences: ["\nObservation:", "Observation:"] },
  };
  if (systemMsg) {
    body.systemInstruction = { parts: [{ text: systemMsg.content }] };
  }
  return body;
}

export async function callLLM(messages: any[]) {
  const API_KEY = process.env.GEMINI_API_KEY!;
  const body = toGeminiRequestBody(messages);

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }
  );

  const data: any = await res.json();

  if (data.error) {
    throw new Error(`Gemini API error: ${data.error.message}`);
  }

  return data?.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
}