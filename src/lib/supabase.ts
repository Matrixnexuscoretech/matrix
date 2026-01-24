import { createClient } from '@supabase/supabase-js';
import type { Enrollment } from '../types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabaseServiceKey = import.meta.env.VITE_SUPABASE_SERVICE_KEY;

// Public client for general use
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Admin client (for server-side operations only)
export const getAdminClient = () => {
  if (!supabaseServiceKey) {
    throw new Error('Service key not available in client-side code');
  }
  return createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });
};

// Authentication helper
export const getSupabase = () => supabase;

// Check if user is authenticated
export const checkAdminAuth = async (): Promise<boolean> => {
  const { data: { session } } = await supabase.auth.getSession();
  return !!session;
};

// Login function
export const adminLogin = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });
  
  if (error) throw error;
  return data;
};

// Logout function
export const adminLogout = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};

// Get all enrollments
export const getEnrollments = async (): Promise<Enrollment[]> => {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) throw new Error('Not authenticated');

  const { data, error } = await supabase
    .from('enrollments')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data as Enrollment[];
};

// Submit new enrollment
export const submitEnrollment = async (data: {
  full_name: string;
  email: string;
  phone: string;
  course: string;
  message?: string;
  consent: boolean;
}): Promise<Enrollment> => {
  const { data: enrollment, error } = await supabase
    .from('enrollments')
    .insert([{
      ...data,
      status: 'pending'
    }])
    .select()
    .single();

  if (error) throw error;
  return enrollment as Enrollment;
};

// Update enrollment status
export const updateEnrollmentStatus = async (id: string, status: string): Promise<void> => {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) throw new Error('Not authenticated');

  const { error } = await supabase
    .from('enrollments')
    .update({ status })
    .eq('id', id);

  if (error) throw error;
};

// Delete enrollment
export const deleteEnrollment = async (id: string): Promise<void> => {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) throw new Error('Not authenticated');

  const { error } = await supabase
    .from('enrollments')
    .delete()
    .eq('id', id);

  if (error) throw error;
};