-- Add RLS policy to allow users to view profiles within their organization
CREATE POLICY "Users can view profiles in their organization"
ON public.profiles
FOR SELECT
USING (
  organization_id = (
    SELECT organization_id 
    FROM public.profiles 
    WHERE id = auth.uid()
  )
);

-- Add DELETE policy for channel members to leave channels
CREATE POLICY "Users can leave channels"
ON public.channel_members
FOR DELETE
USING (user_id = auth.uid());

-- Add UPDATE policy for channel creators to manage members
CREATE POLICY "Channel creators can manage members"
ON public.channel_members
FOR UPDATE
USING (
  channel_id IN (
    SELECT id FROM public.channels WHERE created_by = auth.uid()
  )
);