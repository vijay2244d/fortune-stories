import React, { useState } from "react";
import { TiltCard } from "../components/ui/TiltCard";
import { Sparkles, PartyPopper, Briefcase, X } from "lucide-react";
import HeartBallpit from "../components/ui/HeartBallpit";
import ColorBends from "../components/ui/ColorBends";
import { EnvelopeIntro } from "../components/ui/EnvelopeIntro";
import { ProjectorIntro } from "../components/ui/ProjectorIntro";
import { CameraIntro } from "../components/ui/CameraIntro";
import { motion, AnimatePresence } from "motion/react";

const services = [
  {
    title: "Branding",
    description: "Distinctive brand identities and strategic marketing that elevate your presence.",
    icon: <Sparkles className="w-7 h-7" />,
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=600&auto=format&fit=crop",
    id: "branding"
  },
  {
    title: "Birthday & Anniversary Parties",
    description: "Elegant, bespoke celebrations tailored to your personal milestones.",
    icon: <PartyPopper className="w-7 h-7" />,
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=600&auto=format&fit=crop",
    id: "birthday"
  },
  {
    title: "Corporate Events",
    description: "Professional, meticulously planned corporate retreats, seminars, and galas.",
    icon: <Briefcase className="w-7 h-7" />,
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=600&auto=format&fit=crop",
    id: "corporate"
  }
];

