import { useState } from 'react';
import { Check, Lightbulb, PenTool, Code, Rocket, BarChart } from 'lucide-react';

interface Step {
  icon: typeof Lightbulb;
  title: string;
  description: string;
  duration: string;
  deliverables: string[];
}

export default function ProcessTimeline() {
  const [activeStep, setActiveStep] = useState(0);

  const steps: Step[] = [
    {
      icon: Lightbulb,
      title: 'Discovery & Strategy',
      description: 'We dive deep into understanding your business goals, target audience, and competitive landscape.',
      duration: '1-2 weeks',
      deliverables: ['Market research report', 'Competitor analysis', 'User personas', 'Project roadmap'],
    },
    {
      icon: PenTool,
      title: 'Design & Prototyping',
      description: 'Creating beautiful, user-centered designs with interactive prototypes for your approval.',
      duration: '2-3 weeks',
      deliverables: ['Wireframes', 'High-fidelity mockups', 'Interactive prototype', 'Design system'],
    },
    {
      icon: Code,
      title: 'Development & Testing',
      description: 'Building your solution with clean, scalable code and rigorous quality assurance testing.',
      duration: '4-8 weeks',
      deliverables: ['Frontend development', 'Backend APIs', 'Database setup', 'QA testing'],
    },
    {
      icon: Rocket,
      title: 'Launch & Deployment',
      description: 'Seamless deployment to production with monitoring, analytics, and performance optimization.',
      duration: '1 week',
      deliverables: ['Production deployment', 'SSL setup', 'Analytics integration', 'Performance tuning'],
    },
    {
      icon: BarChart,
      title: 'Growth & Support',
      description: 'Ongoing maintenance, updates, and optimization to ensure continued success and growth.',
      duration: 'Ongoing',
      deliverables: ['24/7 monitoring', 'Regular updates', 'Performance reports', 'Feature enhancements'],
    },
  ];

  return (
    <section className="py-20 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy-dark to-navy"></div>
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(to right, #00ff41 1px, transparent 1px),
            linear-gradient(to bottom, #00ff41 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-white mb-6">
            Our <span className="bg-gradient-to-r from-cyan-electric via-matrix-green to-electric-yellow bg-clip-text text-transparent">Process</span>
          </h2>
          <p className="text-soft-white/80 text-lg leading-relaxed">
            A proven methodology that delivers exceptional results, from concept to launch and beyond.
          </p>
        </div>

        <div className="relative">
          <div className="hidden lg:block absolute top-20 left-0 right-0 h-1 bg-gradient-to-r from-cyan-electric via-matrix-green to-electric-yellow"></div>

          <div className="grid lg:grid-cols-5 gap-8">
            {steps.map((step, index) => (
              <div
                key={step.title}
                className="relative"
                onMouseEnter={() => setActiveStep(index)}
              >
                <button
                  className={`w-full text-left transition-all duration-300 ${
                    activeStep === index ? 'scale-105' : ''
                  }`}
                  onClick={() => setActiveStep(index)}
                >
                  <div className="flex flex-col items-center">
                    <div className={`relative w-20 h-20 rounded-full flex items-center justify-center mb-4 transition-all duration-300 ${
                      activeStep === index
                        ? 'bg-gradient-to-br from-cyan-electric to-matrix-green shadow-2xl'
                        : 'bg-navy-dark border-2 border-cyan-electric/30'
                    }`}>
                      {activeStep > index && (
                        <Check className="w-10 h-10 text-white" />
                      )}
                      {activeStep <= index && (
                        <step.icon className={`w-10 h-10 ${
                          activeStep === index ? 'text-white' : 'text-cyan-electric/70'
                        }`} />
                      )}
                      {activeStep === index && (
                        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-electric to-matrix-green animate-ping opacity-75"></div>
                      )}
                    </div>

                    <h3 className={`text-center mb-2 transition-colors ${
                      activeStep === index ? 'text-cyan-electric' : 'text-white'
                    }`}>
                      {step.title}
                    </h3>
                    <p className="text-soft-white/60 text-sm text-center">
                      {step.duration}
                    </p>
                  </div>
                </button>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-navy-dark/50 backdrop-blur-sm rounded-2xl p-8 border border-cyan-electric/20">
            <div className="flex items-start space-x-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-electric to-matrix-green rounded-xl flex items-center justify-center flex-shrink-0">
                {(() => {
                  const Icon = steps[activeStep].icon;
                  return <Icon className="w-6 h-6 text-white" />;
                })()}
              </div>
              <div>
                <h4 className="text-2xl font-bold text-white mb-2">
                  {steps[activeStep].title}
                </h4>
                <p className="text-soft-white/80 leading-relaxed">
                  {steps[activeStep].description}
                </p>
              </div>
            </div>

            <div className="pl-16">
              <h5 className="text-cyan-electric font-semibold mb-4">Key Deliverables:</h5>
              <div className="grid md:grid-cols-2 gap-3">
                {steps[activeStep].deliverables.map((deliverable, index) => (
                  <div
                    key={deliverable}
                    className="flex items-center space-x-2"
                    style={{
                      animation: 'slide-in 0.5s ease-out',
                      animationDelay: `${index * 100}ms`,
                      animationFillMode: 'both'
                    }}
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-cyan-electric to-matrix-green"></div>
                    <span className="text-soft-white/90">{deliverable}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
