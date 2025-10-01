import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface EnrollmentData {
  full_name: string;
  email: string;
  phone: string;
  course: string;
  cohort?: string;
  education?: string;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const enrollmentData: EnrollmentData = await req.json();

    const emailBody = `
Dear ${enrollmentData.full_name},

Thank you for applying to Matrix Nexus Coretech!

We have received your application for the ${enrollmentData.course} course.
${enrollmentData.cohort ? `Your preferred start date: ${enrollmentData.cohort}\n` : ''}

You have been successfully added to our training cohort. Our team will contact you via WhatsApp at ${enrollmentData.phone} within 30 minutes to discuss the next steps.

In the meantime, please:
1. Check your spam/junk folder for any emails from us
2. Ensure your WhatsApp is active and available
3. Prepare any questions you may have about the course

We're excited to have you join our community of learners!

Best regards,
The Matrix Nexus Coretech Team

Website: https://matrix-nexus.tech
Email: info@matrix-nexus.tech
    `;

    console.log('Enrollment confirmation email would be sent to:', enrollmentData.email);
    console.log('Email body:', emailBody);

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Enrollment confirmation processed successfully',
        data: enrollmentData,
      }),
      {
        status: 200,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    console.error('Error processing enrollment confirmation:', error);

    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  }
});