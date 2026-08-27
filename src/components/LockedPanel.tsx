import { Lock } from "lucide-react";

export function LockedPanel({
  title = "Portfolio is locked",
  description = "This section is not public yet. Check back when the work is ready to share.",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <div className="flex min-h-[280px] flex-col items-center justify-center rounded-3xl border border-dashed border-border bg-surface/40 px-6 py-16 text-center">
      <Lock className="h-8 w-8 text-muted" aria-hidden />
      <p className="mt-4 text-lg font-semibold text-foreground">{title}</p>
      <p className="mt-2 max-w-md text-sm leading-relaxed text-muted">
        {description}
      </p>
    </div>
  );
}
