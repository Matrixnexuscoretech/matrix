// types/index.ts
export interface Enrollment {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  course: string;
  message?: string;
  consent: boolean;
  status: 'pending' | 'contacted' | 'enrolled' | 'cancelled';
  created_at: string;
  updated_at: string;
}

export interface ApplicationFormData {
  fullName: string;
  email: string;
  phone: string;
  course: string;
  message: string;
  consent: boolean;
}