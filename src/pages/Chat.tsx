import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Search, Users, Send, Smile, MessageCircle, Megaphone, Calendar, BookOpen, Code, TrendingUp, Briefcase, User, ChevronDown, ChevronUp, Globe, Menu, X } from 'lucide-react';

const Chat = () => {
  const [selectedChannel, setSelectedChannel] = useState('general');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    personalChats: true,
    myCollege: true,
    subjects: true,
    global: true
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const personalChats = [
    { id: 'chat-alex', name: 'Alex Chen', members: 2, icon: User, status: 'online' },
    { id: 'chat-sarah', name: 'Sarah Johnson', members: 2, icon: User, status: 'online' },
    { id: 'chat-mike', name: 'Mike Rodriguez', members: 2, icon: User, status: 'offline' }
  ];

  const channels = {
    myCollege: [
      { id: 'general', name: 'General', members: 1234, icon: MessageCircle },
      { id: 'announcements', name: 'Announcements', members: 1234, icon: Megaphone },
      { id: 'events', name: 'Events', members: 567, icon: Calendar },
      { id: 'study-groups', name: 'Study Groups', members: 890, icon: BookOpen }
    ],
    subjects: [
      { id: 'computer-science', name: 'Computer Science', members: 456, icon: Code },
      { id: 'mathematics', name: 'Mathematics', members: 234, icon: BookOpen },
      { id: 'physics', name: 'Physics', members: 189, icon: BookOpen },
      { id: 'chemistry', name: 'Chemistry', members: 167, icon: BookOpen },
      { id: 'biology', name: 'Biology', members: 145, icon: BookOpen }
    ],
    global: [
      { id: 'global-general', name: 'Global General', members: 5678, icon: Globe },
      { id: 'career-advice', name: 'Career Advice', members: 2345, icon: Briefcase },
      { id: 'tech-trends', name: 'Tech Trends', members: 1890, icon: TrendingUp }
    ]
  };

  const messages = [
    {
      id: 1,
      user: 'Alex Chen',
      initials: 'AC',
      time: '2:30 PM',
      message: 'Hey everyone! Just finished the data structures assignment. Anyone want to review solutions together?',
      status: 'online'
    },
    {
      id: 2,
      user: 'Sarah Johnson',
      initials: 'SJ',
      time: '2:32 PM',
      message: 'That sounds great! I had some trouble with the binary tree implementation.',
      status: 'online'
    },
    {
      id: 3,
      user: 'Mike Rodriguez',
      initials: 'MR',
      time: '2:35 PM',
      message: 'Count me in! I can share my approach to the graph algorithms part.',
      status: 'online'
    },
    {
      id: 4,
      user: 'Emma Wilson',
      initials: 'EW',
      time: '2:38 PM',
      message: 'Perfect timing! I was just about to ask for help with the complexity analysis.',
      status: 'online'
    }
  ];

  const onlineUsers = [
    { name: 'Alex Chen', initials: 'AC', status: 'online' },
    { name: 'Sarah Johnson', initials: 'SJ', status: 'online' },
    { name: 'Mike Rodriguez', initials: 'MR', status: 'online' },
    { name: 'Emma Wilson', initials: 'EW', status: 'online' },
    { name: 'David Kim', initials: 'DK', status: 'online' },
    { name: 'Lisa Zhang', initials: 'LZ', status: 'online' }
  ];

  const allChannels = [...personalChats, ...channels.myCollege, ...channels.subjects, ...channels.global];
  const currentChannel = allChannels.find(c => c.id === selectedChannel) || channels.myCollege[0];

  const handleChannelSelect = (channelId: string) => {
    setSelectedChannel(channelId);
    setSidebarOpen(false);
  };

  const handleOnlineUserClick = (userName: string) => {
    const existingChat = personalChats.find(chat => chat.name === userName);
    if (existingChat) {
      setSelectedChannel(existingChat.id);
    }
    setSidebarOpen(false);
  };

  return (
    <div className="min-h-screen immersive-bg">
      <div className="h-screen flex relative">
        {/* Mobile Overlay */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar - Channels */}
        <div className={`
          fixed lg:relative inset-y-0 left-0 z-50 
          w-72 md:w-80 bg-background/95 backdrop-blur-xl border-r border-border/50 
          flex flex-col shadow-lg transition-transform duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}>
          {/* Header with Close Button */}
          <div className="p-5 border-b border-border/50 flex items-center justify-between lg:block">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search channels..."
                className="pl-10 bg-muted/50 border-border/40 rounded-lg h-10 focus-visible:ring-2 focus-visible:ring-primary/50 transition-all"
              />
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden ml-2"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Channels List */}
          <ScrollArea className="flex-1 px-3">
            <div className="py-4 space-y-6">
              {/* Personal Chats */}
              <div>
                <button
                  onClick={() => toggleSection('personalChats')}
                  className="w-full flex items-center justify-between mb-3 px-2 hover:bg-muted/40 rounded-lg transition-colors group"
                >
                  <h3 className="text-xs font-semibold text-primary uppercase tracking-wider flex items-center gap-2">
                    <User className="w-3.5 h-3.5" />
                    Personal Chats
                  </h3>
                  {expandedSections.personalChats ? (
                    <ChevronDown className="w-3.5 h-3.5 text-muted-foreground group-hover:text-foreground transition-colors" />
                  ) : (
                    <ChevronUp className="w-3.5 h-3.5 text-muted-foreground group-hover:text-foreground transition-colors" />
                  )}
                </button>
                {expandedSections.personalChats && (
                  <div className="space-y-3">
                    {/* Online Users Row */}
                    <div className="px-2">
                      <p className="text-[10px] font-semibold text-accent uppercase tracking-wider mb-2 flex items-center gap-1.5">
                        <div className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse"></div>
                        Online Now ({onlineUsers.length})
                      </p>
                      <div className="overflow-x-auto">
                        <div className="flex gap-2 pb-2 min-w-max">
                          {onlineUsers.map((user, index) => (
                            <div
                              key={index}
                              onClick={() => handleOnlineUserClick(user.name)}
                              className="flex flex-col items-center gap-1 cursor-pointer group flex-shrink-0"
                            >
                              <div className="relative">
                                <div className="w-12 h-12 bg-gradient-to-br from-primary via-secondary to-accent rounded-full flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
                                  <span className="text-primary-foreground font-semibold text-xs">{user.initials}</span>
                                </div>
                                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-accent rounded-full border-2 border-background shadow-sm"></div>
                              </div>
                              <span className="text-[10px] text-muted-foreground group-hover:text-foreground transition-colors max-w-[48px] truncate">
                                {user.name.split(' ')[0]}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Personal Chats List */}
                    <div className="space-y-0.5">
                      {personalChats.map((chat) => (
                        <div
                          key={chat.id}
                          onClick={() => handleChannelSelect(chat.id)}
                          className={`
                            flex items-center justify-between px-3 py-2.5 rounded-lg cursor-pointer transition-all duration-200
                            ${selectedChannel === chat.id 
                              ? 'bg-primary/15 text-primary font-medium shadow-sm' 
                              : 'text-muted-foreground hover:text-foreground hover:bg-muted/60'
                            }
                          `}
                        >
                          <div className="flex items-center gap-2.5">
                            <chat.icon className="w-4 h-4 flex-shrink-0" />
                            <span className="text-sm font-medium">{chat.name}</span>
                            {chat.status === 'online' && (
                              <div className="w-2 h-2 bg-accent rounded-full"></div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* My College */}
              <div>
                <button
                  onClick={() => toggleSection('myCollege')}
                  className="w-full flex items-center justify-between mb-3 px-2 hover:bg-muted/40 rounded-lg transition-colors group"
                >
                  <h3 className="text-xs font-semibold text-primary uppercase tracking-wider flex items-center gap-2">
                    <MessageCircle className="w-3.5 h-3.5" />
                    My College
                  </h3>
                  {expandedSections.myCollege ? (
                    <ChevronDown className="w-3.5 h-3.5 text-muted-foreground group-hover:text-foreground transition-colors" />
                  ) : (
                    <ChevronUp className="w-3.5 h-3.5 text-muted-foreground group-hover:text-foreground transition-colors" />
                  )}
                </button>
                {expandedSections.myCollege && (
                  <div className="space-y-0.5">
                    {channels.myCollege.map((channel) => (
                      <div
                        key={channel.id}
                        onClick={() => handleChannelSelect(channel.id)}
                        className={`
                          flex items-center justify-between px-3 py-2.5 rounded-lg cursor-pointer transition-all duration-200
                          ${selectedChannel === channel.id 
                            ? 'bg-primary/15 text-primary font-medium shadow-sm' 
                            : 'text-muted-foreground hover:text-foreground hover:bg-muted/60'
                          }
                        `}
                      >
                        <div className="flex items-center gap-2.5">
                          <channel.icon className="w-4 h-4 flex-shrink-0" />
                          <span className="text-sm font-medium">{channel.name}</span>
                        </div>
                        <span className="text-xs bg-background/60 px-2 py-0.5 rounded-full">{channel.members}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Subjects */}
              <div>
                <button
                  onClick={() => toggleSection('subjects')}
                  className="w-full flex items-center justify-between mb-3 px-2 hover:bg-muted/40 rounded-lg transition-colors group"
                >
                  <h3 className="text-xs font-semibold text-secondary uppercase tracking-wider flex items-center gap-2">
                    <BookOpen className="w-3.5 h-3.5" />
                    Subjects
                  </h3>
                  {expandedSections.subjects ? (
                    <ChevronDown className="w-3.5 h-3.5 text-muted-foreground group-hover:text-foreground transition-colors" />
                  ) : (
                    <ChevronUp className="w-3.5 h-3.5 text-muted-foreground group-hover:text-foreground transition-colors" />
                  )}
                </button>
                {expandedSections.subjects && (
                  <div className="space-y-0.5">
                    {channels.subjects.map((channel) => (
                      <div
                        key={channel.id}
                        onClick={() => handleChannelSelect(channel.id)}
                        className={`
                          flex items-center justify-between px-3 py-2.5 rounded-lg cursor-pointer transition-all duration-200
                          ${selectedChannel === channel.id 
                            ? 'bg-secondary/15 text-secondary font-medium shadow-sm' 
                            : 'text-muted-foreground hover:text-foreground hover:bg-muted/60'
                          }
                        `}
                      >
                        <div className="flex items-center gap-2.5">
                          <channel.icon className="w-4 h-4 flex-shrink-0" />
                          <span className="text-sm font-medium">{channel.name}</span>
                        </div>
                        <span className="text-xs bg-background/60 px-2 py-0.5 rounded-full">{channel.members}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Global */}
              <div>
                <button
                  onClick={() => toggleSection('global')}
                  className="w-full flex items-center justify-between mb-3 px-2 hover:bg-muted/40 rounded-lg transition-colors group"
                >
                  <h3 className="text-xs font-semibold text-accent uppercase tracking-wider flex items-center gap-2">
                    <Globe className="w-3.5 h-3.5" />
                    Global
                  </h3>
                  {expandedSections.global ? (
                    <ChevronDown className="w-3.5 h-3.5 text-muted-foreground group-hover:text-foreground transition-colors" />
                  ) : (
                    <ChevronUp className="w-3.5 h-3.5 text-muted-foreground group-hover:text-foreground transition-colors" />
                  )}
                </button>
                {expandedSections.global && (
                  <div className="space-y-0.5">
                    {channels.global.map((channel) => (
                      <div
                        key={channel.id}
                        onClick={() => handleChannelSelect(channel.id)}
                        className={`
                          flex items-center justify-between px-3 py-2.5 rounded-lg cursor-pointer transition-all duration-200
                          ${selectedChannel === channel.id 
                            ? 'bg-accent/15 text-accent font-medium shadow-sm' 
                            : 'text-muted-foreground hover:text-foreground hover:bg-muted/60'
                          }
                        `}
                      >
                        <div className="flex items-center gap-2.5">
                          <channel.icon className="w-4 h-4 flex-shrink-0" />
                          <span className="text-sm font-medium">{channel.name}</span>
                        </div>
                        <span className="text-xs bg-background/60 px-2 py-0.5 rounded-full">{channel.members}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </ScrollArea>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col bg-background/50">
          {/* Chat Header */}
          <div className="h-16 bg-background/95 backdrop-blur-xl border-b border-border/50 flex items-center justify-between px-4 md:px-6 shadow-sm">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="w-5 h-5" />
              </Button>
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                {currentChannel.icon && <currentChannel.icon className="w-5 h-5 text-primary" />}
              </div>
              <div>
                <h2 className="font-semibold text-foreground text-base">{currentChannel.name}</h2>
                <p className="text-xs text-muted-foreground">
                  {currentChannel.members === 2 ? 'Direct message' : `${currentChannel.members} members online`}
                </p>
              </div>
            </div>
            {currentChannel.members !== 2 && (
              <Badge className="bg-primary/10 text-primary border-primary/20 px-3 py-1 font-medium">
                <Users className="w-3.5 h-3.5 mr-1.5" />
                {currentChannel.members}
              </Badge>
            )}
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1">
            <div className="p-4 md:p-6 space-y-4 md:space-y-6">
              {messages.map((message) => (
                <div key={message.id} className="flex items-start gap-2.5 md:gap-3.5 group hover:bg-muted/30 -mx-2 md:-mx-3 px-2 md:px-3 py-2 rounded-lg transition-colors">
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-primary via-secondary to-accent rounded-full flex items-center justify-center shadow-md flex-shrink-0">
                    <span className="text-primary-foreground font-semibold text-xs md:text-sm">{message.initials}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-2 mb-0.5 md:mb-1">
                      <span className="font-semibold text-foreground text-xs md:text-sm">{message.user}</span>
                      <span className="text-[10px] md:text-xs text-muted-foreground">{message.time}</span>
                    </div>
                    <p className="text-xs md:text-sm text-foreground/90 leading-relaxed">{message.message}</p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          {/* Message Input */}
          <div className="p-3 md:p-4 border-t border-border/50 bg-background/95 backdrop-blur-xl">
            <div className="flex items-end gap-2 md:gap-3 max-w-5xl mx-auto">
              <div className="flex-1 relative">
                <Input
                  placeholder={`Message ${currentChannel.name}`}
                  className="pr-20 md:pr-24 pl-3 md:pl-4 py-5 md:py-6 bg-muted/50 border-border/40 rounded-xl focus-visible:ring-2 focus-visible:ring-primary/50 transition-all text-xs md:text-sm resize-none"
                />
                <div className="absolute right-1.5 md:right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-0.5 md:gap-1">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="w-8 h-8 md:w-9 md:h-9 p-0 text-muted-foreground hover:text-foreground hover:bg-primary/10 transition-all rounded-lg"
                  >
                    <Smile className="w-3.5 h-3.5 md:w-4 md:h-4" />
                  </Button>
                  <Button 
                    size="sm" 
                    className="w-8 h-8 md:w-9 md:h-9 p-0 bg-primary hover:bg-primary/90 text-primary-foreground transition-all rounded-lg shadow-sm"
                  >
                    <Send className="w-3.5 h-3.5 md:w-4 md:h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;