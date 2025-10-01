import { TrendingUp, Target, Zap } from 'lucide-react';

export default function MagicSection() {
  const benefits = [
    {
      icon: TrendingUp,
      title: 'Reach',
      description: 'Expand your digital footprint and connect with audiences globally',
      stat: '+150%',
      statLabel: 'Average reach increase',
    },
    {
      icon: Target,
      title: 'Convert',
      description: 'Transform visitors into customers with optimized user experiences',
      stat: '+40%',
      statLabel: 'Lead conversion in 90 days',
    },
    {
      icon: Zap,
      title: 'Scale',
      description: 'Build on robust infrastructure that grows with your business',
      stat: '3x',
      statLabel: 'Faster time to market',
    },
  ];

  return (
    <section id="magic" className="py-20 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-soft-white via-white to-soft-white"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-electric/5 via-matrix-green/5 to-electric-yellow/5 animate-gradient-x" style={{ backgroundSize: '200% 200%' }}></div>
      <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-electric-pink/10 to-vivid-purple/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-gradient-to-tr from-cyan-electric/10 to-matrix-green/10 rounded-full blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-navy mb-6">
            The Magic of <span className="text-cyan-electric">Professional Websites</span>
          </h2>
          <p className="text-charcoal text-lg leading-relaxed">
            In today's digital economy, your website is your most powerful asset.
            A professionally crafted web presence doesn't just look good — it works hard to grow your business.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {benefits.map((benefit, index) => (
            <div
              key={benefit.title}
              className="group relative bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 border-transparent hover:border-cyan-electric/30 overflow-hidden"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-electric/5 via-matrix-green/5 to-electric-yellow/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative w-16 h-16 bg-gradient-to-br from-cyan-electric via-matrix-green to-electric-yellow rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg">
                <benefit.icon className="w-8 h-8 text-white" />
              </div>

              <h3 className="text-navy mb-3 group-hover:text-cyan-electric transition-colors">
                {benefit.title}
              </h3>

              <p className="text-charcoal/80 mb-6 leading-relaxed">
                {benefit.description}
              </p>

              <div className="pt-6 border-t border-gray-200">
                <div className="text-3xl font-bold text-matrix-green mb-1">
                  {benefit.stat}
                </div>
                <div className="text-sm text-charcoal/60">
                  {benefit.statLabel}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="relative mt-16 bg-gradient-to-r from-navy via-navy-dark to-navy rounded-2xl p-8 lg:p-12 text-center overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-electric/20 via-matrix-green/20 to-electric-yellow/20 animate-gradient-x" style={{ backgroundSize: '200% 200%' }}></div>
          <p className="relative text-lg lg:text-xl font-medium max-w-4xl mx-auto leading-relaxed">
            <span className="bg-gradient-to-r from-neon-cyan via-matrix-green to-electric-yellow bg-clip-text text-transparent">
              "Professional websites increase trust, boost SEO rankings, and convert visitors into loyal customers.
              Your competition is already online — make sure you stand out."
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
