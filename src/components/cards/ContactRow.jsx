export default function ContactRow({ link, delay = 0 }) {
  return (
    <a
      href={link.href}
      download={link.download}
      style={{ animationDelay: `${delay}s` }}
      className="grid grid-cols-[116px_minmax(0,1fr)_auto] max-[700px]:grid-cols-[88px_minmax(0,1fr)_auto] max-[480px]:grid-cols-1 gap-4.5 max-[700px]:gap-2.5 max-[480px]:gap-1 items-baseline pl-1 pr-1 py-5.5 border-b border-panel-dark-ink/35 text-panel-dark-ink no-underline transition-[padding-left,background] duration-250 hover:pl-4 hover:bg-black/12 animate-[riseIn_0.9s_cubic-bezier(0.2,0.8,0.2,1)_both]"
    >
      <span className="font-mono text-[11px] tracking-[0.12em] uppercase text-panel-dark-ink/70">
        {link.label}
      </span>
      <span className="contents max-[480px]:flex max-[480px]:items-center max-[480px]:gap-3">
        <span className="text-[clamp(15px,1.9vw,24px)] max-[700px]:text-[clamp(13px,4vw,20px)] font-semibold tracking-[-0.02em] min-w-0 whitespace-nowrap overflow-hidden text-ellipsis max-[480px]:flex-1 max-[480px]:whitespace-normal max-[480px]:overflow-visible max-[480px]:wrap-anywhere">
          {link.value}
        </span>
        <span className="self-center text-panel-dark-ink/70 max-[480px]:flex-none">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
            <path d="M7 17 17 7M8 7h9v9" />
          </svg>
        </span>
      </span>
    </a>
  );
}
