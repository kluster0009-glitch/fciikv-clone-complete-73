-- Add login_counter column to profiles table
ALTER TABLE public.profiles 
ADD COLUMN login_counter INTEGER DEFAULT 0 NOT NULL;

-- Create onboarding_survey table
CREATE TABLE public.onboarding_survey (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT,
  full_name TEXT,
  department TEXT,
  roll_number TEXT,
  bio TEXT,
  where_heard_about_us TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Enable RLS on onboarding_survey
ALTER TABLE public.onboarding_survey ENABLE ROW LEVEL SECURITY;

-- RLS policies for onboarding_survey
CREATE POLICY "Users can insert their own survey"
ON public.onboarding_survey
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own survey"
ON public.onboarding_survey
FOR SELECT
USING (auth.uid() = user_id);

-- Create function to increment login counter
CREATE OR REPLACE FUNCTION public.increment_login_counter()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE public.profiles
  SET login_counter = login_counter + 1
  WHERE id = NEW.id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Create trigger to increment login counter on profile creation/update via auth
CREATE TRIGGER on_user_login
  AFTER INSERT ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.increment_login_counter();