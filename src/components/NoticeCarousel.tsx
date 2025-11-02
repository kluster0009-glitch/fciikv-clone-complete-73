import React, { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel';
import { Info, AlertTriangle, Calendar, Bell } from 'lucide-react';

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

  // Sample notices - can be replaced with dynamic data
  const notices: Notice[] = [
    {
      id: 1,
      type: 'announcement',
      message: 'Welcome to Kluster! Check out the latest features in your dashboard.',
    },
    {
      id: 2,
      type: 'event',
      message: 'Upcoming webinar: Advanced Study Techniques - September 25th at 3 PM',
    },
    {
      id: 3,
      type: 'alert',
      message: 'System maintenance scheduled for tonight 11 PM - 2 AM EST',
    },
    {
      id: 4,
      type: 'info',
      message: 'New resources added to the Library section. Explore now!',
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
                  className={`p-6 bg-gradient-to-r ${colorMap[notice.type]} backdrop-blur-sm border transition-all duration-300 hover:scale-[1.01] min-h-[120px]`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`flex-shrink-0 ${iconColorMap[notice.type]}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <p className="text-base md:text-lg text-foreground font-medium leading-relaxed">
                      {notice.message}
                    </p>
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
