import { useEffect } from "react";
import { motion } from "motion/react";

export function PhoneIntro({ 
  onComplete,
}: { 
  onComplete: () => void;
}) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ delay: 2.0, duration: 0.8, ease: "easeInOut" }}
      onAnimationComplete={onComplete}
      className="fixed inset-0 z-[110] flex items-center justify-center bg-maroon-dark/98 backdrop-blur-md overflow-hidden"
    >
      <div className="relative flex flex-col items-center">
        {/* Pulsing background rings */}
        <div className="absolute inset-0 flex items-center justify-center -z-10 pointer-events-none">
          <motion.div
            animate={{ scale: [1, 2, 3], opacity: [0.5, 0, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
            className="absolute w-32 h-32 bg-[#34A853]/20 rounded-full"
          />
          <motion.div
            animate={{ scale: [1, 2, 3], opacity: [0.5, 0, 0] }}
            transition={{ duration: 1.5, delay: 0.5, repeat: Infinity, ease: "easeOut" }}
            className="absolute w-32 h-32 bg-[#34A853]/20 rounded-full"
          />
        </div>

        <motion.div
          animate={{ 
            rotate: [0, -15, 15, -15, 15, -15, 15, 0],
            scale: [1, 1.1, 1.1, 1.1, 1.1, 1.1, 1.1, 1]
          }}
          transition={{ duration: 0.5, repeat: 3 }}
          className="w-28 h-28 md:w-32 md:h-32 bg-cream shadow-2xl rounded-full flex items-center justify-center border-4 border-maroon overflow-hidden relative"
        >
          <div className="absolute inset-0 border-[3px] border-[#34A853]/30 rounded-full scale-[1.1]" />
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-14 h-14 md:w-16 md:h-16">
            <path d="M19.062 14.509a2.766 2.766 0 0 1 .802 1.637l.426 2.052a2.38 2.38 0 0 1-1.639 2.76A18.8 18.8 0 0 1 10.5 21a18.8 18.8 0 0 1-7.5-3.328A18.66 18.66 0 0 1 3.328 10.5a18.8 18.8 0 0 1 1.631-7.868 2.38 2.38 0 0 1 2.748-1.523l2.062.394a2.77 2.77 0 0 1 2.083 1.99l.86 3.013a2.76 2.76 0 0 1-.502 2.368l-1.378 1.63a12.87 12.87 0 0 0 5.438 5.674l1.696-1.228a2.76 2.76 0 0 1 2.333-.538l2.963.8Z" fill="#34A853"/>
          </svg>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-10 text-center"
        >
          <span className="font-sans text-[10px] tracking-[0.4em] uppercase text-gold/80 font-medium">Connecting</span>
          <h2 className="font-serif text-3xl md:text-4xl text-cream mt-3 tracking-wide">Dialing...</h2>
        </motion.div>
      </div>
    </motion.div>
  );
}
