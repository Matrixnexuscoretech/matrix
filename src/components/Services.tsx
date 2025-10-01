import { Palette, Code, Globe, TrendingUp, Camera, Settings } from 'lucide-react';
import Button from './Button';

export default function Services() {
  const services = [
    {
      icon: Palette,
      title: 'Web Design & UI/UX',
      description: 'Beautiful, intuitive interfaces that delight users and drive engagement',
      features: ['Responsive Design', 'User Research', 'Prototyping', 'Brand Integration'],
      gradient: 'from-electric-pink to-vivid-purple',
    },
    {
      icon: Code,
      title: 'Full-Stack Web Development',
      description: 'Scalable, secure applications built with modern frameworks and best practices',
      features: ['React/Next.js', 'Node/Django', 'PostgreSQL', 'API Development'],
      gradient: 'from-cyan-electric to-vivid-blue',
    },
    {
      icon: Globe,
      title: 'Web Hosting & Management',
      description: 'Reliable hosting with managed updates, backups, and 24/7 security monitoring',
      features: ['Cloud Hosting', 'SSL Certificates', 'Daily Backups', 'Performance Tuning'],
      gradient: 'from-matrix-green to-cyan-electric',
    },
    {
      icon: TrendingUp,
      title: 'SEO & Digital Marketing',
      description: 'Data-driven strategies to increase visibility, traffic, and conversions',
      features: ['SEO Optimization', 'Content Strategy', 'Social Media', 'Analytics'],
      gradient: 'from-electric-orange to-electric-yellow',
    },
    {
      icon: Camera,
      title: 'Graphics & Branding',
      description: 'Compelling visual identities that communicate your brand story',
      features: ['Logo Design', 'Brand Guidelines', 'Marketing Materials', 'Illustrations'],
      gradient: 'from-vivid-purple to-vivid-indigo',
    },
    {
      icon: Settings,
      title: 'Systems & Training',
      description: 'Comprehensive tech support and hands-on training for teams and individuals',
      features: ['Windows/Linux Support', 'MS Office Training', 'Web Dev Bootcamps', 'Consultancy'],
      gradient: 'from-warm-beige to-electric-orange',
    },
  ];

  const scrollToContact = () => {
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="services" className="py-20 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy-dark to-navy"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-electric/10 via-matrix-green/10 to-electric-pink/10 animate-gradient-x" style={{ backgroundSize: '200% 200%' }}></div>
      <div className="absolute top-40 right-0 w-96 h-96 bg-gradient-to-br from-electric-yellow/20 to-electric-orange/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-40 left-0 w-96 h-96 bg-gradient-to-tr from-vivid-purple/20 to-electric-pink/20 rounded-full blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-white mb-6">
            What We <span className="text-cyan-electric">Do</span>
          </h2>
          <p className="text-soft-white text-lg leading-relaxed">
            From concept to launch and beyond, we provide end-to-end solutions
            that power modern businesses in the digital age.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="group relative bg-navy-dark/80 backdrop-blur-sm rounded-2xl p-8 hover:scale-105 transition-all duration-300 overflow-hidden border-2 border-transparent hover:border-cyan-electric/30 shadow-xl hover:shadow-2xl"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-5 group-hover:opacity-20 transition-opacity`}></div>
              <div className={`absolute -bottom-10 -right-10 w-40 h-40 bg-gradient-to-br ${service.gradient} rounded-full blur-3xl opacity-20 group-hover:opacity-50 transition-all duration-300 group-hover:scale-125`}></div>
              <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${service.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300`}></div>

              <div className="relative z-10">
                <div className={`relative w-14 h-14 bg-gradient-to-br ${service.gradient} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg`}>
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} rounded-xl blur-md opacity-50 group-hover:opacity-100 transition-opacity`}></div>
                  <service.icon className="relative w-7 h-7 text-white" />
                </div>

                <h3 className="text-white mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text" style={{ backgroundImage: `linear-gradient(to right, var(--tw-gradient-stops))` }}>
                  {service.title}
                </h3>

                <p className="text-soft-white/80 mb-6 leading-relaxed">
                  {service.description}
                </p>

                <ul className="space-y-2 mb-6">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center space-x-2 text-sm text-soft-white/70">
                      <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${service.gradient}`}></div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={scrollToContact}
                  className={`bg-gradient-to-r ${service.gradient} bg-clip-text text-transparent font-medium text-sm hover:opacity-80 transition-opacity focus-visible-ring rounded inline-flex items-center group`}
                >
                  Learn more
                  <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 5l7 7-7 7" stroke="url(#gradient)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                    <defs>
                      <linearGradient id="gradient">
                        <stop offset="0%" stopColor="currentColor" />
                      </linearGradient>
                    </defs>
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Button variant="primary" size="lg" onClick={scrollToContact}>
            Get Started Today
          </Button>
        </div>
      </div>
    </section>
  );
}
