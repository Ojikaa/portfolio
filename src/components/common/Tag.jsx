export default function Tag({ children, tone = 'light' }) {
  return (
    <span
      className={`px-2.5 py-1.25 border whitespace-nowrap text-[11px] tracking-[0.06em] font-mono ${
        tone === 'dark'
          ? 'border-[rgba(244,241,232,0.5)] text-panel-dark-ink'
          : 'border-[rgba(22,21,15,0.35)] text-panel-light-ink'
      }`}
    >
      {children}
    </span>
  );
}
