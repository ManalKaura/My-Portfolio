import { motion } from "framer-motion";

interface HandWrittenTitleProps {
  title?: string;
  subtitle?: string;
  strokeColor?: string;
  titleClassName?: string;
  subtitleClassName?: string;
  className?: string;
}

function HandWrittenTitle({
  title = "Hand Written",
  subtitle,
  strokeColor,
  titleClassName,
  subtitleClassName,
  className = "relative w-full max-w-4xl mx-auto py-16 sm:py-20 md:py-24 px-4",
}: HandWrittenTitleProps) {
  const draw = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { duration: 2.5, ease: [0.43, 0.13, 0.23, 0.96] as [number, number, number, number] },
        opacity: { duration: 0.5 },
      },
    },
  };

  return (
    <div className={className}>
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <motion.svg
          width="100%"
          height="100%"
          viewBox="0 0 1200 600"
          initial="hidden"
          animate="visible"
          className="w-full h-full drop-shadow-[0_0_15px_rgba(251,146,60,0.35)]"
        >
          <title>KokonutUI</title>
          <motion.path
            d="M 950 90 
               C 1250 300, 1050 480, 600 520
               C 250 520, 150 480, 150 300
               C 150 120, 350 80, 600 80
               C 850 80, 950 180, 950 180"
            fill="none"
            strokeWidth="12"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            variants={draw}
            className={strokeColor || "text-orange-400 dark:text-orange-400 opacity-90"}
          />
        </motion.svg>
      </div>
      <div className="relative text-center z-10 flex flex-col items-center justify-center">
        <motion.h1
          className={
            titleClassName ||
            "text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[115%] bg-gradient-to-b from-white via-slate-100 to-slate-400 bg-clip-text text-transparent flex items-center justify-center gap-2"
          }
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p
            className={
              subtitleClassName ||
              "text-base sm:text-lg md:text-xl text-slate-400 max-w-xl mx-auto mt-3 font-medium tracking-wide"
            }
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </div>
  );
}

export { HandWrittenTitle };
export default HandWrittenTitle;
