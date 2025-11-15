import React, { useState, useRef, useEffect } from 'react';
import { User, UserPlus, MessageSquare, Ban, Flag } from 'lucide-react';

interface ChatMessageProps {
  message: {
    id: number;
    sender_id: string;
    sender_full_name?: string | null;
    content: string;
    created_at: string;
  };
  getInitials: (name?: string | null) => string;
  onViewProfile?: (userId: string) => void;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message, getInitials, onViewProfile }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const time = new Date(message.created_at).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });
  const displayName = message.sender_full_name || 'Member';
  const initials = getInitials(displayName);

  // Placeholder callback functions
  const handleViewProfile = (userId: string) => {
    if (onViewProfile) {
      onViewProfile(userId);
    }
    setDropdownOpen(false);
  };

  const onSendFriendRequest = (userId: string) => {
    console.log('Send friend request:', userId);
    setDropdownOpen(false);
  };

  const onMessageUser = (userId: string) => {
    console.log('Message user:', userId);
    setDropdownOpen(false);
  };

  const onBlockUser = (userId: string) => {
    console.log('Block user:', userId);
    setDropdownOpen(false);
  };

  const onReportUser = (userId: string) => {
    console.log('Report user:', userId);
    setDropdownOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownOpen]);

  return (
    <div className="flex items-start gap-2.5 md:gap-3.5 group hover:bg-muted/30 -mx-2 md:-mx-3 px-2 md:px-3 py-2 rounded-lg transition-colors">
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-primary via-secondary to-accent rounded-full flex items-center justify-center shadow-md flex-shrink-0 hover:scale-105 transition-transform cursor-pointer"
        >
          <span className="text-primary-foreground font-semibold text-xs md:text-sm">
            {initials}
          </span>
        </button>

        {/* Dropdown Menu */}
        {dropdownOpen && (
          <div
            className="absolute top-12 left-0 z-50 w-48 bg-popover border border-border rounded-lg shadow-lg overflow-hidden animate-in fade-in-0 zoom-in-95 duration-200"
            style={{ transformOrigin: 'top left' }}
          >
            <div className="py-1">
              <button
                onClick={() => handleViewProfile(message.sender_id)}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-popover-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                <User className="w-4 h-4" />
                View Profile
              </button>
              
              <button
                onClick={() => onSendFriendRequest(message.sender_id)}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-popover-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                <UserPlus className="w-4 h-4" />
                Send Friend Request
              </button>
              
              <button
                onClick={() => onMessageUser(message.sender_id)}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-popover-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                Message User
              </button>
              
              <div className="border-t border-border my-1" />
              
              <button
                onClick={() => onBlockUser(message.sender_id)}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-destructive hover:bg-destructive/10 transition-colors"
              >
                <Ban className="w-4 h-4" />
                Block User
              </button>
              
              <button
                onClick={() => onReportUser(message.sender_id)}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-destructive hover:bg-destructive/10 transition-colors"
              >
                <Flag className="w-4 h-4" />
                Report User
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-baseline gap-2 mb-0.5 md:mb-1">
          <span className="font-semibold text-foreground text-xs md:text-sm">
            {displayName}
          </span>
          <span className="text-[10px] md:text-xs text-muted-foreground">
            {time}
          </span>
        </div>
        <p className="text-xs md:text-sm text-foreground/90 leading-relaxed">
          {message.content}
        </p>
      </div>
    </div>
  );
};
