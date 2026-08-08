import { useCallback, useEffect, useMemo, useRef, useState, memo } from 'react';

const ANIMATION_CONFIG = { SMOOTH_TAU: 0.25, MIN_COPIES: 2, COPY_HEADROOM: 2 };

const toCssLength = value => (typeof value === 'number' ? `${value}px` : (value ?? undefined));

const useResizeObserver = (callback, elements, dependencies) => {
  useEffect(() => {
    if (!window.ResizeObserver) {
      const handleResize = () => callback();
      window.addEventListener('resize', handleResize);
      callback();
      return () => window.removeEventListener('resize', handleResize);
    }
    const observers = elements.map(ref => {
      if (!ref.current) return null;
      const observer = new ResizeObserver(callback);
      observer.observe(ref.current);
      return observer;
    });
    callback();
    return () => {
      observers.forEach(observer => observer?.disconnect());
    };
  }, [callback, elements, dependencies]);
};

const useImageLoader = (seqRef, onLoad, dependencies) => {
  useEffect(() => {
    const images = seqRef.current?.querySelectorAll('img') ?? [];
    if (images.length === 0) {
      onLoad();
      return;
    }
    let remainingImages = images.length;
    const handleImageLoad = () => {
      remainingImages -= 1;
      if (remainingImages === 0) onLoad();
    };
    images.forEach(img => {
      const htmlImg = img;
      if (htmlImg.complete) {
        handleImageLoad();
      } else {
        htmlImg.addEventListener('load', handleImageLoad, { once: true });
        htmlImg.addEventListener('error', handleImageLoad, { once: true });
      }
    });
    return () => {
      images.forEach(img => {
        img.removeEventListener('load', handleImageLoad);
        img.removeEventListener('error', handleImageLoad);
      });
    };
  }, [onLoad, seqRef, dependencies]);
};

const useAnimationLoop = (trackRef, targetVelocity, seqWidth, seqHeight, isHovered, hoverSpeed, isVertical) => {
  const rafRef = useRef(null);
  const lastTimestampRef = useRef(null);
  const offsetRef = useRef(0);
  const velocityRef = useRef(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      track.style.transform = 'translate3d(0, 0, 0)';
      return;
    }

    const seqSize = isVertical ? seqHeight : seqWidth;

    if (seqSize > 0) {
      offsetRef.current = ((offsetRef.current % seqSize) + seqSize) % seqSize;
      const transformValue = isVertical
        ? `translate3d(0, ${-offsetRef.current}px, 0)`
        : `translate3d(${-offsetRef.current}px, 0, 0)`;
      track.style.transform = transformValue;
    }

    const animate = timestamp => {
      if (lastTimestampRef.current === null) {
        lastTimestampRef.current = timestamp;
      }

      const deltaTime = Math.max(0, timestamp - lastTimestampRef.current) / 1000;
      lastTimestampRef.current = timestamp;

      const target = isHovered && hoverSpeed !== undefined ? hoverSpeed : targetVelocity;

      const easingFactor = 1 - Math.exp(-deltaTime / ANIMATION_CONFIG.SMOOTH_TAU);
      velocityRef.current += (target - velocityRef.current) * easingFactor;

      if (seqSize > 0) {
        let nextOffset = offsetRef.current + velocityRef.current * deltaTime;
        nextOffset = ((nextOffset % seqSize) + seqSize) % seqSize;
        offsetRef.current = nextOffset;

        const transformValue = isVertical
          ? `translate3d(0, ${-offsetRef.current}px, 0)`
          : `translate3d(${-offsetRef.current}px, 0, 0)`;
        track.style.transform = transformValue;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      lastTimestampRef.current = null;
    };
  }, [targetVelocity, seqWidth, seqHeight, isHovered, hoverSpeed, isVertical, trackRef]);
};

