import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "../../lib/utils";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const links = [
  { name: "Home", path: "/" },
  { name: "Services", path: "/services" },
  { name: "Reviews", path: "/reviews" },
  { name: "About Us", path: "/about" },
  { name: "Contact", path: "/contact" },
];

export function Navbar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 py-4 px-6 md:py-6 md:px-16 flex items-center justify-between border-b border-cream/10 backdrop-blur-md bg-maroon/80">
      <Link to="/" onClick={() => setIsOpen(false)} className="text-2xl font-serif tracking-widest text-cream flex flex-col md:flex-row items-baseline md:items-center gap-1 md:gap-2">
        <span>FORTUNE</span>
        <span className="font-sans font-light text-[0.6rem] md:text-xs tracking-widest uppercase opacity-70">Stories</span>
      </Link>

      {/* Desktop Menu */}
      <ul className="hidden md:flex gap-8">
        {links.map((link) => (
          <li key={link.path}>
            <Link
              to={link.path}
              className={cn(
                "text-base tracking-widest font-serif transition-colors relative pb-1",
                location.pathname === link.path ? "text-gold" : "text-cream hover:text-gold"
              )}
            >
              {link.name}
              {location.pathname === link.path && (
                <motion.div
                  layoutId="navbar-underline"
                  className="absolute left-0 right-0 -bottom-1 h-px bg-gold"
                />
              )}
            </Link>
          </li>
        ))}
      </ul>

      {/* Mobile Menu Toggle */}
      <button 
        className="md:hidden p-2 text-cream"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-maroon border-b border-cream/10 shadow-2xl md:hidden overflow-hidden"
          >
            <ul className="flex flex-col py-4 px-6">
              {links.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "block py-4 text-base tracking-widest font-serif border-b border-cream/5 transition-colors",
                      location.pathname === link.path ? "text-gold" : "text-cream hover:text-gold"
                    )}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
