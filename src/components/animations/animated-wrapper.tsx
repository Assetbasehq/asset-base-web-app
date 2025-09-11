import type { MotionProps } from "motion/react";
import type { ReactNode } from "react";
import { motion } from "motion/react";

// animated-wrapper.tsx
const variants = {
  fadeUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  },
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
};

interface AnimatedWrapperProps extends MotionProps {
  children: ReactNode;
  variant?: keyof typeof variants; // "fadeUp" | "fade"
  className?: string;
  animationKey: string;
}

export default function AnimatedWrapper({
  children,
  variant = "fadeUp",
  className,
  animationKey,
  ...props
}: AnimatedWrapperProps) {
  const selected = variants[variant];

  return (
    <motion.div
      key={animationKey}
      initial={selected.initial}
      animate={selected.animate}
      exit={selected.exit}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}
