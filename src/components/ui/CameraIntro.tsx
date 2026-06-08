import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { BatteryMedium, Focus } from "lucide-react";

export function CameraIntro({ onComplete }: { onComplete: () => void; }) {
  const [time, setTime] = useState(0);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    
    // Simulate timecode running
    const interval = setInterval(() => {
      setTime(t => t + 1);
    }, 1000);

    return () => {
      document.body.style.overflow = "auto";
      clearInterval(interval);
    };
  }, []);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 1, 1, 0] }}
      transition={{ duration: 4.0, times: [0, 0.1, 0.9, 1], ease: "easeInOut" }}
      onAnimationComplete={onComplete}
      className="fixed inset-0 z-[110] flex items-center justify-center bg-[#111111] overflow-hidden font-mono text-white select-none"
    >
      {/* Viewfinder Frame */}
      <div className="absolute inset-8 border-[1px] border-white/20 pointer-events-none" />

      {/* Focus effect animation (blurring in and out) */}
      <motion.div
        animate={{ 
          filter: ["blur(10px)", "blur(0px)", "blur(2px)", "blur(0px)"],
          scale: [1.1, 1, 1.02, 1]
        }}
        transition={{ duration: 2.0, times: [0, 0.4, 0.7, 1], ease: "easeOut" }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        <div className="text-center">
             <div className="font-serif text-5xl md:text-7xl tracking-[0.2em] uppercase font-bold text-white/90 drop-shadow-2xl mb-4">
                 Branding
             </div>
             <div className="text-white/60 tracking-[0.5em] uppercase text-sm">
                 Visual Identity
             </div>
        </div>
      </motion.div>

      {/* Overlays (Stay sharp) */}
      <div className="absolute inset-x-12 inset-y-12 z-20 pointer-events-none">
        {/* Top Left - REC */}
        <div className="absolute top-0 left-0 flex items-center gap-3">
          <motion.div 
            animate={{ opacity: [1, 0, 1] }} 
            transition={{ duration: 1, repeat: Infinity }}
            className="w-4 h-4 bg-red-600 rounded-full shadow-[0_0_10px_rgba(220,38,38,0.8)]"
          />
          <span className="text-lg font-bold tracking-widest text-shadow-sm">REC</span>
        </div>

        {/* Top Right - Battery */}
        <div className="absolute top-0 right-0 flex items-center gap-2 text-green-500">
          <div className="w-12 h-6 border-2 border-white rounded-sm flex p-[2px] relative relative">
              <div className="w-[80%] h-full bg-green-500 rounded-[1px]" />
              <div className="absolute -right-2 top-1.5 w-1.5 h-2 bg-white rounded-r-sm" />
          </div>
        </div>

        {/* Center Crosshairs */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-50">
            {/* Center + */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-px bg-white" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-px h-8 bg-white" />
            
            {/* Brackets */}
            <div className="absolute -top-16 -left-16 w-8 h-8 border-t-2 border-l-2 border-white" />
            <div className="absolute -top-16 -right-16 w-8 h-8 border-t-2 border-r-2 border-white" />
            <div className="absolute -bottom-16 -left-16 w-8 h-8 border-b-2 border-l-2 border-white" />
            <div className="absolute -bottom-16 -right-16 w-8 h-8 border-b-2 border-r-2 border-white" />
        </div>

        {/* Corner Brackets (Outer) */}
        <div className="absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4 border-white" />
        <div className="absolute top-0 right-0 w-16 h-16 border-t-4 border-r-4 border-white" />
        <div className="absolute bottom-0 left-0 w-16 h-16 border-b-4 border-l-4 border-white" />
        <div className="absolute bottom-0 right-0 w-16 h-16 border-b-4 border-r-4 border-white" />

        {/* Bottom Center - Timecode */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xl tracking-wider font-semibold">
          {formatTime(time)}
        </div>
      </div>

      {/* Shutter Click Flash */}
      <motion.div
        animate={{ opacity: [0, 0, 1, 0] }}
        transition={{ duration: 4.0, times: [0, 0.4, 0.45, 0.5] }}
        className="absolute inset-0 bg-white mix-blend-overlay z-30 pointer-events-none"
      />
    </motion.div>
  );
}
