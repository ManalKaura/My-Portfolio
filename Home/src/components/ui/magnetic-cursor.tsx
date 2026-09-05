import { useRef, useEffect, FC, ReactNode, useState } from 'react';
import gsap from 'gsap';
import { vec2, Vector2 as Vec2 } from 'vecteur';

interface MagneticCursorProps {
  children: ReactNode;
  magneticFactor?: number;
  lerpAmount?: number;
  hoverPadding?: number;
  hoverAttribute?: string;
  cursorSize?: number;
  cursorColor?: string;
  blendMode?: 'difference' | 'exclusion' | 'normal' | 'screen' | 'overlay';
  cursorClassName?: string;
  shape?: 'circle' | 'square' | 'rounded-square';
  disableOnTouch?: boolean;
  speedMultiplier?: number;
  maxScaleX?: number;
  maxScaleY?: number;
  /** 
   * Boosts background contrast before blending. 
   * Higher values (1.5 - 2.0) fix visibility on low-contrast/dim backgrounds.
   * Default: 1.5 (150%)
   */
  contrastBoost?: number;
}

interface CursorState {
  el: HTMLDivElement | null;
  pos: {
    current: Vec2;
    target: Vec2;
    previous: Vec2;
  };
  hover: { isHovered: boolean };
  hoveredElement: HTMLElement | null;
  isDetaching: boolean;
}

