import SectionTitle from '../components/common/SectionTitle.jsx';
import ContactRow from '../components/cards/ContactRow.jsx';
import { contactLinks } from '../data/contact.js';

export default function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden bg-accent text-panel-dark-ink">
      <div className="absolute inset-0 bg-[repeating-linear-gradient(97deg,rgba(0,0,0,0.06)_0_2px,rgba(255,255,255,0.03)_2px_7px)]" />
      <div className="absolute bottom-[-18%] left-[-8%] w-[clamp(240px,32vw,460px)] aspect-square border border-panel-dark-ink/35 rounded-full animate-[float2_19s_ease-in-out_infinite]" />

      <div className="relative z-1 max-w-280 mx-auto px-[clamp(24px,5vw,80px)] py-[clamp(76px,12vh,148px)] grid grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] gap-[clamp(40px,6vw,80px)] items-start max-[780px]:grid-cols-1">
        <div
          style={{ animationDelay: '0.08s' }}
          className="flex flex-col gap-[clamp(24px,3.5vh,40px)] animate-[riseIn_0.9s_cubic-bezier(0.2,0.8,0.2,1)_both] max-[780px]:items-center max-[780px]:text-center"
        >
          <SectionTitle className="text-[clamp(34px,4vw,66px)] leading-[0.84] tracking-[-0.035em]!">
            Contact
          </SectionTitle>
        </div>

        <div className="flex flex-col border-t border-panel-dark-ink/35">
          {contactLinks.map((link, i) => (
            <ContactRow key={link.label} link={link} delay={0.06 * (i + 1)} />
          ))}
        </div>
      </div>
    </section>
  );
}
