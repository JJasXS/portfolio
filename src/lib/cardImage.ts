import { personalInfo } from "@/data/personal";
import { isPlaceholderLink } from "@/lib/utils";

/**
 * Draws a shareable digital name card as a PNG image
 * so recipients can save it to Photos / Camera Roll.
 */
export function downloadCardImage(filename = "Jason-Choo-Card.png") {
  const width = 1200;
  const height = 720;
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  // Background
  ctx.fillStyle = "#0b1220";
  ctx.fillRect(0, 0, width, height);

  // Soft accent glow
  const glow = ctx.createRadialGradient(180, 120, 20, 180, 120, 420);
  glow.addColorStop(0, "rgba(45, 212, 191, 0.28)");
  glow.addColorStop(1, "rgba(45, 212, 191, 0)");
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, width, height);

  const glow2 = ctx.createRadialGradient(980, 560, 20, 980, 560, 380);
  glow2.addColorStop(0, "rgba(56, 189, 248, 0.18)");
  glow2.addColorStop(1, "rgba(56, 189, 248, 0)");
  ctx.fillStyle = glow2;
  ctx.fillRect(0, 0, width, height);

  // Card panel
  roundRect(ctx, 48, 48, width - 96, height - 96, 28);
  ctx.fillStyle = "rgba(15, 23, 42, 0.88)";
  ctx.fill();
  ctx.strokeStyle = "rgba(148, 163, 184, 0.28)";
  ctx.lineWidth = 2;
  ctx.stroke();

  // Accent bar
  ctx.fillStyle = "#2dd4bf";
  ctx.fillRect(48, 48, 10, height - 96);

  // Initials circle
  ctx.beginPath();
  ctx.arc(160, 180, 52, 0, Math.PI * 2);
  ctx.fillStyle = "rgba(45, 212, 191, 0.12)";
  ctx.fill();
  ctx.strokeStyle = "rgba(45, 212, 191, 0.55)";
  ctx.lineWidth = 2;
  ctx.stroke();

  const initials = `${personalInfo.firstName.slice(0, 1)}${personalInfo.lastName.slice(0, 1)}`;
  ctx.fillStyle = "#2dd4bf";
  ctx.font = "600 34px Geist, Inter, Arial, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(initials, 160, 182);

  // Name & role
  ctx.textAlign = "left";
  ctx.textBaseline = "alphabetic";
  ctx.fillStyle = "#f8fafc";
  ctx.font = "600 54px Geist, Inter, Arial, sans-serif";
  ctx.fillText(personalInfo.fullName, 250, 170);

  ctx.fillStyle = "#94a3b8";
  ctx.font = "400 28px Geist, Inter, Arial, sans-serif";
  ctx.fillText(personalInfo.role, 250, 220);

  ctx.fillStyle = "#64748b";
  ctx.font = "400 22px Geist, Inter, Arial, sans-serif";
  ctx.fillText(personalInfo.location, 250, 258);

  // Divider
  ctx.strokeStyle = "rgba(148, 163, 184, 0.22)";
  ctx.beginPath();
  ctx.moveTo(120, 320);
  ctx.lineTo(width - 120, 320);
  ctx.stroke();

  // Contact rows
  const rows: Array<[string, string]> = [
    ["Email", personalInfo.email],
  ];

  if (!isPlaceholderLink(personalInfo.linkedin)) {
    rows.push(["LinkedIn", "linkedin.com/in/jason-choo-7a871228a"]);
  }
  if (!isPlaceholderLink(personalInfo.instagram)) {
    rows.push(["Instagram", personalInfo.instagramHandle]);
  }

  let y = 380;
  for (const [label, value] of rows) {
    ctx.fillStyle = "#64748b";
    ctx.font = "500 20px Geist, Inter, Arial, sans-serif";
    ctx.fillText(label.toUpperCase(), 120, y);

    ctx.fillStyle = "#e2e8f0";
    ctx.font = "500 26px Geist, Inter, Arial, sans-serif";
    ctx.fillText(value, 280, y);
    y += 58;
  }

  // Footer
  ctx.fillStyle = "#475569";
  ctx.font = "400 18px Geist, Inter, Arial, sans-serif";
  ctx.fillText("Digital name card · Jason Choo", 120, height - 90);

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
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
) {
  const radius = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.arcTo(x + w, y, x + w, y + h, radius);
  ctx.arcTo(x + w, y + h, x, y + h, radius);
  ctx.arcTo(x, y + h, x, y, radius);
  ctx.arcTo(x, y, x + w, y, radius);
  ctx.closePath();
}
