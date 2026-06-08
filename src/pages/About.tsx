import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { TiltCard } from "../components/ui/TiltCard";
import { EnvelopeIntro } from "../components/ui/EnvelopeIntro";
import founderPortrait from "../assets/images/founder_portrait_1779197998351.png";

export default function About() {
  const [introDone, setIntroDone] = useState(false);

  return (
    <>
      <AnimatePresence>
        {!introDone && <EnvelopeIntro 
            onComplete={() => setIntroDone(true)} 
            label="Discover"
            title="About Us"
            subtitle="Fortune Stories"
        />}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: introDone ? 1 : 0, y: introDone ? 0 : 30 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="py-12 px-2"
        style={{ pointerEvents: introDone ? "auto" : "none" }}
      >
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16 md:mb-24">
            <h1 className="font-serif text-5xl md:text-7xl mb-6 tracking-tight">Our Story</h1>
            <div className="w-20 h-px bg-gold mx-auto mb-8" />
            <p className="text-cream/80 text-xl font-light leading-relaxed max-w-2xl mx-auto tracking-wide">
              We are architects of perception, turning your milestones into monuments and your brand into a legacy.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center flex-col-reverse lg:flex-row">
            <div className="space-y-8 lg:order-1">
              <div className="space-y-2">
                <span className="text-gold tracking-[0.3em] text-xs uppercase font-medium">The Origin</span>
                <h2 className="font-serif text-4xl text-cream leading-tight">Mastering The Art of <br /><span className="italic text-cream-muted">Refined Execution</span></h2>
              </div>
              
              <div className="space-y-6 text-cream/70 font-light text-lg leading-loose mx-1">
                <p>
                  Fortune Stories began with a singular vision: to bridge the gap between elevated design aesthetics and experiential perfection. We recognized that true branding is not just visual—it is deeply experiential.
                </p>
                <p>
                  From crafting identity systems for premium brands to orchestrating exclusive surprise events and grand anniversary galas, we meticulously design every touchpoint. We believe in aesthetics, precision, and emotional resonance.
                </p>
                <blockquote className="border-l-[3px] border-gold pl-6 mt-8 py-2 text-xl font-serif text-cream italic opacity-90">
                  "Every great brand, and every unforgettable night, begins with a beautifully told story."
                </blockquote>
              </div>
            </div>

            <div className="relative group perspective-[1000px] lg:order-2 flex justify-center">
              <TiltCard className="shadow-2xl overflow-hidden rounded-full border border-cream/5 w-[200px] h-[200px] md:w-[280px] md:h-[280px] mx-auto group">
                <img 
                  src={founderPortrait} 
                  alt="Founder Portrait" 
                  className="w-full h-full object-cover scale-105 group-hover:scale-110 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-maroon-dark/20 mix-blend-multiply rounded-full" />
                <div className="absolute inset-0 border border-gold/20 m-3 md:m-4 rounded-full pointer-events-none" />
              </TiltCard>
            </div>
          </div>

          <div className="mt-24 md:mt-32 max-w-3xl mx-auto text-center">
            <div className="space-y-8">
              <div className="space-y-2">
                <span className="text-gold tracking-[0.3em] text-xs uppercase font-medium">Leadership</span>
                <h2 className="font-serif text-4xl text-cream leading-tight">Visionary <br /><span className="italic text-cream-muted">Direction</span></h2>
              </div>
              
              <div className="space-y-6 text-cream/70 font-light text-lg leading-loose mx-1">
                <p>
                  Guided by an unwavering commitment to excellence, our team brings together years of expertise in high-end event production and brand strategy.
                </p>
                <p>
                  We are a collective of visionaries, designers, and meticulous planners dedicated to bringing your most ambitious stories to life with precision and style.
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}
