import { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { motion, AnimatePresence } from "motion/react";
import { useLocation } from "react-router-dom";
import { cn } from "../../lib/utils";

export function AppLayout({ children }: { children: ReactNode }) {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <div className={cn(
      "min-h-screen flex flex-col font-sans bg-maroon text-cream selection:bg-gold selection:text-maroon-dark",
      isHome && "h-screen overflow-hidden"
    )}>
      <Navbar />
      <main className={cn(
        "flex-1 pt-24 flex flex-col items-center justify-center",
        !isHome && "pb-12"
      )}>
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className={cn(
              "w-full max-w-7xl px-6 md:px-16",
              isHome && "h-full flex items-center justify-center"
            )}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>
      {!isHome && <Footer />}
    </div>
  );
}
