import { useEffect, useState } from 'react';

export default function ParallaxBackground() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <div
        className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-3xl opacity-20"
        style={{
          background: 'linear-gradient(135deg, #00d7c1, #00ff41)',
          transform: `translateY(${scrollY * 0.3}px) scale(${1 + scrollY * 0.0001})`,
        }}
      />
      <div
        className="absolute top-1/3 left-0 w-[600px] h-[600px] rounded-full blur-3xl opacity-20"
        style={{
          background: 'linear-gradient(135deg, #fbbf24, #fb923c)',
          transform: `translateY(${scrollY * 0.5}px) scale(${1 + scrollY * 0.0001})`,
        }}
      />
      <div
        className="absolute top-2/3 right-1/4 w-[400px] h-[400px] rounded-full blur-3xl opacity-20"
        style={{
          background: 'linear-gradient(135deg, #ec4899, #8b5cf6)',
          transform: `translateY(${scrollY * 0.2}px) scale(${1 + scrollY * 0.0001})`,
        }}
      />
      <div
        className="absolute bottom-0 left-1/3 w-[550px] h-[550px] rounded-full blur-3xl opacity-15"
        style={{
          background: 'linear-gradient(135deg, #1572ff, #6366f1)',
          transform: `translateY(${scrollY * -0.4}px) scale(${1 + scrollY * 0.0001})`,
        }}
      />
    </div>
  );
}
