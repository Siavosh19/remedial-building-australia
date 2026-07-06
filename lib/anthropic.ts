// Thin helper over the Anthropic Messages API using raw fetch — matches the
// convention already used across the codebase (app/api/generate-scope,
// app/api/admin/rewrite-news, app/api/ingest-news, …). No SDK dependency.

export const AI_CLASSIFIER_MODEL = "claude-haiku-4-5";

export function hasAnthropicKey(): boolean {
  return Boolean(process.env.ANTHROPIC_API_KEY);
}

type SystemBlock = { type: "text"; text: string; cache_control?: { type: "ephemeral" } };

type AnthropicMessagesBody = {
  model: string;
  max_tokens: number;
  system?: string | SystemBlock[];
  messages: { role: "user" | "assistant"; content: string }[];
  // Structured outputs — constrains the reply to a JSON schema.
  output_config?: { format: { type: "json_schema"; schema: Record<string, unknown> } };
};

type AnthropicResponse = {
  content: { type: string; text?: string }[];
  stop_reason: string | null;
  usage?: Record<string, number>;
};

// Calls POST /v1/messages and returns the parsed response. Throws on missing key
// or a non-2xx status (caller decides how to surface it).
export async function anthropicMessages(body: AnthropicMessagesBody): Promise<AnthropicResponse> {
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) throw new Error("ANTHROPIC_API_KEY is not configured.");

  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-api-key": key,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const err = await res.text().catch(() => "");
    throw new Error(`Anthropic API ${res.status}: ${err.slice(0, 300)}`);
  }
  return (await res.json()) as AnthropicResponse;
}

// Pulls the first text block out of a Messages response and JSON-parses it,
// tolerating accidental code fences / surrounding prose around the JSON.
export function parseJsonReply<T>(res: AnthropicResponse): T {
  const text = res.content.find((b) => b.type === "text" && b.text)?.text ?? "";
  if (!text) throw new Error("No text content in Anthropic response.");
  try {
    return JSON.parse(text) as T;
  } catch {
    const start = text.indexOf("{");
    const end = text.lastIndexOf("}");
    if (start >= 0 && end > start) return JSON.parse(text.slice(start, end + 1)) as T;
    throw new Error("Could not parse JSON from Anthropic response.");
  }
}
