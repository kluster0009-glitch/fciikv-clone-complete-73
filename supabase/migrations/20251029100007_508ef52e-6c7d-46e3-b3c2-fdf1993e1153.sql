-- Enable RLS on tables that don't have it yet
ALTER TABLE public.channel_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.organization_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.email_domains ENABLE ROW LEVEL SECURITY;

-- Add RLS policies for channel_members
CREATE POLICY "Users can view their own memberships"
ON public.channel_members
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own memberships"
ON public.channel_members
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Add RLS policies for messages
CREATE POLICY "Users can view messages in their channels"
ON public.messages
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.channel_members cm
    WHERE cm.channel_id = messages.channel_id
    AND cm.user_id = auth.uid()
  )
);

CREATE POLICY "Users can insert messages in their channels"
ON public.messages
FOR INSERT
WITH CHECK (
  auth.uid() = sender_id
  AND EXISTS (
    SELECT 1 FROM public.channel_members cm
    WHERE cm.channel_id = messages.channel_id
    AND cm.user_id = auth.uid()
  )
);

CREATE POLICY "Users can update their own messages"
ON public.messages
FOR UPDATE
USING (auth.uid() = sender_id);

CREATE POLICY "Users can delete their own messages"
ON public.messages
FOR DELETE
USING (auth.uid() = sender_id);

-- Add RLS policy for organization_requests (anyone can create, only admins can view all)
CREATE POLICY "Anyone can create organization requests"
ON public.organization_requests
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Users can view their own organization requests"
ON public.organization_requests
FOR SELECT
USING (requester_email = (SELECT email FROM public.profiles WHERE id = auth.uid()));

-- Add RLS policy for email_domains (read-only for authenticated users)
CREATE POLICY "Authenticated users can view email domains"
ON public.email_domains
FOR SELECT
USING (auth.uid() IS NOT NULL);

-- Update profiles policies to allow updates
CREATE POLICY "Users can update their own profile"
ON public.profiles
FOR UPDATE
USING (id = auth.uid());

-- Fix search_path for security definer functions
CREATE OR REPLACE FUNCTION public.create_profile_for_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $function$
declare
  org_id bigint;
begin
  select id into org_id from public.email_domains
  where domain = split_part(new.email, '@', 2);

  insert into public.profiles (id, email, organization_id)
  values (new.id, new.email, org_id);

  return new;
end;
$function$;

CREATE OR REPLACE FUNCTION public.on_email_domain_created_seed()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $function$
begin
  perform public.seed_org_channels(new.id, null);
  return new;
end;
$function$;