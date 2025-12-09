// shake-wrapper.tsx
import type { MotionProps } from "motion/react";
import type { ReactNode } from "react";
import { motion, easeInOut } from "motion/react";

const shakeVariants = {
  initial: { x: 0 },
  animate: {
    x: [0, -8, 8, -8, 8, -4, 4, -2, 2, 0],
    transition: { duration: 0.5, ease: easeInOut },
  },
};

interface ShakeWrapperProps extends MotionProps {
  children: ReactNode;
  className?: string;
  animationKey: string;
}

export default function ShakeWrapper({
  children,
  className,
  animationKey,
  ...props
}: ShakeWrapperProps) {
  return (
    <motion.div
      key={animationKey}
      initial="initial"
      animate="animate"
      variants={shakeVariants}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}
