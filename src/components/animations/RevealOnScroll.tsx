"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface RevealOnScrollProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  direction?: "up" | "down" | "left" | "right" | "none";
}

export function RevealOnScroll({ 
  children, 
  delay = 0, 
  className = "",
  direction = "up"
}: RevealOnScrollProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const getVariants = () => {
    switch(direction) {
      case "up": return { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };
      case "down": return { hidden: { opacity: 0, y: -20 }, visible: { opacity: 1, y: 0 } };
      case "left": return { hidden: { opacity: 0, x: 20 }, visible: { opacity: 1, x: 0 } };
      case "right": return { hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } };
      case "none": return { hidden: { opacity: 0 }, visible: { opacity: 1 } };
      default: return { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };
    }
  };

  return (
    <motion.div
      ref={ref}
      variants={getVariants()}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