function LogoLoopItem({ item, isVertical, gap, logoHeight, scaleOnHover, renderItem, itemKey }) {
  const liStyle = {
    marginRight: isVertical ? 0 : `${gap}px`,
    marginBottom: isVertical ? `${gap}px` : 0,
    fontSize: `${logoHeight}px`,
  };

  if (renderItem) {
    return (
      <li className={`flex-none leading-none ${scaleOnHover ? 'overflow-visible' : ''}`} style={liStyle} role="listitem">
        {renderItem(item, itemKey)}
      </li>
    );
  }

  const isNodeItem = 'node' in item;
  const scaleClass = scaleOnHover
    ? 'transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:scale-120 origin-center'
    : 'transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]';

  const content = isNodeItem ? (
    <span className={`inline-flex items-center ${scaleClass}`} aria-hidden={!!item.href && !item.ariaLabel}>
      {item.node}
    </span>
  ) : (
    <img
      src={item.src}
      srcSet={item.srcSet}
      sizes={item.sizes}
      width={item.width}
      height={item.height}
      alt={item.alt ?? ''}
      title={item.title}
      loading="lazy"
      decoding="async"
      draggable={false}
      style={{ height: `${logoHeight}px` }}
      className={`w-auto max-w-none block object-contain [image-rendering:-webkit-optimize-contrast] [-webkit-user-drag:none] pointer-events-none ${scaleClass}`}
    />
  );

  const itemAriaLabel = isNodeItem ? (item.ariaLabel ?? item.title) : (item.alt ?? item.title);

  return (
    <li className={`group flex-none leading-none ${scaleOnHover ? 'overflow-visible' : ''}`} style={liStyle} role="listitem">
      {item.href ? (
        <a
          className="inline-flex items-center no-underline rounded outline-offset-2 transition-opacity duration-200 hover:opacity-80 focus-visible:outline-2 focus-visible:outline-current"
          href={item.href}
          aria-label={itemAriaLabel || 'logo link'}
          target="_blank"
          rel="noreferrer noopener"
        >
          {content}
        </a>
      ) : (
        content
      )}
    </li>
  );
}

