import React, { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel';
import { Info, AlertTriangle, Calendar, Bell, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Notice {
  id: number;
  type: 'info' | 'alert' | 'event' | 'announcement';
  message: string;
  image: string;
  link: string;
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
  const navigate = useNavigate();

  // Sample notices - can be replaced with dynamic data
  const notices: Notice[] = [
    {
      id: 1,
      type: 'announcement',
      message: 'Welcome to Kluster! Check out the latest features in your dashboard.',
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&auto=format&fit=crop',
      link: '/feed'
    },
    {
      id: 2,
      type: 'event',
      message: 'Upcoming webinar: Advanced Study Techniques - September 25th at 3 PM',
      image: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=1200&auto=format&fit=crop',
      link: '/events'
    },
    {
      id: 3,
      type: 'alert',
      message: 'System maintenance scheduled for tonight 11 PM - 2 AM EST',
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&auto=format&fit=crop',
      link: '/feed'
    },
    {
      id: 4,
      type: 'info',
      message: 'New resources added to the Library section. Explore now!',
      image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1200&auto=format&fit=crop',
      link: '/library'
    },
  ];

  // Auto-slide functionality
  useEffect(() => {
    if (!api) return;

    const intervalId = setInterval(() => {
      api.scrollNext();
    }, 5000); // Auto-slide every 5 seconds

    return () => clearInterval(intervalId);
  }, [api]);

  return (
    <div className="w-full px-6 py-6">
      <Carousel
        setApi={setApi}
        opts={{
          align: 'start',
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
                  className={`relative overflow-hidden bg-gradient-to-r ${colorMap[notice.type]} backdrop-blur-sm border transition-all duration-300 hover:scale-[1.01] min-h-[200px]`}
                >
                  {/* Background Image with Opacity */}
                  <div 
                    className="absolute inset-0 bg-cover bg-center opacity-20"
                    style={{ backgroundImage: `url(${notice.image})` }}
                  />
                  
                  {/* Foreground Content */}
                  <div className="relative z-10 p-8 flex flex-col justify-between h-full min-h-[200px]">
                    <div className="flex items-start gap-4">
                      <div className={`flex-shrink-0 ${iconColorMap[notice.type]}`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <p className="text-base md:text-xl text-foreground font-semibold leading-relaxed">
                        {notice.message}
                      </p>
                    </div>
                    
                    <div className="flex justify-end mt-4">
                      <Button 
                        onClick={() => navigate(notice.link)}
                        className="bg-gradient-to-r from-neon-purple to-neon-cyan text-black font-semibold hover:opacity-90 transition-opacity"
                      >
                        Go to Post
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </div>
                </Card>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious className="hidden sm:flex -left-4 bg-cyber-card/80 border-cyber-border hover:bg-cyber-card hover:border-neon-cyan/50 text-foreground" />
        <CarouselNext className="hidden sm:flex -right-4 bg-cyber-card/80 border-cyber-border hover:bg-cyber-card hover:border-neon-cyan/50 text-foreground" />
      </Carousel>
    </div>
  );
};

export default NoticeCarousel;
