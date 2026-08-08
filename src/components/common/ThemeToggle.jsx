import { useTheme } from '../../hooks/useTheme.js';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-pressed={isDark}
      aria-label={isDark ? 'Passer en mode clair' : 'Passer en mode sombre'}
      title={isDark ? 'Mode clair' : 'Mode sombre'}
      className="inline-flex items-center justify-center w-8.5 h-8.5 flex-none border border-rule rounded-full bg-transparent text-ink cursor-pointer transition-[border-color,transform] duration-200 hover:border-ink hover:-translate-y-px"
    >
      {isDark ? (
        <svg viewBox="0 0 24 24" fill="none" className="w-4.25 h-4.25">
          <circle cx="12" cy="12" r="4.2" fill="currentColor" />
          <g stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
            <line x1="12" y1="1.5" x2="12" y2="4" />
            <line x1="12" y1="20" x2="12" y2="22.5" />
            <line x1="1.5" y1="12" x2="4" y2="12" />
            <line x1="20" y1="12" x2="22.5" y2="12" />
            <line x1="4.4" y1="4.4" x2="6.1" y2="6.1" />
            <line x1="17.9" y1="17.9" x2="19.6" y2="19.6" />
            <line x1="4.4" y1="19.6" x2="6.1" y2="17.9" />
            <line x1="17.9" y1="6.1" x2="19.6" y2="4.4" />
          </g>
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" fill="none" className="w-4.25 h-4.25">
          <path
            d="M20.5 14.7A8.5 8.5 0 0 1 9.3 3.5a8.5 8.5 0 1 0 11.2 11.2Z"
            fill="currentColor"
          />
        </svg>
      )}
    </button>
  );
}
