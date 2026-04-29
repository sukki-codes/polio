import Link from "next/link";

const NAV_LINKS = [
  { label: "Home", href: "/" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-black/6 bg-bg-main/80 backdrop-blur-sm">
      <div className="mx-auto flex h-40 max-w-800 items-center justify-between px-15">
        <Link href="/" className="text-[1.8rem] font-semibold tracking-tight text-text-main">
          Polio
        </Link>

        <nav>
          <ul className="flex items-center gap-15">
            {NAV_LINKS.map(({ label, href }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="text-[1.4rem] text-text-sub transition-colors hover:text-text-main"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
