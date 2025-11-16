export const runtime = "nodejs";

import { groq } from "../../../lib/groq";
import JSZip from "jszip";

export async function POST(req) {
  try {
    const { prompt, resumeText } = await req.json();

    const systemInstruction = `
You are a portfolio generator.

GENERATE A COMPLETE VITE + REACT + TAILWIND PROJECT.

REQUIREMENTS:
- Use Vite + React (no Next.js)
- Full TailwindCSS setup
- Mobile responsive layout
- Hero section
- About section
- Skills section
- Projects section
- Contact page
- Social links section
- Clean UI, modern, with Tailwind
- Use JSX, NOT TSX
- Include routing with react-router-dom
- Include realistic placeholder data from resume
- DO NOT include markdown or explanations
- RETURN ONLY valid JSON:
{
  "files": {
    "path/to/file": "file content"
  }
}
`;

    const userPrompt = `
Build a portfolio website using the following info.
Resume or prompt:
${resumeText || prompt}
`;

    const response = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: systemInstruction },
        { role: "user", content: userPrompt }
      ],
      temperature: 0.3,
      max_tokens: 4000,
    });

    let content = response.choices[0].message.content.trim();
    content = content.replace(/```json/g, "").replace(/```/g, "");

    let json;
    try {
      json = JSON.parse(content);
    } catch (err) {
      console.log("MODEL JSON ERROR", content);
      return new Response(
        JSON.stringify({ error: "Invalid JSON from model", raw: content }),
        { status: 500 }
      );
    }

    // ZIP CREATION
    const zip = new JSZip();
    for (const path in json.files) {
      zip.file(path, json.files[path]);
    }

    const output = await zip.generateAsync({ type: "nodebuffer" });

    return new Response(output, {
      status: 200,
      headers: {
        "Content-Type": "application/zip",
        "Content-Disposition": "attachment; filename=portfolio.zip",
      },
    });
  } catch (e) {
    console.error("Portfolio generation error:", e);
    return new Response(JSON.stringify({ error: e.message }), { status: 500 });
  }
}
