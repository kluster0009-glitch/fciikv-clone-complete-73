import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const AuthCallback = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const backend_url = "http://127.0.0.1:3000";

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        // 1. Get the current session (Supabase automatically handles OAuth redirect)
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();

        if (sessionError) {
          toast({
            variant: "destructive",
            title: "Authentication failed",
            description: "Could not process your login. Please try again.",
          });
          navigate('/auth');
          return;
        }

        const user = session?.user;
        if (!user?.email) {
          toast({
            variant: "destructive",
            title: "Authentication failed",
            description: "Could not retrieve your email from Google.",
          });
          await supabase.auth.signOut();
          navigate('/auth');
          return;
        }

        // 2. Validate email domain with backend
        const response = await fetch(`${backend_url}/api/verify-email`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: user.email }),
        });

        const result = await response.json();

        if (response.ok && result.isValid) {
          // Domain valid → proceed
          toast({
            title: "Welcome!",
            description: "Signed in successfully via Google.",
          });
          navigate('/');
        } else {
          // Domain invalid → delete the user and show toast
          // After detecting invalid domain
          await fetch(`${backend_url}/api/delete-user`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: user.id }),
          });


          toast({
            variant: "destructive",
            title: "Sign in not allowed",
            description: result.message || "Please enter your student email address.",
          });

          // Ensure session is cleared
          await supabase.auth.signOut();
          navigate('/auth');
        }
      } catch (err) {
        console.error(err);
        toast({
          variant: "destructive",
          title: "Verification failed",
          description: "Could not verify your account. Please try again later.",
        });
        await supabase.auth.signOut();
        navigate('/auth');
      }
    };

    handleAuthCallback();
  }, [navigate, toast]);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <p>Verifying your account, please wait...</p>
    </div>
  );
};

export default AuthCallback;
