export const ANIMATION = {
  duration: {
    fast: 0.15,
    normal: 0.2,
    slow: 0.3,
    reveal: 0.6,
  },
  ease: {
    default: [0.4, 0, 0.2, 1],
    bounce: [0.68, -0.55, 0.265, 1.55],
    smooth: [0.25, 0.1, 0.25, 1],
  },
  stagger: {
    fast: 0.05,
    normal: 0.1,
    slow: 0.15,
  },
};

export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: ANIMATION.duration.reveal, ease: ANIMATION.ease.default },
};

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: ANIMATION.duration.slow, ease: ANIMATION.ease.default },
};

export const slideInFromLeft = {
  initial: { opacity: 0, x: -30 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: ANIMATION.duration.reveal, ease: ANIMATION.ease.default },
};

export const slideInFromRight = {
  initial: { opacity: 0, x: 30 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: ANIMATION.duration.reveal, ease: ANIMATION.ease.default },
};

export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: ANIMATION.stagger.normal,
      delayChildren: 0.1,
    },
  },
};

export const scaleOnHover = {
  whileHover: { scale: 1.02 },
  whileTap: { scale: 0.98 },
  transition: { duration: ANIMATION.duration.fast },
};

export const cardHover = {
  whileHover: { 
    y: -2,
    transition: { duration: ANIMATION.duration.fast }
  },
};
