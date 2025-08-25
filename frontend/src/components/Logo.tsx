import React from 'react';

interface LogoProps {
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ className }) => {
  return (
    <svg 
      viewBox="0 0 200 200" 
      xmlns="http://www.w3.org/2000/svg" 
      className={className}
      aria-hidden="true"
    >
      <title>BucksBunny Logo</title>
      <g>
        {/* Suit and Tie */}
        <path d="M 78 123 C 78 123 70 130 70 145 L 70 175 L 130 175 L 130 145 C 130 130 122 123 122 123 L 105 130 L 100 140 L 95 130 Z" fill="#1f2937"/>
        <path d="M 78 123 L 95 130 L 100 120 L 105 130 L 122 123 L 120 128 L 105 135 L 100 145 L 95 135 L 80 128 Z" fill="#ffffff"/>
        <path d="M 100 145 L 95 135 L 100 132 L 105 135 Z" fill="#eab308"/>
        <path d="M 97 146 L 100 160 L 103 146 Z" fill="#facc15"/>

        {/* Head */}
        <path d="M 100,20 C 65,20 40,45 40,80 C 40,115 65,125 100,125 C 135,125 160,115 160,80 C 160,45 135,20 100,20 Z" fill="#9ca3af"/>
        
        {/* Face Plates */}
        <path d="M 100,20 C 70,20 45,45 45,75 L 155,75 C 155,45 130,20 100,20" fill="#e5e7eb" />
        <path d="M 40,80 C 40,115 65,125 100,125 L 100,75 L 45,75 C 43,75 40,77 40,80" fill="#d1d5db" />
        <path d="M 160,80 C 160,115 135,125 100,125 L 100,75 L 155,75 C 157,75 160,77 160,80" fill="#b0b8c4" />
        
        {/* Ears */}
        <path d="M 50 25 L 65 15 L 75 18 L 60 65 L 45 60 Z" fill="#9ca3af" />
        <path d="M 55 28 L 65 23 L 70 26 L 60 60 L 50 58 Z" fill="#d1d5db" />
        <path d="M 150 25 L 135 15 L 125 18 L 140 65 L 155 60 Z" fill="#9ca3af" />
        <path d="M 145 28 L 135 23 L 130 26 L 140 60 L 150 58 Z" fill="#d1d5db" />
        
        {/* Ear Details */}
        <circle cx="138" cy="70" r="8" fill="#4b5563"/>
        <circle cx="138" cy="70" r="4" fill="#6b7280"/>
        
        {/* Dollar Eye */}
        <path d="M 68,68 A 20 20 0 1 1 68,102 A 20 20 0 1 1 68,68 Z" fill="#1f2937" />
        <text x="68" y="93" fill="#facc15" fontSize="30" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle">$</text>

        {/* Other Eye */}
        <path d="M 132,80 A 15 15 0 1 1 132,110 A 15 15 0 1 1 132,80 Z" fill="#1f2937"/>
        <path d="M 132,83 A 12 12 0 1 1 132,107 A 12 12 0 1 1 132,83 Z" fill="#4b5563"/>
        <circle cx="132" cy="95" r="7" fill="#facc15"/>
        <circle cx="132" cy="95" r="4" fill="#eab308"/>

        {/* Jaw/Chin */}
        <path d="M 80 110 L 120 110 L 115 120 L 85 120 Z" fill="#e5e7eb" />
      </g>
    </svg>
  );
};

