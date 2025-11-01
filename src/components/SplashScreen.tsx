import React from 'react';

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  React.useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 dark:from-cyber-dark dark:to-cyber-dark/90 animate-fade-in">
      <div className="text-center space-y-4 animate-scale-in">
        <h1 className="text-7xl md:text-9xl font-bold text-blue-500 dark:text-neon-cyan">
          KLUSTER
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 dark:text-muted-foreground">
          Get ready to dive into a whole new world of KLUSTER
        </p>
      </div>
    </div>
  );
};

export default SplashScreen;
