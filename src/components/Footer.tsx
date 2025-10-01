import { Mail, Phone, Facebook, MessageCircle, Send, Video, Youtube } from 'lucide-react';

const LOGO_URL =
  'https://res.cloudinary.com/dh1oznegj/image/upload/v1759335115/matrix_nexus_logo_wk1cij.png';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const services = [
    'Web Design & UI/UX',
    'Full-Stack Development',
    'SEO & Digital Marketing',
    'Graphics & Branding',
    'Web Hosting & Management',
    'Training & Consultancy',
  ];

  const quickLinks = [
    { label: 'About Us', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Portfolio', href: '#portfolio' },
    { label: 'Training', href: '#training' },
    { label: 'Contact', href: '#contact' },
  ];

  // Updated social links with YouTube added
  const socialLinks = [
    {
      icon: MessageCircle,
      label: 'WhatsApp Channel',
      href: 'https://whatsapp.com/channel/0029Vb6fXeMKAwElxL7fez3u',
    },
    {
      icon: Send,
      label: 'WhatsApp Group',
      href: 'https://chat.whatsapp.com/FD0w3ImlPgx9RjBergDbHw?mode=ems_share_t',
    },
    {
      icon: Video,
      label: 'TikTok',
      href: 'https://www.tiktok.com/@matrix_nexus_coretech?_t=ZM-90Bx6agK4Ut&_r=1',
    },
    {
      icon: Facebook,
      label: 'Facebook Group',
      href: 'https://facebook.com/groups/3758611184442253/',
    },
    {
      icon: Youtube,
      label: 'YouTube',
      href: 'https://youtube.com/@matrixnexuscoretech?si=Nkr30AmHHr5F0uhn',
    },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-navy text-soft-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Logo + About */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <img
                src={LOGO_URL}
                alt="Matrix Nexus Logo"
                className="h-10 w-auto"
              />
              <span className="font-heading font-bold text-xl text-white">
                Matrix Nexus
              </span>
            </div>
            <p className="text-sm leading-relaxed opacity-90">
              Full-service technology studio delivering elegant websites, scalable applications, and professional training programs.
            </p>
            <div className="flex space-x-4 pt-2">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="text-soft-white hover:text-cyan-electric transition-colors duration-200 focus-visible-ring rounded p-1"
                  aria-label={social.label}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-4 text-white">
              Our Services
            </h3>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service}>
                  <span className="text-sm opacity-90 hover:text-cyan-electric transition-colors duration-200">
                    {service}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-4 text-white">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-sm opacity-90 hover:text-cyan-electric transition-colors duration-200 focus-visible-ring rounded"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-4 text-white">
              Get In Touch
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-cyan-electric flex-shrink-0 mt-0.5" />
                <a
                  href="mailto:matrixnexuscoretech@gmail.com"
                  className="text-sm opacity-90 hover:text-cyan-electric transition-colors duration-200 break-all focus-visible-ring rounded"
                >
                  matrixnexuscoretech@gmail.com
                </a>
              </li>
              <li className="flex items-start space-x-3">
                <Phone className="w-5 h-5 text-cyan-electric flex-shrink-0 mt-0.5" />
                <div className="text-sm opacity-90 space-y-1">
                  <a
                    href="tel:+254708543789"
                    className="block hover:text-cyan-electric transition-colors duration-200 focus-visible-ring rounded"
                  >
                    +254 708 543 789
                  </a>
                  <a
                    href="tel:+254708083263"
                    className="block hover:text-cyan-electric transition-colors duration-200 focus-visible-ring rounded"
                  >
                    +254 708 083 263
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-cyan-electric/20 text-center">
          <p className="text-sm opacity-75">
            &copy; {currentYear} Matrix Nexus Coretech. All rights reserved.
          </p>
          <p className="text-xs opacity-60 mt-2">
            Built with precision. Delivered with excellence.
          </p>
        </div>
      </div>
    </footer>
  );
}
