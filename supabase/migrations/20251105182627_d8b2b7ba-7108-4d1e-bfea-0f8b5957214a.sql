-- Create carousel_slides table
CREATE TABLE public.carousel_slides (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  type TEXT NOT NULL CHECK (type IN ('info', 'alert', 'event', 'announcement')),
  message TEXT NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT true,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.carousel_slides ENABLE ROW LEVEL SECURITY;

-- Create policy for viewing carousel slides (everyone can view active slides)
CREATE POLICY "Anyone can view active carousel slides"
ON public.carousel_slides
FOR SELECT
USING (is_active = true);

-- Create policy for admins to manage slides
CREATE POLICY "Admins can manage carousel slides"
ON public.carousel_slides
FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_carousel_slides_updated_at
BEFORE UPDATE ON public.carousel_slides
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create index for ordering
CREATE INDEX idx_carousel_slides_order ON public.carousel_slides(display_order, created_at);