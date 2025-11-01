import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import SplashScreen from '@/components/SplashScreen';
import NoticeCarousel from '@/components/NoticeCarousel';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { 
  BookOpen, 
  Users, 
  Calendar, 
  MessageSquare, 
  Trophy, 
  Library,
  ArrowRight,
  Sparkles
} from 'lucide-react';

const Index = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [hasVisited, setHasVisited] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user has already seen the splash screen in this session
    const visited = sessionStorage.getItem('hasVisitedKluster');
    if (visited) {
      setShowSplash(false);
      setHasVisited(true);
    }
  }, []);

  const handleSplashComplete = () => {
    setShowSplash(false);
    sessionStorage.setItem('hasVisitedKluster', 'true');
  };

  if (showSplash && !hasVisited) {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  const quickActions = [
    {
      icon: Users,
      title: 'Community Feed',
      description: 'Connect with students and share knowledge',
      path: '/feed',
      gradient: 'from-neon-purple to-neon-cyan',
    },
    {
      icon: MessageSquare,
      title: 'Q&A Forum',
      description: 'Ask questions and get expert answers',
      path: '/qa',
      gradient: 'from-neon-cyan to-neon-green',
    },
    {
      icon: BookOpen,
      title: 'AI Chat',
      description: 'Get instant help from AI assistants',
      path: '/chat',
      gradient: 'from-neon-green to-neon-yellow',
    },
    {
      icon: Library,
      title: 'Library',
      description: 'Access resources and study materials',
      path: '/library',
      gradient: 'from-neon-yellow to-neon-pink',
    },
    {
      icon: Calendar,
      title: 'Events',
      description: 'Discover upcoming webinars and meetups',
      path: '/events',
      gradient: 'from-neon-pink to-neon-purple',
    },
    {
      icon: Trophy,
      title: 'Leaderboard',
      description: 'Track your progress and achievements',
      path: '/leaderboard',
      gradient: 'from-neon-purple to-neon-cyan',
    },
  ];

  return (
    <div className="min-h-screen bg-cyber-dark">
      <Header />
      <div className="pt-20">
        {/* Notice Carousel */}
        <NoticeCarousel />

        {/* Main Content */}
        <div className="container mx-auto px-6 py-12">
          {/* Welcome Section */}
          <div className="text-center mb-16 space-y-4">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Sparkles className="w-8 h-8 text-neon-cyan animate-pulse" />
              <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-neon-purple via-neon-cyan to-neon-green bg-clip-text text-transparent">
                Welcome to Kluster
              </h1>
              <Sparkles className="w-8 h-8 text-neon-purple animate-pulse" />
            </div>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
              Your academic hub for collaboration, learning, and growth
            </p>
          </div>

          {/* Quick Actions Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <Card
                  key={index}
                  className="group relative p-6 bg-cyber-card/50 backdrop-blur-sm border-cyber-border hover:border-neon-cyan/50 transition-all duration-300 hover:scale-[1.03] cursor-pointer overflow-hidden"
                  onClick={() => navigate(action.path)}
                >
                  {/* Animated background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${action.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                  
                  <div className="relative space-y-4">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${action.gradient} p-3 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-8 h-8 text-black" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground mb-2 flex items-center gap-2">
                        {action.title}
                        <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                      </h3>
                      <p className="text-muted-foreground">{action.description}</p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Stats Section */}
          <Card className="p-8 bg-gradient-to-r from-cyber-card/50 to-cyber-card/30 backdrop-blur-xl border-cyber-border">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div className="space-y-2">
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-neon-cyan to-neon-purple bg-clip-text text-transparent">
                  10K+
                </div>
                <p className="text-muted-foreground font-medium">Active Students</p>
              </div>
              <div className="space-y-2">
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-neon-purple to-neon-pink bg-clip-text text-transparent">
                  500+
                </div>
                <p className="text-muted-foreground font-medium">Universities</p>
              </div>
              <div className="space-y-2">
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-neon-pink to-neon-cyan bg-clip-text text-transparent">
                  50K+
                </div>
                <p className="text-muted-foreground font-medium">Resources Shared</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
