export const runtime = "nodejs";

import { groq } from "../../../lib/groq";
import { PDFDocument, StandardFonts } from "pdf-lib";

export async function POST(req) {
  try {
    const user = await req.json();

    // 💎 PROFESSIONAL, PREMIUM, ATS-FRIENDLY RESUME FORMAT
    const prompt = `
Create a premium, professional, ATS-friendly student resume.
NEVER add explanations or notes. ONLY output the resume.
Use clean sections, spacing, bullet points, and a refined tone.

THE FORMAT MUST BE EXACTLY LIKE THIS:

[NAME]
Email:
Phone:
Location:

PROFESSIONAL SUMMARY
3–4 line professional summary tailored to the student.

SKILLS
- Skill 1
- Skill 2
- Skill 3
(Use 5–10 bullet points max)

EDUCATION
- School/College Name — Year
- Grade or Degree

PROJECTS
Project Title — Tech Stack
- Bullet 1 describing the work
- Bullet 2 describing achievement
- Bullet 3 optional

STRENGTHS
- Point 1
- Point 2
- Point 3

CERTIFICATIONS (only if provided)
- Certification name

HOBBIES (optional)
- Hobby 1
- Hobby 2

Use THIS data while keeping the resume professional:
${JSON.stringify(user, null, 2)}
`;

    // 🧠 Call Groq (Stable model from your dashboard)
    const response = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant", // stable + supported
      messages: [{ role: "user", content: prompt }],
      max_tokens: 1400,
      temperature: 0.25,
    });

    const resume = response.choices[0].message.content;

    // 🧾 Convert text → PDF
    const pdf = await PDFDocument.create();
    const page = pdf.addPage([595, 842]);
    const font = await pdf.embedFont(StandardFonts.Helvetica);

    const lines = resume.split("\n");
    let y = 800;

    lines.forEach((line) => {
      if (y < 40) return; // page overflow protection
      page.drawText(line, {
        x: 40,
        y,
        size: 11,
        font,
        maxWidth: 500,
        lineHeight: 14,
      });
      y -= 16;
    });

    const pdfBytes = await pdf.save();

    return new Response(pdfBytes, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "attachment; filename=resume.pdf",
      },
    });

  } catch (err) {
    console.error("Resume API Error:", err);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
    });
  }
}
