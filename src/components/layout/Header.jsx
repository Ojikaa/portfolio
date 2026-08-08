import { navLinks } from '../../data/contact.js';
import ThemeToggle from '../common/ThemeToggle.jsx';

export default function Header() {
  return (
    <header className="flex items-center justify-between gap-8 px-12 py-7 animate-[riseIn_0.7s_cubic-bezier(0.2,0.8,0.2,1)_both] max-[640px]:flex-col max-[640px]:items-start max-[640px]:gap-4 max-[640px]:px-6 max-[640px]:py-5.5">
      <a href="#" className="text-[15px] font-semibold tracking-[-0.01em] text-ink no-underline">
        Cédric Guéguénou
      </a>
      <div className="flex items-center gap-7 max-[640px]:w-full max-[640px]:items-start max-[640px]:justify-between max-[480px]:gap-2">
        <nav className="flex gap-7 font-mono text-xs tracking-[0.08em] uppercase max-[640px]:gap-3 max-[480px]:gap-2 max-[480px]:text-[10px] max-[360px]:tracking-[0.02em]">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="text-ink no-underline hover:text-accent">
              {link.label}
            </a>
          ))}
        </nav>
        <ThemeToggle />
      </div>
    </header>
  );
}
