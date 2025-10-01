import { useEffect, useState, useRef } from 'react';

interface Stat {
  value: number;
  suffix: string;
  label: string;
  prefix?: string;
}

export default function StatsCounter() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [counts, setCounts] = useState([0, 0, 0, 0]);

  const stats: Stat[] = [
    { value: 25, suffix: '+', label: 'Projects Delivered', prefix: '' },
    { value: 98, suffix: '%', label: 'Client Satisfaction', prefix: '' },
    { value: 10, suffix: '+', label: 'Team Members', prefix: '' },
    { value: 5, suffix: '+', label: 'Countries Served', prefix: '' },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 2000;
    const steps = 60;
    const increment = duration / steps;

    stats.forEach((stat, index) => {
      let currentCount = 0;
      const stepValue = stat.value / steps;

      const timer = setInterval(() => {
        currentCount += stepValue;
        if (currentCount >= stat.value) {
          currentCount = stat.value;
          clearInterval(timer);
        }
        setCounts((prev) => {
          const newCounts = [...prev];
          newCounts[index] = Math.floor(currentCount);
          return newCounts;
        });
      }, increment);
    });
  }, [isVisible]);

  return (
    <section ref={sectionRef} className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy-dark to-navy"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-electric/10 via-matrix-green/10 to-electric-yellow/10 animate-gradient-x" style={{ backgroundSize: '200% 200%' }}></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="text-center group"
            >
              <div className="relative inline-block">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-electric to-matrix-green rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity"></div>
                <div className="relative text-5xl lg:text-6xl font-bold text-white mb-2">
                  <span className="bg-gradient-to-r from-neon-cyan via-matrix-green to-electric-yellow bg-clip-text text-transparent">
                    {stat.prefix}{counts[index]}{stat.suffix}
                  </span>
                </div>
              </div>
              <p className="text-soft-white/80 text-sm lg:text-base font-medium mt-4">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
