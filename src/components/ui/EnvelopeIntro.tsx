import { useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

export function EnvelopeIntro({ 
  onComplete,
  label = "Invitation",
  title = "Birthday",
  subtitle = "Celebration",
  delay = 3.0
}: { 
  onComplete: () => void;
  label?: string;
  title?: string;
  subtitle?: string;
  delay?: number;
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
      transition={{ delay: delay, duration: 1.0, ease: "easeInOut" }}
      onAnimationComplete={onComplete}
      className="fixed inset-0 z-[110] flex items-center justify-center bg-maroon-dark/95 backdrop-blur-sm overflow-hidden"
    >
      <div className="relative w-[340px] h-[220px]">
        {/* Open Flap (Back) */}
        <motion.div
          initial={{ rotateX: -90 }}
          animate={{ rotateX: 0 }}
          transition={{ delay: 1.0, duration: 0.4, ease: "easeOut" }}
          className="absolute w-full h-[130px] z-[1]"
          style={{ top: "-130px", transformOrigin: "bottom", perspective: 1000 }}
        >
          <svg className="w-full h-full drop-shadow-sm" viewBox="0 0 340 130" preserveAspectRatio="none">
            <polygon points="0,130 340,130 170,0" fill="#d4c4a8" />
          </svg>
        </motion.div>

        {/* Back interior of Envelope */}
        <div className="absolute inset-0 bg-[#c5a059] opacity-40 shadow-inner rounded-b-sm z-[2]" />
        <div className="absolute inset-0 bg-[#d4c4a8] shadow-inner rounded-b-sm z-[1]" />

        {/* Letter / Card pulling up */}
        <motion.div
          initial={{ y: 0, scale: 1 }}
          animate={{ y: -160, scale: 1.1 }}
          transition={{ delay: 1.5, duration: 0.8, type: "spring", stiffness: 60, damping: 15 }}
          className="absolute left-3 right-3 bottom-2 top-3 bg-[#fbf9f4] shadow-2xl flex flex-col items-center p-3 border border-[#eaddc4] rounded-sm z-[3]"
        >
          <div className="font-serif text-[#4a0d10] border-[1.5px] border-[#c5a059]/40 w-full h-full flex flex-col items-center justify-center pt-8 pb-4 relative bg-cream">
            <span className="absolute top-4 font-sans text-[9px] tracking-[0.4em] uppercase text-[#631215]/60 font-medium">{label}</span>
            <div className="leading-none text-center mt-2">
              <span className="text-3xl tracking-wide">{title}</span>
              <br />
              <span className="italic text-2xl text-[#631215]/80">{subtitle}</span>
            </div>
            <div className="w-10 h-px bg-[#c5a059]/50 mt-6" />
          </div>
        </motion.div>

        {/* Front Flaps */}
        <div className="absolute inset-0 z-[4] drop-shadow-2xl">
          <svg className="w-full h-full" viewBox="0 0 340 220" preserveAspectRatio="none">
            <polygon points="0,0 170,130 0,220" fill="#eaddc4" />
            <polygon points="340,0 170,130 340,220" fill="#eaddc4" />
            <polygon points="0,220 170,130 340,220" fill="#dfcead" />
          </svg>
        </div>

        {/* Closed Flap (Top) */}
        <motion.div
          initial={{ rotateX: 0 }}
          animate={{ rotateX: 90 }}
          transition={{ delay: 0.6, duration: 0.4, ease: "easeIn" }}
          className="absolute top-0 left-0 w-full h-[130px] z-[5]"
          style={{ transformOrigin: "top", perspective: 1000 }}
        >
          <svg className="w-full h-full drop-shadow-xl" viewBox="0 0 340 130" preserveAspectRatio="none">
            <polygon points="0,0 340,0 170,130" fill="#f0e2ca" />
            <line x1="0" y1="0" x2="170" y2="130" stroke="#c5a059" strokeWidth="1" strokeOpacity="0.3" />
            <line x1="340" y1="0" x2="170" y2="130" stroke="#c5a059" strokeWidth="1" strokeOpacity="0.3" />
          </svg>
          <div className="absolute top-[110px] left-1/2 -translate-x-1/2 w-10 h-10 bg-[#c5a059] rounded-full shadow-lg flex items-center justify-center opacity-90">
             <span className="font-serif italic text-[#4a0d10] text-sm">FS</span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
