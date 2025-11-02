import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from 'next-themes';
import { 
  MessageSquare, 
  HelpCircle, 
  BookOpen, 
  GraduationCap, 
  Calendar, 
  Trophy,
  LogOut,
  Moon,
  Sun
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  useSidebar,
} from '@/components/ui/sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

const navItems = [
  { icon: MessageSquare, label: 'Cluster', path: '/cluster' },
  { icon: HelpCircle, label: 'Q&A', path: '/qa' },
  { icon: BookOpen, label: 'Library', path: '/library' },
  { icon: GraduationCap, label: 'Professor', path: '/professor' },
  { icon: Calendar, label: 'Events', path: '/events' },
  { icon: Trophy, label: 'Leaderboard', path: '/leaderboard' },
];

export function AppSidebar() {
  const { user, signOut } = useAuth();
  const { theme, setTheme } = useTheme();
  const location = useLocation();
  const { open } = useSidebar();
  const currentPath = location.pathname;

  const handleThemeToggle = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const handleLogout = () => {
    signOut();
  };

  const isActive = (path: string) => currentPath === path;

  return (
    <Sidebar className={`${open ? 'w-60' : 'w-16'} transition-all duration-300 border-r border-cyber-border bg-cyber-darker/95 backdrop-blur-xl`}>
      <SidebarContent className="pt-4">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton
                    asChild
                    className={`
                      ${isActive(item.path)
                        ? 'bg-neon-cyan/20 text-neon-cyan border-l-2 border-neon-cyan'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                      }
                      transition-all duration-200
                    `}
                  >
                    <Link to={item.path} className="flex items-center gap-3 px-3 py-2">
                      <item.icon className="w-5 h-5" />
                      {open && <span>{item.label}</span>}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer with User Info */}
      <SidebarFooter className="border-t border-cyber-border p-4">
        <div className="space-y-2">
          {/* User Profile */}
          {open ? (
            <Link to="/profile" className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors">
              <Avatar className="w-9 h-9">
                <AvatarImage src={user?.user_metadata?.avatar_url} alt={user?.email} />
                <AvatarFallback className="bg-gradient-to-br from-soft-cyan to-soft-violet text-background text-sm font-semibold">
                  {user?.email?.[0]?.toUpperCase() || 'U'}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">
                  {user?.user_metadata?.full_name || 'User'}
                </p>
                <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
              </div>
            </Link>
          ) : (
            <Link to="/profile" className="flex items-center justify-center p-2 rounded-lg hover:bg-muted/50 transition-colors">
              <Avatar className="w-9 h-9">
                <AvatarImage src={user?.user_metadata?.avatar_url} alt={user?.email} />
                <AvatarFallback className="bg-gradient-to-br from-soft-cyan to-soft-violet text-background text-sm font-semibold">
                  {user?.email?.[0]?.toUpperCase() || 'U'}
                </AvatarFallback>
              </Avatar>
            </Link>
          )}

          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={handleThemeToggle}
            className={`${open ? 'w-full justify-start' : 'w-full justify-center'} text-muted-foreground hover:text-foreground`}
          >
            {theme === 'dark' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            {open && <span className="ml-3">Change Theme</span>}
          </Button>

          {/* Logout */}
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLogout}
            className={`${open ? 'w-full justify-start' : 'w-full justify-center'} text-destructive hover:bg-destructive/20`}
          >
            <LogOut className="w-4 h-4" />
            {open && <span className="ml-3">Logout</span>}
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
