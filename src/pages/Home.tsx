import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import ColorBends from "../components/ui/ColorBends";

export default function Home() {
  return (
    <div className="w-full flex flex-col justify-center items-center text-center relative z-10 py-4">
      {/* Dynamic background element */}
      <div className="fixed inset-0 -z-10 overflow-hidden opacity-40 pointer-events-none">
        <ColorBends
          colors={["#c5a059", "#4a0d10", "#631215"]}
          rotation={45}
          speed={0.12}
          scale={1.2}
          frequency={0.8}
          warpStrength={1.2}
          mouseInfluence={0.5}
          noise={0.1}
          parallax={0.3}
          iterations={2}
          intensity={1.2}
          bandWidth={5}
          transparent
        />
        <div className="absolute inset-0 bg-gradient-to-b from-maroon via-transparent to-maroon" />
      </div>

      <div className="max-w-4xl mx-auto flex flex-col items-center gap-6 md:gap-8 px-4">
        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-gold tracking-[0.35em] font-sans uppercase text-[10px] sm:text-xs md:text-sm"
        >
          We are Branding Experts
        </motion.p>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, delay: 0.2, ease: "easeOut" }}
          className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-[1.15] tracking-tight"
        >
          Crafting <br />
          <span className="italic text-cream-muted font-normal">Unforgettable</span> Stories
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="text-cream/85 text-sm sm:text-base md:text-lg font-light leading-relaxed max-w-xl md:max-w-2xl"
        >
          We specialize in elevated branding and exclusive event management, transforming your vision into memorable and refined experiences. Let us build your narrative.
        </motion.p>

        {/* Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
          className="mt-2"
        >
          <Link
            to="/services"
            className="group inline-flex items-center gap-3 bg-cream text-maroon-dark px-6 py-3 md:px-8 md:py-4 rounded-full font-serif font-semibold tracking-wide hover:bg-gold hover:text-maroon-dark transition-all duration-300 shadow-xl text-sm md:text-base"
          >
            Explore Services
            <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1.5 transition-transform duration-300" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
