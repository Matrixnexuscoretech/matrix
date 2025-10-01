import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface EnrollmentData {
  full_name: string;
  email: string;
  phone: string;
  course: string;
  message?: string;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const { enrollment, resendApiKey }: { enrollment: EnrollmentData; resendApiKey: string } = await req.json();

    if (!resendApiKey) {
      throw new Error("Resend API key is required");
    }

    const confirmationEmailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .info-box { background: white; padding: 20px; margin: 20px 0; border-radius: 8px; border-left: 4px solid #667eea; }
            .info-row { margin: 10px 0; }
            .label { font-weight: bold; color: #667eea; }
            .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
            .button { display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Welcome to Matrix Nexus Coretech! 🎉</h1>
            </div>
            <div class="content">
              <p>Dear ${enrollment.full_name},</p>
              <p>Thank you for applying to our training program! We're excited to have you join us.</p>
              
              <div class="info-box">
                <h3>Your Application Details:</h3>
                <div class="info-row"><span class="label">Course:</span> ${enrollment.course}</div>
                <div class="info-row"><span class="label">Email:</span> ${enrollment.email}</div>
                <div class="info-row"><span class="label">Phone:</span> ${enrollment.phone}</div>
                ${enrollment.message ? `<div class="info-row"><span class="label">Message:</span> ${enrollment.message}</div>` : ''}
              </div>

              <h3>What happens next?</h3>
              <ul>
                <li>Our team will contact you via WhatsApp within 30 minutes</li>
                <li>We'll discuss course details, schedule, and fees</li>
                <li>You'll receive enrollment instructions and payment details</li>
                <li>Once enrolled, you'll get access to course materials</li>
              </ul>

              <p><strong>Need immediate assistance?</strong> Contact us at:</p>
              <ul>
                <li>Email: matrixnexuscoretech@gmail.com</li>
                <li>WhatsApp: ${enrollment.phone}</li>
              </ul>

              <div class="footer">
                <p>Matrix Nexus Coretech - Empowering Your Tech Journey</p>
                <p>This is an automated confirmation email. Please do not reply to this email.</p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `;

    const adminNotificationHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #1a202c; color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .info-box { background: white; padding: 20px; margin: 20px 0; border-radius: 8px; border-left: 4px solid #e53e3e; }
            .info-row { margin: 10px 0; padding: 8px; border-bottom: 1px solid #eee; }
            .label { font-weight: bold; color: #1a202c; display: inline-block; width: 120px; }
            .urgent { background: #e53e3e; color: white; padding: 10px; border-radius: 5px; text-align: center; margin: 10px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>🚨 New Enrollment Application</h2>
            </div>
            <div class="content">
              <div class="urgent">
                <strong>ACTION REQUIRED:</strong> Contact applicant within 30 minutes
              </div>
              
              <div class="info-box">
                <h3>Applicant Details:</h3>
                <div class="info-row"><span class="label">Name:</span> ${enrollment.full_name}</div>
                <div class="info-row"><span class="label">Email:</span> <a href="mailto:${enrollment.email}">${enrollment.email}</a></div>
                <div class="info-row"><span class="label">WhatsApp:</span> <a href="https://wa.me/${enrollment.phone.replace(/[^0-9]/g, '')}">${enrollment.phone}</a></div>
                <div class="info-row"><span class="label">Course:</span> ${enrollment.course}</div>
                ${enrollment.message ? `<div class="info-row"><span class="label">Message:</span> ${enrollment.message}</div>` : ''}
                <div class="info-row"><span class="label">Applied:</span> ${new Date().toLocaleString()}</div>
              </div>

              <h3>Next Steps:</h3>
              <ol>
                <li>Contact the applicant via WhatsApp immediately</li>
                <li>Discuss course details, schedule, and fees</li>
                <li>Send enrollment instructions and payment details</li>
                <li>Update application status in admin dashboard</li>
              </ol>
            </div>
          </div>
        </body>
      </html>
    `;

    const confirmationResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${resendApiKey}`,
      },
      body: JSON.stringify({
        from: "Matrix Nexus Coretech <onboarding@resend.dev>",
        to: [enrollment.email],
        subject: `Welcome to ${enrollment.course} at Matrix Nexus Coretech!`,
        html: confirmationEmailHtml,
      }),
    });

    if (!confirmationResponse.ok) {
      const errorText = await confirmationResponse.text();
      console.error("Confirmation email error:", errorText);
      throw new Error(`Failed to send confirmation email: ${confirmationResponse.statusText}`);
    }

    const adminResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${resendApiKey}`,
      },
      body: JSON.stringify({
        from: "Matrix Nexus Notifications <onboarding@resend.dev>",
        to: ["matrixnexuscoretech@gmail.com"],
        subject: `🚨 New Enrollment: ${enrollment.full_name} - ${enrollment.course}`,
        html: adminNotificationHtml,
      }),
    });

    if (!adminResponse.ok) {
      const errorText = await adminResponse.text();
      console.error("Admin notification error:", errorText);
    }

    const confirmationData = await confirmationResponse.json();
    const adminData = adminResponse.ok ? await adminResponse.json() : null;

    return new Response(
      JSON.stringify({
        success: true,
        confirmationEmailId: confirmationData.id,
        adminEmailId: adminData?.id,
        message: "Emails sent successfully",
      }),
      {
        status: 200,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error sending emails:", error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : "Unknown error occurred",
      }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  }
});