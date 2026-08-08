import { navLinks } from '../../data/contact.js';
import ThemeToggle from '../common/ThemeToggle.jsx';

export default function Header() {
  return (
    <header className="flex items-center justify-between gap-8 px-12 py-7 animate-[riseIn_0.7s_cubic-bezier(0.2,0.8,0.2,1)_both] max-[640px]:flex-col max-[640px]:items-start max-[640px]:gap-4 max-[640px]:px-6 max-[640px]:py-5.5">
      <a href="#" className="text-[15px] font-semibold tracking-[-0.01em] text-ink no-underline">
        Cédric Guéguénou
      </a>
      <div className="flex items-center gap-7 max-[640px]:w-full max-[640px]:justify-between">
        <nav className="flex items-center gap-7 font-mono text-xs tracking-[0.08em] uppercase max-[640px]:gap-1.5 max-[480px]:gap-1 max-[480px]:text-[10px]">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-ink no-underline hover:text-accent max-[640px]:inline-flex max-[640px]:h-8.5 max-[640px]:items-center max-[640px]:justify-center max-[640px]:border max-[640px]:border-rule max-[640px]:rounded-full max-[640px]:px-2.5 max-[640px]:hover:border-ink max-[640px]:hover:text-ink max-[640px]:transition-colors max-[480px]:px-2"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <ThemeToggle />
      </div>
    </header>
  );
}
