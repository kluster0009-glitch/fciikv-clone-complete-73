import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import SplashScreen from '@/components/SplashScreen';
import LandingHero from '@/components/landing/LandingHero';
import ConnectionsSection from '@/components/landing/ConnectionsSection';
import IntelligenceSection from '@/components/landing/IntelligenceSection';
import VerifiedSection from '@/components/landing/VerifiedSection';
import FinalCTA from '@/components/landing/FinalCTA';
import Footer from '@/components/landing/Footer';
import { useAuth } from '@/contexts/AuthContext';

const Index = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [hasVisited, setHasVisited] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect authenticated users to feed
    if (user) {
      navigate('/feed');
      return;
    }

    // Check if user has already seen the splash screen in this session
    const visited = sessionStorage.getItem('hasVisitedKluster');
    if (visited) {
      setShowSplash(false);
      setHasVisited(true);
    }
  }, [user, navigate]);

  const handleSplashComplete = () => {
    setShowSplash(false);
    sessionStorage.setItem('hasVisitedKluster', 'true');
  };

  if (showSplash && !hasVisited) {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  return (
    <div className="min-h-screen immersive-bg">
      <Header />
      <main>
        <LandingHero />
        <ConnectionsSection />
        <IntelligenceSection />
        <VerifiedSection />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
