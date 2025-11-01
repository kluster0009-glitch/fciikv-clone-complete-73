-- Add UPDATE policy for onboarding_survey to allow upsert operations
CREATE POLICY "Users can update their own survey" 
ON public.onboarding_survey 
FOR UPDATE 
TO public
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);