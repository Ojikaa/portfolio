export default function TimelineConnector({ flip = false, delay = 0 }) {
  const path = flip ? 'M 100 0 C 38 0, 62 100, 0 100' : 'M 0 0 C 62 0, 38 100, 100 100';

  return (
    <div className="h-[clamp(120px,15vh,180px)] mx-[25%] max-[780px]:hidden">
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full block overflow-visible -mt-px">
        <path
          d={path}
          fill="none"
          stroke="var(--color-accent)"
          strokeWidth="3"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          style={{ animationDelay: `${delay}s` }}
          className="animate-[fadeIn_1.2s_ease_both]"
        />
      </svg>
    </div>
  );
}
