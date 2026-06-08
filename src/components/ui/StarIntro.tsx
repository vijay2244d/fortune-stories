import { useEffect } from "react";
import { motion } from "motion/react";
import { Star } from "lucide-react";

export function StarIntro({ onComplete }: { onComplete: () => void }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const starVariants = {
    initial: { scale: 0, rotate: -180, opacity: 0 },
    animate: (i: number) => ({
      scale: [0, 1.2, 1],
      rotate: 0,
      opacity: 1,
      transition: {
        delay: i * 0.2,
        duration: 0.6,
        ease: "easeOut" as const,
      },
    }),
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ delay: 3.0, duration: 0.6, ease: "easeInOut" }}
      onAnimationComplete={onComplete}
      className="fixed inset-0 z-[110] flex flex-col items-center justify-center bg-maroon-dark/98 backdrop-blur-md overflow-hidden select-none"
    >
      {/* Light glow in the background */}
      <div className="absolute w-[400px] h-[400px] bg-gold/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative flex flex-col items-center">
        {/* Animated 5 Stars Row */}
        <div className="flex gap-2 mb-6">
          {[0, 1, 2, 3, 4].map((index) => (
            <motion.div
              key={index}
              custom={index}
              initial="initial"
              animate="animate"
              variants={starVariants}
              className="text-gold"
            >
              <Star className="w-8 h-8 md:w-12 md:h-12 fill-gold drop-shadow-[0_0_10px_rgba(197,160,89,0.5)]" />
            </motion.div>
          ))}
        </div>

        {/* Text Fade-in */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8, ease: "easeOut" }}
          className="text-center"
        >
          <h2 className="font-serif text-3xl md:text-5xl text-cream tracking-wide mb-2">
            Client Stories
          </h2>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "80px" }}
            transition={{ delay: 1.5, duration: 0.8 }}
            className="h-px bg-gold/50 mx-auto my-3"
          />
          <p className="font-sans text-[10px] md:text-xs tracking-[0.4em] uppercase text-gold/80 font-medium">
            Fortune Stories
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}
