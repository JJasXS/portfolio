"use client";

import { useMemo, useState } from "react";
import { personalInfo } from "@/data/personal";
import { learningFocus, skills } from "@/data/skills";

type JsonPrimitive = string | number | boolean;
type JsonNode = JsonPrimitive | JsonNode[] | { [key: string]: JsonNode };

type JsonFile = {
  id: string;
  filename: string;
  data: { [key: string]: JsonNode };
};

function buildFiles(): JsonFile[] {
  const coreStack = skills
    .filter((skill) => skill.orbit === 1)
    .map((skill) => skill.name);

  return [
    {
      id: "profile",
      filename: "profile.json",
      data: {
        name: personalInfo.fullName,
        role: personalInfo.role,
        based_in: personalInfo.location,
        company: personalInfo.company,
        status: "open_to_collab",
      },
    },
    {
      id: "stack",
      filename: "stack.json",
      data: {
        core: coreStack,
        languages: [...personalInfo.languages],
        shipping: "practical systems > perfect demos",
      },
    },
    {
      id: "now",
      filename: "now.json",
      data: {
        exploring: learningFocus.slice(0, 4).map((item) => item.name),
        building_with: [...personalInfo.interests.slice(0, 4)],
        available_for: personalInfo.lookingFor,
      },
    },
  ];
}

function comma(show: boolean) {
  return show ? <span className="text-slate-500">,</span> : null;
}

function JsonPrimitiveValue({ value }: { value: JsonPrimitive }) {
  if (typeof value === "string") {
    return <span className="text-sky-300">&quot;{value}&quot;</span>;
  }
  if (typeof value === "boolean") {
    return <span className="text-emerald-400">{String(value)}</span>;
  }
  return <span className="text-amber-300">{value}</span>;
}

function JsonArray({
  items,
  indent,
}: {
  items: JsonNode[];
  indent: number;
}) {
  if (items.length === 0) {
    return <span className="text-slate-400">[]</span>;
  }

  const pad = "  ".repeat(indent);
  const childPad = "  ".repeat(indent + 1);

  return (
    <>
      <span className="text-slate-400">[</span>
      {items.map((item, index) => (
        <span key={`${indent}-${index}`}>
          {"\n"}
          {childPad}
          <JsonValue value={item} indent={indent + 1} />
          {comma(index < items.length - 1)}
        </span>
      ))}
      {"\n"}
      {pad}
      <span className="text-slate-400">]</span>
    </>
  );
}

function JsonObject({
  value,
  indent,
}: {
  value: { [key: string]: JsonNode };
  indent: number;
}) {
  const entries = Object.entries(value);
  const pad = "  ".repeat(indent);
  const childPad = "  ".repeat(indent + 1);

  return (
    <>
      <span className="text-slate-400">{"{"}</span>
      {entries.map(([key, child], index) => (
        <span key={key}>
          {"\n"}
          {childPad}
          <span className="text-teal-300">&quot;{key}&quot;</span>
          <span className="text-slate-500">: </span>
          <JsonValue value={child} indent={indent + 1} />
          {comma(index < entries.length - 1)}
        </span>
      ))}
      {"\n"}
      {pad}
      <span className="text-slate-400">{"}"}</span>
    </>
  );
}

function JsonValue({ value, indent }: { value: JsonNode; indent: number }) {
  if (Array.isArray(value)) {
    return <JsonArray items={value} indent={indent} />;
  }
  if (typeof value === "object" && value !== null) {
    return <JsonObject value={value} indent={indent} />;
  }
  return <JsonPrimitiveValue value={value} />;
}

export function JsonSnippet() {
  const files = useMemo(() => buildFiles(), []);
  const [activeId, setActiveId] = useState(files[0].id);
  const active = files.find((file) => file.id === activeId) ?? files[0];

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-[#0b1118] shadow-[0_18px_50px_-28px_rgba(45,212,191,0.28)]">
      <div className="flex items-center gap-3 border-b border-white/10 px-4 py-2.5">
        <div className="flex gap-1.5" aria-hidden>
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        </div>
        <p className="font-mono text-[11px] tracking-wide text-slate-400">
          ~/jason
        </p>
        <span className="ml-auto font-mono text-[10px] uppercase tracking-[0.16em] text-teal-400/80">
          read-only
        </span>
      </div>

      <div
        className="flex gap-1 overflow-x-auto border-b border-white/10 bg-[#080d13] px-2 pt-2"
        role="tablist"
        aria-label="JSON files"
      >
        {files.map((file) => {
          const selected = file.id === active.id;
          return (
            <button
              key={file.id}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => setActiveId(file.id)}
              className={`shrink-0 rounded-t-md border border-b-0 px-3 py-1.5 font-mono text-[11px] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400/60 ${
                selected
                  ? "border-white/10 bg-[#0b1118] text-slate-100"
                  : "border-transparent text-slate-500 hover:text-slate-300"
              }`}
            >
              {file.filename}
            </button>
          );
        })}
      </div>

      <pre
        key={active.id}
        className="min-h-[220px] overflow-x-auto px-4 py-4 font-mono text-[12px] leading-6 sm:min-h-[240px] sm:text-[13px]"
        role="tabpanel"
        aria-label={active.filename}
      >
        <code>
          <JsonObject value={active.data} indent={0} />
          <span className="json-caret ml-0.5 inline-block h-4 w-[7px] translate-y-[2px] bg-teal-300 align-baseline" />
        </code>
      </pre>
    </div>
  );
}
