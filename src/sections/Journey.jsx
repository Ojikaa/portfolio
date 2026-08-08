import SectionTitle from '../components/common/SectionTitle.jsx';
import TimelineCard from '../components/cards/TimelineCard.jsx';
import TimelineConnector from '../components/cards/TimelineConnector.jsx';
import { timeline } from '../data/timeline.js';

export default function Journey() {
  return (
    <section
      id="parcours"
      className="relative overflow-hidden bg-paper text-ink px-[clamp(24px,5vw,80px)] pt-[clamp(72px,11vh,130px)] pb-[clamp(88px,13vh,150px)] border-t border-rule"
    >
      <div className="max-w-265 mx-auto flex flex-col gap-[clamp(30px,4.5vh,52px)]">
        <div className="flex items-end justify-between gap-7 flex-wrap border-b-[3px] border-ink pb-4 max-[640px]:flex-col max-[640px]:items-center max-[640px]:text-center max-[640px]:gap-2">
          <SectionTitle className="text-[clamp(40px,7.4vw,104px)] leading-[0.85]">Parcours</SectionTitle>
          <span className="font-mono text-xs tracking-[0.14em] uppercase text-accent">2023 → 2026</span>
        </div>

        <div className="flex flex-col">
          {timeline.map((entry, i) => (
            <div key={entry.id}>
              <TimelineCard
                entry={entry}
                delay={0.06 * i}
                isFirst={i === 0}
                isLast={i === timeline.length - 1}
              />
              {i < timeline.length - 1 && (
                <TimelineConnector flip={i % 2 === 1} delay={0.15 * (i + 1)} />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
