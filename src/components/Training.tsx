import { useState } from 'react';
import { Calendar, Users, Award, CheckCircle, X } from 'lucide-react';
import Button from './Button';

interface EnrollmentFormData {
  fullName: string;
  email: string;
  phone: string;
  course: string;
  cohort: string;
  message: string;
  consent: boolean;
}

export default function Training() {
  const [showModal, setShowModal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<EnrollmentFormData>>({});
  const [formData, setFormData] = useState<EnrollmentFormData>({
    fullName: '',
    email: '',
    phone: '',
    course: '',
    cohort: '',
    message: '',
    consent: false,
  });

  const courses = [
    {
      title: 'HTML & CSS Fundamentals',
      duration: '6 Weeks',
      level: 'Beginner',
      description: 'Build beautiful, responsive websites from scratch with HTML5 and CSS3',
      color: 'from-electric-orange to-electric-yellow',
    },
    {
      title: 'JavaScript Mastery',
      duration: '10 Weeks',
      level: 'Intermediate',
      description: 'Master modern JavaScript, DOM manipulation, async programming, and ES6+',
      color: 'from-electric-yellow to-matrix-green',
    },
    {
      title: 'Python Programming',
      duration: '8 Weeks',
      level: 'Beginner',
      description: 'Learn Python for web development, automation, and data analysis',
      color: 'from-vivid-blue to-vivid-indigo',
    },
    {
      title: 'React Development',
      duration: '12 Weeks',
      level: 'Advanced',
      description: 'Build dynamic, modern web applications with React, Hooks, and Redux',
      color: 'from-cyan-electric to-vivid-blue',
    },
    {
      title: 'Graphics Design',
      duration: '8 Weeks',
      level: 'Beginner',
      description: 'Master Adobe Photoshop, Illustrator, and Figma for stunning designs',
      color: 'from-electric-pink to-vivid-purple',
    },
    {
      title: 'Computer Packages',
      duration: '6 Weeks',
      level: 'Beginner',
      description: 'Microsoft Office Suite, Google Workspace, and productivity tools',
      color: 'from-warm-beige to-warm-brown',
    },
    {
      title: 'Networking Fundamentals',
      duration: '10 Weeks',
      level: 'Intermediate',
      description: 'Network setup, security, troubleshooting, and server management',
      color: 'from-matrix-green to-cyan-electric',
    },
    {
      title: 'Digital Marketing',
      duration: '8 Weeks',
      level: 'Beginner',
      description: 'SEO, social media, content marketing, and analytics for business growth',
      color: 'from-vivid-purple to-electric-pink',
    },
  ];

  const cohorts = [
    'January 2026',
    'March 2026',
    'May 2026',
    'July 2026',
    'September 2026',
    'November 2026',
  ];

  const validateForm = (): boolean => {
    const newErrors: Partial<EnrollmentFormData> = {};

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
      const { submitEnrollment } = await import('../lib/supabase');

      await submitEnrollment({
        full_name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        course: formData.course,
        cohort: formData.cohort || undefined,
        message: formData.message || undefined,
        consent: formData.consent,
      });

      setShowSuccess(true);
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        course: '',
        cohort: '',
        message: '',
        consent: false,
      });
    } catch (error) {
      console.error('Enrollment error:', error);
      alert('There was an error submitting your enrollment. Please try again or contact us directly.');
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
      <section id="training" className="py-20 lg:py-32 bg-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-white mb-6">
              Professional <span className="text-cyan-electric">Training Programs</span>
            </h2>
            <p className="text-soft-white text-lg leading-relaxed">
              Transform your career with hands-on bootcamps led by industry experts.
              Learn the skills that employers are looking for.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {courses.map((course, index) => (
              <div
                key={course.title}
                className="group relative bg-navy-dark border-2 border-transparent rounded-2xl p-6 hover:scale-105 transition-all duration-300 overflow-hidden"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${course.color} opacity-10 group-hover:opacity-20 transition-opacity`}></div>

                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <span className={`bg-gradient-to-r ${course.color} text-white text-xs font-bold px-3 py-1 rounded-full`}>
                      {course.level}
                    </span>
                    <span className="text-soft-white/70 text-sm flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {course.duration}
                    </span>
                  </div>

                  <h3 className="text-white mb-3 text-xl">{course.title}</h3>
                  <p className="text-soft-white/80 leading-relaxed mb-6 text-sm">
                    {course.description}
                  </p>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setFormData({ ...formData, course: course.title });
                      setShowModal(true);
                    }}
                    className="w-full group-hover:bg-gradient-to-r group-hover:from-cyan-electric group-hover:to-matrix-green group-hover:text-navy"
                  >
                    Enroll Now
                  </Button>
                </div>

                <div className={`absolute -bottom-2 -right-2 w-24 h-24 bg-gradient-to-br ${course.color} rounded-full blur-2xl opacity-30`}></div>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-r from-cyan-electric to-matrix-green rounded-2xl p-8 lg:p-12">
            <div className="grid md:grid-cols-3 gap-8 text-center text-navy">
              <div>
                <Users className="w-12 h-12 mx-auto mb-4" />
                <div className="text-3xl font-bold mb-2">500+</div>
                <div className="font-medium">Students Trained</div>
              </div>
              <div>
                <Award className="w-12 h-12 mx-auto mb-4" />
                <div className="text-3xl font-bold mb-2">95%</div>
                <div className="font-medium">Job Placement Rate</div>
              </div>
              <div>
                <Calendar className="w-12 h-12 mx-auto mb-4" />
                <div className="text-3xl font-bold mb-2">Limited</div>
                <div className="font-medium">Seats Available</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-navy/95 backdrop-blur-sm p-4 overflow-y-auto"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-2xl max-w-2xl w-full my-8 animate-slide-up"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-navy">
                  {showSuccess ? 'Enrollment Confirmed!' : 'Enroll in Training'}
                </h2>
                <button
                  onClick={closeModal}
                  className="text-charcoal hover:text-navy focus-visible-ring rounded p-2"
                  aria-label="Close modal"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {showSuccess ? (
                <div className="text-center py-8 space-y-6">
                  <div className="w-20 h-20 bg-matrix-green rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle className="w-12 h-12 text-white" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-navy">Thank you for enrolling!</h3>
                    <p className="text-charcoal">
                      We've received your enrollment for <strong>{formData.course}</strong>.
                    </p>
                    <p className="text-charcoal/80">
                      Our team will contact you via WhatsApp at <strong>{formData.phone}</strong> within 30 minutes.
                      Please check your email for confirmation details.
                    </p>
                  </div>
                  <Button variant="primary" onClick={closeModal}>
                    Close
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="fullName" className="block text-sm font-medium text-charcoal mb-2">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className={`w-full px-4 py-3 border rounded-lg focus-visible-ring ${
                        errors.fullName ? 'border-red-500' : 'border-gray-300'
                      }`}
                      aria-invalid={!!errors.fullName}
                      aria-describedby={errors.fullName ? 'fullName-error' : undefined}
                    />
                    {errors.fullName && (
                      <p id="fullName-error" className="text-red-500 text-sm mt-1">
                        {errors.fullName}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-charcoal mb-2">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={`w-full px-4 py-3 border rounded-lg focus-visible-ring ${
                        errors.email ? 'border-red-500' : 'border-gray-300'
                      }`}
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? 'email-error' : undefined}
                    />
                    {errors.email && (
                      <p id="email-error" className="text-red-500 text-sm mt-1">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-charcoal mb-2">
                      WhatsApp / Phone <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+254 708 543 789"
                      className={`w-full px-4 py-3 border rounded-lg focus-visible-ring ${
                        errors.phone ? 'border-red-500' : 'border-gray-300'
                      }`}
                      aria-invalid={!!errors.phone}
                      aria-describedby={errors.phone ? 'phone-error' : undefined}
                    />
                    {errors.phone && (
                      <p id="phone-error" className="text-red-500 text-sm mt-1">
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="course" className="block text-sm font-medium text-charcoal mb-2">
                      Course <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="course"
                      value={formData.course}
                      onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                      className={`w-full px-4 py-3 border rounded-lg focus-visible-ring ${
                        errors.course ? 'border-red-500' : 'border-gray-300'
                      }`}
                      aria-invalid={!!errors.course}
                      aria-describedby={errors.course ? 'course-error' : undefined}
                    >
                      <option value="">Select a course</option>
                      {courses.map((course) => (
                        <option key={course.title} value={course.title}>
                          {course.title}
                        </option>
                      ))}
                    </select>
                    {errors.course && (
                      <p id="course-error" className="text-red-500 text-sm mt-1">
                        {errors.course}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="cohort" className="block text-sm font-medium text-charcoal mb-2">
                      Preferred Start Date
                    </label>
                    <select
                      id="cohort"
                      value={formData.cohort}
                      onChange={(e) => setFormData({ ...formData, cohort: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus-visible-ring"
                    >
                      <option value="">Select a cohort</option>
                      {cohorts.map((cohort) => (
                        <option key={cohort} value={cohort}>
                          {cohort}
                        </option>
                      ))}
                    </select>
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
                      I consent to be contacted by Matrix Nexus Coretech regarding my enrollment <span className="text-red-500">*</span>
                    </label>
                  </div>
                  {errors.consent && (
                    <p id="consent-error" className="text-red-500 text-sm">
                      {errors.consent}
                    </p>
                  )}

                  <div className="flex gap-4">
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={closeModal}
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      variant="primary"
                      disabled={isSubmitting}
                      className="flex-1"
                    >
                      {isSubmitting ? 'Submitting...' : 'Submit Enrollment'}
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
