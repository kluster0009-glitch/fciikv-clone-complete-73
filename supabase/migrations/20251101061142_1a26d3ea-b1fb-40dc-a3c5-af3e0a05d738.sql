-- Remove recursive SELECT policy on profiles to fix 500 errors
DROP POLICY IF EXISTS "Users can view profiles in their organization" ON public.profiles;

-- Keep existing safe SELECT policy (read own profile) unchanged
-- Optionally, add an admin-only view using role function without referencing profiles to avoid recursion
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'public' AND tablename = 'profiles' AND policyname = 'Admins can view all profiles'
  ) THEN
    CREATE POLICY "Admins can view all profiles"
    ON public.profiles
    FOR SELECT
    TO authenticated
    USING (public.has_role(auth.uid(), 'admin'));
  END IF;
END $$;
