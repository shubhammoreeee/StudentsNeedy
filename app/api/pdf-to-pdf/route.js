export const runtime = "nodejs";

import { createSimplePdf } from '../../../lib/pdfUtils';

export async function POST(req) {
  const { text } = await req.json();
  const pdfBytes = await createSimplePdf(text || '');

  return new Response(pdfBytes, {
    status: 200,
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename=answers.pdf'
    }
  });
}
