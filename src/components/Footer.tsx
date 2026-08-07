import { personalInfo } from "@/data/personal";
import { SocialIcons } from "./SocialIcons";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-base font-semibold text-foreground">
            {personalInfo.fullName}
          </p>
          <p className="mt-1 text-sm text-muted">
            Software Engineer | Building, Learning, Growing.
          </p>
        </div>

        <SocialIcons />
      </div>

      <div className="mx-auto mt-8 flex max-w-6xl flex-col gap-2 border-t border-border pt-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {year} {personalInfo.firstName}. All rights reserved.
        </p>
        <p>Built with Next.js</p>
      </div>
    </footer>
  );
}
