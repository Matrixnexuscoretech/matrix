export default function AnimatedGridBackground() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy-dark to-navy"></div>

      <div className="absolute inset-0 opacity-20">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="url(#gridGradient)"
                strokeWidth="0.5"
              />
            </pattern>
            <linearGradient id="gridGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00d7c1" stopOpacity="0.5">
                <animate
                  attributeName="stop-color"
                  values="#00d7c1; #00ff41; #fbbf24; #ec4899; #00d7c1"
                  dur="10s"
                  repeatCount="indefinite"
                />
              </stop>
              <stop offset="100%" stopColor="#00ff41" stopOpacity="0.3">
                <animate
                  attributeName="stop-color"
                  values="#00ff41; #fbbf24; #ec4899; #00d7c1; #00ff41"
                  dur="10s"
                  repeatCount="indefinite"
                />
              </stop>
            </linearGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-cyan-electric/30 to-matrix-green/30 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-tr from-electric-pink/30 to-vivid-purple/30 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/2 right-1/3 w-72 h-72 bg-gradient-to-bl from-electric-yellow/30 to-electric-orange/30 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
    </div>
  );
}
