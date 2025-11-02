import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, Hash, Plus, Users, Send } from 'lucide-react';

const Chat = () => {
  const [selectedChannel, setSelectedChannel] = useState('general');

  const channels = {
    myCollege: [
      { id: 'general', name: 'General', members: 1234, type: 'text' },
      { id: 'announcements', name: 'Announcements', members: 1234, type: 'text' },
      { id: 'events', name: 'Events', members: 567, type: 'text' },
      { id: 'study-groups', name: 'Study Groups', members: 890, type: 'text' }
    ],
    subjects: [
      { id: 'computer-science', name: 'Computer Science', members: 456, type: 'code' },
      { id: 'mathematics', name: 'Mathematics', members: 234, type: 'text' },
      { id: 'physics', name: 'Physics', members: 189, type: 'text' },
      { id: 'chemistry', name: 'Chemistry', members: 167, type: 'text' },
      { id: 'biology', name: 'Biology', members: 145, type: 'text' }
    ],
    global: [
      { id: 'global-general', name: 'Global General', members: 5678, type: 'text' },
      { id: 'career-advice', name: 'Career Advice', members: 2345, type: 'text' },
      { id: 'tech-trends', name: 'Tech Trends', members: 1890, type: 'code' }
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

  const currentChannel = channels.myCollege.find(c => c.id === selectedChannel) || channels.myCollege[0];

  return (
    <div className="min-h-screen immersive-bg">
      <div className="h-screen flex">
        {/* Sidebar */}
        <div className="w-80 bg-cyber-darker/80 backdrop-blur-sm border-r border-cyber-border flex flex-col">
          {/* Search */}
          <div className="p-4 border-b border-cyber-border">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search channels..."
                className="pl-10 bg-cyber-card/50 border-cyber-border"
              />
            </div>
          </div>

          {/* Channels */}
          <div className="flex-1 overflow-y-auto p-4 space-y-6">
            {/* My College */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-neon-cyan uppercase tracking-wider flex items-center">
                  <Hash className="w-4 h-4 mr-2" />
                  My College
                </h3>
                <Button variant="ghost" size="sm" className="w-6 h-6 p-0">
                  <Plus className="w-3 h-3" />
                </Button>
              </div>
              <div className="space-y-1">
                {channels.myCollege.map((channel) => (
                  <div
                    key={channel.id}
                    onClick={() => setSelectedChannel(channel.id)}
                    className={`
                      flex items-center justify-between p-2 rounded-md cursor-pointer transition-colors
                      ${selectedChannel === channel.id 
                        ? 'bg-neon-cyan/20 text-neon-cyan' 
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted/30'
                      }
                    `}
                  >
                    <div className="flex items-center space-x-2">
                      <Hash className="w-4 h-4" />
                      <span className="text-sm">{channel.name}</span>
                    </div>
                    <span className="text-xs">{channel.members}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Subjects */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-neon-purple uppercase tracking-wider">
                  Subjects
                </h3>
                <Button variant="ghost" size="sm" className="w-6 h-6 p-0">
                  <Plus className="w-3 h-3" />
                </Button>
              </div>
              <div className="space-y-1">
                {channels.subjects.map((channel) => (
                  <div
                    key={channel.id}
                    className="flex items-center justify-between p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/30 cursor-pointer transition-colors"
                  >
                    <div className="flex items-center space-x-2">
                      {channel.type === 'code' ? <Hash className="w-4 h-4" /> : <Hash className="w-4 h-4" />}
                      <span className="text-sm">{channel.name}</span>
                    </div>
                    <span className="text-xs">{channel.members}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Global */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-neon-green uppercase tracking-wider">
                  Global
                </h3>
              </div>
              <div className="space-y-1">
                {channels.global.map((channel) => (
                  <div
                    key={channel.id}
                    className="flex items-center justify-between p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/30 cursor-pointer transition-colors"
                  >
                    <div className="flex items-center space-x-2">
                      <Hash className="w-4 h-4" />
                      <span className="text-sm">{channel.name}</span>
                    </div>
                    <span className="text-xs">{channel.members}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Chat Header */}
          <div className="h-16 bg-cyber-darker/80 backdrop-blur-sm border-b border-cyber-border flex items-center justify-between px-6">
            <div className="flex items-center space-x-3">
              <Hash className="w-5 h-5 text-neon-cyan" />
              <div>
                <h2 className="font-semibold text-foreground">{currentChannel.name}</h2>
                <p className="text-sm text-muted-foreground">
                  General college discussions • {currentChannel.members} members
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge className="bg-neon-cyan/20 text-neon-cyan border-neon-cyan/30">
                {currentChannel.members}
              </Badge>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((message) => (
              <div key={message.id} className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-neon-purple to-neon-cyan rounded-full flex items-center justify-center">
                  <span className="text-black font-semibold text-sm">{message.initials}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="font-semibold text-foreground">{message.user}</span>
                    <span className="text-xs text-muted-foreground">{message.time}</span>
                  </div>
                  <p className="text-muted-foreground">{message.message}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Message Input */}
          <div className="p-4 border-t border-cyber-border">
            <div className="flex items-center space-x-3">
              <div className="flex-1 relative">
                <Input
                  placeholder={`Message #${currentChannel.name.toLowerCase()}`}
                  className="pr-12 bg-cyber-card/50 border-cyber-border"
                />
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-neon-cyan hover:text-neon-cyan/80"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Online Users */}
        <div className="w-64 bg-cyber-darker/80 backdrop-blur-sm border-l border-cyber-border p-4">
          <h3 className="text-sm font-semibold text-neon-green mb-4 uppercase tracking-wider">
            Online Now ({onlineUsers.length})
          </h3>
          <div className="space-y-2">
            {onlineUsers.map((user, index) => (
              <div key={index} className="flex items-center space-x-3 p-2 rounded-md hover:bg-muted/30 cursor-pointer transition-colors">
                <div className="relative">
                  <div className="w-8 h-8 bg-gradient-to-br from-neon-purple to-neon-cyan rounded-full flex items-center justify-center">
                    <span className="text-black font-semibold text-xs">{user.initials}</span>
                  </div>
                  <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-neon-green rounded-full border-2 border-cyber-darker"></div>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-foreground">{user.name}</p>
                  <p className="text-xs text-neon-green">Online</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;