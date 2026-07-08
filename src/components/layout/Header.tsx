import { getTranslations } from "next-intl/server";

import { Link } from "@/i18n/navigation";
import LocaleSwitcher from "@components/layout/LocaleSwitcher";
import ThemeToggle from "@components/layout/ThemeToggle";

import styles from "./Header.module.css";

export default async function Header() {
  const t = await getTranslations("Header");
  const NAV_LINKS = [
    { label: t("home"), href: "/" },
    { label: t("about"), href: "/about" },
  ];

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link className={styles.logo} href="/">
          Polio
        </Link>
        <div className={styles.nav}>
          <nav>
            <ul className={styles.navList}>
              {NAV_LINKS.map(({ label, href }) => (
                <li key={href}>
                  <Link className={styles.navLink} href={href}>
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
