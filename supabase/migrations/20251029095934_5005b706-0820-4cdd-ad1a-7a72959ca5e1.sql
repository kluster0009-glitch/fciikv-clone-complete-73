-- Add new profile fields to profiles table
ALTER TABLE public.profiles
ADD COLUMN username text UNIQUE,
ADD COLUMN college_name text,
ADD COLUMN department text,
ADD COLUMN roll_number text,
ADD COLUMN bio text,
ADD COLUMN profile_picture text;

-- Create an index on username for faster lookups
CREATE INDEX idx_profiles_username ON public.profiles(username);

COMMENT ON COLUMN public.profiles.username IS 'Unique username for the user';
COMMENT ON COLUMN public.profiles.college_name IS 'Name of the college/institution';
COMMENT ON COLUMN public.profiles.department IS 'Academic department';
COMMENT ON COLUMN public.profiles.roll_number IS 'Student roll/registration number';
COMMENT ON COLUMN public.profiles.bio IS 'User biography/description';
COMMENT ON COLUMN public.profiles.profile_picture IS 'URL to profile picture';