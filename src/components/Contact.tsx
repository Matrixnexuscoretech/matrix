import { Mail, Phone, MessageCircle, Send } from 'lucide-react';
import Button from './Button';

export default function Contact() {
  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      value: 'matrixnexuscoretech@gmail.com',
      href: 'mailto:matrixnexuscoretech@gmail.com',
      color: 'cyan-electric',
    },
    {
      icon: Phone,
      title: 'Phone',
      value: '+254 708 543 789',
      href: 'tel:+254708543789',
      color: 'matrix-green',
    },
    {
      icon: Phone,
      title: 'Alternative',
      value: '+254 708 083 263',
      href: 'tel:+254708083263',
      color: 'vivid-blue',
    },
  ];

  const handleWhatsApp = () => {
    const message = encodeURIComponent('Hi! I would like to learn more about Matrix Nexus Coretech services.');
    window.open(`https://wa.me/254708543789?text=${message}`, '_blank');
  };

  return (
    <section id="contact" className="py-20 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-soft-white via-white to-soft-white"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-electric/5 via-transparent to-electric-pink/5 animate-gradient-x" style={{ backgroundSize: '200% 200%' }}></div>
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-neon-cyan/10 to-matrix-green/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-electric-yellow/10 to-electric-orange/10 rounded-full blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-navy mb-6">
            Let's Build <span className="bg-gradient-to-r from-cyan-electric via-matrix-green to-electric-yellow bg-clip-text text-transparent">Something Amazing</span>
          </h2>
          <p className="text-charcoal text-lg leading-relaxed">
            Ready to transform your digital presence? Get in touch with us today
            for a free consultation and project audit.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-navy to-navy-dark rounded-2xl p-8 lg:p-12 text-white">
              <h3 className="text-2xl font-bold mb-6">Get Started Today</h3>
              <div className="space-y-4 mb-8">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-cyan-electric rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-navy font-bold">1</span>
                  </div>
                  <p className="text-soft-white">Reach out via WhatsApp, email, or phone</p>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-cyan-electric rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-navy font-bold">2</span>
                  </div>
                  <p className="text-soft-white">Schedule a free consultation call</p>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-cyan-electric rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-navy font-bold">3</span>
                  </div>
                  <p className="text-soft-white">Receive a custom proposal and timeline</p>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-cyan-electric rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-navy font-bold">4</span>
                  </div>
                  <p className="text-soft-white">Watch your vision come to life</p>
                </div>
              </div>

              <Button
                variant="primary"
                size="lg"
                onClick={handleWhatsApp}
                className="w-full group"
              >
                <MessageCircle className="mr-2 w-5 h-5" />
                Chat on WhatsApp
                <Send className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
              <h3 className="text-navy text-xl font-bold mb-6">Quick Response Promise</h3>
              <p className="text-charcoal leading-relaxed mb-4">
                We understand that time is valuable. Our team is committed to responding
                to all inquiries within 30 minutes during business hours.
              </p>
              <div className="flex items-center space-x-2 text-matrix-green font-medium">
                <MessageCircle className="w-5 h-5" />
                <span>Available Monday - Saturday, 8AM - 8PM EAT</span>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {contactInfo.map((info, index) => (
              <a
                key={info.title}
                href={info.href}
                className="group block bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-transparent hover:border-cyan-electric/20 focus-visible-ring"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start space-x-4">
                  <div className={`w-14 h-14 bg-gradient-to-br from-cyan-electric to-matrix-green rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                    <info.icon className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-charcoal/70 mb-1">
                      {info.title}
                    </div>
                    <div className="text-navy font-semibold group-hover:text-cyan-electric transition-colors">
                      {info.value}
                    </div>
                  </div>
                </div>
              </a>
            ))}

            <div className="bg-gradient-to-r from-cyan-electric to-matrix-green rounded-2xl p-8 text-center">
              <h3 className="text-navy text-xl font-bold mb-4">
                Prefer WhatsApp?
              </h3>
              <p className="text-navy/80 mb-6">
                Get instant responses and quick support through WhatsApp
              </p>
              <Button
                variant="ghost"
                size="lg"
                onClick={handleWhatsApp}
                className="bg-white hover:bg-navy hover:text-white border-0"
              >
                <MessageCircle className="mr-2 w-5 h-5" />
                Start WhatsApp Chat
              </Button>
            </div>

            <div className="bg-navy rounded-2xl p-8 text-center">
              <p className="text-cyan-electric text-lg font-medium mb-2">
                Need a Free Audit?
              </p>
              <p className="text-soft-white/80 text-sm">
                We offer complimentary website audits and consultations. No strings attached.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
