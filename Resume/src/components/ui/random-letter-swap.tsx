import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, type Transition } from 'framer-motion';

export interface RandomLetterSwapProps {
  label: string;
  className?: string;
  staggerDuration?: number;
  transition?: Transition;
  characters?: string;
  onClick?: (e: React.MouseEvent) => void;
  href?: string;
}

const DEFAULT_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&*';

interface SingleLetterProps {
  char: string;
  index: number;
  isHovered: boolean;
  staggerDuration: number;
  transition: Transition;
  characters: string;
}

const SingleLetter: React.FC<SingleLetterProps> = ({
  char,
  index,
  isHovered,
  staggerDuration,
  transition,
  characters,
}) => {
  const bottomRef = useRef<HTMLSpanElement>(null);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    if (char === ' ') return;

    if (isHovered) {
      let count = 0;
      const maxFlips = 3;
      const delayMs = index * staggerDuration * 1000;

      const timeoutId = setTimeout(() => {
        const scramble = () => {
          if (count < maxFlips && bottomRef.current) {
            bottomRef.current.textContent =
              characters[Math.floor(Math.random() * characters.length)];
            count++;
            animationFrameRef.current = requestAnimationFrame(() => {
              setTimeout(scramble, 35);
            });
          } else if (bottomRef.current) {
            bottomRef.current.textContent = char;
          }
        };
        scramble();
      }, delayMs);

      return () => {
        clearTimeout(timeoutId);
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
      };
    } else {
      if (bottomRef.current) {
        bottomRef.current.textContent = char;
      }
    }
  }, [isHovered, char, index, staggerDuration, characters]);

  if (char === ' ') {
    return <span className="inline-block w-[0.3em]">&nbsp;</span>;
  }

  const charTransition: Transition = {
    type: 'spring',
    stiffness: 400,
    damping: 28,
    mass: 0.8,
    ...transition,
    delay: index * staggerDuration,
  };

  return (
    <span className="relative inline-flex flex-col overflow-hidden h-[1.3em] select-none">
      {/* Top character that slides up and out */}
      <motion.span
        animate={{
          y: isHovered ? '-100%' : '0%',
          opacity: isHovered ? 0 : 1,
        }}
        transition={charTransition}
        className="inline-block"
      >
        {char}
      </motion.span>

      {/* Bottom character that slides in from beneath */}
      <motion.span
        ref={bottomRef}
        aria-hidden
        animate={{
          y: isHovered ? '0%' : '100%',
          opacity: isHovered ? 1 : 0,
        }}
        transition={charTransition}
        className="absolute inset-0 flex items-center justify-center font-bold text-orange-400"
      >
        {char}
      </motion.span>
    </span>
  );
};

export const RandomLetterSwap: React.FC<RandomLetterSwapProps> = ({
  label,
  className = '',
  staggerDuration = 0.02,
  transition = { type: 'spring', stiffness: 420, damping: 26 },
  characters = DEFAULT_CHARS,
  onClick,
  href,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
  }, []);

  const content = (
    <motion.span
      className={`inline-flex items-center cursor-pointer ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      initial={false}
    >
      {label.split('').map((char, i) => (
        <SingleLetter
          key={`${i}-${char}`}
          char={char}
          index={i}
          isHovered={isHovered}
          staggerDuration={staggerDuration}
          transition={transition}
          characters={characters}
        />
      ))}
    </motion.span>
  );

  if (href) {
    return (
      <a href={href} className="inline-block no-underline">
        {content}
      </a>
    );
  }

  return content;
};
