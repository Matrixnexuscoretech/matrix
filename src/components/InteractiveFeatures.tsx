import { useState } from 'react';
import { Code2, Palette, Rocket, Shield, Zap, LineChart } from 'lucide-react';

interface Feature {
  icon: typeof Code2;
  title: string;
  description: string;
  gradient: string;
  benefits: string[];
}

export default function InteractiveFeatures() {
  const [activeFeature, setActiveFeature] = useState(0);

  const features: Feature[] = [
    {
      icon: Code2,
      title: 'Modern Tech Stack',
      description: 'Built with cutting-edge technologies that ensure scalability, performance, and maintainability.',
      gradient: 'from-cyan-electric to-vivid-blue',
      benefits: [
        'React, Next.js, Node.js',
        'TypeScript for type safety',
        'PostgreSQL & Redis',
        'Cloud-native architecture',
      ],
    },
    {
      icon: Palette,
      title: 'Stunning Design',
      description: 'Beautiful, intuitive interfaces that captivate users and drive engagement across all devices.',
      gradient: 'from-electric-pink to-vivid-purple',
      benefits: [
        'Mobile-first responsive design',
        'Accessibility compliant',
        'Brand-aligned aesthetics',
        'Micro-interactions & animations',
      ],
    },
    {
      icon: Rocket,
      title: 'Lightning Performance',
      description: 'Optimized for speed with lazy loading, caching, and CDN integration for instant page loads.',
      gradient: 'from-electric-yellow to-electric-orange',
      benefits: [
        'Sub-second load times',
        'Image optimization',
        'Code splitting & lazy loading',
        'CDN & edge caching',
      ],
    },
    {
      icon: Shield,
      title: 'Enterprise Security',
      description: 'Bank-level security with SSL, encryption, regular audits, and compliance with global standards.',
      gradient: 'from-matrix-green to-cyan-electric',
      benefits: [
        'SSL/TLS encryption',
        'Regular security audits',
        'GDPR & compliance ready',
        'DDoS protection',
      ],
    },
    {
      icon: Zap,
      title: 'Seamless Integration',
      description: 'Connect with your existing tools, payment gateways, CRMs, and third-party services effortlessly.',
      gradient: 'from-neon-cyan to-vivid-blue',
      benefits: [
        'API-first architecture',
        'Payment gateway integration',
        'CRM & marketing tools',
        'Custom integrations',
      ],
    },
    {
      icon: LineChart,
      title: 'Data & Analytics',
      description: 'Comprehensive insights into user behavior, conversions, and performance metrics in real-time.',
      gradient: 'from-vivid-purple to-electric-pink',
      benefits: [
        'Real-time analytics dashboard',
        'Conversion tracking',
        'User behavior insights',
        'A/B testing capabilities',
      ],
    },
  ];

  return (
    <section className="py-20 lg:py-32 bg-soft-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-navy mb-6">
            Built for <span className="bg-gradient-to-r from-cyan-electric via-matrix-green to-electric-yellow bg-clip-text text-transparent">Success</span>
          </h2>
          <p className="text-charcoal text-lg leading-relaxed">
            Every project we deliver comes packed with features designed to accelerate your business growth.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-4 mb-8">
          {features.map((feature, index) => (
            <button
              key={feature.title}
              onClick={() => setActiveFeature(index)}
              className={`text-left p-6 rounded-2xl transition-all duration-300 ${
                activeFeature === index
                  ? 'bg-white shadow-xl scale-105 border-2 border-cyan-electric'
                  : 'bg-white/50 hover:bg-white hover:shadow-lg border-2 border-transparent'
              }`}
            >
              <div className={`w-12 h-12 bg-gradient-to-br ${feature.gradient} rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 ${
                activeFeature === index ? 'scale-110' : ''
              }`}>
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className={`text-lg font-semibold mb-2 transition-colors ${
                activeFeature === index ? 'text-cyan-electric' : 'text-navy'
              }`}>
                {feature.title}
              </h3>
            </button>
          ))}
        </div>

        <div className="bg-white rounded-3xl shadow-2xl p-8 lg:p-12 min-h-[400px] relative overflow-hidden">
          <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br ${features[activeFeature].gradient} rounded-full blur-3xl opacity-20 animate-pulse`}></div>

          <div className="relative">
            <div className="flex items-start space-x-4 mb-6">
              <div className={`w-16 h-16 bg-gradient-to-br ${features[activeFeature].gradient} rounded-2xl flex items-center justify-center flex-shrink-0 animate-bounce-slow`}>
                {(() => {
                  const Icon = features[activeFeature].icon;
                  return <Icon className="w-8 h-8 text-white" />;
                })()}
              </div>
              <div>
                <h3 className="text-3xl font-bold text-navy mb-3">
                  {features[activeFeature].title}
                </h3>
                <p className="text-charcoal/80 text-lg leading-relaxed">
                  {features[activeFeature].description}
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mt-8">
              {features[activeFeature].benefits.map((benefit, index) => (
                <div
                  key={benefit}
                  className="flex items-center space-x-3 p-4 bg-soft-white rounded-xl"
                  style={{
                    animation: 'slide-in 0.5s ease-out',
                    animationDelay: `${index * 100}ms`,
                    animationFillMode: 'both'
                  }}
                >
                  <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${features[activeFeature].gradient}`}></div>
                  <span className="text-charcoal font-medium">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
