import { useState } from 'react';
import Tag from '../common/Tag.jsx';
import Lightbox from '../common/Lightbox.jsx';

function ProjectFrame({ src, onClick, isOnlyFrame, isAccent, ariaLabel }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      className={`group/frame relative aspect-[16/10] rounded-[3px] overflow-hidden flex items-center justify-center bg-[#100f0d] p-0 [font:inherit] text-inherit cursor-zoom-in [-webkit-tap-highlight-color:transparent] border ${
        isAccent ? 'border-panel-dark-ink/40' : 'border-panel-light-ink/25'
      } ${isOnlyFrame ? 'flex-[0_1_auto] w-full max-w-[720px]' : 'flex-[1_1_320px] max-[720px]:flex-[1_1_100%]'}`}
    >
      <img
        src={src}
        alt=""
        loading="lazy"
        className="w-full h-full object-contain grayscale contrast-110 transition-[filter] duration-400 group-hover:grayscale-0 group-hover:contrast-[1.02]"
      />
      <span className="absolute bottom-2.5 right-2.5 w-8 h-8 inline-flex items-center justify-center rounded-full bg-[rgba(16,15,13,0.7)] text-panel-dark-ink opacity-0 scale-85 transition-[opacity,transform] duration-200 group-hover/frame:opacity-100 group-hover/frame:scale-100" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
          <path d="M9 4H4v5M15 4h5v5M9 20H4v-5M15 20h5v-5" />
        </svg>
      </span>
    </button>
  );
}

export default function ProjectCard({ project, delay = 0 }) {
  const isAccent = project.theme === 'accent';
  const tagTone = isAccent ? 'dark' : 'light';
  const [openIndex, setOpenIndex] = useState(null);

  const hasImages = Boolean(project.images?.length);
  const isOnlyFrame = !hasImages || project.images.length === 1;

  return (
    <article
      style={{ animationDelay: `${delay}s` }}
      className={`group relative border px-6 pt-5.5 pb-6.5 flex flex-col gap-5.5 transition-transform duration-300 hover:-translate-y-1.5 animate-[riseIn_0.9s_cubic-bezier(0.2,0.8,0.2,1)_both] ${
        isAccent ? 'bg-accent text-panel-dark-ink border-panel-dark-ink/35' : 'bg-panel-light-bg text-panel-light-ink border-panel-dark-ink/35'
      }`}
    >
      <div className="flex flex-col gap-4">
        <h3 className="m-0 font-heading text-[clamp(30px,3.4vw,52px)] leading-[0.9] tracking-[-0.02em] uppercase">
          {project.title.map((line, i) => (
            <span key={i}>
              {line}
              {i < project.title.length - 1 && <br />}
            </span>
          ))}
        </h3>
        <p className="m-0 text-[15px] leading-[1.55] opacity-70 [text-wrap:pretty]">{project.description}</p>
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <Tag key={tag} tone={tagTone}>
              {tag}
            </Tag>
          ))}
        </div>
      </div>
      <div className={`flex flex-wrap gap-3 ${isOnlyFrame ? 'justify-center' : ''}`}>
        {hasImages ? (
          project.images.map((src, i) => (
            <ProjectFrame
              key={src}
              src={src}
              isOnlyFrame={isOnlyFrame}
              isAccent={isAccent}
              onClick={() => setOpenIndex(i)}
              ariaLabel="Agrandir l'image"
            />
          ))
        ) : (
          <div
            className={`relative aspect-[16/10] rounded-[3px] overflow-hidden flex items-center justify-center bg-[#100f0d] border flex-[0_1_auto] w-full max-w-[720px] ${
              isAccent ? 'border-panel-dark-ink/40' : 'border-panel-light-ink/25'
            }`}
            aria-hidden="true"
          >
            <span className="font-mono text-[11px] tracking-[0.08em] uppercase text-panel-dark-ink/45 text-center px-3">
              Aperçu à venir
            </span>
          </div>
        )}
      </div>

      {openIndex !== null && (
        <Lightbox
          images={project.images}
          startIndex={openIndex}
          onClose={() => setOpenIndex(null)}
        />
      )}
    </article>
  );
}
