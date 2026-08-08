import SectionTitle from '../components/common/SectionTitle.jsx';
import ProjectCard from '../components/cards/ProjectCard.jsx';
import { projects } from '../data/projects.js';

export default function Projects() {
  return (
    <section
      id="projets"
      className="relative overflow-hidden bg-panel-dark-bg text-panel-dark-ink px-[clamp(24px,5vw,80px)] pt-[clamp(72px,11vh,130px)] pb-[clamp(88px,13vh,150px)]"
    >
      <div className="absolute inset-0 bg-[repeating-linear-gradient(97deg,rgba(255,255,255,0.022)_0_2px,rgba(0,0,0,0.05)_2px_6px)]" />

      <div className="relative z-1 max-w-280 mx-auto flex flex-col gap-[clamp(26px,4vh,44px)]">
        <div className="flex items-end justify-between gap-8 flex-wrap animate-[riseIn_0.8s_cubic-bezier(0.2,0.8,0.2,1)_both] max-[640px]:justify-center max-[640px]:text-center">
          <SectionTitle className="text-[clamp(42px,8vw,118px)] leading-[0.84]">Projets</SectionTitle>
        </div>

        <div className="flex flex-col gap-4.5">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} delay={0.08 * (i + 1)} />
          ))}
        </div>
      </div>
    </section>
  );
}
