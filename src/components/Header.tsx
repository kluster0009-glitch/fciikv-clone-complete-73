import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from 'next-themes';
import { 
  Home, 
  MessageSquare, 
  HelpCircle, 
  MessageCircle, 
  BookOpen, 
  GraduationCap, 
  Calendar, 
  Trophy,
  Menu,
  X,
  LogOut,
  User,
  Moon,
  Sun
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import logo from '@/assets/logo.svg';

const Header = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLogoFlipping, setIsLogoFlipping] = useState(false);
  const { user, signOut } = useAuth();
  const { theme, setTheme } = useTheme();
  
  const handleThemeToggle = () => {
    setIsLogoFlipping(true);
    setTheme(theme === 'dark' ? 'light' : 'dark');
    setTimeout(() => setIsLogoFlipping(false), 600);
  };
  
  const navItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: MessageSquare, label: 'Cluster', path: '/feed' },
    { icon: HelpCircle, label: 'Q&A', path: '/qa' },
    { icon: MessageCircle, label: 'Chat', path: '/chat' },
    { icon: BookOpen, label: 'Library', path: '/library' },
    { icon: GraduationCap, label: 'Professor', path: '/professor' },
    { icon: Calendar, label: 'Events', path: '/events' },
    { icon: Trophy, label: 'Leaderboard', path: '/leaderboard' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-cyber-darker/80 backdrop-blur-xl border-b border-cyber-border">
      <div className="container mx-auto px-6 py-2">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-0.5">
            <img 
              src={logo} 
              alt="Kluster" 
              className={`h-12 w-auto -mr-1 transition-transform duration-600 ${isLogoFlipping ? 'animate-flip' : ''}`}
            />
            <span className="text-2xl font-semibold font-space bg-gradient-to-r from-soft-cyan to-soft-violet bg-clip-text text-transparent">
              KLUSTER
            </span>
          </Link>

          {user ? (
            <>
              {/* Navigation - Only show when authenticated */}
              <nav className="hidden lg:flex items-center space-x-1">
                {navItems.filter(item => item.label !== 'Home').map((item, index) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.path;
                  return (
                    <Link key={index} to={item.path}>
                      <Button
                        variant={isActive ? "default" : "ghost"}
                        size="sm"
                        className={`
                          ${isActive 
                            ? 'bg-neon-cyan/20 text-neon-cyan border border-neon-cyan/30 hover:bg-neon-cyan/30' 
                            : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                          }
                          transition-all duration-200 h-8
                        `}
                      >
                        <Icon className="w-4 h-4 mr-2" />
                        {item.label}
                      </Button>
                    </Link>
                  );
                })}
              </nav>

              {/* User Actions & Mobile Menu Toggle */}
              <div className="flex items-center space-x-3">
                {/* Profile Dropdown - Desktop */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="hidden sm:flex items-center justify-center w-9 h-9 rounded-full bg-gradient-to-br from-soft-cyan/20 to-soft-violet/20 border border-soft-cyan/30 hover:border-soft-cyan/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(91,206,250,0.4)] focus:outline-none focus:ring-2 focus:ring-soft-cyan/50">
                      <Avatar className="w-9 h-9">
                        <AvatarImage src={user?.user_metadata?.avatar_url} alt={user?.email} />
                        <AvatarFallback className="bg-gradient-to-br from-soft-cyan to-soft-violet text-background text-sm font-semibold">
                          {user?.email?.[0]?.toUpperCase() || 'U'}
                        </AvatarFallback>
                      </Avatar>
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent 
                    align="end" 
                    className="w-56 bg-card/95 backdrop-blur-xl border-border-subtle shadow-[0_8px_32px_rgba(0,0,0,0.4)] animate-in fade-in-0 zoom-in-95 slide-in-from-top-2 duration-200"
                  >
                    <div className="px-2 py-1.5">
                      <p className="text-sm font-medium text-foreground">{user?.user_metadata?.full_name || 'User'}</p>
                      <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
                    </div>
                    <DropdownMenuSeparator className="bg-border-subtle" />
                    <DropdownMenuItem asChild className="cursor-pointer focus:bg-muted/50 focus:text-foreground">
                      <Link to="/profile" className="flex items-center">
                        <User className="w-4 h-4 mr-2" />
                        Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={handleThemeToggle}
                      className="cursor-pointer focus:bg-muted/50 focus:text-foreground"
                    >
                      {theme === 'dark' ? <Moon className="w-4 h-4 mr-2" /> : <Sun className="w-4 h-4 mr-2" />}
                      Change Theme
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-border-subtle" />
                    <DropdownMenuItem 
                      onClick={signOut}
                      className="cursor-pointer focus:bg-destructive/20 focus:text-destructive"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                
                {/* Mobile Menu Button */}
                <Button
                  variant="ghost"
                  size="sm"
                  className="lg:hidden text-muted-foreground hover:text-foreground h-8"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                  {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </Button>
              </div>
            </>
          ) : (
            /* Sign In Button & Theme Toggle - Show when not authenticated */
            <div className="flex items-center space-x-3">
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-muted-foreground hover:text-foreground h-8"
                onClick={handleThemeToggle}
              >
                {theme === 'dark' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
              </Button>
              <Link to="/auth">
                <Button 
                  variant="outline" 
                  size="sm"
                  className="border-neon-purple/30 text-neon-purple hover:bg-neon-purple/20 h-8"
                >
                  Sign In
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Navigation Menu - Only show when authenticated */}
      {isMobileMenuOpen && user && (
        <div className="lg:hidden bg-cyber-darker/95 backdrop-blur-xl border-b border-cyber-border">
          <div className="container mx-auto px-6 py-4">
            <nav className="space-y-2">
              {navItems.filter(item => item.label !== 'Home').map((item, index) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Link 
                    key={index} 
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Button
                      variant={isActive ? "default" : "ghost"}
                      size="sm"
                      className={`
                        w-full justify-start
                        ${isActive 
                          ? 'bg-neon-cyan/20 text-neon-cyan border border-neon-cyan/30 hover:bg-neon-cyan/30' 
                          : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                        }
                        transition-all duration-200
                      `}
                    >
                      <Icon className="w-4 h-4 mr-3" />
                      {item.label}
                    </Button>
                  </Link>
                );
              })}
              
              {/* Mobile User Actions */}
              <div className="pt-4 border-t border-cyber-border space-y-2">
                <div className="flex items-center gap-3 px-2 py-3 bg-muted/30 rounded-lg">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={user?.user_metadata?.avatar_url} alt={user?.email} />
                    <AvatarFallback className="bg-gradient-to-br from-soft-cyan to-soft-violet text-background text-sm font-semibold">
                      {user?.email?.[0]?.toUpperCase() || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{user?.user_metadata?.full_name || 'User'}</p>
                    <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="w-full justify-start text-muted-foreground hover:text-foreground"
                  onClick={handleThemeToggle}
                >
                  {theme === 'dark' ? <Moon className="w-4 h-4 mr-3" /> : <Sun className="w-4 h-4 mr-3" />}
                  <span>Change Theme</span>
                </Button>
                <Button
                  variant="outline" 
                  size="sm"
                  className="w-full justify-start border-destructive/30 text-destructive hover:bg-destructive/20"
                  onClick={() => {
                    signOut();
                    setIsMobileMenuOpen(false);
                  }}
                >
                  <LogOut className="w-4 h-4 mr-3" />
                  Logout
                </Button>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;