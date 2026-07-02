import { getTranslations } from "next-intl/server";

import { Link } from "@/i18n/navigation";
import LocaleSwitcher from "@components/layout/LocaleSwitcher";
import ThemeToggle from "@components/layout/ThemeToggle";

export default async function Header() {
  const t = await getTranslations("Header");
  const NAV_LINKS = [
    { label: t("home"), href: "/" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[color:var(--color-border)] bg-[color:var(--color-surface-elevated)]/80 backdrop-blur-sm">
      <div className="mx-auto flex h-40 max-w-800 items-center justify-between px-15">
        <Link className="text-[1.8rem] font-semibold tracking-tight text-[color:var(--color-text-main)]" href="/">
          Polio
        </Link>
        <div className="flex items-center gap-12">
          <nav>
            <ul className="flex items-center gap-15">
              {NAV_LINKS.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    className="text-[1.4rem] text-[color:var(--color-text-sub)] transition-colors hover:text-[color:var(--color-text-main)]"
                    href={href}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <LocaleSwitcher />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
