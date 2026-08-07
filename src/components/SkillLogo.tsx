import { siN8n, siOpenapiinitiative } from "simple-icons";

const DEVICON =
  "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons";

type LogoSource =
  | { type: "img"; src: string; invert?: boolean }
  | { type: "svg"; path: string; color: string }
  | { type: "custom"; color: string; children: string };

/**
 * Official / recognizable tech logos for constellation skills.
 * Devicon CDN for most brands; Simple Icons / custom marks where needed.
 */
const logos: Record<string, LogoSource> = {
  csharp: { type: "img", src: `${DEVICON}/csharp/csharp-original.svg` },
  dotnet: { type: "img", src: `${DEVICON}/dotnetcore/dotnetcore-original.svg` },
  sql: {
    type: "img",
    src: `${DEVICON}/azuresqldatabase/azuresqldatabase-original.svg`,
  },
  javascript: {
    type: "img",
    src: `${DEVICON}/javascript/javascript-original.svg`,
  },
  python: { type: "img", src: `${DEVICON}/python/python-original.svg` },
  typescript: {
    type: "img",
    src: `${DEVICON}/typescript/typescript-original.svg`,
  },
  react: { type: "img", src: `${DEVICON}/react/react-original.svg` },
  nextjs: {
    type: "img",
    src: `${DEVICON}/nextjs/nextjs-original.svg`,
    invert: true,
  },
  htmlcss: { type: "img", src: `${DEVICON}/html5/html5-original.svg` },
  firebird: {
    type: "img",
    src: `${DEVICON}/firebird/firebird-original.svg`,
  },
  mssql: {
    type: "img",
    src: `${DEVICON}/microsoftsqlserver/microsoftsqlserver-original.svg`,
  },
  flutter: { type: "img", src: `${DEVICON}/flutter/flutter-original.svg` },
  firebase: { type: "img", src: `${DEVICON}/firebase/firebase-original.svg` },
  php: { type: "img", src: `${DEVICON}/php/php-original.svg` },
  cpp: {
    type: "img",
    src: `${DEVICON}/cplusplus/cplusplus-original.svg`,
  },
  cmd: {
    type: "custom",
    color: "#94a3b8",
    children:
      "M2 4a1 1 0 0 1 1-1h18a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4zm2 1v2h16V5H4zm0 4v10h16V9H4zm2.2 2.2l2.8 2.3-2.8 2.3.9 1.1 4-3.4-4-3.4-.9 1.1zM11 15.5h5v1.5h-5v-1.5z",
  },
  git: { type: "img", src: `${DEVICON}/git/git-original.svg` },
  vscode: { type: "img", src: `${DEVICON}/vscode/vscode-original.svg` },
  erp: {
    type: "custom",
    color: "#38bdf8",
    children:
      "M4 10l8-5 8 5v8a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-8zm4 2v5h2v-5H8zm6 0v5h2v-5h-2z",
  },
  n8n: {
    type: "svg",
    path: siN8n.path,
    color: `#${siN8n.hex}`,
  },
  api: {
    type: "svg",
    path: siOpenapiinitiative.path,
    color: `#${siOpenapiinitiative.hex}`,
  },
  ai: {
    type: "custom",
    color: "#2dd4bf",
    children:
      "M12 2l1.5 4.5L18 8l-4.5 1.5L12 14l-1.5-4.5L6 8l4.5-1.5L12 2zm6 10l.9 2.7L22 16l-3.1.9L18 20l-.9-3.1L14 16l3.1-.9L18 12zM6 14l.8 2.4L9 17l-2.2.7L6 20l-.8-2.3L3 17l2.2-.6L6 14z",
  },
  automation: {
    type: "custom",
    color: "#f59e0b",
    children:
      "M12 8a4 4 0 1 1 0 8 4 4 0 0 1 0-8zm0-5l1.2 2.8L16 7l-2.8 1.2L12 11l-1.2-2.8L8 7l2.8-1.2L12 3zm0 13l1 2.3L15.3 20 13 18.8 12 21l-1-2.2L8.7 20 11 18.8 12 16z",
  },
};

interface SkillLogoProps {
  skillId: string;
  name: string;
  monogram: string;
  size?: number;
  className?: string;
}

export function SkillLogo({
  skillId,
  name,
  monogram,
  size = 36,
  className = "",
}: SkillLogoProps) {
  const logo = logos[skillId];

  if (!logo) {
    return (
      <span
        className={`inline-flex items-center justify-center rounded-lg bg-white/10 text-[10px] font-semibold text-slate-200 ${className}`}
        style={{ width: size, height: size }}
        aria-hidden="true"
      >
        {monogram}
      </span>
    );
  }

  if (logo.type === "img") {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={logo.src}
        alt=""
        width={size}
        height={size}
        className={`object-contain ${logo.invert ? "brightness-0 invert" : ""} ${className}`}
        loading="lazy"
        aria-hidden="true"
      />
    );
  }

  if (logo.type === "custom") {
    return (
      <svg
        role="img"
        viewBox="0 0 24 24"
        width={size}
        height={size}
        className={className}
        aria-hidden="true"
      >
        <title>{name}</title>
        <path d={logo.children} fill={logo.color} />
      </svg>
    );
  }

  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
    >
      <title>{name}</title>
      <path d={logo.path} fill={logo.color} />
    </svg>
  );
}
