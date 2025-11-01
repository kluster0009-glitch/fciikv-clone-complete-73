import React, { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel';
import { Info, AlertTriangle, Calendar, Bell, Sparkles } from 'lucide-react';

interface Notice {
  id: number;
  type: 'info' | 'alert' | 'event' | 'announcement';
  message: string;
}

const iconMap = {
  info: Info,
  alert: AlertTriangle,
  event: Calendar,
  announcement: Bell,
};

const colorMap = {
  info: 'from-neon-cyan/20 to-neon-cyan/10 border-neon-cyan/30',
  alert: 'from-neon-pink/20 to-neon-pink/10 border-neon-pink/30',
  event: 'from-neon-purple/20 to-neon-purple/10 border-neon-purple/30',
  announcement: 'from-neon-green/20 to-neon-green/10 border-neon-green/30',
};

const iconColorMap = {
  info: 'text-neon-cyan',
  alert: 'text-neon-pink',
  event: 'text-neon-purple',
  announcement: 'text-neon-green',
};

const NoticeCarousel = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  // Sample notices - can be replaced with dynamic data
  const notices: Notice[] = [
    {
      id: 1,
      type: 'announcement',
      message: 'Welcome to Kluster! Discover personalized learning paths and connect with your academic community.',
    },
    {
      id: 2,
      type: 'event',
      message: 'Join our live Q&A session: Advanced Study Techniques - September 25th at 3 PM EST',
    },
    {
      id: 3,
      type: 'alert',
      message: 'System maintenance scheduled for tonight 11 PM - 2 AM EST. Save your work!',
    },
    {
      id: 4,
      type: 'info',
      message: '50+ new resources added to the Library section this week. Explore cutting-edge research!',
    },
    {
      id: 5,
      type: 'event',
      message: 'Campus meetup next Friday! Network with students from top universities.',
    },
  ];

  // Auto-slide functionality
  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap());
    });

    const intervalId = setInterval(() => {
      api.scrollNext();
    }, 6000); // Auto-slide every 6 seconds

    return () => clearInterval(intervalId);
  }, [api]);

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-6">
      <div className="max-w-7xl mx-auto">
        <div className="relative">
          <Carousel
            setApi={setApi}
            opts={{
              align: 'center',
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {notices.map((notice) => {
                const Icon = iconMap[notice.type];
                return (
                  <CarouselItem key={notice.id}>
                    <Card
                      className={`relative p-6 md:p-8 bg-gradient-to-br ${colorMap[notice.type]} backdrop-blur-xl border-2 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl overflow-hidden group`}
                    >
                      {/* Animated background effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                      
                      <div className="relative flex items-start md:items-center gap-4">
                        <div className={`flex-shrink-0 ${iconColorMap[notice.type]} p-3 rounded-lg bg-background/50 backdrop-blur-sm`}>
                          <Icon className="w-6 h-6 md:w-7 md:h-7" />
                        </div>
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center gap-2 mb-1">
                            <Badge 
                              variant="secondary" 
                              className={`${iconColorMap[notice.type]} bg-background/60 backdrop-blur-sm text-xs font-semibold uppercase tracking-wider border-0`}
                            >
                              {notice.type}
                            </Badge>
                            <Sparkles className={`w-3 h-3 ${iconColorMap[notice.type]} animate-pulse`} />
                          </div>
                          <p className="text-base md:text-lg text-foreground font-semibold leading-relaxed">
                            {notice.message}
                          </p>
                        </div>
                      </div>
                    </Card>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex -left-6 lg:-left-12 h-12 w-12 bg-cyber-card/90 border-2 border-cyber-border hover:bg-cyber-card hover:border-neon-cyan/70 text-foreground shadow-xl backdrop-blur-sm transition-all duration-300 hover:scale-110" />
            <CarouselNext className="hidden md:flex -right-6 lg:-right-12 h-12 w-12 bg-cyber-card/90 border-2 border-cyber-border hover:bg-cyber-card hover:border-neon-cyan/70 text-foreground shadow-xl backdrop-blur-sm transition-all duration-300 hover:scale-110" />
          </Carousel>

          {/* Pagination dots */}
          <div className="flex justify-center gap-2 mt-6">
            {Array.from({ length: count }).map((_, index) => (
              <button
                key={index}
                onClick={() => api?.scrollTo(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === current
                    ? 'w-8 bg-gradient-to-r from-neon-purple to-neon-cyan'
                    : 'w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50'
                }`}
                aria-label={`Go to notice ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoticeCarousel;
