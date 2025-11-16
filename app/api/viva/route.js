import { groq } from "../../../lib/groq";

export async function POST(req) {
  try {
    const { subject } = await req.json();

    const prompt = `
Generate EXACTLY 20 viva questions for the subject: ${subject}.
STRICT RULES:
- ALWAYS generate exactly 20 questions. Never fewer, never more.
- Number them 1 to 20.
- Each question MUST have a short 1–2 line answer.
- Do NOT skip numbers.
- Do NOT include explanations or extra paragraphs.
- Format MUST be:

1. Question?
   Answer: ...
2. Question?
   Answer: ...
...
20. Question?
   Answer: ...
`;

    const result = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 1500,
      temperature: 0.2
    });

    const text = result.choices?.[0]?.message?.content || "";

    return new Response(JSON.stringify({ qna: text }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
