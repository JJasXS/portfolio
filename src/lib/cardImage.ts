import { personalInfo } from "@/data/personal";

/**
 * Full digital business-card PNG (standard landscape proportion).
 * The canvas IS the card — ready to save / share.
 */
export function downloadCardImage(filename = "Jason-Choo-Card.png") {
  // ~ standard business card ratio (3.5 × 2)
  const width = 1050;
  const height = 600;
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const initials = `${personalInfo.firstName.slice(0, 1)}${personalInfo.lastName.slice(0, 1)}`;
  const websiteHost = personalInfo.website.replace(/^https?:\/\//, "");

  const finish = () => {
    canvas.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = filename;
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
      URL.revokeObjectURL(url);
    }, "image/png");
  };

  const drawCard = (photo: HTMLImageElement | null) => {
    // Full-bleed card surface
    const bg = ctx.createLinearGradient(0, 0, width, height);
    bg.addColorStop(0, "#0f172a");
    bg.addColorStop(1, "#0b1220");
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, width, height);

    // Left profile band
    const bandW = 390;
    ctx.fillStyle = "rgba(15, 23, 42, 0.55)";
    ctx.fillRect(0, 0, bandW, height);

    const photoPad = 36;
    const photoW = bandW - photoPad * 2;
    const photoH = Math.min(height - photoPad * 2, Math.round(photoW * 1.2));
    const photoX = photoPad;
    const photoY = (height - photoH) / 2;

    if (photo) {
      ctx.save();
      ctx.beginPath();
      ctx.rect(photoX, photoY, photoW, photoH);
      ctx.clip();

      // Cover-fit crop, slight top bias for face
      const scale = Math.max(photoW / photo.width, photoH / photo.height);
      const sw = photoW / scale;
      const sh = photoH / scale;
      const sx = (photo.width - sw) / 2;
      const sy = Math.max(0, (photo.height - sh) * 0.12);
      ctx.drawImage(photo, sx, sy, sw, sh, photoX, photoY, photoW, photoH);
      ctx.restore();

      ctx.strokeStyle = "rgba(148, 163, 184, 0.35)";
      ctx.lineWidth = 2;
      ctx.strokeRect(photoX, photoY, photoW, photoH);
    } else {
      ctx.fillStyle = "rgba(148, 163, 184, 0.12)";
      ctx.fillRect(photoX, photoY, photoW, photoH);
      ctx.strokeStyle = "rgba(148, 163, 184, 0.35)";
      ctx.lineWidth = 2;
      ctx.strokeRect(photoX, photoY, photoW, photoH);

      ctx.fillStyle = "#94a3b8";
      ctx.font = "600 48px Geist, Inter, Arial, sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(initials, photoX + photoW / 2, photoY + photoH / 2);
    }

    // Right content
    const x = bandW + 40;
    const maxTextW = width - x - 48;
    let y = 92;

    ctx.textAlign = "left";
    ctx.textBaseline = "alphabetic";

    ctx.fillStyle = "#f8fafc";
    ctx.font = "600 40px Geist, Inter, Arial, sans-serif";
    y = fillWrappedText(ctx, personalInfo.fullName, x, y, maxTextW, 46);

    ctx.fillStyle = "#cbd5e1";
    ctx.font = "500 22px Geist, Inter, Arial, sans-serif";
    ctx.fillText(personalInfo.role, x, y + 36);

    ctx.fillStyle = "#94a3b8";
    ctx.font = "400 20px Geist, Inter, Arial, sans-serif";
    ctx.fillText(personalInfo.company, x, y + 68);

    // Contact block
    const rows: Array<[string, string]> = [
      ["Email", personalInfo.email],
      ["Web", websiteHost],
      ["Based", personalInfo.location],
    ];

    let rowY = y + 130;
    for (const [label, value] of rows) {
      ctx.fillStyle = "#64748b";
      ctx.font = "500 15px Geist, Inter, Arial, sans-serif";
      ctx.fillText(label.toUpperCase(), x, rowY);

      ctx.fillStyle = "#e2e8f0";
      ctx.font = "500 22px Geist, Inter, Arial, sans-serif";
      ctx.fillText(value, x, rowY + 28);
      rowY += 72;
    }

    // Bottom brand line
    ctx.fillStyle = "#475569";
    ctx.font = "400 15px Geist, Inter, Arial, sans-serif";
    ctx.fillText("Digital name card", x, height - 36);

    finish();
  };

  const img = new Image();
  img.crossOrigin = "anonymous";
  img.onload = () => drawCard(img);
  img.onerror = () => drawCard(null);
  img.src = personalInfo.profileImage;
}

function fillWrappedText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number,
) {
  const words = text.split(" ");
  let line = "";
  let cy = y;

  for (const word of words) {
    const test = line ? `${line} ${word}` : word;
    if (ctx.measureText(test).width > maxWidth && line) {
      ctx.fillText(line, x, cy);
      line = word;
      cy += lineHeight;
    } else {
      line = test;
    }
  }
  if (line) ctx.fillText(line, x, cy);
  return cy;
}
