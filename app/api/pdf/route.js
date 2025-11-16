export const runtime = "nodejs";

import { groq } from "../../../lib/groq";
import pdfParse from "pdf-parse";
import Tesseract from "tesseract.js";

export async function POST(req) {
  try {
    const form = await req.formData();
    const file = form.get("file");

    if (!file) {
      return new Response(JSON.stringify({ error: "No file uploaded" }), {
        status: 400,
      });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    let text = "";

    try {
      const pdf = await pdfParse(buffer);
      text = pdf.text?.trim();
    } catch {}

    if (!text) {
      const ocr = await Tesseract.recognize(buffer, "eng");
      text = ocr.data.text;
    }

    const result = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [{ role: "user", content: `Solve these:\n${text}` }],
      max_tokens: 3000,
    });

    return new Response(JSON.stringify({ answer: result.choices[0].message.content }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
    });
  }
}
