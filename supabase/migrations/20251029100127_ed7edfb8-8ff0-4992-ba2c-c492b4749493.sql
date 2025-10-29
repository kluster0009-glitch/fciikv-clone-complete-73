-- Enable RLS on channels table
ALTER TABLE public.channels ENABLE ROW LEVEL SECURITY;

-- Add policies for channels management
CREATE POLICY "Users can create channels in their organization"
ON public.channels
FOR INSERT
WITH CHECK (
  organization_id = (
    SELECT organization_id FROM public.profiles WHERE id = auth.uid()
  )
);

CREATE POLICY "Users can update channels they created"
ON public.channels
FOR UPDATE
USING (created_by = auth.uid());

CREATE POLICY "Users can delete channels they created"
ON public.channels
FOR DELETE
USING (created_by = auth.uid());