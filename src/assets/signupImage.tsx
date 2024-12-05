import React from 'react';

const SignupImage = () => (
  <div className="relative top-0 right-0 w-[40vw] h-[100vh] sm:hidden overflow-hidden">
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 400 800"  // Adjusted viewBox to match vertical orientation
      preserveAspectRatio="xMidYMid meet"  // Ensures the entire SVG fills the container
      aria-readonly="true"
      className="w-full h-full pointer-events-none"
      
    >
      <defs>
        <filter id="woodGrain" x="0%" y="0%" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="3" result="turbulence" />
          <feDisplacementMap in="SourceGraphic" in2="turbulence" scale="3" xChannelSelector="R" yChannelSelector="G" />
        </filter>

        <linearGradient id="woodShading" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8B4513" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#5D4037" stopOpacity="0.9" />
        </linearGradient>
      </defs>

      {/* Wooden frame */}
      <rect
        x="50"
        y="50"
        width="300"
        height="700"
        fill="url(#woodShading)"
        filter="url(#woodGrain)"
        strokeWidth="3"
        stroke="rgba(0,0,0,0.5)"
      />

      {/* Shelf divisions */}
      <line x1="175" y1="50" x2="175" y2="750" stroke="rgba(0,0,0,0.3)" strokeWidth="2" filter="url(#woodGrain)" />
      <line x1="275" y1="50" x2="275" y2="750" stroke="rgba(0,0,0,0.3)" strokeWidth="2" filter="url(#woodGrain)" />

      {/* Books */}
      <g transform="translate(90, 100)">
        {[...Array(12)].map((_, i) => {
          const bookWidth = Math.random() * 30 + 25;
          const bookHeight = Math.random() * 60 + 120;
          const rotation = Math.random() * 10 - 5;
          const hue = Math.floor(Math.random() * 360);

          return (
            <g key={i} transform={`translate(0, ${i * 50}) rotate(${rotation})`}>
              <rect
                width={bookHeight}
                height={bookWidth}
                fill={`hsl(${hue}, 50%, 40%)`}
                stroke="rgba(0,0,0,0.3)"
                strokeWidth="1"
              >
                <animate
                  attributeName="transform"
                  type="rotate"
                  from={`0 ${bookHeight / 2} ${bookWidth / 2}`}
                  to={`5 ${bookHeight / 2} ${bookWidth / 2}`}
                  dur="2s"
                  repeatCount="indefinite"
                />
              </rect>
              <text
                x={bookHeight / 2}
                y={bookWidth / 2}
                fontSize="20"
                textAnchor="middle"
                fill='rgba(55, 65, 81, 1)'
                fontFamily='Georgia'
                fontWeight="600"
              >
                Book
              </text>
            </g>
          );
        })}
      </g>
    </svg>
  </div>
);

export default SignupImage;