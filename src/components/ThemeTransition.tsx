import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { motion, AnimatePresence } from 'framer-motion';

export const ThemeTransition = () => {
  const { theme } = useTheme();
  const [isAnimating, setIsAnimating] = useState(false);
  const [previousTheme, setPreviousTheme] = useState(theme);

  useEffect(() => {
    if (theme !== previousTheme && previousTheme) {
      setIsAnimating(true);
      setPreviousTheme(theme);
    }
  }, [theme, previousTheme]);

  const handleAnimationComplete = () => {
    setIsAnimating(false);
  };

  const isDarkToLight = previousTheme === 'dark' && theme === 'light';
  
  // Colors for the animation wave
  const waveColors = isDarkToLight
    ? {
        from: 'hsl(220, 40%, 8%)', // dark navy
        via: 'hsl(185, 70%, 55%)', // soft cyan glow
        to: 'hsl(210, 30%, 97%)' // light background
      }
    : {
        from: 'hsl(210, 30%, 97%)', // light background
        via: 'hsl(260, 60%, 65%)', // soft violet glow
        to: 'hsl(220, 40%, 8%)' // dark navy
      };

  return (
    <AnimatePresence>
      {isAnimating && (
        <motion.div
          initial={{ x: '-100%' }}
          animate={{ x: '100%' }}
          exit={{ opacity: 0 }}
          transition={{
            x: {
              duration: 1,
              ease: [0.455, 0.03, 0.515, 0.955] // easeInOutQuad
            },
            opacity: {
              duration: 0.2,
              delay: 0.8
            }
          }}
          onAnimationComplete={handleAnimationComplete}
          className="fixed inset-0 z-[9999] pointer-events-none"
          style={{
            background: `linear-gradient(90deg, 
              ${waveColors.from} 0%, 
              ${waveColors.from} 20%,
              ${waveColors.via} 50%, 
              ${waveColors.to} 80%,
              ${waveColors.to} 100%)`,
            boxShadow: isDarkToLight
              ? '0 0 80px 40px hsl(185, 70%, 55%, 0.4)'
              : '0 0 80px 40px hsl(260, 60%, 65%, 0.4)',
            filter: 'blur(2px)'
          }}
        />
      )}
    </AnimatePresence>
  );
};
