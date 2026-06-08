import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { TiltCard } from "../components/ui/TiltCard";
import ColorBends from "../components/ui/ColorBends";
import { EnvelopeIntro } from "../components/ui/EnvelopeIntro";
import { PhoneIntro } from "../components/ui/PhoneIntro";

export default function Contact() {
  const [showPhoneIntro, setShowPhoneIntro] = useState(false);
  const [showMailIntro, setShowMailIntro] = useState(false);

  const handleCall = () => {
    setShowPhoneIntro(true);
  };

  const handlePhoneIntroComplete = () => {
    setShowPhoneIntro(false);
    window.location.href = "tel:7810071916";
  };

  const handleEmail = () => {
    setShowMailIntro(true);
  };

  const handleMailIntroComplete = () => {
    setShowMailIntro(false);
    window.location.href = "mailto:info@fortunestories.com";
  };

  return (
    <>
      <AnimatePresence>
        {showMailIntro && (
          <EnvelopeIntro
            onComplete={handleMailIntroComplete}
            label="Inquiry"
            title="Let's Talk"
            subtitle="Fortune Stories"
            delay={2.5}
          />
        )}
        {showPhoneIntro && (
          <PhoneIntro onComplete={handlePhoneIntroComplete} />
        )}
      </AnimatePresence>
      <div className="pt-6 md:pt-12 pb-12 flex flex-col items-center relative -mx-8 md:-mx-16 px-8 md:px-16 min-h-[80vh]">
        <div className="absolute inset-0 -z-10 rounded-b-3xl md:rounded-b-[4rem] overflow-hidden opacity-40">
          <ColorBends
            colors={["#c5a059", "#4a0d10", "#631215"]}
            rotation={90}
            speed={0.2}
            scale={1}
            frequency={1}
            warpStrength={1}
            mouseInfluence={1}
            noise={0}
            parallax={0.5}
            iterations={2}
            intensity={1.5}
            bandWidth={6}
            transparent
          />
          <div className="absolute inset-0 bg-gradient-to-b from-maroon to-transparent" />
        </div>

        <div className="text-center mb-16 relative z-10 pt-8">
          <h1 className="font-serif text-5xl mb-4">Start Your Story</h1>
          <p className="text-cream/70 max-w-xl mx-auto tracking-wide">
            Reach out to our experts to discuss your upcoming project or event. We are ready to bring your vision to life.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-6 md:gap-10 justify-center items-center w-full max-w-4xl px-2">
          {/* Call Option */}
          <div className="w-full max-w-[280px] sm:max-w-none sm:w-72 sm:h-72 md:w-80 md:h-80 aspect-square group">
            <TiltCard onClick={handleCall} className="bg-[#0B0F19] border border-gray-800/80 flex flex-col items-center justify-center p-6 shadow-2xl hover:border-gray-700/80 transition-all duration-300 h-full w-full cursor-pointer rounded-[2rem] relative overflow-hidden">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                className="w-12 h-12 md:w-16 md:h-16 text-[#3b82f6] fill-[#3b82f6] group-hover:scale-110 transition-transform duration-500"
              >
                <path d="M20 22.62a18.81 18.81 0 0 1-8.28-2.42 18.63 18.63 0 0 1-5.74-5.74A18.81 18.81 0 0 1 3.56 6a3.44 3.44 0 0 1 3.28-3.44h2.44a1.72 1.72 0 0 1 1.63 1.25l1.08 4.31a1.72 1.72 0 0 1-.46 1.67L10 11.23a13.8 13.8 0 0 0 5.43 5.43l1.44-1.44a1.72 1.72 0 0 1 1.67-.46l4.31 1.08a1.72 1.72 0 0 1 1.25 1.63v2.44a3.44 3.44 0 0 1-4.1 3.71Z" />
              </svg>
              <h3 className="font-sans font-bold text-xl md:text-2xl bg-gradient-to-r from-[#c084fc] to-[#e879f9] bg-clip-text text-transparent mt-6 mb-2">
                Schedule a Call
              </h3>
              <p className="text-xs md:text-sm text-gray-400 font-sans tracking-wide text-center">
                Click to instantly connect
              </p>
            </TiltCard>
          </div>

          {/* Email Option */}
          <div className="w-full max-w-[280px] sm:max-w-none sm:w-72 sm:h-72 md:w-80 md:h-80 aspect-square group">
            <TiltCard onClick={handleEmail} className="bg-[#0B0F19] border border-gray-800/80 flex flex-col items-center justify-center p-6 shadow-2xl hover:border-gray-700/80 transition-all duration-300 h-full w-full cursor-pointer rounded-[2rem] relative overflow-hidden">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                className="w-12 h-12 md:w-16 md:h-16 group-hover:scale-110 transition-transform duration-500"
              >
                <path fill="#EA4335" d="M12 14.5l-9.5-6.5v9c0 1.1.9 2 2 2h3v-7l4.5 3.5L16.5 12v7h3c1.1 0 2-.9 2-2v-9l-9.5 6.5Z" />
                <path fill="#C5221F" d="M2.5 8L12 14.5l9.5-6.5C21.5 6 19.9 5 18 5c-.7 0-1.4.2-2 .5L12 8.5 8 5.5C7.4 5.2 6.7 5 6 5 4.1 5 2.5 6 2.5 8Z" />
                <path fill="#FABB05" d="M21.5 8c0-.3-.1-.6-.2-.9l-5.3 3.9v7h3c1.1 0 2-.9 2-2V8Z" />
                <path fill="#4285F4" d="M2.5 8c0 .3.1.6.2.9l5.3 3.9v7h-3c-1.1 0-2-.9-2-2V8Z" />
              </svg>
              <h3 className="font-sans font-bold text-xl md:text-2xl bg-gradient-to-r from-[#22d3ee] to-[#34d399] bg-clip-text text-transparent mt-6 mb-2">
                Gmail Contact
              </h3>
              <p className="text-xs md:text-sm text-gray-400 font-sans tracking-wide text-center">
                Send an email securely
              </p>
            </TiltCard>
          </div>
        </div>
      </div>
    </>
  );
}
