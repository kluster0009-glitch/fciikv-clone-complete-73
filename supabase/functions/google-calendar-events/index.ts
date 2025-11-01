import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization')! },
        },
      }
    );

    const { userId } = await req.json();

    // Get user's Google access token
    const { data: tokenData, error: tokenError } = await supabaseClient
      .from('user_google_tokens')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (tokenError || !tokenData) {
      throw new Error('Google Calendar not connected');
    }

    // Fetch calendar events from Google Calendar API
    const response = await fetch(
      'https://www.googleapis.com/calendar/v3/calendars/primary/events?timeMin=' + 
      new Date().toISOString() + '&maxResults=50&singleEvents=true&orderBy=startTime',
      {
        headers: {
          'Authorization': `Bearer ${tokenData.access_token}`,
        },
      }
    );

    if (!response.ok) {
      // If token expired, try to refresh
      if (response.status === 401 && tokenData.refresh_token) {
        const refreshResponse = await fetch('https://oauth2.googleapis.com/token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams({
            client_id: Deno.env.get('GOOGLE_CLIENT_ID')!,
            client_secret: Deno.env.get('GOOGLE_CLIENT_SECRET')!,
            refresh_token: tokenData.refresh_token,
            grant_type: 'refresh_token',
          }),
        });

        if (refreshResponse.ok) {
          const refreshData = await refreshResponse.json();
          
          // Update token in database
          await supabaseClient
            .from('user_google_tokens')
            .update({
              access_token: refreshData.access_token,
              token_expiry: new Date(Date.now() + refreshData.expires_in * 1000),
            })
            .eq('user_id', userId);

          // Retry fetching events with new token
          const retryResponse = await fetch(
            'https://www.googleapis.com/calendar/v3/calendars/primary/events?timeMin=' + 
            new Date().toISOString() + '&maxResults=50&singleEvents=true&orderBy=startTime',
            {
              headers: {
                'Authorization': `Bearer ${refreshData.access_token}`,
              },
            }
          );

          if (retryResponse.ok) {
            const data = await retryResponse.json();
            return new Response(
              JSON.stringify({ events: data.items || [] }),
              {
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
                status: 200,
              }
            );
          }
        }
      }
      
      throw new Error('Failed to fetch calendar events');
    }

    const data = await response.json();

    return new Response(
      JSON.stringify({ events: data.items || [] }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    );
  }
});
