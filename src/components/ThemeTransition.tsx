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
      // Auto-complete after animation
      const timer = setTimeout(() => setIsAnimating(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [theme, previousTheme]);

  const isDarkToLight = previousTheme === 'dark' && theme === 'light';
  
  // Subtle background color shift
  const bgColors = isDarkToLight
    ? {
        from: 'hsl(220, 40%, 8%)', // dark navy
        to: 'hsl(210, 30%, 97%)' // light background
      }
    : {
        from: 'hsl(210, 30%, 97%)', // light background
        to: 'hsl(220, 40%, 8%)' // dark navy
      };

  return (
    <AnimatePresence>
      {isAnimating && (
        <motion.div
          initial={{ backgroundColor: bgColors.from }}
          animate={{ backgroundColor: bgColors.to }}
          exit={{ opacity: 0 }}
          transition={{
            backgroundColor: {
              duration: 1,
              ease: [0.455, 0.03, 0.515, 0.955] // easeInOutQuad
            },
            opacity: {
              duration: 0.3
            }
          }}
          className="fixed inset-0 z-[-1] pointer-events-none"
        />
      )}
    </AnimatePresence>
  );
};
