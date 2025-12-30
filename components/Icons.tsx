import React from 'react';

export const JikeLogo = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="inline-block">
    <rect width="24" height="24" rx="6" fill="#FFD600"/>
    <path d="M12 6V18M12 18L16 14" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const ChickenLogo = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full fill-white stroke-black stroke-2">
    <circle cx="50" cy="50" r="45" fill="white" stroke="black" strokeWidth="3"/>
    <path d="M30 45 Q50 80 70 45" fill="none" stroke="black" strokeWidth="3" />
    <circle cx="35" cy="40" r="4" fill="black" />
    <circle cx="65" cy="40" r="4" fill="black" />
    <path d="M48 55 L52 55 L50 60 Z" fill="#FFD600" stroke="black" strokeWidth="1"/>
  </svg>
);

// WeChat Moments style icon (Aperture)
export const MomentsIcon = () => (
  <svg width="24" height="24" viewBox="0 0 100 100" fill="none" className="w-6 h-6 mr-2 shrink-0">
     <g transform="rotate(-45 50 50)">
        {/* Blue Segment */}
        <path d="M50 50 L50 0 A50 50 0 0 1 100 50 Z" fill="#4285F4"/>
        {/* Green Segment */}
        <path d="M50 50 L100 50 A50 50 0 0 1 50 100 Z" fill="#34A853"/>
        {/* Yellow Segment */}
        <path d="M50 50 L50 100 A50 50 0 0 1 0 50 Z" fill="#FBBC05"/>
        {/* Red Segment */}
        <path d="M50 50 L0 50 A50 50 0 0 1 50 0 Z" fill="#EA4335"/>
        {/* Center cutout to make it look like a shutter/lens */}
        <circle cx="50" cy="50" r="16" fill="#f9fafb"/>
     </g>
  </svg>
);

// WeChat App Logo (Two Bubbles)
export const WeChatLogo = ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
        <path d="M8.476 2C4.91 2 2.02 4.67 2.02 7.965c0 1.956 1.013 3.692 2.593 4.793-.11.71-.527 1.838-.532 1.85a.39.39 0 0 0 .428.487c.07-.003 1.57-.404 2.825-.526.505.14 1.042.215 1.594.215 3.565 0 6.455-2.668 6.455-5.96 0-3.292-2.89-5.96-6.455-5.96zM6.16 7.42c-.52 0-.94-.42-.94-.937 0-.518.42-.937.94-.937.52 0 .942.42.942.937 0 .518-.422.937-.942.937zm4.632 0c-.52 0-.942-.42-.942-.937 0-.518.422-.937.942-.937.52 0 .942.42.942.937 0 .518-.422.937-.942.937z" fill="currentColor"/>
        <path d="M16.142 6.883c-.477 0-.942.046-1.393.133.243.585.375 1.218.375 1.884 0 3.125-2.822 5.658-6.303 5.658-.336 0-.666-.024-.99-.07-.407 1.928 2.07 3.57 5.093 3.57.537 0 1.06-.072 1.552-.208 1.22.12 2.68.51 2.75.513a.377.377 0 0 0 .416-.473c-.005-.013-.41-1.11-.518-1.802 1.54-1.072 2.527-2.763 2.527-4.667 0-2.52-2.028-4.537-4.51-4.537zm-2.186 3.65c-.507 0-.916-.41-.916-.913 0-.505.41-.914.916-.914.506 0 .916.41.916.914 0 .504-.41.913-.916.913zm4.372 0c-.506 0-.916-.41-.916-.913 0-.505.41-.914.916-.914.506 0 .916.41.916.914 0 .504-.41.913-.916.913z" fill="currentColor"/>
    </svg>
);