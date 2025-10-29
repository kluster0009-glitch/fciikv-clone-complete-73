-- Update the trigger function to sync display_name to full_name on signup
CREATE OR REPLACE FUNCTION public.create_profile_for_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $function$
declare
  org_id bigint;
begin
  select id into org_id from public.email_domains
  where domain = split_part(new.email, '@', 2);

  insert into public.profiles (id, email, organization_id, full_name)
  values (
    new.id, 
    new.email, 
    org_id,
    coalesce(new.raw_user_meta_data->>'display_name', new.raw_user_meta_data->>'full_name')
  );

  return new;
end;
$function$;