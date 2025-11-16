import { PDFDocument, StandardFonts } from 'pdf-lib';

export async function createSimplePdf(text) {
  const pdfDoc = await PDFDocument.create();
  let page = pdfDoc.addPage([595, 842]);
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const { height } = page.getSize();
  const lines = text.split('\n');
  let y = height - 60;
  for (const line of lines) {
    if (y < 60) { page = pdfDoc.addPage([595, 842]); y = height - 60; }
    page.drawText(line, { x: 50, y, size: 11, font });
    y -= 14;
  }
  return await pdfDoc.save();
}

export async function createResumePdf({ name, email, content }) {
  const pdfDoc = await PDFDocument.create();
  let page = pdfDoc.addPage([595, 842]);
  const helv = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const helvBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const { width, height } = page.getSize();

  page.drawText(name || 'Student Name', { x: 50, y: height - 60, size: 20, font: helvBold });
  page.drawText(email || '', { x: 50, y: height - 80, size: 10, font: helv });

  const lines = wrapText(content || '', 78);
  let y = height - 120;
  for (const line of lines) {
    if (y < 60) {
      page = pdfDoc.addPage([595, 842]);
      y = 780;
    }
    page.drawText(line, { x: 50, y, size: 11, font: helv });
    y -= 14;
  }

  return await pdfDoc.save();
}

function wrapText(text, maxCharsPerLine = 80) {
  const words = text.split(/\s+/);
  const lines = [];
  let line = '';
  for (const w of words) {
    if ((line + ' ' + w).trim().length > maxCharsPerLine) {
      lines.push(line.trim());
      line = w;
    } else {
      line += ' ' + w;
    }
  }
  if (line.trim()) lines.push(line.trim());
  return lines;
}
