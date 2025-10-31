import { createClient } from 'jsr:@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email } = await req.json();

    if (!email || typeof email !== 'string') {
      return new Response(
        JSON.stringify({ 
          isValid: false, 
          message: 'Email is required' 
        }),
        { 
          status: 400, 
          headers: { 'Content-Type': 'application/json', ...corsHeaders } 
        }
      );
    }

    // Extract domain from email
    const domain = email.split('@')[1];
    
    if (!domain) {
      return new Response(
        JSON.stringify({ 
          isValid: false, 
          message: 'Invalid email format' 
        }),
        { 
          status: 400, 
          headers: { 'Content-Type': 'application/json', ...corsHeaders } 
        }
      );
    }

    // Create Supabase client with service role key to query email_domains
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );

    // Check if domain exists in email_domains table
    const { data, error } = await supabase
      .from('email_domains')
      .select('id, organization_name')
      .eq('domain', domain)
      .single();

    if (error || !data) {
      console.log(`Domain validation failed for: ${domain}`, error);
      return new Response(
        JSON.stringify({ 
          isValid: false, 
          message: 'This email domain is not registered. Please contact your administrator.' 
        }),
        { 
          status: 200, 
          headers: { 'Content-Type': 'application/json', ...corsHeaders } 
        }
      );
    }

    console.log(`Domain validation successful for: ${domain}, org: ${data.organization_name}`);
    
    return new Response(
      JSON.stringify({ 
        isValid: true, 
        organizationId: data.id,
        organizationName: data.organization_name,
        message: 'Email domain is valid'
      }),
      { 
        status: 200, 
        headers: { 'Content-Type': 'application/json', ...corsHeaders } 
      }
    );
  } catch (error) {
    console.error('Error in verify-email-domain function:', error);
    return new Response(
      JSON.stringify({ 
        isValid: false, 
        message: 'An error occurred during verification. Please try again.' 
      }),
      { 
        status: 500, 
        headers: { 'Content-Type': 'application/json', ...corsHeaders } 
      }
    );
  }
});
