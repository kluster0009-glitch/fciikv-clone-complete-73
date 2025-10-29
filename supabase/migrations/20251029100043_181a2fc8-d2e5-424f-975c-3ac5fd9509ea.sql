-- Fix remaining functions with search_path
CREATE OR REPLACE FUNCTION public.seed_org_channels(p_org_id bigint, p_created_by uuid DEFAULT NULL::uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $function$
begin
  -- Per-college defaults
  insert into public.channels (name, description, type, scope, is_private, organization_id, created_by)
  select v.name, v.description, v.type, v.scope, false, p_org_id, p_created_by
  from (values
    ('General',       'College-wide chat',     'college', 'college'),
    ('Announcements', 'Official notices',      'college', 'college'),
    ('Events',        'Campus events & fests', 'college', 'college')
  ) as v(name, description, type, scope)
  on conflict (name, organization_id) do nothing;
end;
$function$;

CREATE OR REPLACE FUNCTION public.me_profile()
RETURNS TABLE(user_id uuid, email text, role text, organization_id bigint, organization_name text)
LANGUAGE sql
STABLE 
SECURITY DEFINER
SET search_path = public
AS $function$
  select
    p.id as user_id,
    p.email,
    p.role,
    p.organization_id,
    ed.organization_name
  from public.profiles p
  left join public.email_domains ed on ed.id = p.organization_id
  where p.id = auth.uid();
$function$;