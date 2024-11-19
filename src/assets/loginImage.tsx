import React from 'react';

const LoginImage = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 400">
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

    {/* Highly detailed wooden frame */}
    <rect
      x="50"
      y="50"
      width="700"
      height="300"
      fill="url(#woodShading)"
      filter="url(#woodGrain)"
      strokeWidth="3"
      stroke="rgba(0,0,0,0.5)"
    />

    {/* Shelf divisions with subtle shadow and texture */}
    <line x1="50" y1="175" x2="750" y2="175" stroke="rgba(0,0,0,0.3)" strokeWidth="2" filter="url(#woodGrain)" />
    <line x1="50" y1="275" x2="750" y2="275" stroke="rgba(0,0,0,0.3)" strokeWidth="2" filter="url(#woodGrain)" />

    {/* Ultra-realistic books with complex shading and texture */}
    <g transform="translate(100, 90)">
      {[...Array(12)].map((_, i) => {
        const bookWidth = Math.random() * 30 + 25;
        const bookHeight = Math.random() * 60 + 120;
        const rotation = Math.random() * 10 - 5;
        const hue = Math.floor(Math.random() * 360);

        return (
          <g key={i} transform={`translate(${i * 50}, 0) rotate(${rotation})`}>
            <rect
              width={bookWidth}
              height={bookHeight}
              fill={`hsl(${hue}, 50%, 40%)`}
              stroke="rgba(0,0,0,0.3)"
              strokeWidth="1"
            >
              <animate
                attributeName="transform"
                type="rotate"
                from={`0 ${bookWidth / 2} ${bookHeight / 2}`}
                to={`5 ${bookWidth / 2} ${bookHeight / 2}`}
                dur="2s"
                repeatCount="indefinite"
              />
            </rect>
            <text
              x={bookWidth / 2}
              y={bookHeight / 2}
              fontSize="8"
              textAnchor="middle"
              fill="rgba(255,255,255,0.5)"
              transform={`rotate(-90 ${bookWidth / 2} ${bookHeight / 2})`}
            >
              Book
            </text>
          </g>
        );
      })}
    </g>

    {/* Sophisticated lock and chain */}
    <g transform="translate(400, 20)">
      <rect
        x="0"
        y="0"
        width="60"
        height="40"
        fill="#333"
        rx="5"
        ry="5"
        filter="url(#woodGrain)"
      />
      <circle
        cx="30"
        cy="20"
        r="15"
        fill="#444"
        stroke="#000"
        strokeWidth="2"
      />
      <path
        d="M25,15 L35,15 L35,25 L25,25 Z"
        fill="#666"
      />
    </g>
  </svg>
);

export default LoginImage;