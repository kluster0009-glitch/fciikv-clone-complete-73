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
import logo from '@/assets/logo.svg';

const Header = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  const { theme, setTheme } = useTheme();
  
  const navItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: MessageSquare, label: 'Feed', path: '/feed' },
    { icon: HelpCircle, label: 'Q&A', path: '/qa' },
    { icon: MessageCircle, label: 'Chat', path: '/chat' },
    { icon: BookOpen, label: 'Library', path: '/library' },
    { icon: GraduationCap, label: 'Professor', path: '/professor' },
    { icon: Calendar, label: 'Events', path: '/events' },
    { icon: Trophy, label: 'Leaderboard', path: '/leaderboard' },
    { icon: User, label: 'Profile', path: '/profile' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-cyber-darker/80 backdrop-blur-xl border-b border-cyber-border">
      <div className="container mx-auto px-6 py-2">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-1.5">
            <img src={logo} alt="Kluster" className="h-12 w-auto" />
            <span className="text-2xl font-semibold bg-gradient-to-r from-soft-cyan to-soft-violet bg-clip-text text-transparent">
              KLUSTER
            </span>
          </Link>

          {user ? (
            <>
              {/* Navigation - Only show when authenticated */}
              <nav className="hidden lg:flex items-center space-x-1">
                {navItems.map((item, index) => {
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
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-muted-foreground hover:text-foreground hidden sm:flex h-8"
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                >
                  {theme === 'dark' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="border-destructive/30 text-destructive hover:bg-destructive/20 hidden sm:flex h-8"
                  onClick={signOut}
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </Button>
                
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
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
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
              {navItems.map((item, index) => {
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
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="w-full justify-start text-muted-foreground hover:text-foreground"
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                >
                  {theme === 'dark' ? <Moon className="w-4 h-4 mr-3" /> : <Sun className="w-4 h-4 mr-3" />}
                  <span>{theme === 'dark' ? 'Dark' : 'Light'} Mode</span>
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
                  Sign Out
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