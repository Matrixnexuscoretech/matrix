import { useState } from 'react';
import { Send, CheckCircle, X, GraduationCap } from 'lucide-react';
import Button from './Button';

interface ApplicationFormData {
  fullName: string;
  email: string;
  phone: string;
  course: string;
  message: string;
  consent: boolean;
}

export default function Application() {
  const [showModal, setShowModal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<ApplicationFormData>>({});
  const [formData, setFormData] = useState<ApplicationFormData>({
    fullName: '',
    email: '',
    phone: '',
    course: '',
    message: '',
    consent: false,
  });

  const courses = [
    'HTML & CSS Fundamentals',
    'JavaScript Mastery',
    'Python Programming',
    'React Development',
    'Graphics Design',
    'Computer Packages',
    'Networking Fundamentals',
    'Digital Marketing',
  ];


  const validateForm = (): boolean => {
    const newErrors: Partial<ApplicationFormData> = {};

    if (formData.fullName.trim().length < 3) {
      newErrors.fullName = 'Name must be at least 3 characters';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    const phoneRegex = /^[\d\s+()-]{10,}$/;
    if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    if (!formData.course) {
      newErrors.course = 'Please select a course';
    }

    if (!formData.consent) {
      newErrors.consent = 'You must consent to be contacted' as any;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const { submitEnrollment, sendEnrollmentEmails } = await import('../lib/supabase');

      const enrollment = await submitEnrollment({
        full_name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        course: formData.course,
        message: formData.message || undefined,
        consent: formData.consent,
      });

      const resendApiKey = prompt('Please enter your Resend API key to send confirmation emails:');

      if (resendApiKey) {
        try {
          await sendEnrollmentEmails(enrollment, resendApiKey);
        } catch (emailError) {
          console.error('Email sending error:', emailError);
        }
      }

      setShowSuccess(true);
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        course: '',
        message: '',
        consent: false,
      });
    } catch (error) {
      console.error('Application error:', error);
      alert('There was an error submitting your application. Please try again or contact us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setShowSuccess(false);
    setErrors({});
  };

  return (
    <>
      <section id="apply" className="relative py-20 lg:py-32 bg-gradient-to-br from-navy via-navy-dark to-navy overflow-hidden">
        <div className="absolute top-10 right-10 w-96 h-96 bg-vivid-purple/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 left-10 w-72 h-72 bg-electric-pink/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-electric-yellow/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-electric-pink to-vivid-purple text-white rounded-full px-6 py-2 mb-6">
              <GraduationCap className="w-5 h-5" />
              <span className="font-semibold">Join Our Training Cohort</span>
            </div>
            <h2 className="text-white mb-6">
              Start Your <span className="bg-gradient-to-r from-electric-yellow via-electric-orange to-electric-pink bg-clip-text text-transparent">Journey Today</span>
            </h2>
            <p className="text-soft-white text-lg leading-relaxed">
              Apply now to secure your spot in our next training cohort. Limited seats available.
              After you apply, you'll receive a confirmation email and our team will contact you within 30 minutes.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="bg-navy-dark border-2 border-electric-yellow/30 rounded-2xl p-8">
                <h3 className="text-white mb-4 text-2xl">Why Choose Matrix Nexus?</h3>
                <ul className="space-y-4">
                  {[
                    { color: 'text-matrix-green', text: 'Industry-recognized certifications' },
                    { color: 'text-cyan-electric', text: '95% job placement rate' },
                    { color: 'text-electric-pink', text: 'Hands-on practical training' },
                    { color: 'text-electric-yellow', text: 'Expert instructors from top tech companies' },
                    { color: 'text-vivid-purple', text: 'Lifetime access to course materials' },
                    { color: 'text-electric-orange', text: 'Career support and mentorship' },
                  ].map((item, index) => (
                    <li key={index} className="flex items-center space-x-3">
                      <CheckCircle className={`w-5 h-5 ${item.color}`} />
                      <span className="text-soft-white">{item.text}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-gradient-to-br from-electric-pink via-vivid-purple to-vivid-indigo rounded-2xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-3">Limited Time Offer</h3>
                <p className="text-lg mb-4">Apply now and get 20% off your tuition fees!</p>
                <p className="text-sm opacity-90">Offer valid for the first 50 applicants in each cohort.</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-2xl">
              <h3 className="text-navy mb-6 text-2xl">Application Form</h3>

              {showSuccess ? (
                <div className="text-center py-8 space-y-6">
                  <div className="w-20 h-20 bg-gradient-to-r from-matrix-green to-cyan-electric rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle className="w-12 h-12 text-white" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-navy text-xl">Application Submitted Successfully!</h3>
                    <p className="text-charcoal">
                      Thank you for applying to <strong>{formData.course}</strong>.
                    </p>
                    <p className="text-charcoal/80">
                      Check your email at <strong>{formData.email}</strong> for confirmation details and next steps.
                    </p>
                    <p className="text-charcoal/80">
                      Our team will contact you via WhatsApp at <strong>{formData.phone}</strong> within 30 minutes.
                    </p>
                  </div>
                  <Button variant="primary" onClick={() => setShowSuccess(false)}>
                    Submit Another Application
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label htmlFor="fullName" className="block text-sm font-medium text-charcoal mb-2">
                      Full Name <span className="text-electric-red">*</span>
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className={`w-full px-4 py-3 border rounded-lg focus-visible-ring ${
                        errors.fullName ? 'border-electric-red' : 'border-gray-300'
                      }`}
                      aria-invalid={!!errors.fullName}
                      aria-describedby={errors.fullName ? 'fullName-error' : undefined}
                    />
                    {errors.fullName && (
                      <p id="fullName-error" className="text-electric-red text-sm mt-1">
                        {errors.fullName}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-charcoal mb-2">
                      Email <span className="text-electric-red">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={`w-full px-4 py-3 border rounded-lg focus-visible-ring ${
                        errors.email ? 'border-electric-red' : 'border-gray-300'
                      }`}
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? 'email-error' : undefined}
                    />
                    {errors.email && (
                      <p id="email-error" className="text-electric-red text-sm mt-1">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-charcoal mb-2">
                      WhatsApp / Phone <span className="text-electric-red">*</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+254 708 543 789"
                      className={`w-full px-4 py-3 border rounded-lg focus-visible-ring ${
                        errors.phone ? 'border-electric-red' : 'border-gray-300'
                      }`}
                      aria-invalid={!!errors.phone}
                      aria-describedby={errors.phone ? 'phone-error' : undefined}
                    />
                    {errors.phone && (
                      <p id="phone-error" className="text-electric-red text-sm mt-1">
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="course" className="block text-sm font-medium text-charcoal mb-2">
                      Course <span className="text-electric-red">*</span>
                    </label>
                    <select
                      id="course"
                      value={formData.course}
                      onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                      className={`w-full px-4 py-3 border rounded-lg focus-visible-ring ${
                        errors.course ? 'border-electric-red' : 'border-gray-300'
                      }`}
                      aria-invalid={!!errors.course}
                      aria-describedby={errors.course ? 'course-error' : undefined}
                    >
                      <option value="">Select a course</option>
                      {courses.map((course) => (
                        <option key={course} value={course}>
                          {course}
                        </option>
                      ))}
                    </select>
                    {errors.course && (
                      <p id="course-error" className="text-electric-red text-sm mt-1">
                        {errors.course}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-charcoal mb-2">
                      Message (Optional)
                    </label>
                    <textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      maxLength={500}
                      rows={3}
                      placeholder="Tell us why you want to join this course..."
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus-visible-ring"
                    />
                    <p className="text-sm text-charcoal/60 mt-1">
                      {formData.message.length}/500 characters
                    </p>
                  </div>

                  <div className="flex items-start">
                    <input
                      type="checkbox"
                      id="consent"
                      checked={formData.consent}
                      onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                      className="mt-1 w-4 h-4 text-cyan-electric focus:ring-cyan-electric border-gray-300 rounded"
                      aria-invalid={!!errors.consent}
                      aria-describedby={errors.consent ? 'consent-error' : undefined}
                    />
                    <label htmlFor="consent" className="ml-3 text-sm text-charcoal">
                      I consent to be contacted by Matrix Nexus Coretech regarding my application and enrollment <span className="text-electric-red">*</span>
                    </label>
                  </div>
                  {errors.consent && (
                    <p id="consent-error" className="text-electric-red text-sm">
                      {errors.consent}
                    </p>
                  )}

                  <Button
                    type="submit"
                    variant="primary"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-electric-pink via-vivid-purple to-vivid-indigo hover:opacity-90"
                  >
                    {isSubmitting ? 'Submitting...' : (
                      <>
                        Submit Application
                        <Send className="ml-2 w-5 h-5" />
                      </>
                    )}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
