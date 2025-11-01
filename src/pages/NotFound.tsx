import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import Header from '@/components/Header';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen immersive-bg">
      <Header />
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="mb-4 text-4xl font-bold text-foreground">404</h1>
          <p className="mb-4 text-xl text-muted-foreground">Oops! Page not found</p>
          <a href="/" className="text-neon-cyan underline hover:text-neon-cyan/80">
            Return to Home
          </a>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
