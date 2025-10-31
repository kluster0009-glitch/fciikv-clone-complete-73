-- Fix Security Issues: User Roles Protection and Required Fields

-- 1. CREATE USER ROLES SYSTEM
-- Create enum for roles
CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'student');

-- Create user_roles table for secure role management
CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at timestamp with time zone DEFAULT now(),
  UNIQUE (user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Allow users to view their own roles
CREATE POLICY "Users can view their own roles"
ON public.user_roles
FOR SELECT
USING (auth.uid() = user_id);

-- Only allow viewing roles (insert/update/delete will be handled by admin functions)
-- No INSERT/UPDATE/DELETE policies - roles can only be managed server-side

-- 2. CREATE SECURITY DEFINER FUNCTION FOR ROLE CHECKING
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- 3. MIGRATE EXISTING ROLES FROM PROFILES TO USER_ROLES
-- Insert existing roles into user_roles table, mapping text to enum
INSERT INTO public.user_roles (user_id, role)
SELECT 
  id,
  CASE 
    WHEN role = 'admin' THEN 'admin'::app_role
    WHEN role = 'moderator' THEN 'moderator'::app_role
    ELSE 'student'::app_role
  END
FROM public.profiles
WHERE role IS NOT NULL
ON CONFLICT (user_id, role) DO NOTHING;

-- 4. FIX NULLABLE REQUIRED FIELDS
-- Update null values in profiles to have default values before adding constraints
UPDATE public.profiles
SET 
  username = COALESCE(username, 'user_' || substring(id::text, 1, 8)),
  full_name = COALESCE(full_name, 'User'),
  department = COALESCE(department, 'General'),
  roll_number = COALESCE(roll_number, 'N/A')
WHERE username IS NULL 
   OR full_name IS NULL 
   OR department IS NULL 
   OR roll_number IS NULL;

-- Now add NOT NULL constraints to required fields
ALTER TABLE public.profiles 
  ALTER COLUMN username SET NOT NULL,
  ALTER COLUMN full_name SET NOT NULL,
  ALTER COLUMN department SET NOT NULL,
  ALTER COLUMN roll_number SET NOT NULL;

-- 5. UPDATE PROFILES RLS POLICY TO PREVENT ROLE MODIFICATION
-- Drop and recreate the update policy to exclude role field
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;

CREATE POLICY "Users can update their own profile"
ON public.profiles
FOR UPDATE
USING (id = auth.uid())
WITH CHECK (
  id = auth.uid() AND 
  -- Prevent users from changing their role field
  role = (SELECT role FROM public.profiles WHERE id = auth.uid())
);

-- 6. UPDATE CREATE_PROFILE_FOR_USER FUNCTION
-- Ensure new profiles have required fields populated
CREATE OR REPLACE FUNCTION public.create_profile_for_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $function$
declare
  org_id bigint;
begin
  select id into org_id from public.email_domains
  where domain = split_part(new.email, '@', 2);

  insert into public.profiles (
    id, 
    email, 
    organization_id, 
    full_name,
    username,
    department,
    roll_number,
    role
  ) values (
    new.id, 
    new.email, 
    org_id,
    coalesce(new.raw_user_meta_data->>'display_name', new.raw_user_meta_data->>'full_name', 'User'),
    coalesce(new.raw_user_meta_data->>'username', 'user_' || substring(new.id::text, 1, 8)),
    'General',
    'N/A',
    'student'
  );

  -- Also insert default student role into user_roles
  insert into public.user_roles (user_id, role)
  values (new.id, 'student'::app_role);

  return new;
end;
$function$;