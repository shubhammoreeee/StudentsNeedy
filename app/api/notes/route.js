export const runtime = "nodejs";

import { groq } from "../../../lib/groq";

export async function POST(req) {
  try {
    const { subject, chapter, length } = await req.json();

    const prompt = `Write short notes for chapter "${chapter}" in subject "${subject}". Keep it ~${length ||
      300} words. Include bullet points and 5 practice questions.`;

    const res = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 1500,
    });

    return new Response(JSON.stringify({ notes: res.choices[0].message.content }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  } catch (e) {
    console.error("Notes error:", e);
    return new Response(JSON.stringify({ error: e.message }), {
      status: 500,
    });
  }
}
