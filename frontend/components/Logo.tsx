import React, { useContext } from 'react';
import { ThemeContext } from '../App';

interface LogoProps {
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ className }) => {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === 'dark';

  return (
    <svg 
      viewBox="0 0 200 200" 
      xmlns="http://www.w3.org/2000/svg" 
      className={className}
      aria-hidden="true"
    >
      <g>
        {/* Head */}
        <path d="M 65,110 C 45,110 35,90 35,70 C 35,40 60,15 100,15 C 140,15 165,40 165,70 C 165,90 155,110 135,110 L 125,185 L 75,185 L 65,110 Z" fill={isDark ? "#f3f4f6" : "#e5e7eb"} />
        
        {/* Inner Ears */}
        <path d="M 78,75 C 78,55 70,30 85,25 C 100,20 100,55 100,75" fill={isDark ? "#d1d5db" : "#fbcfe8"} />
        <path d="M 122,75 C 122,55 130,30 115,25 C 100,20 100,55 100,75" fill={isDark ? "#d1d5db" : "#fbcfe8"} />
        
        {/* Eyes */}
        <circle cx="85" cy="80" r="8" fill={isDark ? "#111827" : "#000"} />
        <circle cx="115" cy="80" r="8" fill={isDark ? "#111827" : "#000"} />
        
        {/* Dollar Sign Eye - subtle */}
        <text x="108" y="87" fontSize="14" fill={isDark ? "#eab308" : "#16a34a"} fontWeight="bold">$</text>
        
        {/* Nose */}
        <path d="M 95,95 C 100,105 105,95 95,95 Z" fill="#f472b6" />
        
        {/* Mouth */}
        <path d="M 90,105 C 95,110 105,110 110,105" stroke={isDark ? "#111827" : "#000"} strokeWidth="2" fill="none" strokeLinecap="round" />
        
        {/* Body (Suit) */}
        <path d="M 75,120 L 125,120 L 115,180 L 85,180 Z" fill={isDark ? "#15803d" : "#16a34a"} />
        
        {/* Collar */}
        <path d="M 80,120 L 100,135 L 120,120" fill={isDark ? "#f3f4f6" : "#fff"} />

        {/* Tie */}
        <path d="M 100,135 L 95,130 L 95,155 L 100,165 L 105,155 L 105,130 Z" fill={isDark ? "#eab308" : "#facc15"} />
      </g>
    </svg>
  );
};
