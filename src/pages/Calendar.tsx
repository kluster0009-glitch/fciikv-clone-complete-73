import { useState, useEffect } from 'react';
import { Calendar as CalendarIcon, Clock, MapPin, Plus, RefreshCw } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import Header from '@/components/Header';

interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  description?: string;
  location?: string;
  color?: string;
}

const Calendar = () => {
  const { user } = useAuth();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    checkGoogleConnection();
    if (isConnected) {
      fetchEvents();
    }
  }, [isConnected]);

  const checkGoogleConnection = async () => {
    try {
      const { data, error } = await supabase
        .from('user_google_tokens')
        .select('*')
        .eq('user_id', user?.id)
        .single();
      
      if (data && !error) {
        setIsConnected(true);
      }
    } catch (err) {
      console.error('Error checking Google connection:', err);
    }
  };

  const connectGoogleCalendar = async () => {
    try {
      setIsLoading(true);
      const redirectUri = `${window.location.origin}/auth/callback`;
      
      // Call edge function to get OAuth URL
      const { data, error } = await supabase.functions.invoke('google-calendar-auth', {
        body: { redirectUri }
      });

      if (error) throw error;
      
      if (data?.authUrl) {
        window.location.href = data.authUrl;
      }
    } catch (error) {
      console.error('Error connecting Google Calendar:', error);
      toast.error('Failed to connect Google Calendar');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchEvents = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase.functions.invoke('google-calendar-events', {
        body: { userId: user?.id }
      });

      if (error) throw error;
      
      if (data?.events) {
        const formattedEvents = data.events.map((event: any) => ({
          id: event.id,
          title: event.summary || 'Untitled Event',
          start: new Date(event.start.dateTime || event.start.date),
          end: new Date(event.end.dateTime || event.end.date),
          description: event.description,
          location: event.location,
          color: event.colorId
        }));
        setEvents(formattedEvents);
      }
    } catch (error) {
      console.error('Error fetching events:', error);
      toast.error('Failed to fetch calendar events');
    } finally {
      setIsLoading(false);
    }
  };

  const getEventsForDate = (date: Date) => {
    return events.filter(event => {
      const eventDate = new Date(event.start);
      return eventDate.toDateString() === date.toDateString();
    });
  };

  const selectedDateEvents = selectedDate ? getEventsForDate(selectedDate) : [];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-6 pt-24 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header Section */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-soft-cyan to-soft-violet bg-clip-text text-transparent mb-2">
                Calendar
              </h1>
              <p className="text-muted-foreground">
                Manage your schedule and sync with Google Calendar
              </p>
            </div>
            
            <div className="flex gap-3">
              {isConnected ? (
                <Button
                  onClick={fetchEvents}
                  disabled={isLoading}
                  variant="outline"
                  className="border-soft-cyan/30 text-soft-cyan hover:bg-soft-cyan/10"
                >
                  <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                  Refresh
                </Button>
              ) : (
                <Button
                  onClick={connectGoogleCalendar}
                  disabled={isLoading}
                  className="bg-gradient-to-r from-soft-cyan to-soft-violet hover:opacity-90 text-background"
                >
                  <CalendarIcon className="w-4 h-4 mr-2" />
                  Connect Google Calendar
                </Button>
              )}
            </div>
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Calendar Component */}
            <Card className="lg:col-span-2 p-6 bg-card/50 backdrop-blur-sm border-border-subtle shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
              <CalendarComponent
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-lg border-0"
                modifiers={{
                  hasEvent: events.map(e => new Date(e.start))
                }}
                modifiersClassNames={{
                  hasEvent: 'relative after:absolute after:bottom-1 after:left-1/2 after:-translate-x-1/2 after:w-1 after:h-1 after:rounded-full after:bg-soft-cyan'
                }}
              />
            </Card>

            {/* Events List */}
            <Card className="p-6 bg-card/50 backdrop-blur-sm border-border-subtle shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-foreground">
                  {selectedDate?.toLocaleDateString('en-US', { 
                    month: 'long', 
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </h3>
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-soft-cyan hover:bg-soft-cyan/10"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>

              <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
                {selectedDateEvents.length > 0 ? (
                  selectedDateEvents.map((event) => (
                    <motion.div
                      key={event.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3 }}
                      className="p-4 rounded-lg bg-muted/30 border border-border-subtle hover:border-soft-cyan/50 transition-all duration-300 group"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-1 h-full bg-gradient-to-b from-soft-cyan to-soft-violet rounded-full" />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-foreground mb-1 group-hover:text-soft-cyan transition-colors duration-200">
                            {event.title}
                          </h4>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                            <Clock className="w-3 h-3" />
                            <span>
                              {event.start.toLocaleTimeString('en-US', { 
                                hour: 'numeric', 
                                minute: '2-digit'
                              })}
                              {' - '}
                              {event.end.toLocaleTimeString('en-US', { 
                                hour: 'numeric', 
                                minute: '2-digit'
                              })}
                            </span>
                          </div>
                          {event.location && (
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <MapPin className="w-3 h-3" />
                              <span className="truncate">{event.location}</span>
                            </div>
                          )}
                          {event.description && (
                            <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                              {event.description}
                            </p>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div className="text-center py-12">
                    <CalendarIcon className="w-12 h-12 mx-auto mb-3 text-muted-foreground/50" />
                    <p className="text-muted-foreground">No events for this day</p>
                  </div>
                )}
              </div>
            </Card>
          </div>

          {/* Connection Status */}
          {!isConnected && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-6 p-6 rounded-lg bg-muted/30 border border-border-subtle"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-soft-cyan/20 to-soft-violet/20 border border-soft-cyan/30 flex items-center justify-center">
                  <CalendarIcon className="w-6 h-6 text-soft-cyan" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground mb-1">
                    Connect Your Google Calendar
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Sync your events and manage your schedule seamlessly with Google Calendar integration.
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </main>
    </div>
  );
};

export default Calendar;
