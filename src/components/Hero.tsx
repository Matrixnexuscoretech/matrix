import { useEffect, useState } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import Button from './Button';

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy-dark to-navy"></div>

      <div className="absolute inset-0 bg-gradient-to-br from-cyan-electric/20 via-matrix-green/20 to-electric-yellow/20 animate-gradient-xy" style={{ backgroundSize: '400% 400%' }}></div>

      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(to right, #00ff41 1px, transparent 1px),
            linear-gradient(to bottom, #00ff41 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}></div>
      </div>

      <div className="absolute top-20 right-10 w-96 h-96 bg-gradient-to-br from-electric-pink via-vivid-purple to-electric-yellow rounded-full blur-3xl opacity-30 animate-float"></div>
      <div className="absolute bottom-20 left-10 w-[32rem] h-[32rem] bg-gradient-to-tr from-cyan-electric via-matrix-green to-neon-cyan rounded-full blur-3xl opacity-30 animate-float" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/2 right-1/4 w-80 h-80 bg-gradient-to-bl from-electric-yellow via-electric-orange to-electric-pink rounded-full blur-3xl opacity-25 animate-float" style={{ animationDelay: '2s' }}></div>
      <div className="absolute bottom-1/3 right-1/3 w-72 h-72 bg-gradient-to-tr from-neon-green via-matrix-green to-cyan-electric rounded-full blur-3xl opacity-20 animate-spin-slow"></div>

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-navy/30 to-navy"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 lg:pt-40 lg:pb-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className={`space-y-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="inline-flex items-center space-x-2 bg-cyan-electric/10 border border-cyan-electric/30 rounded-full px-4 py-2">
              <Sparkles className="w-4 h-4 text-cyan-electric" />
              <span className="text-cyan-electric text-sm font-medium">
                Trusted by Innovators Worldwide
              </span>
            </div>

            <h1 className="text-white">
              We Build The Web That{' '}
              <span className="bg-gradient-to-r from-neon-cyan via-matrix-green to-electric-yellow bg-clip-text text-transparent animate-pulse-glow" style={{ backgroundSize: '200% auto' }}>
                Grows Your Business
              </span>
            </h1>

            <p className="text-soft-white text-lg md:text-xl leading-relaxed max-w-2xl">
              Full-stack webcraft, design & marketing — delivered with precision.
              International standards, local excellence.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                variant="primary"
                size="lg"
                onClick={() => scrollToSection('#contact')}
                className="group"
              >
                Get a Free Audit
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                variant="ghost"
                size="lg"
                onClick={() => scrollToSection('#portfolio')}
              >
                View Portfolio
              </Button>
            </div>

            <p className="text-soft-white/70 text-sm max-w-md">
              Trusted by startups, firms and innovators — we build sites that rank, convert and scale.
            </p>
          </div>

          <div className={`relative transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-electric via-matrix-green to-electric-yellow rounded-2xl blur-3xl opacity-30 animate-pulse"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-electric-pink via-vivid-purple to-cyan-electric rounded-2xl blur-2xl opacity-20 animate-spin-slow"></div>

              <div className="relative bg-gradient-to-br from-navy-dark/90 to-navy/90 backdrop-blur-xl rounded-2xl p-8 border-2 border-transparent" style={{
                backgroundImage: 'linear-gradient(to bottom right, rgba(7, 16, 40, 0.9), rgba(3, 6, 18, 0.9))',
                borderImage: 'linear-gradient(135deg, #00f5ff, #39ff14, #fbbf24, #ff10f0) 1'
              }}>
                <div className="space-y-6">
                  <div className="flex items-center space-x-3">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 rounded-full bg-electric-red"></div>
                      <div className="w-3 h-3 rounded-full bg-electric-yellow"></div>
                      <div className="w-3 h-3 rounded-full bg-matrix-green"></div>
                    </div>
                    <div className="flex-1 bg-navy/50 rounded px-3 py-1.5">
                      <span className="text-cyan-electric text-sm font-mono">matrix-nexus.tech</span>
                    </div>
                  </div>

                  <div className="space-y-3 font-mono text-sm">
                    <div className="flex items-center space-x-2">
                      <span className="text-matrix-green">$</span>
                      <span className="text-soft-white">npm run build</span>
                    </div>
                    <div className="text-cyan-electric/70">
                      Building for production...
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-matrix-green">✓</span>
                      <span className="text-soft-white/70">Optimized</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-electric-pink">✓</span>
                      <span className="text-soft-white/70">SEO Ready</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-electric-yellow">✓</span>
                      <span className="text-soft-white/70">Lightning Fast</span>
                    </div>
                    <div className="mt-4 flex items-center space-x-2">
                      <span className="text-matrix-green">$</span>
                      <span className="text-soft-white animate-pulse">_</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-electric-orange/30 rounded-full blur-2xl animate-float"></div>
              <div className="absolute -top-4 -left-4 w-32 h-32 bg-vivid-indigo/30 rounded-full blur-2xl animate-float" style={{ animationDelay: '1s' }}></div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <button
          onClick={() => scrollToSection('#magic')}
          className="text-cyan-electric focus-visible-ring rounded p-2"
          aria-label="Scroll to next section"
        >
          <svg className="w-6 h-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </button>
      </div>
    </section>
  );
}
