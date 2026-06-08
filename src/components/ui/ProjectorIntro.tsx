import { useEffect } from "react";
import { motion } from "motion/react";

export function ProjectorIntro({ onComplete }: { onComplete: () => void; }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: [1, 1, 0] }}
      transition={{ duration: 5.0, times: [0, 0.9, 1], ease: "easeInOut" }}
      onAnimationComplete={onComplete}
      className="fixed inset-0 z-[110] flex items-start justify-center font-sans pointer-events-none"
      style={{ perspective: "1500px" }}
    >
      {/* Screen container */}
      <motion.div
        initial={{ height: "0vh", rotateX: 90, y: -100 }}
        animate={{ 
          height: ["0vh", "82vh", "68vh", "78vh", "73vh", "75vh", "75vh", "0vh"],
          rotateX: [90, -30, 18, -10, 5, 0, 0, 75],
          y: [-100, 0, 0, 0, 0, 0, 0, -100]
        }}
        transition={{ 
          duration: 5.0,
          times: [0, 0.15, 0.25, 0.35, 0.45, 0.55, 0.85, 1],
          ease: "easeInOut" 
        }}
        className="relative mt-8 w-[80%] max-w-3xl bg-white shadow-[0_30px_60px_rgba(0,0,0,0.6)] z-20 flex flex-col pointer-events-auto"
        style={{ transformOrigin: "top" }}
      >
        {/* Screen content area */}
        <div className="w-full flex-grow p-8 flex flex-col items-center justify-center bg-[#f4f5f7] relative overflow-hidden">
          {/* Subtle noise/texture overlay for the screen */}
          <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')" }} />
          
          {/* Edge shadow for realism */}
          <div className="absolute inset-0 shadow-[inset_0_0_40px_rgba(0,0,0,0.1)] pointer-events-none" />

          {/* Main content - faded in slightly after screen comes down */}
          <motion.div
            animate={{ 
              opacity: [0, 0, 1, 1, 0],
              filter: ["blur(10px)", "blur(10px)", "blur(0px)", "blur(0px)", "blur(5px)"],
              scale: [0.95, 0.95, 1, 1, 0.95]
            }}
            transition={{ 
              duration: 4.5,
              times: [0, 0.25, 0.45, 0.65, 0.75],
              ease: "easeOut"
            }}
            className="flex flex-col items-center z-10 text-center mix-blend-multiply"
          >
            <div className="font-serif text-4xl sm:text-5xl md:text-7xl lg:text-8xl text-slate-800 font-bold uppercase mb-4 sm:mb-6 tracking-tight" style={{ textShadow: "0px 2px 15px rgba(0,0,0,0.15)" }}>
              Corporate
            </div>
            <div className="w-24 sm:w-32 h-1 sm:h-1.5 bg-slate-400/80 mb-4 sm:mb-6 rounded-full" />
            <div className="font-sans text-xl sm:text-3xl md:text-4xl lg:text-5xl tracking-[0.3em] sm:tracking-[0.5em] text-slate-600 uppercase font-light">
              Events
            </div>
          </motion.div>
        </div>
        
        {/* Bottom bar of screen */}
        <div className="w-full h-8 bg-gradient-to-b from-gray-200 to-gray-400 shadow-md border-t border-gray-400 z-30 flex items-center justify-center">
             <div className="w-20 h-1.5 bg-gray-500/50 rounded-full shadow-inner" />
        </div>
      </motion.div>
      
    </motion.div>
  );
}
