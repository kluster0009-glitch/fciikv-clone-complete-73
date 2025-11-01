-- Fix infinite recursion in profiles UPDATE policy
-- The WITH CHECK clause was querying profiles from within the profiles policy

-- Drop the problematic policy
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;

-- Recreate with simplified check that doesn't cause recursion
CREATE POLICY "Users can update their own profile" 
ON public.profiles 
FOR UPDATE 
TO public
USING (id = auth.uid())
WITH CHECK (id = auth.uid());

-- Note: Role management is handled separately via the user_roles table
-- This policy now only ensures users can update their own profile
-- without attempting to verify role consistency (which caused recursion)