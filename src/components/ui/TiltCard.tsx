import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from "motion/react";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  showGlare?: boolean;
}

export function TiltCard({ children, className, onClick, showGlare = true }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [15, -15]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-15, 15]);

  const transform = useMotionTemplate`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    
    // Calculate mouse position relative to the center of the card
    const width = rect.width || 1;
    const height = rect.height || 1;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    // Values range from -0.5 to 0.5
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct || 0);
    y.set(yPct || 0);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        transform,
        transformStyle: "preserve-3d",
      }}
      className={`relative w-full h-full cursor-pointer rounded-2xl ${className}`}
      initial={{ scale: 1 }}
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
    >
      <div 
        style={{ transform: "translateZ(50px)" }}
        className="w-full h-full"
      >
        {children}
      </div>
      
      {/* Subtle glare effect */}
      {showGlare && isHovered && <div
        className="pointer-events-none absolute inset-0 rounded-2xl"
        style={{
          background: `radial-gradient(circle at center, rgba(255,255,255,0.15) 0%, transparent 60%)`,
          transform: "translateZ(60px)",
        }}
      />}
    </motion.div>
  );
}
