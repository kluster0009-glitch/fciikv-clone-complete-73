-- Remove unnecessary columns from onboarding_survey table
ALTER TABLE public.onboarding_survey 
DROP COLUMN IF EXISTS username,
DROP COLUMN IF EXISTS full_name,
DROP COLUMN IF EXISTS department,
DROP COLUMN IF EXISTS roll_number,
DROP COLUMN IF EXISTS bio;