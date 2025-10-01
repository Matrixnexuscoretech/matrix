import { createClient, SupabaseClient } from '@supabase/supabase-js';

let supabase: SupabaseClient | null = null;

// Load config.json from public/
async function loadConfig() {
  const res = await fetch('/config.json');
  if (!res.ok) {
    throw new Error('Failed to load config.json');
  }
  return res.json();
}

// Lazy initialize Supabase client
export async function getSupabase(): Promise<SupabaseClient> {
  if (!supabase) {
    const config = await loadConfig();
    supabase = createClient(config.SUPABASE_URL, config.SUPABASE_ANON_KEY);
  }
  return supabase;
}

export interface Enrollment {
  id?: string;
  full_name: string;
  email: string;
  phone: string;
  course: string;
  message?: string;
  consent: boolean;
  status?: string;
  created_at?: string;
  updated_at?: string;
}

export async function submitEnrollment(data: Enrollment) {
  const client = await getSupabase();
  const { data: enrollment, error } = await client
    .from('enrollments')
    .insert([data])
    .select()
    .single();

  if (error) throw error;
  return enrollment;
}

export async function sendEnrollmentEmails(enrollment: Enrollment, resendApiKey: string) {
  const config = await loadConfig();
  const apiUrl = `${config.SUPABASE_URL}/functions/v1/send-enrollment-emails`;

  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${config.SUPABASE_ANON_KEY}`,
    },
    body: JSON.stringify({ enrollment, resendApiKey }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to send emails');
  }

  return response.json();
}

export async function getEnrollments() {
  const client = await getSupabase();
  const { data, error } = await client
    .from('enrollments')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

export async function updateEnrollmentStatus(id: string, status: string) {
  const client = await getSupabase();
  const { data, error } = await client
    .from('enrollments')
    .update({ status })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}