export default function Services() {
  const [activeOverlay, setActiveOverlay] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [corporateIntroDone, setCorporateIntroDone] = useState(false);
  const [brandingIntroDone, setBrandingIntroDone] = useState(false);

  const handleCardClick = (id: string) => {
    setActiveOverlay(id);
    setShowForm(false);
    if (id === "corporate") {
      setCorporateIntroDone(false);
    } else if (id === "branding") {
      setBrandingIntroDone(false);
    }
  };

  const handleClose = () => {
    setActiveOverlay(null);
    setShowForm(false);
  };

  const handleBirthdaySubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name");
    const email = formData.get("email");
    const phone = formData.get("phone");
    const date = formData.get("date");
    const type = formData.get("type");
    const guests = formData.get("guests");
    const details = formData.get("details");
    
    const subject = `Birthday/Anniversary Inquiry from ${name}`;
    const body = `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nEstimated Date: ${date}\nEvent Type: ${type}\nEstimated Guests: ${guests}\n\nAdditional Requirements:\n${details}`;
    
    window.location.href = `mailto:info@fortunestories.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const handleCorporateSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const company = formData.get("company");
    const email = formData.get("email");
    const person = formData.get("person");
    const date = formData.get("date");
    const category = formData.get("category");
    const attendees = formData.get("attendees");
    const goals = formData.get("goals");

    const subject = `Corporate Event Inquiry from ${company}`;
    const body = `Company: ${company}\nContact Person: ${person}\nEmail: ${email}\nEstimated Date: ${date}\nEvent Category: ${category}\nEstimated Attendees: ${attendees}\n\nEvent Goals:\n${goals}`;
    
    window.location.href = `mailto:info@fortunestories.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const handleBrandingSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const company = formData.get("company");
    const email = formData.get("email");
    const services = formData.get("services");
    const vision = formData.get("vision");

    const subject = `Branding Inquiry from ${company}`;
    const body = `Company: ${company}\nEmail: ${email}\nInterested Services: ${services}\n\nBrand Vision:\n${vision}`;
    
    window.location.href = `mailto:info@fortunestories.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <>
      <div className="py-12">
        <div className="text-center mb-16">
          <h1 className="font-serif text-5xl mb-4">Our Services</h1>
          <p className="text-cream/70 max-w-xl mx-auto tracking-wide">
            Delivering premium branding solutions and executing world-class events tailored to your unique requirements.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-12 cursor-pointer">
          {services.map((service) => (
            <div key={service.id} className="aspect-[4/5] relative group" onClick={() => handleCardClick(service.id)}>
              <TiltCard className="bg-cream border border-cream/20 overflow-hidden shadow-2xl text-maroon-dark h-full">
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{ backgroundImage: `url(${service.image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-cream via-cream/95 to-black/10" />
                
                <div className="absolute inset-0 p-8 flex flex-col justify-end z-10">
                  <div className="bg-cream/80 backdrop-blur-md text-maroon w-14 h-14 rounded-2xl flex items-center justify-center mb-6 border border-maroon/10 shadow-sm group-hover:-translate-y-2 transition-transform duration-300">
                    {service.icon}
                  </div>
                  <h3 className="font-serif text-3xl mb-3">{service.title}</h3>
                  <p className="font-sans text-maroon-dark/80 text-sm leading-relaxed font-medium">
                    {service.description}
                  </p>
                </div>
              </TiltCard>
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {activeOverlay === "birthday" && (
              <motion.div 
                key="birthday"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
                className="fixed inset-0 z-[100] flex items-center justify-center text-maroon-dark overflow-hidden"
              >
                <div className="absolute inset-0 z-0">
                  <ColorBends
                    colors={['#c5a059', '#eaddc4', '#631215', '#4a0d10']}
                    transparent={false}
                    speed={0.1}
                    warpStrength={1.5}
                    intensity={1.2}
                  />
                  <div className="absolute inset-0 bg-maroon-dark/60 mix-blend-multiply" />
                  <div className="absolute inset-0 bg-cream/70" />
                </div>

                <button 
                  onClick={handleClose}
                  className="absolute top-6 right-6 md:top-12 md:right-12 z-50 p-2 text-maroon-dark opacity-50 hover:opacity-100 transition-opacity bg-cream/50 rounded-full"
                >
                  <X className="w-8 h-8" />
                </button>

                {!showForm ? (
                  <div 
                    className="absolute inset-0 z-10 cursor-pointer flex flex-col items-center justify-center p-4"
                    onClick={() => setShowForm(true)}
                  >
                    <div className="absolute inset-0 pointer-events-none">
                      <HeartBallpit
                        count={150}
                        gravity={0.7}
                        friction={0.99}
                        wallBounce={0.5}
                        followCursor={true}
                        colors={[0x631215, 0x4a0d10, 0xc5a059]}
                        ambientColor={0xffffff}
                        ambientIntensity={1.5}
                        lightIntensity={300}
                        minSize={0.5}
                        maxSize={1.2}
                      />
                    </div>
                    <motion.div 
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8, type: "spring", damping: 20 }}
                      className="z-20 bg-cream/80 backdrop-blur-md p-8 md:p-12 rounded-3xl shadow-2xl pointer-events-none text-center border border-[#c5a059]/20 max-w-xl w-full"
                    >
                      <h2 className="font-serif text-5xl mb-4 text-maroon-dark">Celebrate With Us</h2>
                      <div className="w-16 h-px bg-gold/50 mx-auto mb-6" />
                      <p className="text-maroon-dark/70 font-medium tracking-[0.2em] uppercase text-sm">Click anywhere to begin your inquiry</p>
                    </motion.div>
                  </div>
                ) : (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="relative z-10 w-full max-w-3xl max-h-[90vh] overflow-y-auto px-6 py-12 md:p-12 bg-cream/95 backdrop-blur-xl shadow-2xl rounded-3xl border border-cream/50 m-4"
                  >
                    <div className="text-center mb-10">
                      <h2 className="font-serif text-4xl mb-4 text-maroon-dark">Event Inquiry</h2>
                      <p className="text-maroon/70 max-w-lg mx-auto leading-relaxed">Please provide some details about your upcoming celebration. Our team will get back to you with a curated proposal.</p>
                    </div>

                    <form className="space-y-6" onSubmit={handleBirthdaySubmit}>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-sm font-medium tracking-wide text-maroon-dark/80">Full Name *</label>
                          <input name="name" required type="text" className="w-full border-b border-maroon-dark/20 bg-transparent py-3 focus:outline-none focus:border-maroon-dark transition-colors" placeholder="Jane Doe" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium tracking-wide text-maroon-dark/80">Email Address *</label>
                          <input name="email" required type="email" className="w-full border-b border-maroon-dark/20 bg-transparent py-3 focus:outline-none focus:border-maroon-dark transition-colors" placeholder="jane@example.com" />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-sm font-medium tracking-wide text-maroon-dark/80">Phone Number</label>
                          <input name="phone" type="tel" className="w-full border-b border-maroon-dark/20 bg-transparent py-3 focus:outline-none focus:border-maroon-dark transition-colors" placeholder="+1 (555) 000-0000" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium tracking-wide text-maroon-dark/80">Estimated Date *</label>
                          <input name="date" required type="date" className="w-full border-b border-maroon-dark/20 bg-transparent py-3 focus:outline-none focus:border-maroon-dark transition-colors text-maroon-dark/80" />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-sm font-medium tracking-wide text-maroon-dark/80">Event Type</label>
                          <select name="type" className="w-full border-b border-maroon-dark/20 bg-transparent py-3 focus:outline-none focus:border-maroon-dark transition-colors text-maroon-dark/80">
                            <option>Birthday Party</option>
                            <option>Anniversary</option>
                            <option>Surprise Event</option>
                            <option>Other</option>
                          </select>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium tracking-wide text-maroon-dark/80">Estimated Guests</label>
                          <select name="guests" className="w-full border-b border-maroon-dark/20 bg-transparent py-3 focus:outline-none focus:border-maroon-dark transition-colors text-maroon-dark/80">
                            <option>Under 50</option>
                            <option>50 - 100</option>
                            <option>100 - 250</option>
                            <option>250+</option>
                          </select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium tracking-wide text-maroon-dark/80">Additional Requirements & Vision</label>
                        <textarea name="details" rows={4} className="w-full border-b border-maroon-dark/20 bg-transparent py-3 focus:outline-none focus:border-maroon-dark transition-colors resize-none placeholder:text-maroon-dark/40" placeholder="Tell us about the theme, location preferences, or any specific surprises you have in mind..."></textarea>
                      </div>

                      <div className="pt-6 text-center">
                        <button type="submit" className="bg-maroon-dark text-cream px-10 py-4 rounded-full font-medium tracking-widest uppercase text-sm hover:scale-105 transition-transform duration-300 shadow-lg">
                          Submit Inquiry
                        </button>
                      </div>
                    </form>
                  </motion.div>
                )}
              </motion.div>
        )}
        {activeOverlay === "corporate" && (
          <motion.div 
            key="corporate"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[100] flex items-center justify-center text-maroon-dark overflow-hidden"
          >
            <div className="absolute inset-0 z-0 bg-[#0A0D14]">
              <ColorBends
                colors={['#1c2130', '#c5a059', '#0d1117', '#252b40']}
                transparent={false}
                speed={0.05}
                warpStrength={1.2}
                intensity={1.0}
              />
              <div className="absolute inset-0 bg-maroon-dark/40 mix-blend-multiply" />
              <div className="absolute inset-0 bg-cream/75" />
            </div>

            <AnimatePresence>
              {corporateIntroDone && (
                <motion.div 
                  key="corporate-form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8 }}
                  className="absolute inset-0 z-10 flex items-center justify-center pointer-events-auto"
                >
                  <button 
                    onClick={handleClose}
                    className="absolute top-6 right-6 md:top-12 md:right-12 z-50 p-2 text-maroon-dark opacity-50 hover:opacity-100 transition-opacity bg-cream/50 rounded-full"
                  >
                    <X className="w-8 h-8" />
                  </button>

                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="relative z-10 w-full max-w-3xl max-h-[90vh] overflow-y-auto px-6 py-12 md:p-12 bg-cream/95 text-maroon-dark backdrop-blur-xl shadow-2xl rounded-3xl border border-cream/50 m-4"
                    >
                      <div className="text-center mb-10">
                        <h2 className="font-serif text-4xl mb-4 text-maroon-dark">Corporate Proposal</h2>
                        <p className="text-maroon-dark/70 max-w-lg mx-auto leading-relaxed">Let us handle the details so you can focus on business. Provide your corporate event requirements below.</p>
                      </div>

                      <form className="space-y-6" onSubmit={handleCorporateSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <label className="text-sm font-medium tracking-wide text-maroon-dark/80">Company Name *</label>
                            <input name="company" required type="text" className="w-full border-b border-maroon-dark/20 bg-transparent py-3 focus:outline-none focus:border-maroon-dark transition-colors placeholder:text-maroon-dark/40 text-maroon-dark" placeholder="Acme Corp" />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium tracking-wide text-maroon-dark/80">Contact Email *</label>
                            <input name="email" required type="email" className="w-full border-b border-maroon-dark/20 bg-transparent py-3 focus:outline-none focus:border-maroon-dark transition-colors placeholder:text-maroon-dark/40 text-maroon-dark" placeholder="contact@company.com" />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <label className="text-sm font-medium tracking-wide text-maroon-dark/80">Contact Person *</label>
                            <input name="person" required type="text" className="w-full border-b border-maroon-dark/20 bg-transparent py-3 focus:outline-none focus:border-maroon-dark transition-colors placeholder:text-maroon-dark/40 text-maroon-dark" placeholder="Jane Doe" />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium tracking-wide text-maroon-dark/80">Estimated Date *</label>
                            <input name="date" required type="date" className="w-full border-b border-maroon-dark/20 bg-transparent py-3 focus:outline-none focus:border-maroon-dark transition-colors text-maroon-dark/80" />
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <label className="text-sm font-medium tracking-wide text-maroon-dark/80">Event Category</label>
                            <select name="category" className="w-full border-b border-maroon-dark/20 bg-transparent py-3 focus:outline-none focus:border-maroon-dark transition-colors text-maroon-dark/80">
                              <option>Corporate Retreat</option>
                              <option>Product Launch</option>
                              <option>Holiday Party</option>
                              <option>Executive Seminar</option>
                            </select>
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium tracking-wide text-maroon-dark/80">Estimated Attendees</label>
                            <select name="attendees" className="w-full border-b border-maroon-dark/20 bg-transparent py-3 focus:outline-none focus:border-maroon-dark transition-colors text-maroon-dark/80">
                              <option>10 - 50</option>
                              <option>50 - 200</option>
                              <option>200 - 500</option>
                              <option>500+</option>
                            </select>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="text-sm font-medium tracking-wide text-maroon-dark/80">Event Goals & Vision</label>
                          <textarea name="goals" rows={4} className="w-full border-b border-maroon-dark/20 bg-transparent py-3 focus:outline-none focus:border-maroon-dark transition-colors resize-none placeholder:text-maroon-dark/40 text-maroon-dark" placeholder="Describe the objectives and desired atmosphere for your event..."></textarea>
                        </div>

                        <div className="pt-6 text-center">
                          <button type="submit" className="bg-maroon-dark text-cream px-10 py-4 rounded-full font-medium tracking-widest uppercase text-sm hover:scale-105 transition-transform duration-300 shadow-lg">
                            Request Proposal
                          </button>
                        </div>
                      </form>
                    </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {!corporateIntroDone && (
              <ProjectorIntro onComplete={() => setCorporateIntroDone(true)} />
            )}
          </motion.div>
        )}
        {activeOverlay === "branding" && (
          <motion.div 
            key="branding"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[100] flex items-center justify-center text-maroon-dark overflow-hidden"
          >
            <div className="absolute inset-0 z-0 bg-[#000000]">
              <ColorBends
                colors={['#111111', '#c5a059', '#000000', '#222222']}
                transparent={false}
                speed={0.1}
                warpStrength={2.0}
                intensity={0.8}
              />
              <div className="absolute inset-0 bg-maroon-dark/50 mix-blend-multiply" />
              <div className="absolute inset-0 bg-cream/75" />
            </div>

            <AnimatePresence>
              {brandingIntroDone && (
                <motion.div 
                  key="branding-form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8 }}
                  className="absolute inset-0 z-10 flex items-center justify-center pointer-events-auto"
                >
                  <button 
                    onClick={handleClose}
                    className="absolute top-6 right-6 md:top-12 md:right-12 z-50 p-2 text-maroon-dark opacity-50 hover:opacity-100 transition-opacity bg-cream/50 rounded-full"
                  >
                    <X className="w-8 h-8" />
                  </button>

                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="relative z-10 w-full max-w-3xl max-h-[90vh] overflow-y-auto px-6 py-12 md:p-12 bg-cream/95 text-maroon-dark backdrop-blur-xl shadow-2xl rounded-3xl border border-cream/50 m-4"
                    >
                      <div className="text-center mb-10">
                        <h2 className="font-serif text-4xl mb-4">Start Your Project</h2>
                        <p className="text-maroon-dark/70 max-w-lg mx-auto leading-relaxed">Tell us about your brand vision, goals, and visual aspirations.</p>
                      </div>

                      <form className="space-y-6" onSubmit={handleBrandingSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <label className="text-sm font-medium tracking-wide text-maroon-dark/80">Company Name *</label>
                            <input name="company" required type="text" className="w-full border-b border-maroon-dark/20 bg-transparent py-3 focus:outline-none focus:border-maroon-dark transition-colors placeholder:text-maroon-dark/40 text-maroon-dark" placeholder="Oasis Co." />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium tracking-wide text-maroon-dark/80">Contact Email *</label>
                            <input name="email" required type="email" className="w-full border-b border-maroon-dark/20 bg-transparent py-3 focus:outline-none focus:border-maroon-dark transition-colors placeholder:text-maroon-dark/40 text-maroon-dark" placeholder="hello@oasis.co" />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="text-sm font-medium tracking-wide text-maroon-dark/80">What services are you interested in?</label>
                          <select name="services" className="w-full border-b border-maroon-dark/20 bg-transparent py-3 focus:outline-none focus:border-maroon-dark transition-colors text-maroon-dark/80">
                            <option>Full Brand Identity</option>
                            <option>Logo Design</option>
                            <option>Brand Refresh</option>
                            <option>Marketing Materials</option>
                          </select>
                        </div>

                        <div className="space-y-2">
                          <label className="text-sm font-medium tracking-wide text-maroon-dark/80">Describe your brand vision</label>
                          <textarea name="vision" rows={4} className="w-full border-b border-maroon-dark/20 bg-transparent py-3 focus:outline-none focus:border-maroon-dark transition-colors resize-none placeholder:text-maroon-dark/40 text-maroon-dark" placeholder="Tell us who you are, what you do, and who your audience is..."></textarea>
                        </div>

                        <div className="pt-6 text-center">
                          <button type="submit" className="bg-maroon-dark text-cream px-10 py-4 rounded-full font-medium tracking-widest uppercase text-sm hover:scale-105 transition-transform duration-300 shadow-lg">
                            Send Details
                          </button>
                        </div>
                      </form>
                    </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {!brandingIntroDone && (
              <CameraIntro onComplete={() => setBrandingIntroDone(true)} />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
