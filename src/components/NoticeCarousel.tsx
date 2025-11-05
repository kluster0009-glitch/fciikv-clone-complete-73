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
import { supabase } from '@/integrations/supabase/client';

interface Notice {
  id: string;
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
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch notices from database
  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const { data, error } = await supabase
          .from('carousel_slides')
          .select('*')
          .eq('is_active', true)
          .order('display_order', { ascending: true })
          .order('created_at', { ascending: false });

        if (error) throw error;
        
        if (data && data.length > 0) {
          setNotices(data as Notice[]);
        }
      } catch (error) {
        console.error('Error fetching carousel slides:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotices();
  }, []);

  // Auto-slide functionality
  useEffect(() => {
    if (!api || notices.length === 0) return;

    const intervalId = setInterval(() => {
      api.scrollNext();
    }, 5000); // Auto-slide every 5 seconds

    return () => clearInterval(intervalId);
  }, [api, notices.length]);

  // Don't render carousel if there are no notices
  if (loading || notices.length === 0) {
    return null;
  }

  return (
    <div className="w-full px-6 py-4">
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
                  className={`p-6 min-h-[120px] bg-gradient-to-r ${colorMap[notice.type]} backdrop-blur-sm border transition-all duration-300 hover:scale-[1.01]`}
                >
                  <div className="flex items-center gap-4 h-full">
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
