-- Add new columns to carousel_slides table for enhanced content
ALTER TABLE public.carousel_slides
ADD COLUMN IF NOT EXISTS image_url text,
ADD COLUMN IF NOT EXISTS heading text,
ADD COLUMN IF NOT EXISTS subheading text,
ADD COLUMN IF NOT EXISTS button_text text,
ADD COLUMN IF NOT EXISTS button_link text;