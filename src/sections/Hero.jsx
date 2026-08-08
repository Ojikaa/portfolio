import Header from '../components/layout/Header.jsx';
import Button from '../components/common/Button.jsx';
import { LogoLoop } from '../components/common/LogoLoop.jsx';
import { techStack } from '../data/techStack.js';
import { CV_PATH, CV_FILENAME } from '../data/contact.js';
import portrait from '../assets/images/portrait.png';

const techLogos = techStack.map((tech) => ({
  node: (
    <span
      className="w-8.5 h-8.5 flex-none block bg-ink opacity-66"
      style={{
        WebkitMask: `url(https://cdn.simpleicons.org/${tech.slug}) center / contain no-repeat`,
        mask: `url(https://cdn.simpleicons.org/${tech.slug}) center / contain no-repeat`,
      }}
    />
  ),
  ariaLabel: tech.name,
  title: tech.name,
}));

export default function Hero() {
  return (
    <div className="h-screen bg-paper text-ink flex flex-col overflow-hidden max-[900px]:h-auto max-[900px]:min-h-screen max-[900px]:overflow-visible">
      <Header />
      <div className="flex-1 grid grid-cols-[1.15fr_0.85fr] grid-rows-[1fr] items-stretch px-12 min-h-0 max-[900px]:grid-cols-1 max-[900px]:grid-rows-[auto_auto] max-[900px]:px-6">
        <div className="flex flex-col justify-center pt-12 pr-10 pb-12 max-w-[780px] min-w-0 max-[900px]:max-w-full max-[900px]:py-10 max-[900px]:px-0 max-[900px]:items-center max-[900px]:text-center">
          <h1
            style={{ animationDelay: '0.1s' }}
            className="m-0 text-[clamp(52px,7.2vw,112px)] leading-[0.88] font-extrabold tracking-[-0.045em] [text-wrap:balance] animate-[riseIn_0.8s_cubic-bezier(0.2,0.8,0.2,1)_both]"
          >
            Développeur{' '}
            <span className="font-normal italic tracking-[-0.03em]">fullstack</span>{' '}
            <span className="text-accent">C# .NET</span> &amp; React.
          </h1>

          <div
            style={{ animationDelay: '0.26s' }}
            className="flex flex-wrap gap-3 mt-8.5 animate-[riseIn_0.8s_cubic-bezier(0.2,0.8,0.2,1)_both] max-[420px]:gap-2 max-[900px]:justify-center"
          >
            <Button href="#projets">Voir mes projets</Button>
            <Button href={CV_PATH} download={CV_FILENAME} variant="outline">
              Télécharger le CV
            </Button>
          </div>
        </div>

        <div className="relative flex justify-center items-end h-full min-h-[420px] min-w-0 max-[900px]:min-h-[320px]">
          <div
            style={{ animationDelay: '0.1s' }}
            className="absolute bottom-0 inset-x-0 mx-auto w-[min(100%,460px)] h-[76%] rounded-t-[260px] bg-accent animate-[fadeIn_0.9s_cubic-bezier(0.2,0.8,0.2,1)_both]"
          />
          <span className="absolute bottom-5.5 left-1/2 -translate-x-1/2 font-mono text-[11px] tracking-[0.14em] uppercase text-white/70 z-0">
            Talence · FR
          </span>
          <img
            src={portrait}
            alt="Portrait de Cédric Guéguénou"
            style={{ animationDelay: '0.2s' }}
            className="relative z-1 block h-full max-h-[660px] w-full max-w-full object-contain object-bottom animate-[photoIn_1s_cubic-bezier(0.2,0.8,0.2,1)_both]"
          />
        </div>
      </div>

      <div
        style={{ animationDelay: '0.35s' }}
        className="border-t border-rule bg-paper py-5.5 animate-[riseIn_0.8s_cubic-bezier(0.2,0.8,0.2,1)_both]"
      >
        <LogoLoop
          logos={techLogos}
          speed={60}
          gap={64}
          logoHeight={34}
          fadeOut
          fadeOutColor="var(--color-paper)"
          pauseOnHover
          ariaLabel="Stack technique"
        />
      </div>
    </div>
  );
}