export const MagneticCursor: FC<MagneticCursorProps> = ({
  children,
  lerpAmount = 0.1,
  magneticFactor = 0.2,
  hoverPadding = 12,
  hoverAttribute = 'data-magnetic',
  cursorSize = 24,
  cursorColor = 'white', // Pure white works best for exclusion/difference
  blendMode = 'exclusion', // Exclusion is safer than difference for text
  cursorClassName = '',
  shape = 'circle',
  disableOnTouch = true,
  speedMultiplier = 0.02,
  maxScaleX = 1,
  maxScaleY = 0.3,
  contrastBoost = 1.5, // 1.5x contrast boost by default
}) => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorStateRef = useRef<CursorState | null>(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const configRef = useRef({
    magneticFactor,
    speedMultiplier,
    maxScaleX,
    maxScaleY,
    cursorSize,
    lerpAmount,
    hoverPadding,
  });

  useEffect(() => {
    configRef.current = {
      magneticFactor,
      speedMultiplier,
      maxScaleX,
      maxScaleY,
      cursorSize,
      lerpAmount,
      hoverPadding,
    };
  }, [magneticFactor, speedMultiplier, maxScaleX, maxScaleY, cursorSize, lerpAmount, hoverPadding]);

  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  useEffect(() => {
    if (disableOnTouch && isTouchDevice) return;
    const cursorEl = cursorRef.current;
    if (!cursorEl) return;

    gsap.set(cursorEl, { xPercent: -50, yPercent: -50 });

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const detachDuration = prefersReducedMotion ? 0.1 : 0.25;

    if (!cursorStateRef.current) {
      cursorStateRef.current = {
        el: cursorEl,
        pos: {
          current: vec2(-100, -100),
          target: vec2(-100, -100),
          previous: vec2(-100, -100),
        },
        hover: { isHovered: false },
        hoveredElement: null,
        isDetaching: false,
      };
    }

    const resetHoverState = (immediate = false) => {
      const state = cursorStateRef.current;
      if (!state) return;

      state.hover.isHovered = false;
      state.hoveredElement = null;
      state.isDetaching = true;

      gsap.killTweensOf(cursorEl);

      const shapeBorderRadius = shape === 'circle' ? '50%' : shape === 'square' ? '0' : '8px';

      if (immediate) {
        state.pos.current.x = state.pos.target.x;
        state.pos.current.y = state.pos.target.y;
        state.pos.previous.x = state.pos.target.x;
        state.pos.previous.y = state.pos.target.y;

        gsap.set(cursorEl, {
          x: state.pos.target.x,
          y: state.pos.target.y,
          width: cursorSize,
          height: cursorSize,
          borderRadius: shapeBorderRadius,
          backgroundColor: cursorColor,
          scaleX: 1,
          scaleY: 1,
          rotate: 0,
          overwrite: 'auto',
        });
        state.isDetaching = false;
      } else {
        gsap.to(cursorEl, {
          width: cursorSize,
          height: cursorSize,
          borderRadius: shapeBorderRadius,
          backgroundColor: cursorColor,
          scaleX: 1,
          scaleY: 1,
          duration: detachDuration,
          ease: 'power3.out',
          overwrite: 'auto',
          onComplete: () => {
            state.isDetaching = false;
          },
        });
      }
    };

    const update = () => {
      const state = cursorStateRef.current;
      if (!state) return;

      // If hovered element was removed from DOM or unmounted during navigation, release immediately
      if (state.hover.isHovered) {
        if (!state.hoveredElement || !state.hoveredElement.isConnected) {
          resetHoverState(true);
        } else {
          return;
        }
      }

      const { speedMultiplier, maxScaleX, maxScaleY, lerpAmount } = configRef.current;
      const effectiveLerp = prefersReducedMotion ? 1 : lerpAmount;

      state.pos.current.lerp(state.pos.target, effectiveLerp);
      const delta = state.pos.current.clone().sub(state.pos.previous);
      state.pos.previous.copy(state.pos.current);

      if (state.isDetaching) {
        gsap.set(state.el, {
          x: state.pos.current.x,
          y: state.pos.current.y,
          scaleX: 1,
          scaleY: 1,
          rotate: 0,
          overwrite: 'auto',
        });
      } else {
        const speed = Math.sqrt(delta.x * delta.x + delta.y * delta.y) * speedMultiplier;
        gsap.set(state.el, {
          x: state.pos.current.x,
          y: state.pos.current.y,
          rotate: Math.atan2(delta.y, delta.x) * (180 / Math.PI),
          scaleX: 1 + Math.min(speed, maxScaleX),
          scaleY: 1 - Math.min(speed, maxScaleY),
          overwrite: 'auto',
        });
      }
    };

    const initializePosition = (event: MouseEvent) => {
      const state = cursorStateRef.current;
      if (!state) return;
      const x = event.clientX;
      const y = event.clientY;
      state.pos.current.x = x;
      state.pos.current.y = y;
      state.pos.target.x = x;
      state.pos.target.y = y;
      state.pos.previous.x = x;
      state.pos.previous.y = y;
      gsap.set(cursorEl, { x, y, opacity: 1 });
    };

    const onMouseMove = (event: PointerEvent) => {
      const state = cursorStateRef.current;
      if (!state) return;

      state.pos.target.x = event.clientX;
      state.pos.target.y = event.clientY;

      const isInViewport =
        event.clientX >= 0 &&
        event.clientX <= window.innerWidth &&
        event.clientY >= 0 &&
        event.clientY <= window.innerHeight;

      gsap.to(cursorEl, { opacity: isInViewport ? 1 : 0, duration: 0.2, overwrite: 'auto' });

      // If currently hovered element is unmounted or cursor strayed outside its bounds, release
      if (state.hover.isHovered) {
        if (!state.hoveredElement || !state.hoveredElement.isConnected) {
          resetHoverState(true);
        } else {
          const bounds = state.hoveredElement.getBoundingClientRect();
          const margin = configRef.current.hoverPadding * 2 + 40;
          if (
            event.clientX < bounds.left - margin ||
            event.clientX > bounds.right + margin ||
            event.clientY < bounds.top - margin ||
            event.clientY > bounds.bottom + margin
          ) {
            resetHoverState(false);
          }
        }
      }

      const target = event.target as HTMLElement;
      const isTextContent =
        ['P', 'SPAN', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6'].includes(target.tagName) ||
        window.getComputedStyle(target).cursor === 'text';

      if (isTextContent && !state.hover.isHovered && !state.isDetaching) {
        gsap.to(cursorEl, { scaleX: 0.5, scaleY: 1.5, duration: 0.3, overwrite: 'auto' });
      }
    };

    const handleMouseLeave = () => gsap.to(cursorEl, { opacity: 0, duration: 0.3 });
    const handleMouseEnter = () => gsap.to(cursorEl, { opacity: 1, duration: 0.3 });

    // On click or navigation, immediately release any magnetic hold so it never gets stuck
    const handlePointerDownOrClick = () => {
      resetHoverState(false);
    };

    const handleNavigationReset = () => {
      resetHoverState(true);
    };

    gsap.ticker.add(update);
    window.addEventListener('pointermove', onMouseMove);
    window.addEventListener('pointermove', initializePosition, { once: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('pointerdown', handlePointerDownOrClick);
    window.addEventListener('click', handlePointerDownOrClick);
    window.addEventListener('hashchange', handleNavigationReset);
    window.addEventListener('popstate', handleNavigationReset);

    const cleanupFunctions: (() => void)[] = [];
    const boundElements = new WeakSet<HTMLElement>();

    const bindElement = (el: HTMLElement) => {
      if (boundElements.has(el)) return;
      boundElements.add(el);

      const xTo = gsap.quickTo(el, 'x', { duration: 1, ease: 'elastic.out(1, 0.3)' });
      const yTo = gsap.quickTo(el, 'y', { duration: 1, ease: 'elastic.out(1, 0.3)' });

      const handlePointerEnter = () => {
        const state = cursorStateRef.current;
        if (!state) return;
        const { magneticFactor, hoverPadding } = configRef.current;

        state.hover.isHovered = true;
        state.hoveredElement = el;
        state.isDetaching = false;

        const bounds = el.getBoundingClientRect();
        const computedStyle = window.getComputedStyle(el);
        const magneticColor = el.getAttribute('data-magnetic-color') || cursorColor;
        const dynamicPadding = hoverPadding * (1 + magneticFactor);
        const centerX = bounds.left + bounds.width / 2;
        const centerY = bounds.top + bounds.height / 2;

        gsap.killTweensOf(cursorEl);
        gsap.to(cursorEl, {
          x: centerX,
          y: centerY,
          width: bounds.width + dynamicPadding * 2,
          height: bounds.height + dynamicPadding * 2,
          borderRadius: computedStyle.borderRadius,
          backgroundColor: magneticColor,
          scaleX: 1,
          scaleY: 1,
          rotate: 0,
          duration: 0.3,
          ease: 'power3.out',
          overwrite: 'auto',
        });
      };

      const handlePointerLeave = () => {
        resetHoverState(false);
      };

      const handleElementClick = () => {
        // When clicking a button/link, instantly release the cursor hold
        resetHoverState(true);
      };

      let rafId: number | null = null;
      const handlePointerMove = (event: PointerEvent) => {
        if (rafId) return;
        rafId = requestAnimationFrame(() => {
          const { clientX, clientY } = event;
          const { height, width, left, top } = el.getBoundingClientRect();
          const { magneticFactor } = configRef.current;
          xTo((clientX - (left + width / 2)) * magneticFactor);
          yTo((clientY - (top + height / 2)) * magneticFactor);
          rafId = null;
        });
      };

      const handlePointerOut = () => {
        xTo(0);
        yTo(0);
      };

      el.addEventListener('pointerenter', handlePointerEnter);
      el.addEventListener('pointerleave', handlePointerLeave);
      el.addEventListener('pointermove', handlePointerMove);
      el.addEventListener('pointerout', handlePointerOut);
      el.addEventListener('click', handleElementClick);

      cleanupFunctions.push(() => {
        el.removeEventListener('pointerenter', handlePointerEnter);
        el.removeEventListener('pointerleave', handlePointerLeave);
        el.removeEventListener('pointermove', handlePointerMove);
        el.removeEventListener('pointerout', handlePointerOut);
        el.removeEventListener('click', handleElementClick);
      });
    };

    const scanAndBind = () => {
      const magneticElements = gsap.utils.toArray<HTMLElement>(`[${hoverAttribute}]`);
      magneticElements.forEach(bindElement);
    };

    scanAndBind();

    // Auto-bind dynamic elements as routes change or components mount
    const observer = new MutationObserver(() => {
      scanAndBind();
    });
    observer.observe(document.body, { childList: true, subtree: true });
    cleanupFunctions.push(() => observer.disconnect());

    return () => {
      gsap.ticker.remove(update);
      window.removeEventListener('pointermove', onMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('pointerdown', handlePointerDownOrClick);
      window.removeEventListener('click', handlePointerDownOrClick);
      window.removeEventListener('hashchange', handleNavigationReset);
      window.removeEventListener('popstate', handleNavigationReset);
      cleanupFunctions.forEach((cleanup) => cleanup());
    };
  }, [disableOnTouch, isTouchDevice, hoverPadding, hoverAttribute, cursorColor, shape]);

  if (disableOnTouch && isTouchDevice) return <>{children}</>;

  const styles: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: 9999,
    pointerEvents: 'none',
    opacity: 0, // initially hidden until mouse enters
    willChange: 'transform, width, height, border-radius',
    backgroundColor: cursorColor,
    mixBlendMode: blendMode as any,
    width: cursorSize,
    height: cursorSize,
    borderRadius: shape === 'circle' ? '50%' : shape === 'square' ? '0' : '8px',
    // Contrast Boost using backdrop-filter
    backdropFilter: contrastBoost !== 1 ? `contrast(${contrastBoost})` : 'none',
    WebkitBackdropFilter: contrastBoost !== 1 ? `contrast(${contrastBoost})` : 'none',
  };

  return (
    <>
      <div ref={cursorRef} className={`magnetic-cursor ${cursorClassName}`} style={styles} />
      {children}
    </>
  );
};

export default MagneticCursor;
