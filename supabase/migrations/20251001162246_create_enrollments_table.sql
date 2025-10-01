/*
  # Create Enrollments Table

  1. New Tables
    - `enrollments`
      - `id` (uuid, primary key) - Unique identifier for each enrollment
      - `full_name` (text) - Student's full name
      - `email` (text) - Student's email address
      - `phone` (text) - Student's WhatsApp/phone number
      - `course` (text) - Selected course name
      - `cohort` (text, nullable) - Preferred start date/cohort
      - `education` (text, nullable) - Education level
      - `message` (text, nullable) - Optional message from student
      - `consent` (boolean) - Consent to be contacted
      - `status` (text) - Enrollment status (pending, contacted, enrolled)
      - `created_at` (timestamptz) - When enrollment was submitted
      - `updated_at` (timestamptz) - Last update timestamp

  2. Security
    - Enable RLS on `enrollments` table
    - Add policy for inserting new enrollments (anyone can enroll)
    - Add policy for viewing enrollments (authenticated users only)

  3. Important Notes
    - Email notifications will be handled by Edge Functions
    - All fields have appropriate validation
    - Index on email and created_at for efficient queries
*/

CREATE TABLE IF NOT EXISTS enrollments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL CHECK (length(full_name) >= 3),
  email text NOT NULL CHECK (email ~* '^[^\s@]+@[^\s@]+\.[^\s@]+$'),
  phone text NOT NULL,
  course text NOT NULL,
  cohort text,
  education text,
  message text CHECK (length(message) <= 500),
  consent boolean NOT NULL DEFAULT false,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'contacted', 'enrolled', 'cancelled')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_enrollments_email ON enrollments(email);
CREATE INDEX IF NOT EXISTS idx_enrollments_created_at ON enrollments(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_enrollments_status ON enrollments(status);

ALTER TABLE enrollments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert enrollments"
  ON enrollments
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (consent = true);

CREATE POLICY "Authenticated users can view enrollments"
  ON enrollments
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can update enrollments"
  ON enrollments
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_enrollments_updated_at
  BEFORE UPDATE ON enrollments
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
