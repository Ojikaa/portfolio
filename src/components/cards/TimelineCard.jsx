import Tag from '../common/Tag.jsx';

export default function TimelineCard({ entry, delay = 0, isFirst = false, isLast = false }) {
  const isDark = entry.theme === 'dark';
  const tagTone = isDark ? 'dark' : 'light';

  return (
    <div className="grid grid-cols-2 max-[780px]:grid-cols-1">
      <div
        style={{ animationDelay: `${delay}s` }}
        className={`relative border px-7 pt-6.5 pb-7 flex flex-col gap-3 animate-[riseIn_0.9s_cubic-bezier(0.2,0.8,0.2,1)_both] max-[780px]:col-start-1 ${
          entry.side === 'left' ? 'col-start-1' : 'col-start-2'
        } ${isDark ? 'bg-panel-dark-bg text-panel-dark-ink border-panel-dark-ink/22' : 'bg-panel-light-bg text-panel-light-ink border-panel-light-ink/18'}`}
      >
        {!isFirst && <span className="absolute left-1/2 -ml-1.75 -top-1.75 w-3.5 h-3.5 bg-accent rotate-45" />}
        {!isLast && <span className="absolute left-1/2 -ml-1.75 -bottom-1.75 w-3.5 h-3.5 bg-accent rotate-45" />}
        <div className="flex items-baseline justify-between gap-4">
          <span className="font-mono text-[11px] tracking-widest uppercase opacity-66">{entry.period}</span>
          <span className="font-heading text-[clamp(22px,2.4vw,34px)] leading-none text-accent">{entry.year}</span>
        </div>
        <h3 className="m-0 font-heading text-[clamp(19px,1.8vw,26px)] leading-none tracking-[-0.02em] uppercase">
          {entry.role}
        </h3>
        <span className="text-[15px] font-semibold">{entry.org}</span>
        <ul className="mt-1.5 pl-4.5 list-disc flex flex-col gap-1.75 text-sm leading-[1.55] opacity-70">
          {entry.bullets.map((bullet) => (
            <li key={bullet}>{bullet}</li>
          ))}
        </ul>
        <div className="flex flex-wrap gap-1.5 pt-2">
          {entry.tags.map((tag) => (
            <Tag key={tag} tone={tagTone}>
              {tag}
            </Tag>
          ))}
        </div>
      </div>
    </div>
  );
}
