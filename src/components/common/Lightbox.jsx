import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

function NavButton({ side, onClick, ariaLabel, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      className={`absolute top-1/2 -translate-y-1/2 ${side === 'left' ? 'left-[clamp(8px,3vw,32px)]' : 'right-[clamp(8px,3vw,32px)]'} w-12 h-12 max-[640px]:w-9.5 max-[640px]:h-9.5 inline-flex items-center justify-center border border-[rgba(244,241,232,0.3)] rounded-full bg-[rgba(16,15,13,0.5)] text-[#F4F1E8] cursor-pointer transition-[border-color,background] duration-200 hover:border-[#F4F1E8] hover:bg-[rgba(16,15,13,0.85)]`}
    >
      {children}
    </button>
  );
}

export default function Lightbox({ images, startIndex = 0, onClose }) {
  const [index, setIndex] = useState(startIndex);
  const hasMultiple = images.length > 1;

  const goPrev = () => setIndex((i) => (i - 1 + images.length) % images.length);
  const goNext = () => setIndex((i) => (i + 1) % images.length);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (hasMultiple && e.key === 'ArrowLeft') goPrev();
      if (hasMultiple && e.key === 'ArrowRight') goNext();
    };
    document.addEventListener('keydown', handleKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose, hasMultiple]);

  return createPortal(
    <div
      className="fixed inset-0 z-1000 flex items-center justify-center p-[clamp(24px,6vw,72px)] bg-[rgba(10,9,8,0.92)] animate-[fadeIn_0.2s_ease_both] cursor-zoom-out"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Fermer"
        className="absolute top-[clamp(16px,3vw,32px)] right-[clamp(16px,3vw,32px)] w-10 h-10 inline-flex items-center justify-center border border-[rgba(244,241,232,0.3)] rounded-full bg-transparent text-[#F4F1E8] cursor-pointer transition-[border-color,transform] duration-200 hover:border-[#F4F1E8] hover:rotate-90"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className="w-4.5 h-4.5">
          <line x1="5" y1="5" x2="19" y2="19" />
          <line x1="19" y1="5" x2="5" y2="19" />
        </svg>
      </button>

      <img
        key={index}
        src={images[index]}
        alt=""
        className="max-w-full max-h-full object-contain border border-[rgba(244,241,232,0.2)] cursor-default animate-[lightboxIn_0.25s_cubic-bezier(0.2,0.8,0.2,1)_both]"
        onClick={(e) => e.stopPropagation()}
      />

      {hasMultiple && (
        <>
          <NavButton
            side="left"
            ariaLabel="Image précédente"
            onClick={(e) => {
              e.stopPropagation();
              goPrev();
            }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5.5 h-5.5 max-[640px]:w-4.5 max-[640px]:h-4.5">
              <path d="M15 5l-7 7 7 7" />
            </svg>
          </NavButton>
          <NavButton
            side="right"
            ariaLabel="Image suivante"
            onClick={(e) => {
              e.stopPropagation();
              goNext();
            }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5.5 h-5.5 max-[640px]:w-4.5 max-[640px]:h-4.5">
              <path d="M9 5l7 7-7 7" />
            </svg>
          </NavButton>

          <div
            className="absolute bottom-[clamp(16px,3vw,32px)] left-1/2 -translate-x-1/2 font-mono text-xs tracking-[0.08em] text-[rgba(244,241,232,0.75)] bg-[rgba(16,15,13,0.6)] border border-[rgba(244,241,232,0.25)] rounded-full px-3.5 py-1.5 cursor-default"
            onClick={(e) => e.stopPropagation()}
          >
            {index + 1} / {images.length}
          </div>
        </>
      )}
    </div>,
    document.body
  );
}