export const LogoLoop = memo(
  ({
    logos,
    speed = 120,
    direction = 'left',
    width = '100%',
    logoHeight = 28,
    gap = 32,
    pauseOnHover,
    hoverSpeed,
    fadeOut = false,
    fadeOutColor = 'var(--color-paper)',
    scaleOnHover = false,
    renderItem,
    ariaLabel = 'Partner logos',
    className = '',
  }) => {
    const containerRef = useRef(null);
    const trackRef = useRef(null);
    const seqRef = useRef(null);

    const [seqWidth, setSeqWidth] = useState(0);
    const [seqHeight, setSeqHeight] = useState(0);
    const [copyCount, setCopyCount] = useState(ANIMATION_CONFIG.MIN_COPIES);
    const [isHovered, setIsHovered] = useState(false);

    const effectiveHoverSpeed = useMemo(() => {
      if (hoverSpeed !== undefined) return hoverSpeed;
      if (pauseOnHover === true) return 0;
      if (pauseOnHover === false) return undefined;
      return 0;
    }, [hoverSpeed, pauseOnHover]);

    const isVertical = direction === 'up' || direction === 'down';

    const targetVelocity = useMemo(() => {
      const magnitude = Math.abs(speed);
      let directionMultiplier;
      if (isVertical) {
        directionMultiplier = direction === 'up' ? 1 : -1;
      } else {
        directionMultiplier = direction === 'left' ? 1 : -1;
      }
      const speedMultiplier = speed < 0 ? -1 : 1;
      return magnitude * directionMultiplier * speedMultiplier;
    }, [speed, direction, isVertical]);

    const updateDimensions = useCallback(() => {
      const containerWidth = containerRef.current?.clientWidth ?? 0;
      const sequenceRect = seqRef.current?.getBoundingClientRect?.();
      const sequenceWidth = sequenceRect?.width ?? 0;
      const sequenceHeight = sequenceRect?.height ?? 0;
      if (isVertical) {
        const parentHeight = containerRef.current?.parentElement?.clientHeight ?? 0;
        if (containerRef.current && parentHeight > 0) {
          const targetHeight = Math.ceil(parentHeight);
          if (containerRef.current.style.height !== `${targetHeight}px`)
            containerRef.current.style.height = `${targetHeight}px`;
        }
        if (sequenceHeight > 0) {
          setSeqHeight(Math.ceil(sequenceHeight));
          const viewport = containerRef.current?.clientHeight ?? parentHeight ?? sequenceHeight;
          const copiesNeeded = Math.ceil(viewport / sequenceHeight) + ANIMATION_CONFIG.COPY_HEADROOM;
          setCopyCount(Math.max(ANIMATION_CONFIG.MIN_COPIES, copiesNeeded));
        }
      } else if (sequenceWidth > 0) {
        setSeqWidth(Math.ceil(sequenceWidth));
        const copiesNeeded = Math.ceil(containerWidth / sequenceWidth) + ANIMATION_CONFIG.COPY_HEADROOM;
        setCopyCount(Math.max(ANIMATION_CONFIG.MIN_COPIES, copiesNeeded));
      }
    }, [isVertical]);

    useResizeObserver(updateDimensions, [containerRef, seqRef], [logos, gap, logoHeight, isVertical]);

    useImageLoader(seqRef, updateDimensions, [logos, gap, logoHeight, isVertical]);

    useAnimationLoop(trackRef, targetVelocity, seqWidth, seqHeight, isHovered, effectiveHoverSpeed, isVertical);

    const handleMouseEnter = useCallback(() => {
      if (effectiveHoverSpeed !== undefined) setIsHovered(true);
    }, [effectiveHoverSpeed]);
    const handleMouseLeave = useCallback(() => {
      if (effectiveHoverSpeed !== undefined) setIsHovered(false);
    }, [effectiveHoverSpeed]);

    const logoLists = useMemo(
      () =>
        Array.from({ length: copyCount }, (_, copyIndex) => (
          <ul
            className={`list-none m-0 p-0 flex items-center ${isVertical ? 'flex-col' : 'flex-row'}`}
            key={`copy-${copyIndex}`}
            role="list"
            aria-hidden={copyIndex > 0}
            ref={copyIndex === 0 ? seqRef : undefined}
          >
            {logos.map((item, itemIndex) => (
              <LogoLoopItem
                key={`${copyIndex}-${itemIndex}`}
                itemKey={`${copyIndex}-${itemIndex}`}
                item={item}
                isVertical={isVertical}
                gap={gap}
                logoHeight={logoHeight}
                scaleOnHover={scaleOnHover}
                renderItem={renderItem}
              />
            ))}
          </ul>
        )),
      [copyCount, logos, isVertical, gap, logoHeight, scaleOnHover, renderItem]
    );

    const resolvedWidth = isVertical
      ? toCssLength(width) === '100%'
        ? undefined
        : toCssLength(width)
      : (toCssLength(width) ?? '100%');

    return (
      <div
        ref={containerRef}
        style={{ width: resolvedWidth, ...(scaleOnHover ? { paddingTop: `${logoHeight * 0.1}px`, paddingBottom: `${logoHeight * 0.1}px` } : {}) }}
        className={`relative ${isVertical ? 'h-full inline-block' : ''} ${className}`}
        role="region"
        aria-label={ariaLabel}
      >
        <div
          ref={trackRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className={`flex ${isVertical ? 'flex-col w-full h-max' : 'flex-row w-max'} will-change-transform select-none relative z-0`}
        >
          {logoLists}
        </div>

        {fadeOut && (
          <div
            aria-hidden="true"
            className={`absolute pointer-events-none z-10 ${
              isVertical
                ? 'left-0 right-0 top-0 w-full h-[clamp(24px,8%,120px)]'
                : 'top-0 bottom-0 left-0 w-[clamp(24px,8%,120px)]'
            }`}
            style={{
              background: isVertical
                ? `linear-gradient(to bottom, ${fadeOutColor} 0%, rgba(0, 0, 0, 0) 100%)`
                : `linear-gradient(to right, ${fadeOutColor} 0%, rgba(0, 0, 0, 0) 100%)`,
            }}
          />
        )}
        {fadeOut && (
          <div
            aria-hidden="true"
            className={`absolute pointer-events-none z-10 ${
              isVertical
                ? 'left-0 right-0 bottom-0 w-full h-[clamp(24px,8%,120px)]'
                : 'top-0 bottom-0 right-0 w-[clamp(24px,8%,120px)]'
            }`}
            style={{
              background: isVertical
                ? `linear-gradient(to top, ${fadeOutColor} 0%, rgba(0, 0, 0, 0) 100%)`
                : `linear-gradient(to left, ${fadeOutColor} 0%, rgba(0, 0, 0, 0) 100%)`,
            }}
          />
        )}
      </div>
    );
  }
);

LogoLoop.displayName = 'LogoLoop';

export default LogoLoop;
