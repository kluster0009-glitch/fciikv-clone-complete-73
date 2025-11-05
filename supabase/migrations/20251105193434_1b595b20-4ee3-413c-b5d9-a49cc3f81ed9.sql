-- Remove type and subheading columns, add text customization columns
ALTER TABLE public.carousel_slides 
DROP COLUMN IF EXISTS type,
DROP COLUMN IF EXISTS subheading;

-- Add text customization columns
ALTER TABLE public.carousel_slides
ADD COLUMN heading_color text DEFAULT '#ffffff',
ADD COLUMN heading_font_family text DEFAULT 'Inter',
ADD COLUMN heading_font_size text DEFAULT '2xl',
ADD COLUMN message_color text DEFAULT '#ffffff',
ADD COLUMN message_font_family text DEFAULT 'Inter',
ADD COLUMN message_font_size text DEFAULT 'base';