/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { Heart } from 'lucide-react';

// --- Ultra-Detailed SVG Components ---

const ReferenceWindowViewSVG = () => (
  <svg viewBox="0 0 800 400" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
    {/* Soft Clouds */}
    <g fill="white" opacity="0.5">
      <circle cx="150" cy="100" r="40" />
      <circle cx="190" cy="110" r="35" />
      <circle cx="110" cy="110" r="35" />
      
      <circle cx="600" cy="150" r="50" />
      <circle cx="650" cy="160" r="45" />
      <circle cx="550" cy="160" r="45" />
    </g>
  </svg>
);

const RefactoredWallSVG = () => (
  <svg viewBox="0 0 800 400" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
    <defs>
      <mask id="window-mask">
        <rect width="800" height="400" fill="white" />
        {/* Two large window panes */}
        <rect x="150" y="140" width="240" height="240" fill="black" />
        <rect x="410" y="140" width="240" height="240" fill="black" />
      </mask>
      <filter id="wall-shadow">
        <feDropShadow dx="0" dy="4" stdDeviation="4" floodOpacity="0.1" />
      </filter>
    </defs>
    
    {/* Solid Wall (Warm Taupe/Grey) */}
    <rect width="800" height="400" fill="#e5e7eb" mask="url(#window-mask)" />
    
    {/* Ceiling Depth Lines */}
    <g stroke="#9ca3af" strokeWidth="1" opacity="0.4">
      <line x1="0" y1="0" x2="150" y2="100" />
      <line x1="800" y1="0" x2="650" y2="100" />
    </g>

    {/* Window Frames (Dark Grey) */}
    <g stroke="#374151" strokeWidth="10" fill="none">
      <rect x="150" y="140" width="240" height="240" rx="2" />
      <rect x="410" y="140" width="240" height="240" rx="2" />
      {/* Cross frames */}
      <line x1="270" y1="140" x2="270" y2="380" strokeWidth="4" />
      <line x1="150" y1="260" x2="390" y2="260" strokeWidth="4" />
      <line x1="530" y1="140" x2="530" y2="380" strokeWidth="4" />
      <line x1="410" y1="260" x2="650" y2="260" strokeWidth="4" />
    </g>

    {/* Drapes (Dark Green Velvet) */}
    <g>
      <path d="M0 0 C60 0 100 20 100 100 L100 400 L0 400 Z" fill="#064e3b" />
      <path d="M800 0 C740 0 700 20 700 100 L700 400 L800 400 Z" fill="#064e3b" />
    </g>
  </svg>
);

const ReferenceCouchSVG = () => (
  <svg viewBox="0 0 500 300" className="w-full h-full pointer-events-none">
    <defs>
      <filter id="sofa-shadow">
        <feDropShadow dx="0" dy="15" stdDeviation="8" floodOpacity="0.4" />
      </filter>
      <filter id="cushion-shadow">
        <feDropShadow dx="0" dy="4" stdDeviation="4" floodOpacity="0.3" />
      </filter>
      <pattern id="plaid-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
        <rect width="40" height="40" fill="#991b1b" />
        <rect width="40" height="10" y="15" fill="#7f1d1d" opacity="0.6" />
        <rect width="10" height="40" x="15" fill="#7f1d1d" opacity="0.6" />
        <rect width="40" height="2" y="19" fill="#fef08a" opacity="0.4" />
        <rect width="2" height="40" x="19" fill="#fef08a" opacity="0.4" />
      </pattern>
      <linearGradient id="sofa-grad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#0f766e" />
        <stop offset="100%" stopColor="#0f172a" />
      </linearGradient>
      <linearGradient id="cushion-grad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#14b8a6" />
        <stop offset="100%" stopColor="#0f766e" />
      </linearGradient>
      <linearGradient id="armrest-grad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#0f766e" />
        <stop offset="50%" stopColor="#14b8a6" />
        <stop offset="100%" stopColor="#0f766e" />
      </linearGradient>
    </defs>
    
    {/* Floor Shadow */}
    <ellipse cx="250" cy="260" rx="230" ry="25" fill="rgba(0,0,0,0.25)" />

    {/* Sofa Body (Plush Emerald Velvet) */}
    <g filter="url(#sofa-shadow)">
      {/* Backrest */}
      <path d="M30 100 Q30 50 80 50 L420 50 Q470 50 470 100 L470 230 L30 230 Z" fill="url(#sofa-grad)" />
      {/* Backrest Tufting (Buttons) */}
      {[100, 170, 250, 330, 400].map((cx, i) => (
        <g key={i}>
          <circle cx={cx} cy="90" r="4" fill="#042f2e" />
          <circle cx={cx} cy="130" r="4" fill="#042f2e" />
          <path d={`M${cx-20} 90 Q${cx} 110 ${cx+20} 90`} fill="none" stroke="#042f2e" strokeWidth="1" opacity="0.3" />
        </g>
      ))}
      {/* Left Armrest */}
      <rect x="10" y="130" width="70" height="110" rx="35" fill="url(#armrest-grad)" />
      <ellipse cx="45" cy="130" rx="35" ry="15" fill="#14b8a6" />
      {/* Right Armrest */}
      <rect x="420" y="130" width="70" height="110" rx="35" fill="url(#armrest-grad)" />
      <ellipse cx="455" cy="130" rx="35" ry="15" fill="#14b8a6" />
      {/* Seat Cushions */}
      <rect x="80" y="170" width="165" height="60" rx="15" fill="url(#cushion-grad)" filter="url(#cushion-shadow)" />
      <rect x="255" y="170" width="165" height="60" rx="15" fill="url(#cushion-grad)" filter="url(#cushion-shadow)" />
      {/* Sofa Base/Legs */}
      <rect x="40" y="230" width="420" height="15" fill="#042f2e" />
      <rect x="50" y="245" width="10" height="15" fill="#78350f" />
      <rect x="440" y="245" width="10" height="15" fill="#78350f" />
    </g>

    {/* Throw Pillows */}
    <g filter="url(#cushion-shadow)">
      <path d="M80 130 Q100 110 120 130 Q140 150 120 170 Q100 190 80 170 Q60 150 80 130 Z" fill="#fbbf24" />
      <path d="M420 130 Q440 110 460 130 Q480 150 460 170 Q440 190 420 170 Q400 150 420 130 Z" fill="#fbbf24" />
    </g>

    {/* Patterned Plaid Blanket with Folds */}
    <g filter="url(#cushion-shadow)">
      <path d="M280 110 Q350 100 420 120 L445 220 Q350 250 260 220 Z" fill="url(#plaid-pattern)" />
      <path d="M280 110 Q350 100 420 120 L445 220 Q350 250 260 220 Z" fill="black" opacity="0.15" />
      {/* Folds */}
      <path d="M320 115 Q340 160 310 225" fill="none" stroke="black" strokeWidth="4" opacity="0.3" />
      <path d="M380 115 Q390 160 360 230" fill="none" stroke="black" strokeWidth="4" opacity="0.3" />
    </g>

    {/* The Star: High-Fidelity Ginger & White Cat */}
    <g transform="translate(140, 0) scale(1.2)" style={{ pointerEvents: 'auto' }}>
      <DetailedCatSVG width="150" height="150" />
    </g>
  </svg>
);

const ReferenceTableSVG = () => (
  <svg viewBox="0 0 400 200" className="w-full h-full">
    <defs>
      <linearGradient id="wood-grain" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#78350f" />
        <stop offset="20%" stopColor="#92400e" />
        <stop offset="40%" stopColor="#78350f" />
        <stop offset="60%" stopColor="#b45309" />
        <stop offset="80%" stopColor="#92400e" />
        <stop offset="100%" stopColor="#78350f" />
      </linearGradient>
      <linearGradient id="leg-grad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#1c1917" />
        <stop offset="50%" stopColor="#44403c" />
        <stop offset="100%" stopColor="#1c1917" />
      </linearGradient>
      <filter id="table-shadow">
        <feDropShadow dx="0" dy="8" stdDeviation="5" floodOpacity="0.4" />
      </filter>
      <filter id="item-shadow">
        <feDropShadow dx="2" dy="4" stdDeviation="2" floodOpacity="0.3" />
      </filter>
    </defs>
    
    {/* Floor Shadow */}
    <ellipse cx="200" cy="180" rx="190" ry="18" fill="rgba(0,0,0,0.25)" />

    {/* Rustic Wooden Table */}
    <g filter="url(#table-shadow)">
      {/* Metal Legs */}
      <rect x="60" y="50" width="12" height="130" fill="url(#leg-grad)" />
      <rect x="328" y="50" width="12" height="130" fill="url(#leg-grad)" />
      {/* Tabletop */}
      <rect x="20" y="25" width="360" height="30" rx="6" fill="url(#wood-grain)" />
      {/* Wood Grain Detail */}
      <path d="M30 35 Q200 30 370 35" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
      <path d="M40 45 Q200 40 360 45" fill="none" stroke="rgba(0,0,0,0.3)" strokeWidth="1.5" />
      <path d="M50 30 Q150 40 250 30" fill="none" stroke="#451a03" strokeWidth="1" opacity="0.5" />
    </g>

    {/* Books */}
    <g transform="translate(60, -15)" filter="url(#item-shadow)">
      <rect width="80" height="45" rx="3" fill="#1e40af" /> {/* Blue book */}
      <rect x="3" y="5" width="74" height="6" fill="#f8fafc" opacity="0.8" />
      <rect x="5" y="45" width="70" height="40" rx="3" fill="#991b1b" transform="translate(15, -10)" /> {/* Red book */}
      <rect x="23" y="40" width="64" height="6" fill="#f8fafc" opacity="0.8" />
    </g>

    {/* Birthday Cupcake */}
    <g transform="translate(180, -15)" filter="url(#item-shadow)">
      {/* Plate */}
      <ellipse cx="25" cy="40" rx="30" ry="8" fill="#f1f5f9" />
      <ellipse cx="25" cy="40" rx="20" ry="5" fill="#e2e8f0" />
      {/* Cupcake Base */}
      <path d="M10 20 L15 38 L35 38 L40 20 Z" fill="#d97706" />
      <path d="M15 20 L18 38 M20 20 L22 38 M25 20 L25 38 M30 20 L28 38 M35 20 L32 38" stroke="#b45309" strokeWidth="1" />
      {/* Frosting */}
      <path d="M5 22 Q25 5 45 22 Q35 30 25 30 Q15 30 5 22 Z" fill="#ec4899" />
      <path d="M10 15 Q25 -5 40 15 Q25 25 10 15 Z" fill="#f472b6" />
      {/* Sprinkles */}
      <line x1="15" y1="12" x2="18" y2="14" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="25" y1="8" x2="28" y2="7" stroke="#fef08a" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="35" y1="15" x2="32" y2="16" stroke="#60a5fa" strokeWidth="1.5" strokeLinecap="round" />
      {/* Candle */}
      <rect x="23" y="-5" width="4" height="15" fill="#fef08a" stroke="#ca8a04" strokeWidth="0.5" />
      <path d="M23 0 L27 5" stroke="#ca8a04" strokeWidth="0.5" />
      <path d="M23 5 L27 10" stroke="#ca8a04" strokeWidth="0.5" />
      {/* Flame */}
      <path d="M25 -15 Q28 -5 25 -5 Q22 -5 25 -15 Z" fill="#f97316" className="animate-pulse" />
      <path d="M25 -12 Q26 -7 25 -7 Q24 -7 25 -12 Z" fill="#fef08a" />
    </g>

    {/* Ceramic Mug */}
    <g transform="translate(280, -15)" filter="url(#item-shadow)">
      {/* Handle */}
      <path d="M28 15 Q40 15 40 28 Q40 40 28 40" fill="none" stroke="#cbd5e1" strokeWidth="5" strokeLinecap="round" />
      {/* Body */}
      <rect width="35" height="45" rx="6" fill="#f8fafc" />
      <ellipse cx="17.5" cy="5" rx="17.5" ry="4" fill="#e2e8f0" />
      <ellipse cx="17.5" cy="5" rx="14" ry="2" fill="#3f2c22" /> {/* Coffee inside */}
      {/* Steam */}
      <g opacity="0.5">
        <path d="M10 0 Q15 -10 10 -20 T15 -30" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" className="animate-pulse" />
        <path d="M25 0 Q30 -10 25 -20 T30 -30" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" className="animate-pulse" style={{ animationDelay: "0.5s" }} />
      </g>
    </g>
  </svg>
);

const WindowViewSVG = () => (
  <svg viewBox="0 0 400 300" className="w-full h-full">
    {/* Sky */}
    <rect width="400" height="300" fill="#bae6fd" />
    {/* Forest in distance */}
    <g transform="translate(0, 150)">
      {[...Array(20)].map((_, i) => (
        <path key={i} d={`M${i * 20} 50 L${i * 20 + 10} 0 L${i * 20 + 20} 50 Z`} fill="#065f46" />
      ))}
    </g>
    {/* Street */}
    <rect y="200" width="400" height="100" fill="#4a5568" />
    <rect y="210" width="400" height="5" fill="#718096" />
    {/* Window Frame */}
    <rect x="0" y="0" width="400" height="300" fill="none" stroke="#2d3748" strokeWidth="20" />
    <rect x="190" y="0" width="20" height="300" fill="#2d3748" />
    <rect x="0" y="140" width="400" height="20" fill="#2d3748" />
  </svg>
);

const CouchSVG = () => (
  <svg viewBox="0 0 300 150" className="w-full h-full">
    {/* Couch Body */}
    <path d="M20 100 Q20 60 40 60 L260 60 Q280 60 280 100 L280 140 L20 140 Z" fill="#2c5282" />
    <rect x="40" y="90" width="220" height="40" rx="10" fill="#2b6cb0" />
    {/* Backrest Cushions */}
    <rect x="50" y="50" width="100" height="50" rx="5" fill="#2a4365" />
    <rect x="150" y="50" width="100" height="50" rx="5" fill="#2a4365" />
    {/* Sleeping Cat */}
    <g transform="translate(180, 80) scale(0.5)">
      <ellipse cx="50" cy="50" rx="30" ry="15" fill="#ed8936" />
      <circle cx="75" cy="40" r="12" fill="#ed8936" />
      <path d="M70 30 L72 20 L78 28 Z" fill="#ed8936" />
      <path d="M80 30 L85 20 L82 28 Z" fill="#ed8936" />
      <path d="M72 42 L78 42" stroke="#2d3748" strokeWidth="1" /> {/* Closed eyes */}
      <path d="M25 55 Q10 55 15 40" fill="none" stroke="#ed8936" strokeWidth="6" strokeLinecap="round" />
    </g>
  </svg>
);

const TableSVG = () => (
  <svg viewBox="0 0 150 100" className="w-full h-full">
    {/* Table Top */}
    <ellipse cx="75" cy="40" rx="60" ry="15" fill="#744210" />
    {/* Legs */}
    <rect x="40" y="40" width="5" height="50" fill="#543610" />
    <rect x="105" y="40" width="5" height="50" fill="#543610" />
    {/* Coffee Mug */}
    <g transform="translate(80, 25) scale(0.3)">
      <rect x="0" y="0" width="30" height="40" rx="5" fill="#e2e8f0" />
      <path d="M30 10 Q45 10 45 25 Q45 40 30 40" fill="none" stroke="#e2e8f0" strokeWidth="5" />
    </g>
  </svg>
);

const ArmchairSVG = () => (
  <svg viewBox="0 0 200 200" className="w-full h-full">
    <path d="M40 160 Q40 120 60 100 Q40 80 40 40 Q100 20 160 40 Q160 80 140 100 Q160 120 160 160 Z" fill="#742a2a" />
    <path d="M60 100 L140 100 L140 160 L60 160 Z" fill="#9b2c2c" />
  </svg>
);

const DrapesSVG = () => (
  <svg viewBox="0 0 200 400" className="w-full h-full">
    <defs>
      <linearGradient id="drape-grad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#064e3b" />
        <stop offset="25%" stopColor="#065f46" />
        <stop offset="50%" stopColor="#047857" />
        <stop offset="75%" stopColor="#065f46" />
        <stop offset="100%" stopColor="#064e3b" />
      </linearGradient>
    </defs>
    {/* Left Drape */}
    <path d="M0 0 C20 0 40 10 40 50 L40 400 L0 400 Z" fill="url(#drape-grad)" />
    <path d="M10 0 C25 0 35 10 35 50 L35 400 L10 400 Z" fill="rgba(0,0,0,0.2)" />
    {/* Right Drape */}
    <path d="M200 0 C180 0 160 10 160 50 L160 400 L200 400 Z" fill="url(#drape-grad)" />
    <path d="M190 0 C175 0 165 10 165 50 L165 400 L190 400 Z" fill="rgba(0,0,0,0.2)" />
  </svg>
);

const WomanReadingSVG = () => (
  <svg viewBox="0 0 200 200" className="w-full h-full">
    {/* Armchair (Velvet) */}
    <path d="M40 160 Q40 120 60 100 Q40 80 40 40 Q100 20 160 40 Q160 80 140 100 Q160 120 160 160 Z" fill="#742a2a" />
    <path d="M60 100 L140 100 L140 160 L60 160 Z" fill="#9b2c2c" />
    {/* Woman */}
    <g transform="translate(70, 60)">
      {/* Body */}
      <path d="M30 80 Q10 80 10 40 Q10 10 30 10 Q50 10 50 40 Q50 80 30 80" fill="#2d3748" />
      {/* Head */}
      <circle cx="30" cy="0" r="12" fill="#fbd38d" />
      {/* Hair */}
      <path d="M18 -5 Q18 -20 30 -20 Q42 -20 42 -5 L42 10 Q30 5 18 10 Z" fill="#4a5568" />
      {/* Book */}
      <path d="M40 40 L60 35 L60 55 L40 60 Z" fill="white" stroke="#cbd5e0" />
      <path d="M40 40 L20 35 L20 55 L40 60 Z" fill="white" stroke="#cbd5e0" />
    </g>
  </svg>
);

const DetailedCatSVG = ({ width = 200, height = 200, x = 0, y = 0 }: { width?: number | string, height?: number | string, x?: number | string, y?: number | string }) => {
  const [isMeowing, setIsMeowing] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleMeow = (e: any) => {
    e.stopPropagation();
    if (!audioRef.current) {
      audioRef.current = new Audio('https://assets.mixkit.co/active_storage/sfx/44/44-preview.mp3');
    }
    audioRef.current.currentTime = 0;
    audioRef.current.play().catch(e => console.log("Audio play failed:", e));
    
    setIsMeowing(true);
    setTimeout(() => setIsMeowing(false), 300);
  };

  return (
    <motion.svg 
      x={x}
      y={y}
      width={width}
      height={height}
      viewBox="0 0 200 200" 
      className="cursor-pointer drop-shadow-md pointer-events-auto"
      style={{ pointerEvents: 'auto' }}
      onClick={handleMeow}
      onPointerDown={handleMeow}
      animate={isMeowing ? { y: Number(y) - 20, scale: 1.05 } : { y: Number(y), scale: 1 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.95 }}
    >
      <defs>
      <linearGradient id="cat-body-grad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#e07a2e" />
        <stop offset="50%" stopColor="#f08c3a" />
        <stop offset="100%" stopColor="#d66b1c" />
      </linearGradient>
      <linearGradient id="cat-chest-grad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="100%" stopColor="#e2e8f0" />
      </linearGradient>
    </defs>

    {/* Tail with animation */}
    <g className="origin-[70px_170px] animate-[tailWag_4s_ease-in-out_infinite]">
      <path d="M 70 170 Q 40 170, 30 140 Q 20 110, 40 100" fill="none" stroke="#e07a2e" strokeWidth="12" strokeLinecap="round" />
      <path d="M 70 170 Q 40 170, 30 140 Q 20 110, 40 100" fill="none" stroke="#d66b1c" strokeWidth="4" strokeLinecap="round" opacity="0.4" />
      <circle cx="40" cy="100" r="6" fill="white" />
    </g>

    {/* Back Body / Haunches */}
    <path d="M 60 120 C 50 150, 55 185, 100 185 C 145 185, 150 150, 140 120 C 130 90, 70 90, 60 120 Z" fill="url(#cat-body-grad)" />
    
    {/* Body Stripes */}
    <path d="M 65 130 C 75 135, 80 140, 80 150" fill="none" stroke="#b35a1c" strokeWidth="3" strokeLinecap="round" opacity="0.4" />
    <path d="M 60 145 C 70 150, 75 155, 75 165" fill="none" stroke="#b35a1c" strokeWidth="3" strokeLinecap="round" opacity="0.4" />
    <path d="M 135 130 C 125 135, 120 140, 120 150" fill="none" stroke="#b35a1c" strokeWidth="3" strokeLinecap="round" opacity="0.4" />
    <path d="M 140 145 C 130 150, 125 155, 125 165" fill="none" stroke="#b35a1c" strokeWidth="3" strokeLinecap="round" opacity="0.4" />

    {/* Back paws */}
    <path d="M 65 180 C 65 190, 85 190, 85 180 Z" fill="#ffffff" />
    <path d="M 135 180 C 135 190, 115 190, 115 180 Z" fill="#ffffff" />

    {/* Front Legs */}
    <path d="M 85 120 L 85 180 C 85 190, 100 190, 100 180 L 100 120 Z" fill="#f08c3a" />
    <path d="M 115 120 L 115 180 C 115 190, 100 190, 100 180 L 100 120 Z" fill="#e07a2e" />
    
    {/* Front Leg Stripes */}
    <path d="M 85 140 L 95 145 M 85 150 L 95 155 M 85 160 L 95 165" stroke="#b35a1c" strokeWidth="2" strokeLinecap="round" opacity="0.4" />
    <path d="M 115 140 L 105 145 M 115 150 L 105 155 M 115 160 L 105 165" stroke="#b35a1c" strokeWidth="2" strokeLinecap="round" opacity="0.4" />

    {/* Front Paws (White) */}
    <path d="M 85 170 L 85 180 C 85 190, 100 190, 100 180 L 100 170 Z" fill="#ffffff" />
    <path d="M 115 170 L 115 180 C 115 190, 100 190, 100 180 L 100 170 Z" fill="#ffffff" />
    <path d="M 90 180 L 90 185 M 95 180 L 95 185" stroke="#cbd5e1" strokeWidth="1" strokeLinecap="round" />
    <path d="M 105 180 L 105 185 M 110 180 L 110 185" stroke="#cbd5e1" strokeWidth="1" strokeLinecap="round" />

    {/* Chest (White) */}
    <path d="M 75 90 C 65 110, 75 145, 100 145 C 125 145, 135 110, 125 90 Z" fill="url(#cat-chest-grad)" />

    {/* Head Base */}
    <circle cx="100" cy="75" r="28" fill="#f08c3a" />

    {/* Ears */}
    <path d="M 80 55 L 70 30 L 92 48 Z" fill="#f08c3a" />
    <path d="M 78 52 L 74 35 L 88 48 Z" fill="#fecdd3" />
    <path d="M 120 55 L 130 30 L 108 48 Z" fill="#f08c3a" />
    <path d="M 122 52 L 126 35 L 112 48 Z" fill="#fecdd3" />

    {/* White Muzzle and face blaze */}
    <path d="M 100 55 C 92 55, 92 75, 80 85 C 90 95, 110 95, 120 85 C 108 75, 108 55, 100 55 Z" fill="#ffffff" />
    
    {/* M Mark on forehead */}
    <path d="M 85 55 L 92 65 L 100 55 L 108 65 L 115 55" fill="none" stroke="#c76b20" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    
    {/* Cheek stripes */}
    <path d="M 72 70 L 82 75 M 72 78 L 82 80" stroke="#c76b20" strokeWidth="2" strokeLinecap="round" />
    <path d="M 128 70 L 118 75 M 128 78 L 118 80" stroke="#c76b20" strokeWidth="2" strokeLinecap="round" />

    {/* Eyes with blink animation */}
    <g className="origin-[100px_70px] animate-[catBlink_3s_ease-in-out_infinite]">
      {/* Left Eye */}
      <path d="M 85 70 Q 90 65 95 70 Q 90 75 85 70 Z" fill="#ffffff" />
      <circle cx="90" cy="70" r="3.5" fill="#a3e635" />
      <circle cx="90" cy="70" r="1.5" fill="#000000" />
      <circle cx="89" cy="69" r="0.8" fill="#ffffff" />
      <path d="M 83 70 Q 90 63 97 70" fill="none" stroke="#000000" strokeWidth="1" />
      {/* Right Eye */}
      <path d="M 105 70 Q 110 65 115 70 Q 110 75 105 70 Z" fill="#ffffff" />
      <circle cx="110" cy="70" r="3.5" fill="#a3e635" />
      <circle cx="110" cy="70" r="1.5" fill="#000000" />
      <circle cx="109" cy="69" r="0.8" fill="#ffffff" />
      <path d="M 103 70 Q 110 63 117 70" fill="none" stroke="#000000" strokeWidth="1" />
    </g>

    {/* Nose */}
    <path d="M 97 82 L 103 82 L 100 86 Z" fill="#fca5a5" />
    
    {/* Mouth */}
    <path d="M 100 86 L 100 90 M 100 90 Q 95 92 90 88 M 100 90 Q 105 92 110 88" fill="none" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" />

    {/* Whiskers */}
    <path d="M 85 85 L 55 80 M 85 88 L 50 88 M 85 91 L 60 98" stroke="#ffffff" strokeWidth="1" strokeLinecap="round" opacity="0.8" />
    <path d="M 115 85 L 145 80 M 115 88 L 150 88 M 115 91 L 140 98" stroke="#ffffff" strokeWidth="1" strokeLinecap="round" opacity="0.8" />
  </motion.svg>
);
};

const DetailedMonsteraSVG = () => (
  <svg viewBox="0 0 300 400" className="w-full h-full">
    <defs>
      <linearGradient id="monstera-leaf-grad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#15803d" />
        <stop offset="100%" stopColor="#064e3b" />
      </linearGradient>
      <linearGradient id="pot-grad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#f8fafc" />
        <stop offset="50%" stopColor="#cbd5e1" />
        <stop offset="100%" stopColor="#94a3b8" />
      </linearGradient>
      <filter id="pot-shadow">
        <feDropShadow dx="0" dy="10" stdDeviation="5" floodOpacity="0.3" />
      </filter>
    </defs>
    
    {/* Floor Shadow */}
    <ellipse cx="150" cy="380" rx="70" ry="12" fill="rgba(0,0,0,0.25)" />

    {/* Ceramic Pot */}
    <g filter="url(#pot-shadow)">
      <path d="M90 280 L210 280 L190 380 L110 380 Z" fill="url(#pot-grad)" />
      <rect x="80" y="260" width="140" height="20" rx="4" fill="url(#pot-grad)" />
      {/* Pot Geometric Pattern */}
      <path d="M110 300 L150 340 L190 300" fill="none" stroke="#64748b" strokeWidth="2" opacity="0.5" />
      <path d="M115 320 L150 360 L185 320" fill="none" stroke="#64748b" strokeWidth="2" opacity="0.5" />
    </g>
    
    {/* Stems */}
    <g stroke="#14532d" strokeWidth="5" fill="none" strokeLinecap="round">
      <path d="M150 280 Q140 180 80 120" />
      <path d="M150 280 Q170 190 240 140" />
      <path d="M150 280 Q130 220 60 200" />
      <path d="M150 280 Q180 230 250 220" />
      <path d="M150 280 Q150 150 160 80" />
    </g>

    {/* High-Fidelity Monstera Leaves with Fenestrations */}
    <g fill="url(#monstera-leaf-grad)">
      {/* Leaf 1 (Top Left) */}
      <g transform="translate(80, 120) rotate(-40)">
        <path d="M0 0 C-40 20 -60 60 -40 100 C-20 130 20 130 40 100 C60 60 40 20 0 0 Z" />
        {/* Cuts */}
        <path d="M-40 60 C-20 60 -10 50 0 50 C-10 70 -20 80 -40 80 Z" fill="#e5e7eb" opacity="0" />
        <path d="M-45 60 Q-20 60 0 40 Q-20 80 -35 90 Z" fill="#e5e7eb" style={{ mixBlendMode: 'destination-out' }} />
        <path d="M45 60 Q20 60 0 40 Q20 80 35 90 Z" fill="#e5e7eb" style={{ mixBlendMode: 'destination-out' }} />
        <path d="M-30 30 Q-10 30 0 20 Q-10 40 -20 45 Z" fill="#e5e7eb" style={{ mixBlendMode: 'destination-out' }} />
        <path d="M30 30 Q10 30 0 20 Q10 40 20 45 Z" fill="#e5e7eb" style={{ mixBlendMode: 'destination-out' }} />
        {/* Vein */}
        <path d="M0 0 L0 110" stroke="#14532d" strokeWidth="2" fill="none" />
      </g>

      {/* Leaf 2 (Top Right) */}
      <g transform="translate(240, 140) rotate(30) scale(0.9)">
        <path d="M0 0 C-40 20 -60 60 -40 100 C-20 130 20 130 40 100 C60 60 40 20 0 0 Z" />
        <path d="M-45 60 Q-20 60 0 40 Q-20 80 -35 90 Z" fill="#e5e7eb" style={{ mixBlendMode: 'destination-out' }} />
        <path d="M45 60 Q20 60 0 40 Q20 80 35 90 Z" fill="#e5e7eb" style={{ mixBlendMode: 'destination-out' }} />
        <path d="M30 30 Q10 30 0 20 Q10 40 20 45 Z" fill="#e5e7eb" style={{ mixBlendMode: 'destination-out' }} />
        <path d="M0 0 L0 110" stroke="#14532d" strokeWidth="2" fill="none" />
      </g>

      {/* Leaf 3 (Bottom Left) */}
      <g transform="translate(60, 200) rotate(-70) scale(0.8)">
        <path d="M0 0 C-40 20 -60 60 -40 100 C-20 130 20 130 40 100 C60 60 40 20 0 0 Z" />
        <path d="M-45 60 Q-20 60 0 40 Q-20 80 -35 90 Z" fill="#e5e7eb" style={{ mixBlendMode: 'destination-out' }} />
        <path d="M45 60 Q20 60 0 40 Q20 80 35 90 Z" fill="#e5e7eb" style={{ mixBlendMode: 'destination-out' }} />
        <path d="M0 0 L0 110" stroke="#14532d" strokeWidth="2" fill="none" />
      </g>

      {/* Leaf 4 (Bottom Right) */}
      <g transform="translate(250, 220) rotate(60) scale(0.8)">
        <path d="M0 0 C-40 20 -60 60 -40 100 C-20 130 20 130 40 100 C60 60 40 20 0 0 Z" />
        <path d="M-45 60 Q-20 60 0 40 Q-20 80 -35 90 Z" fill="#e5e7eb" style={{ mixBlendMode: 'destination-out' }} />
        <path d="M45 60 Q20 60 0 40 Q20 80 35 90 Z" fill="#e5e7eb" style={{ mixBlendMode: 'destination-out' }} />
        <path d="M0 0 L0 110" stroke="#14532d" strokeWidth="2" fill="none" />
      </g>

      {/* Leaf 5 (Top Center) */}
      <g transform="translate(160, 80) rotate(-5) scale(1.1)">
        <path d="M0 0 C-40 20 -60 60 -40 100 C-20 130 20 130 40 100 C60 60 40 20 0 0 Z" />
        <path d="M-45 60 Q-20 60 0 40 Q-20 80 -35 90 Z" fill="#e5e7eb" style={{ mixBlendMode: 'destination-out' }} />
        <path d="M45 60 Q20 60 0 40 Q20 80 35 90 Z" fill="#e5e7eb" style={{ mixBlendMode: 'destination-out' }} />
        <path d="M-30 30 Q-10 30 0 20 Q-10 40 -20 45 Z" fill="#e5e7eb" style={{ mixBlendMode: 'destination-out' }} />
        <path d="M30 30 Q10 30 0 20 Q10 40 20 45 Z" fill="#e5e7eb" style={{ mixBlendMode: 'destination-out' }} />
        <path d="M0 0 L0 110" stroke="#14532d" strokeWidth="2" fill="none" />
      </g>
    </g>
  </svg>
);

const UltraDetailedAirplaneSVG = () => (
  <svg viewBox="0 0 400 200" className="w-full h-full">
    <defs>
      <linearGradient id="plane-body-grad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="50%" stopColor="#f8fafc" />
        <stop offset="100%" stopColor="#cbd5e0" />
      </linearGradient>
      <linearGradient id="engine-grad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#475569" />
        <stop offset="100%" stopColor="#1e293b" />
      </linearGradient>
      <filter id="glow">
        <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
        <feMerge>
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
    
    {/* Rear Wing (Horizontal Stabilizer) - Far Side */}
    <path d="M320 85 L360 70 L375 70 L360 85 Z" fill="#94a3b8" />

    {/* Tail Fin (Vertical Stabilizer) */}
    <path d="M330 75 L370 20 L395 20 L370 75 Z" fill="#1e40af" />
    <path d="M370 20 L395 20 L395 35 L370 35 Z" fill="#3b82f6" opacity="0.8" />
    
    {/* Main Wing - Far Side */}
    <path d="M180 70 L240 20 L280 20 L230 70 Z" fill="#94a3b8" />
    
    {/* Fuselage (Body) - Pointing Left */}
    <path d="M40 90 C10 90 10 70 40 70 L340 60 C370 60 380 75 340 95 L40 90" fill="url(#plane-body-grad)" />
    
    {/* Windows with reflection */}
    <g>
      {[...Array(10)].map((_, i) => (
        <rect key={i} x={100 + i * 22} y={72} width="10" height="7" rx="2" fill="#0f172a" />
      ))}
      {[...Array(10)].map((_, i) => (
        <rect key={i} x={102 + i * 22} y={73} width="4" height="2" rx="1" fill="#38bdf8" opacity="0.4" />
      ))}
    </g>

    {/* Cockpit Window */}
    <path d="M45 72 L75 72 L70 82 L50 82 Z" fill="#1e293b" />
    <path d="M48 74 L55 74 L53 78 L49 78 Z" fill="#38bdf8" opacity="0.5" />

    {/* Main Wing - Near Side */}
    <path d="M170 85 L220 140 L270 140 L230 85 Z" fill="#cbd5e0" />
    <path d="M220 140 L270 140 L265 135 L225 135 Z" fill="#94a3b8" />

    {/* Engines */}
    <g transform="translate(190, 110)">
      <rect width="45" height="22" rx="11" fill="url(#engine-grad)" />
      <circle cx="5" cy="11" r="8" fill="#0f172a" />
      <circle cx="5" cy="11" r="5" fill="#334155" />
      <rect x="35" y="4" width="15" height="14" rx="2" fill="#0f172a" />
    </g>
    
    <g transform="translate(200, 30)">
      <rect width="35" height="18" rx="9" fill="#475569" />
      <circle cx="4" cy="9" r="6" fill="#0f172a" />
    </g>

    {/* Navigation Lights */}
    <motion.circle 
      cx="220" cy="140" r="3" fill="#ef4444" 
      animate={{ opacity: [1, 0, 1] }} 
      transition={{ duration: 1, repeat: Infinity }}
      filter="url(#glow)"
    />
    <motion.circle 
      cx="240" cy="20" r="3" fill="#22c55e" 
      animate={{ opacity: [1, 0, 1] }} 
      transition={{ duration: 1.5, repeat: Infinity }}
      filter="url(#glow)"
    />
  </svg>
);

const DetailedMountainSVG = ({ color }: { color?: string }) => (
  <svg viewBox="0 0 400 200" preserveAspectRatio="none" className="w-full h-full">
    <defs>
      <linearGradient id="mtn-grad-front" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor={color || "#334155"} />
        <stop offset="100%" stopColor={color || "#0f172a"} />
      </linearGradient>
      <linearGradient id="mtn-grad-back" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor={color || "#64748b"} />
        <stop offset="100%" stopColor={color || "#1e293b"} />
      </linearGradient>
      <linearGradient id="mtn-grad-mid" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor={color || "#475569"} />
        <stop offset="100%" stopColor={color || "#0f172a"} />
      </linearGradient>
      <linearGradient id="snow-grad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor={color || "#ffffff"} />
        <stop offset="100%" stopColor={color || "#f1f5f9"} />
      </linearGradient>
      <linearGradient id="snow-grad-shadow" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor={color || "#e2e8f0"} />
        <stop offset="100%" stopColor={color || "#94a3b8"} />
      </linearGradient>
    </defs>
    
    {/* Back Peak */}
    <path d="M 20 200 L 120 80 L 140 110 L 180 40 L 220 90 L 250 60 L 380 200 Z" fill="url(#mtn-grad-back)" opacity="0.7" />
    <path d="M 180 40 L 160 70 L 175 85 L 185 75 L 195 90 L 205 70 L 220 90 L 250 60 L 240 80 L 255 95 L 265 85 Z" fill="url(#snow-grad)" opacity="0.8" />
    <path d="M 180 40 L 185 75 L 195 90 L 205 70 L 220 90 L 250 60 Z" fill="url(#snow-grad-shadow)" opacity="0.6" />

    {/* Mid Peak Left */}
    <path d="M -40 200 L 60 70 L 90 120 L 130 50 L 170 110 L 200 90 L 280 200 Z" fill="url(#mtn-grad-mid)" opacity="0.85" />
    <path d="M 130 50 L 110 80 L 125 95 L 135 85 L 145 100 L 155 80 L 170 110 L 200 90 L 190 110 L 205 125 L 215 115 Z" fill="url(#snow-grad)" opacity="0.9" />
    <path d="M 130 50 L 135 85 L 145 100 L 155 80 L 170 110 L 200 90 Z" fill="url(#snow-grad-shadow)" opacity="0.7" />

    {/* Mid Peak Right */}
    <path d="M 150 200 L 260 60 L 290 110 L 330 40 L 370 100 L 400 80 L 480 200 Z" fill="url(#mtn-grad-mid)" opacity="0.85" />
    <path d="M 330 40 L 310 70 L 325 85 L 335 75 L 345 90 L 355 70 L 370 100 L 400 80 L 390 100 L 405 115 L 415 105 Z" fill="url(#snow-grad)" opacity="0.9" />
    <path d="M 330 40 L 335 75 L 345 90 L 355 70 L 370 100 L 400 80 Z" fill="url(#snow-grad-shadow)" opacity="0.7" />

    {/* Front Peak */}
    <path d="M 40 200 L 140 90 L 170 130 L 220 20 L 270 110 L 310 70 L 420 200 Z" fill="url(#mtn-grad-front)" />
    <path d="M 220 20 L 190 70 L 210 90 L 225 75 L 240 100 L 255 70 L 270 110 L 310 70 L 295 100 L 315 120 L 330 100 Z" fill="url(#snow-grad)" />
    <path d="M 220 20 L 225 75 L 240 100 L 255 70 L 270 110 L 310 70 Z" fill="url(#snow-grad-shadow)" opacity="0.8" />
    
    {/* Shadow side of front peak */}
    <path d="M 220 20 L 220 200 L 420 200 L 310 70 L 270 110 Z" fill={color || "#0f172a"} opacity="0.2" />
    <path d="M 130 50 L 130 200 L 280 200 L 200 90 L 170 110 Z" fill={color || "#0f172a"} opacity="0.15" />
    <path d="M 330 40 L 330 200 L 480 200 L 400 80 L 370 100 Z" fill={color || "#0f172a"} opacity="0.15" />

    {/* Mountain Ridges */}
    <path d="M 170 130 L 150 170 L 180 190" fill="none" stroke={color || "#1e293b"} strokeWidth="2" opacity="0.4" />
    <path d="M 270 110 L 290 160 L 260 180" fill="none" stroke={color || "#1e293b"} strokeWidth="2" opacity="0.4" />
    <path d="M 140 90 L 120 140 L 150 160" fill="none" stroke={color || "#1e293b"} strokeWidth="2" opacity="0.3" />
    <path d="M 310 70 L 330 130 L 300 160" fill="none" stroke={color || "#1e293b"} strokeWidth="2" opacity="0.3" />

    {/* Base details (trees/rocks) */}
    <path d="M 40 200 L 80 160 L 110 180 L 150 140 L 180 170 L 220 130 L 260 160 L 300 140 L 340 170 L 380 150 L 420 200 Z" fill={color || "#020617"} opacity="0.4" />
    <path d="M 0 200 L 50 170 L 90 190 L 130 160 L 170 180 L 210 150 L 250 180 L 290 160 L 330 190 L 370 170 L 400 200 Z" fill={color || "#020617"} opacity="0.6" />
  </svg>
);

const DetailedYurtSVG = () => (
  <svg viewBox="0 0 120 100" className="w-full h-full overflow-visible">
    <defs>
      <linearGradient id="yurt-body" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="40%" stopColor="#f8fafc" />
        <stop offset="100%" stopColor="#cbd5e1" />
      </linearGradient>
      <linearGradient id="yurt-shadow" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="rgba(0,0,0,0.3)" />
        <stop offset="30%" stopColor="rgba(0,0,0,0.05)" />
        <stop offset="70%" stopColor="rgba(0,0,0,0)" />
        <stop offset="100%" stopColor="rgba(0,0,0,0.4)" />
      </linearGradient>
      <pattern id="shyrdak-pattern" x="0" y="0" width="12" height="12" patternUnits="userSpaceOnUse">
        <rect width="12" height="12" fill="#991b1b" />
        <path d="M6 0 L12 6 L6 12 L0 6 Z" fill="#b91c1c" />
        <path d="M6 2 L10 6 L6 10 L2 6 Z" fill="#fcd34d" />
        <circle cx="6" cy="6" r="1.5" fill="#1e3a8a" />
      </pattern>
      <pattern id="shyrdak-border" x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse">
        <rect width="8" height="8" fill="#1e3a8a" />
        <path d="M0 0 L4 4 L8 0 M0 8 L4 4 L8 8" stroke="#fcd34d" strokeWidth="1" fill="none" />
      </pattern>
    </defs>
    
    {/* Base Shadow */}
    <ellipse cx="60" cy="88" rx="58" ry="12" fill="rgba(0,0,0,0.25)" />
    
    {/* Main Structure (Dome & Walls) */}
    <path d="M8 82 Q4 50 22 28 Q60 8 98 28 Q116 50 112 82 Q60 94 8 82 Z" fill="url(#yurt-body)" />
    <path d="M8 82 Q4 50 22 28 Q60 8 98 28 Q116 50 112 82 Q60 94 8 82 Z" fill="url(#yurt-shadow)" />
    
    {/* Decorative Bands (Tergich) */}
    <path d="M9 68 Q60 78 111 68 L111 74 Q60 84 9 74 Z" fill="url(#shyrdak-pattern)" />
    <path d="M9 67 Q60 77 111 67 L111 68 Q60 78 9 68 Z" fill="#fcd34d" />
    <path d="M9 74 Q60 84 111 74 L111 75 Q60 85 9 75 Z" fill="#fcd34d" />

    <path d="M15 45 Q60 55 105 45 L106 49 Q60 59 14 49 Z" fill="url(#shyrdak-border)" />
    
    <path d="M20 32 Q60 40 100 32 L101 34 Q60 42 19 34 Z" fill="#b91c1c" />

    {/* Tension Ropes */}
    <path d="M22 28 L12 82 M35 18 L30 85 M85 18 L90 85 M98 28 L108 82" stroke="#78350f" strokeWidth="1" opacity="0.7" />
    <path d="M28 23 L18 83 M42 14 L38 86 M78 14 L82 86 M92 23 L102 83" stroke="#78350f" strokeWidth="0.5" opacity="0.5" />
    
    {/* Door Frame & Door */}
    <rect x="46" y="52" width="28" height="34" fill="#451a03" rx="2" />
    <rect x="48" y="54" width="24" height="32" fill="#b45309" rx="1" />
    
    {/* Door Details (Wood panels & handle) */}
    <rect x="50" y="56" width="9" height="28" fill="#92400e" rx="0.5" />
    <rect x="61" y="56" width="9" height="28" fill="#92400e" rx="0.5" />
    <line x1="60" y1="54" x2="60" y2="86" stroke="#451a03" strokeWidth="1" />
    
    {/* Door Ornaments */}
    <circle cx="54.5" cy="62" r="2" fill="#fcd34d" />
    <circle cx="65.5" cy="62" r="2" fill="#fcd34d" />
    <circle cx="54.5" cy="78" r="2" fill="#fcd34d" />
    <circle cx="65.5" cy="78" r="2" fill="#fcd34d" />
    
    {/* Handle */}
    <circle cx="58" cy="70" r="1.5" fill="#fcd34d" />
    <path d="M58 70 L58 74" stroke="#fcd34d" strokeWidth="1" />
    
    {/* Top Vent (Tunduk) */}
    <ellipse cx="60" cy="16" rx="16" ry="7" fill="#1e293b" />
    <ellipse cx="60" cy="15" rx="16" ry="7" fill="#e2e8f0" />
    <path d="M46 15 Q60 10 74 15 M50 12 Q60 17 70 12" stroke="#78350f" strokeWidth="1.5" fill="none" />
    <path d="M54 11 L66 19 M66 11 L54 19" stroke="#78350f" strokeWidth="1.5" />
    <ellipse cx="60" cy="15" rx="16" ry="7" fill="none" stroke="#b91c1c" strokeWidth="1" />

    {/* Smoke from Tunduk */}
    <g className="animate-[float_4s_ease-in-out_infinite] opacity-60">
      <circle cx="60" cy="5" r="4" fill="#cbd5e1" filter="blur(2px)" />
      <circle cx="65" cy="0" r="5" fill="#cbd5e1" filter="blur(3px)" />
      <circle cx="58" cy="-6" r="6" fill="#cbd5e1" filter="blur(4px)" />
    </g>

    {/* Grass around base */}
    <path d="M 5 82 Q 10 75 15 84 Q 20 78 25 85" fill="none" stroke="#15803d" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M 95 85 Q 100 78 105 84 Q 110 75 115 82" fill="none" stroke="#15803d" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const EagleSVG = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full opacity-60">
    <path d="M50 50 Q30 30 10 40 Q30 45 50 55 Q70 45 90 40 Q70 30 50 50 Z" fill="#1e293b" />
    <path d="M50 50 L45 55 L55 55 Z" fill="#0f172a" />
  </svg>
);

const HorseSVG = ({ delay = 0 }: { delay?: number }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
    <style>
      {`
        @keyframes graze {
          0%, 100% { transform: rotate(0deg) translateY(0); }
          20%, 80% { transform: rotate(25deg) translateY(12px) translateX(-5px); }
        }
        @keyframes tail-swish {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(-25deg); }
        }
        .horse-head-${delay} {
          transform-origin: 75px 45px;
          animation: graze 7s infinite ease-in-out;
          animation-delay: ${delay}s;
        }
        .horse-tail-${delay} {
          transform-origin: 25px 55px;
          animation: tail-swish 4s infinite ease-in-out;
          animation-delay: ${delay}s;
        }
      `}
    </style>
    {/* Legs */}
    <path d="M30 60 L25 90 L30 90 L35 60 Z" fill="#451a03" />
    <path d="M40 60 L35 90 L40 90 L45 60 Z" fill="#78350f" />
    <path d="M70 60 L65 90 L70 90 L75 60 Z" fill="#451a03" />
    <path d="M80 60 L75 90 L80 90 L85 60 Z" fill="#78350f" />
    {/* Body */}
    <ellipse cx="55" cy="55" rx="25" ry="15" fill="#78350f" />
    {/* Tail */}
    <path className={`horse-tail-${delay}`} d="M35 50 Q20 50 15 70 Q25 60 35 60 Z" fill="#451a03" />
    {/* Neck & Head */}
    <g className={`horse-head-${delay}`}>
      <path d="M70 50 Q85 30 85 20 Q95 20 95 30 Q90 40 80 55 Z" fill="#78350f" />
      {/* Mane */}
      <path d="M75 45 Q80 30 85 20 Q80 30 75 45 Z" fill="#451a03" stroke="#451a03" strokeWidth="2" />
    </g>
  </svg>
);

const CloudSVG = ({ color = "white", opacity = 0.8 }) => (
  <svg viewBox="0 0 100 60" className="w-full h-full" style={{ opacity }}>
    <defs>
      <filter id="cloud-shadow">
        <feDropShadow dx="0" dy="2" stdDeviation="2" floodOpacity="0.1" />
      </filter>
    </defs>
    <g filter="url(#cloud-shadow)">
      <circle cx="30" cy="35" r="15" fill={color} />
      <circle cx="50" cy="30" r="20" fill={color} />
      <circle cx="70" cy="35" r="15" fill={color} />
      <circle cx="40" cy="40" r="12" fill={color} />
      <circle cx="60" cy="40" r="12" fill={color} />
      <rect x="30" y="35" width="40" height="17" rx="8.5" fill={color} />
    </g>
  </svg>
);

// --- Main App Component ---

export default function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sloveniaRef = useRef<HTMLElement>(null);
  const skyRef = useRef<HTMLElement>(null);
  
  const { scrollY, scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const { scrollYProgress: sloveniaProgress } = useScroll({
    target: sloveniaRef,
    offset: ["start end", "end start"]
  });
  
  const { scrollYProgress: skyProgress } = useScroll({
    target: skyRef,
    offset: ["start end", "end start"]
  });
  
  const camperX = useTransform(sloveniaProgress, [0.2, 0.8], [-200, 1200]);

  // Independent Layer Scaling Math
  // Use absolute scrollY for the portal zoom so it's independent of total page height
  const foregroundScale = useTransform(scrollY, [0, 800], [1, 20]);
  const foregroundY = useTransform(scrollY, [0, 800], [0, 2000]);
  const foregroundX = useTransform(scrollY, [0, 800], [0, -2000]);
  
  // Wall/Window: scale(1 + (scrollY * 0.015))
  const wallScale = useTransform(scrollY, [0, 800], [1, 12]);
  
  // Sky: scale(1 + (scrollY * 0.001))
  const skyScale = useTransform(scrollY, [0, 800], [1, 2]);
  
  const skyColor = useTransform(scrollY, [0, 600], ["#bae6fd", "#0ea5e9"]);
  const skyGradientOpacity = useTransform(scrollY, [300, 600], [0, 1]);

  const roomOpacity = useTransform(scrollY, [300, 600], [1, 0]);
  
  const textScale = useTransform(scrollY, [0, 300], [1, 0.8]);
  const textOpacity = useTransform(scrollY, [100, 300], [1, 0]);

  // Section 2 starts at ~0.4 (200vh / 500vh total)
  const y2 = useTransform(scrollYProgress, [0.35, 0.45], [400, 0]); 
  // Section 3 starts at ~0.6
  const y3 = useTransform(scrollYProgress, [0.55, 0.65], [400, 0]);
  // Section 4 starts at ~0.8
  const y4 = useTransform(scrollYProgress, [0.75, 0.85], [400, 0]);

  const airplaneX = useTransform(skyProgress, [0.3, 0.6], ["120vw", "-120vw"]);
  const airplaneY = useTransform(skyProgress, [0.3, 0.6], [100, -50]);
  const airplaneRotate = useTransform(skyProgress, [0.3, 0.6], [-5, 5]);

  const mtnScale = useTransform(scrollYProgress, [0.6, 0.75], [0.9, 1.1]);
  const mtnBlur = useTransform(scrollYProgress, [0.6, 0.65, 0.75], [5, 0, 0]);

  // Countdown Logic
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const targetDate = new Date("June 6, 2026 12:00:00").getTime();
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;
      if (distance < 0) { clearInterval(timer); return; }
      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div 
      ref={containerRef} 
      style={{ backgroundColor: skyColor }}
      className="font-sans selection:bg-emerald-500 selection:text-white"
    >
      
      {/* SECTION 1: The Departure (Portal Zoom) */}
      <motion.section 
        style={{ backgroundColor: skyColor }}
        className="h-[150vh] relative z-10"
      >
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          
          {/* layer-sky (Z-index 1) */}
          <motion.div 
            style={{ backgroundColor: skyColor }}
            className="absolute inset-0 z-[1]"
          >
            {/* Sky blue overlay to match Section 2's start - NOT SCALED to prevent seams */}
            <motion.div 
              style={{ opacity: skyGradientOpacity }}
              className="absolute inset-0 bg-[#0ea5e9]"
            />
            
            {/* Scaled elements (Clouds) */}
            <motion.div style={{ scale: skyScale }} className="absolute inset-0">
              <motion.div 
                style={{ opacity: roomOpacity }}
                animate={{ x: [0, 20, 0] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute top-[20%] left-[10%] w-[clamp(100px,15vw,200px)] aspect-[2/1] opacity-60"
              >
                <CloudSVG />
              </motion.div>
              <motion.div 
                style={{ opacity: roomOpacity }}
                animate={{ x: [0, -30, 0] }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute top-[40%] left-[60%] w-[clamp(120px,20vw,250px)] aspect-[2/1] opacity-40"
              >
                <CloudSVG />
              </motion.div>
              <motion.div 
                style={{ opacity: roomOpacity }}
                animate={{ x: [0, 15, 0] }}
                transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
                className="absolute top-[10%] left-[80%] w-[clamp(80px,12vw,160px)] aspect-[2/1] opacity-50"
              >
                <CloudSVG />
              </motion.div>
              <motion.div 
                style={{ opacity: roomOpacity }}
                animate={{ x: [0, -25, 0] }}
                transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
                className="absolute top-[70%] left-[30%] w-[clamp(110px,18vw,220px)] aspect-[2/1] opacity-30"
              >
                <CloudSVG />
              </motion.div>
            </motion.div>
          </motion.div>

          {/* layer-wall (Z-index 2) - FULL-SCREEN ROOM ENCLOSURE */}
          <motion.div 
            style={{ 
              scale: wallScale, 
              opacity: roomOpacity,
              originX: 0.7375, // Center of the top-right pane of the right window
              originY: 0.5     // Center of the top-right pane of the right window
            }}
            className="absolute inset-0 z-[2]"
          >
            <svg className="w-full h-full" preserveAspectRatio="xMidYMid slice" viewBox="0 0 800 400">
              <defs>
                <mask id="window-mask-fullscreen">
                  <rect width="800" height="400" fill="white" />
                  {/* Two large window panes */}
                  <rect x="150" y="140" width="240" height="240" fill="black" />
                  <rect x="410" y="140" width="240" height="240" fill="black" />
                </mask>
                <linearGradient id="wall-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#f3f4f6" />
                  <stop offset="100%" stopColor="#e5e7eb" />
                </linearGradient>
                <linearGradient id="wainscot-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="100%" stopColor="#f9fafb" />
                </linearGradient>
                <linearGradient id="curtain-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#064e3b" />
                  <stop offset="20%" stopColor="#047857" />
                  <stop offset="40%" stopColor="#064e3b" />
                  <stop offset="60%" stopColor="#065f46" />
                  <stop offset="80%" stopColor="#064e3b" />
                  <stop offset="100%" stopColor="#022c22" />
                </linearGradient>
                <linearGradient id="window-frame-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="50%" stopColor="#f3f4f6" />
                  <stop offset="100%" stopColor="#d1d5db" />
                </linearGradient>
                <linearGradient id="glass-glare" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="rgba(255,255,255,0.4)" />
                  <stop offset="50%" stopColor="rgba(255,255,255,0.0)" />
                  <stop offset="100%" stopColor="rgba(255,255,255,0.1)" />
                </linearGradient>
              </defs>
              
              {/* Solid Wall with Gradient */}
              <rect width="800" height="400" fill="url(#wall-grad)" mask="url(#window-mask-fullscreen)" />
              
              {/* Wainscoting (Lower Wall Panel) */}
              <g mask="url(#window-mask-fullscreen)">
                <rect y="280" width="800" height="120" fill="url(#wainscot-grad)" />
                <rect y="280" width="800" height="5" fill="#d1d5db" />
                {/* Wainscoting Panels */}
                {[...Array(8)].map((_, i) => (
                  <rect key={i} x={i * 100 + 10} y="295" width="80" height="90" fill="none" stroke="#e5e7eb" strokeWidth="2" />
                ))}
              </g>
              
              {/* Perspective/Depth Lines for Walls and Roof */}
              <g stroke="#9ca3af" strokeWidth="1" opacity="0.3">
                <line x1="0" y1="0" x2="150" y2="100" />
                <line x1="800" y1="0" x2="650" y2="100" />
                <line x1="150" y1="100" x2="650" y2="100" />
              </g>

              {/* Shading for depth */}
              <path d="M0 0 L150 100 L150 400 L0 400 Z" fill="black" opacity="0.08" />
              <path d="M800 0 L650 100 L650 400 L800 400 Z" fill="black" opacity="0.08" />
              <path d="M0 0 L800 0 L650 100 L150 100 Z" fill="black" opacity="0.05" />

              {/* Glass Reflections */}
              <g fill="url(#glass-glare)">
                <rect x="150" y="140" width="115" height="115" />
                <rect x="275" y="140" width="115" height="115" />
                <rect x="150" y="265" width="115" height="115" />
                <rect x="275" y="265" width="115" height="115" />
                
                <rect x="410" y="140" width="115" height="115" />
                <rect x="535" y="140" width="115" height="115" />
                <rect x="410" y="265" width="115" height="115" />
                <rect x="535" y="265" width="115" height="115" />
              </g>

              {/* Window Frames */}
              <g stroke="url(#window-frame-grad)" strokeWidth="12" fill="none">
                {/* Outer Frames */}
                <rect x="150" y="140" width="240" height="240" rx="4" />
                <rect x="410" y="140" width="240" height="240" rx="4" />
                {/* Inner Frame Depth */}
                <g stroke="#9ca3af" strokeWidth="2" opacity="0.8">
                  <rect x="156" y="146" width="228" height="228" rx="2" />
                  <rect x="416" y="146" width="228" height="228" rx="2" />
                </g>
                {/* Mullions (Crossbars) */}
                <line x1="270" y1="140" x2="270" y2="380" strokeWidth="8" />
                <line x1="150" y1="260" x2="390" y2="260" strokeWidth="8" />
                <line x1="530" y1="140" x2="530" y2="380" strokeWidth="8" />
                <line x1="410" y1="260" x2="650" y2="260" strokeWidth="8" />
              </g>

              {/* Window Sills */}
              <g fill="url(#window-frame-grad)" stroke="#d1d5db" strokeWidth="1">
                <rect x="135" y="380" width="270" height="12" rx="3" />
                <rect x="395" y="380" width="270" height="12" rx="3" />
              </g>
              {/* Sill Shadows */}
              <g fill="black" opacity="0.15">
                <polygon points="135,392 145,405 395,405 405,392" />
                <polygon points="395,392 405,405 655,405 665,392" />
              </g>

              {/* Drapes with Realistic Folds */}
              <g>
                <path d="M0 0 C60 0 120 20 120 100 L110 400 L0 400 Z" fill="url(#curtain-grad)" />
                <path d="M800 0 C740 0 680 20 680 100 L690 400 L800 400 Z" fill="url(#curtain-grad)" />
                {/* Drape Shadows/Highlights */}
                <path d="M20 0 C50 20 80 50 80 100 L70 400 L50 400 L60 100 C60 50 30 20 20 0 Z" fill="#022c22" opacity="0.4" />
                <path d="M780 0 C750 20 720 50 720 100 L730 400 L750 400 L740 100 C740 50 770 20 780 0 Z" fill="#022c22" opacity="0.4" />
              </g>
            </svg>
          </motion.div>

          {/* layer-foreground (Z-index 3) - NOW GROUNDED FURNITURE LAYER */}
          <motion.div 
            style={{ 
              scale: foregroundScale, 
              opacity: roomOpacity,
              originX: 0.5,
              originY: 1 // Anchored to bottom
            }}
            className="absolute inset-0 z-[3] pointer-events-none flex items-end justify-center pb-[12vh]"
          >
            <div className="w-full max-w-[1400px] relative flex items-end justify-around px-[2%] md:px-[5%]">
              {/* Couch with Detailed Cat */}
              <div className="w-[45vw] md:w-[600px] aspect-[5/3] relative pointer-events-auto">
                <ReferenceCouchSVG />
              </div>
              {/* Coffee Table */}
              <div className="w-[30vw] md:w-[450px] aspect-[2/1] relative">
                <ReferenceTableSVG />
              </div>
              {/* Monstera Plant */}
              <div className="w-[15vw] md:w-[220px] aspect-[3/4] relative">
                <DetailedMonsteraSVG />
              </div>
            </div>
          </motion.div>

          {/* Floor (Static background for the room) */}
          <motion.div 
            style={{ 
              opacity: roomOpacity,
              backgroundImage: "repeating-linear-gradient(90deg, transparent, transparent 48px, rgba(0,0,0,0.1) 48px, rgba(0,0,0,0.1) 50px), linear-gradient(to bottom, #b45309, #78350f)"
            }}
            className="absolute bottom-0 left-0 w-full h-[15.5vh] z-[2]" 
          />

          {/* Typography */}
          <div className="z-40 absolute inset-0 flex flex-col items-center pt-[12vh] text-center pointer-events-none">
            <motion.div
              style={{ scale: textScale, opacity: textOpacity }}
              className="flex flex-col items-center w-full"
            >
              <h1 className="text-[clamp(1.5rem,6vw,4.5rem)] font-black mb-2 md:mb-4 tracking-tight leading-tight max-w-3xl px-4 uppercase text-black drop-shadow-md">
                WSZYSTKIEGO NAJLEPSZEGO PAPRYCZKO!!!
              </h1>
              <motion.p 
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="text-[clamp(0.8rem,3vw,1.25rem)] font-bold text-black max-w-xl px-4 md:px-6 uppercase tracking-widest drop-shadow-sm"
              >
                SCROLLUJ W DÓŁ KOCHANA
              </motion.p>
            </motion.div>
          </div>

        </div>
      </motion.section>

      {/* SECTION 2: The Sky Journey */}
      <section 
        ref={skyRef}
        className="parallax-section -mt-1 relative z-20"
        style={{ 
          background: "linear-gradient(to bottom, #0ea5e9 0%, #0ea5e9 25%, #7dd3fc 60%, #bae6fd 100%)"
        }}
      >
        <div className="absolute inset-0 overflow-hidden">
          {/* Multi-layered Clouds */}
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ x: -300 }}
              animate={{ x: "120vw" }}
              transition={{ 
                duration: 25 + i * 3, 
                repeat: Infinity, 
                ease: "linear",
                delay: i * 1.5
              }}
              className="absolute"
              style={{ 
                top: `${8 * i}%`, 
                width: `${150 + i * 20}px`,
                opacity: 0.4 + (i % 3) * 0.2,
                zIndex: i % 2 === 0 ? 5 : 15
              }}
            >
              <CloudSVG color={i % 2 === 0 ? "#f0f9ff" : "#ffffff"} />
            </motion.div>
          ))}
          
          {/* Birds */}
          <div className="absolute top-1/4 right-1/4 opacity-30">
            <svg width="100" height="50" viewBox="0 0 100 50">
              <path d="M10 20 Q20 10 30 20 M40 25 Q50 15 60 25 M70 20 Q80 10 90 20" fill="none" stroke="black" strokeWidth="2" />
            </svg>
          </div>
        </div>

        <motion.div 
          style={{ x: airplaneX, y: airplaneY, rotate: airplaneRotate }}
          className="absolute top-[30%] left-1/2 -translate-x-1/2 w-[clamp(300px,50vw,500px)] aspect-[2/1] z-10 drop-shadow-[0_30px_60px_rgba(0,0,0,0.4)]"
        >
          <UltraDetailedAirplaneSVG />
          {/* Flight Path (Trailing behind the plane which is now flying left) */}
          <div className="absolute left-full top-[40%] w-[1500px] h-1 border-t-2 border-dashed border-white/20 -translate-y-1/2" />
        </motion.div>

        <div className="absolute bottom-10 md:bottom-20 z-20 w-full px-4 flex justify-center text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="bg-black/30 backdrop-blur-md px-6 py-4 md:px-12 md:py-6 rounded-3xl md:rounded-full border border-white/20"
          >
            <p className="text-sm md:text-2xl font-black tracking-[0.1em] md:tracking-[0.2em] uppercase">WIEM JAK KOCHASZ PODRÓŻE, REALIZUJ TĄ PASJĘ</p>
          </motion.div>
        </div>
      </section>

      {/* SECTION 3: Destination Kyrgyzstan */}
      <section className="parallax-section bg-[#bae6fd]">
        {/* Sky Depth & Eagles */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#bae6fd] to-[#f0f9ff]">
          <motion.div 
            animate={{ x: [0, 200, 0], y: [0, -50, 0] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-[20%] left-[20%] w-[clamp(32px,8vw,64px)] aspect-square"
          >
            <EagleSVG />
          </motion.div>
          <motion.div 
            animate={{ x: [0, -150, 0], y: [0, 30, 0] }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute top-[15%] right-[30%] w-[clamp(24px,6vw,48px)] aspect-square"
          >
            <EagleSVG />
          </motion.div>
        </div>

        {/* Mountains Layer */}
        <motion.div 
          style={{ scale: mtnScale, filter: `blur(${mtnBlur}px)` }}
          className="absolute inset-0 flex items-end justify-center pb-20"
        >
          <div className="w-full h-[70vh] flex items-end relative px-4">
            <div className="w-1/2 h-full -mr-40 opacity-80"><DetailedMountainSVG /></div>
            <div className="w-2/3 h-[120%] z-10 drop-shadow-2xl"><DetailedMountainSVG /></div>
            <div className="w-1/2 h-full -ml-40 opacity-80"><DetailedMountainSVG /></div>
          </div>
        </motion.div>

        {/* Steppes & Yurts */}
        <div className="absolute bottom-0 w-full h-[30vh] bg-[#166534] z-20 overflow-hidden">
          {/* Realistic Rolling Hills Background */}
          <svg className="absolute top-0 left-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 1000 300">
            <path d="M0 50 Q 250 0 500 50 T 1000 50 L 1000 300 L 0 300 Z" fill="#14532d" />
            <path d="M0 100 Q 300 50 600 100 T 1000 80 L 1000 300 L 0 300 Z" fill="#166534" />
            <path d="M0 150 Q 400 100 700 150 T 1000 120 L 1000 300 L 0 300 Z" fill="#15803d" />
            
            {/* Grass Tufts */}
            <g fill="none" stroke="#14532d" strokeWidth="2" strokeLinecap="round">
              <path d="M 100 140 Q 95 125 90 120 M 100 140 Q 100 120 100 115 M 100 140 Q 105 125 110 120" />
              <path d="M 300 180 Q 295 165 290 160 M 300 180 Q 300 160 300 155 M 300 180 Q 305 165 310 160" />
              <path d="M 500 150 Q 495 135 490 130 M 500 150 Q 500 130 500 125 M 500 150 Q 505 135 510 130" />
              <path d="M 700 190 Q 695 175 690 170 M 700 190 Q 700 170 700 165 M 700 190 Q 705 175 710 170" />
              <path d="M 850 160 Q 845 145 840 140 M 850 160 Q 850 140 850 135 M 850 160 Q 855 145 860 140" />
            </g>
          </svg>
          
          <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-transparent to-[#14532d] -translate-y-full" />
          
          {/* Winding River */}
          <svg className="absolute top-0 left-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 1000 300">
            <defs>
              <style>
                {`
                  @keyframes flow-fast {
                    0% { stroke-dashoffset: 200; }
                    100% { stroke-dashoffset: 0; }
                  }
                  @keyframes flow-slow {
                    0% { stroke-dashoffset: 300; }
                    100% { stroke-dashoffset: 0; }
                  }
                  .river-flow-1 {
                    stroke-dasharray: 40 60;
                    animation: flow-fast 4s linear infinite;
                  }
                  .river-flow-2 {
                    stroke-dasharray: 60 80;
                    animation: flow-slow 6s linear infinite;
                  }
                  .river-flow-3 {
                    stroke-dasharray: 20 40;
                    animation: flow-fast 3s linear infinite;
                  }
                `}
              </style>
              <linearGradient id="river-grad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#0369a1" />
                <stop offset="50%" stopColor="#0ea5e9" />
                <stop offset="100%" stopColor="#0284c7" />
              </linearGradient>
            </defs>
            
            {/* Deep water base */}
            <path d="M -50 240 C 200 240, 300 180, 500 220 C 700 260, 850 200, 1050 230" fill="none" stroke="url(#river-grad)" strokeWidth="50" strokeLinecap="round" />
            {/* Shallow water */}
            <path d="M -50 240 C 200 240, 300 180, 500 220 C 700 260, 850 200, 1050 230" fill="none" stroke="#38bdf8" strokeWidth="25" strokeLinecap="round" opacity="0.8" />
            
            {/* Flow lines */}
            <path d="M -50 225 C 200 225, 300 165, 500 205 C 700 245, 850 185, 1050 215" fill="none" stroke="#bae6fd" strokeWidth="3" className="river-flow-1" opacity="0.6" />
            <path d="M -50 240 C 200 240, 300 180, 500 220 C 700 260, 850 200, 1050 230" fill="none" stroke="#e0f2fe" strokeWidth="5" className="river-flow-2" opacity="0.8" />
            <path d="M -50 255 C 200 255, 300 195, 500 235 C 700 275, 850 215, 1050 245" fill="none" stroke="#7dd3fc" strokeWidth="2" className="river-flow-3" opacity="0.5" />
          </svg>

          <div className="max-w-6xl mx-auto h-full flex items-start pt-6 md:pt-10 justify-around relative z-10">
            {[...Array(3)].map((_, i) => (
              <motion.div 
                key={i}
                initial={{ y: 100, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: i * 0.2, duration: 0.8 }}
                className="w-[clamp(100px,20vw,160px)] aspect-[5/4] relative group"
              >
                <DetailedYurtSVG />
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="bg-white px-2 py-1 rounded text-[10px] font-bold text-green-800">YURT {i+1}</div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Horses */}
          <div className="absolute bottom-10 left-[15%] w-[clamp(48px,12vw,96px)] aspect-square opacity-80 z-10">
            <HorseSVG delay={0} />
          </div>
          <div className="absolute bottom-16 left-[20%] w-[clamp(32px,8vw,64px)] aspect-square opacity-60 transform -scale-x-100 z-10">
            <HorseSVG delay={2} />
          </div>
          <div className="absolute bottom-8 right-[25%] w-[clamp(40px,10vw,80px)] aspect-square opacity-70 z-10">
            <HorseSVG delay={4} />
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="z-30 text-center px-4 md:px-6 mb-20 md:mb-40"
        >
          <div className="bg-black/40 backdrop-blur-md px-6 py-8 md:px-16 md:py-12 rounded-[2rem] md:rounded-[3rem] border border-white/20 inline-block shadow-2xl">
            <h2 className="text-3xl md:text-5xl lg:text-7xl font-black text-white mb-4 md:mb-6 drop-shadow-lg">
              NIEDŁUGO KIRGISTAN
            </h2>
            <p className="text-sm md:text-xl lg:text-2xl font-bold text-white/90 uppercase tracking-[0.1em] md:tracking-[0.3em] drop-shadow-md">
              Przez góry, stepy i jurty!
            </p>
          </div>
        </motion.div>
      </section>

      {/* SECTION 4: Slovenia Seaside Drive */}
      <section ref={sloveniaRef} className="parallax-section bg-gradient-to-b from-[#38bdf8] to-[#bae6fd] relative overflow-hidden">
        {/* Background SVG */}
        <div className="absolute inset-0 z-0">
          <svg viewBox="0 0 1000 400" className="w-full h-full object-cover" preserveAspectRatio="xMidYMid slice">
            <defs>
              <linearGradient id="sea-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#0891b2" />
                <stop offset="100%" stopColor="#1e3a8a" />
              </linearGradient>
              <linearGradient id="sun-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#fef08a" />
                <stop offset="100%" stopColor="#f59e0b" />
              </linearGradient>
            </defs>
            
            {/* Sun */}
            <circle cx="850" cy="80" r="40" fill="url(#sun-grad)" opacity="0.9" />
            <circle cx="850" cy="80" r="60" fill="#fef08a" opacity="0.2" />

            {/* Clouds */}
            <g fill="#ffffff" opacity="0.9">
              <path d="M 100 80 Q 120 60 140 80 Q 160 70 170 90 L 90 90 Q 80 70 100 80 Z" />
              <path d="M 400 120 Q 430 90 460 120 Q 490 100 510 130 L 380 130 Q 370 100 400 120 Z" />
              <path d="M 700 50 Q 720 30 740 50 Q 760 40 770 60 L 690 60 Q 680 40 700 50 Z" />
            </g>

            {/* Sea */}
            <rect x="0" y="180" width="1000" height="220" fill="url(#sea-grad)" />
            <path d="M 50 195 L 120 195 M 250 205 L 350 205 M 500 190 L 580 190 M 750 215 L 880 215 M 150 230 L 220 230 M 400 240 L 480 240 M 650 225 L 720 225 M 850 245 L 950 245" stroke="#7dd3fc" strokeWidth="2" strokeLinecap="round" opacity="0.4" />
            <path d="M 80 210 L 160 210 M 300 195 L 400 195 M 550 215 L 620 215 M 800 195 L 920 195" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" opacity="0.6" />

            {/* Coastline / Cliffs (Right Side) */}
            <path d="M 600 180 L 720 70 L 830 90 L 950 30 L 1000 50 L 1000 400 L 450 400 Q 550 250 600 180 Z" fill="#cbd5e1" />
            <path d="M 650 180 L 750 80 L 850 100 L 950 40 L 1000 60 L 1000 400 L 500 400 Q 600 250 650 180 Z" fill="#f8fafc" />
            <path d="M 700 180 L 780 100 L 850 120 L 950 60 L 1000 80 L 1000 400 L 550 400 Q 650 250 700 180 Z" fill="#e2e8f0" />
            
            {/* Cypress Trees */}
            <g fill="#064e3b">
              <path d="M 780 120 L 790 40 L 800 120 Z" />
              <path d="M 820 140 L 830 50 L 840 140 Z" />
              <path d="M 880 100 L 895 20 L 910 100 Z" />
              <path d="M 940 130 L 950 60 L 960 130 Z" />
              <path d="M 980 150 L 990 70 L 1000 150 Z" />
            </g>
            {/* Pine Shrubs */}
            <g fill="#14532d">
              <circle cx="750" cy="150" r="20" />
              <circle cx="770" cy="160" r="25" />
              <circle cx="850" cy="130" r="30" />
              <circle cx="920" cy="110" r="25" />
              <circle cx="970" cy="140" r="22" />
            </g>

            {/* Winding Coastal Road */}
            <path d="M 0 280 Q 300 280 600 320 T 1000 300 L 1000 400 L 0 400 Z" fill="#475569" />
            <path d="M 0 270 Q 300 270 600 310 T 1000 290 L 1000 400 L 0 400 Z" fill="#334155" opacity="0.5" />
            <path d="M 0 340 Q 300 340 600 360 T 1000 350" stroke="#cbd5e1" strokeWidth="6" strokeDasharray="30 20" fill="none" />
            <path d="M 0 285 Q 300 285 600 325 T 1000 305" stroke="#f8fafc" strokeWidth="2" fill="none" opacity="0.8" />
            <path d="M 0 395 Q 300 395 600 395 T 1000 395" stroke="#f8fafc" strokeWidth="2" fill="none" opacity="0.8" />
            
            {/* Camper Van */}
            <motion.g style={{ x: camperX, y: 180 }}>
              <g className="camper-anim">
                {/* Shadow */}
                <ellipse cx="180" cy="165" rx="140" ry="15" fill="#000000" opacity="0.5" />
                
                {/* Roof Rack & Surfboard */}
                <path d="M 80 15 Q 180 5 280 15 Q 290 20 280 25 Q 180 35 80 25 Q 70 20 80 15 Z" fill="#f59e0b" />
                <path d="M 80 20 Q 180 10 280 20" stroke="#d97706" strokeWidth="2" fill="none" />
                <path d="M 180 10 L 180 30" stroke="#d97706" strokeWidth="2" />
                <rect x="120" y="25" width="5" height="15" fill="#94a3b8" />
                <rect x="240" y="25" width="5" height="15" fill="#94a3b8" />
                <rect x="100" y="30" width="160" height="5" fill="#cbd5e1" />

                {/* Main Body Top (Cream) */}
                <path d="M 50 100 L 50 60 Q 50 40 80 40 L 280 40 Q 320 40 330 70 L 340 100 Z" fill="#fefce8" />
                
                {/* Main Body Bottom (Seafoam) */}
                <path d="M 40 100 L 340 100 L 340 140 Q 340 160 320 160 L 60 160 Q 40 160 40 140 Z" fill="#5eead4" />
                <path d="M 40 140 L 340 140 Q 340 160 320 160 L 60 160 Q 40 160 40 140 Z" fill="#14b8a6" opacity="0.3" /> {/* Bottom Shading */}
                
                {/* Chrome Trim */}
                <line x1="40" y1="100" x2="340" y2="100" stroke="#ffffff" strokeWidth="4" />
                <line x1="40" y1="102" x2="340" y2="102" stroke="#94a3b8" strokeWidth="1" opacity="0.5" />

                <path d="M 285 45 L 325 75 L 335 95 L 285 95 Z" fill="#38bdf8" opacity="0.6" />
                <rect x="140" y="50" width="60" height="40" rx="5" fill="#38bdf8" opacity="0.6" />
                <rect x="210" y="50" width="60" height="40" rx="5" fill="#38bdf8" opacity="0.6" />
                
                <rect x="60" y="50" width="70" height="40" rx="5" fill="#1e293b" />
                
                <g transform="translate(65, 55) scale(0.45)">
                  <circle cx="50" cy="50" r="28" fill="#f08c3a" />
                  <path d="M 30 30 L 20 5 L 42 23 Z" fill="#f08c3a" />
                  <path d="M 28 27 L 24 10 L 38 23 Z" fill="#fecdd3" />
                  <path d="M 70 30 L 80 5 L 58 23 Z" fill="#f08c3a" />
                  <path d="M 72 27 L 76 10 L 62 23 Z" fill="#fecdd3" />
                  <path d="M 50 30 C 42 30, 42 50, 30 60 C 40 70, 60 70, 70 60 C 58 50, 58 30, 50 30 Z" fill="#ffffff" />
                  <path d="M 35 30 L 42 40 L 50 30 L 58 40 L 65 30" fill="none" stroke="#c76b20" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  <g className="cat-eyes">
                    <ellipse cx="38" cy="45" rx="6" ry="8" fill="#0d9488" />
                    <ellipse cx="62" cy="45" rx="6" ry="8" fill="#0d9488" />
                    <circle cx="36" cy="43" r="2" fill="#ffffff" />
                    <circle cx="60" cy="43" r="2" fill="#ffffff" />
                    <ellipse cx="38" cy="45" rx="1.5" ry="4" fill="#000000" />
                    <ellipse cx="62" cy="45" rx="1.5" ry="4" fill="#000000" />
                  </g>
                  <path d="M 47 55 L 53 55 L 50 58 Z" fill="#f472b6" />
                </g>
                <path d="M 65 50 L 100 90 L 120 90 L 85 50 Z" fill="#ffffff" opacity="0.2" />

                <rect x="35" y="140" width="10" height="15" rx="3" fill="#ef4444" />
                <rect x="335" y="110" width="8" height="15" rx="3" fill="#fef08a" />
                <rect x="30" y="150" width="20" height="10" rx="2" fill="#94a3b8" />
                <rect x="330" y="150" width="20" height="10" rx="2" fill="#94a3b8" />
                <rect x="130" y="105" width="15" height="4" rx="2" fill="#cbd5e1" />
                <rect x="200" y="105" width="15" height="4" rx="2" fill="#cbd5e1" />

                <g transform="translate(100, 160)">
                  <g className="wheel-anim">
                    <circle cx="0" cy="0" r="25" fill="#1e293b" />
                    <circle cx="0" cy="0" r="15" fill="#e2e8f0" />
                    <circle cx="0" cy="0" r="5" fill="#94a3b8" />
                    <circle cx="10" cy="0" r="3" fill="#64748b" />
                    <circle cx="-10" cy="0" r="3" fill="#64748b" />
                    <circle cx="0" cy="10" r="3" fill="#64748b" />
                    <circle cx="0" cy="-10" r="3" fill="#64748b" />
                  </g>
                </g>
                <g transform="translate(280, 160)">
                  <g className="wheel-anim">
                    <circle cx="0" cy="0" r="25" fill="#1e293b" />
                    <circle cx="0" cy="0" r="15" fill="#e2e8f0" />
                    <circle cx="0" cy="0" r="5" fill="#94a3b8" />
                    <circle cx="10" cy="0" r="3" fill="#64748b" />
                    <circle cx="-10" cy="0" r="3" fill="#64748b" />
                    <circle cx="0" cy="10" r="3" fill="#64748b" />
                    <circle cx="0" cy="-10" r="3" fill="#64748b" />
                  </g>
                </g>
              </g>
            </motion.g>
          </svg>
        </div>
        
        {/* Typography */}
        <motion.div 
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="z-30 absolute top-[10%] md:top-[15%] w-full text-center px-4 md:px-6"
        >
          <h2 className="text-2xl md:text-4xl lg:text-6xl font-black text-black uppercase tracking-widest max-w-6xl mx-auto leading-tight">
            A potem... poczujemy morską bryzę na słoweńskim wybrzeżu.
          </h2>
        </motion.div>
      </section>

      {/* SECTION 5: The Finale */}
      <section className="parallax-section bg-gradient-to-b from-[#fb923c] via-[#7c3aed] to-[#0f172a]">
        {/* Silhouettes */}
        <div className="absolute bottom-0 w-full h-[50vh] flex items-end opacity-20 pointer-events-none">
          <div className="w-full h-full flex items-end">
            <div className="w-1/2 h-full"><DetailedMountainSVG color="#000000" /></div>
            <div className="w-1/2 h-[80%]"><DetailedMountainSVG color="#000000" /></div>
          </div>
        </div>

        <div className="z-10 w-full max-w-5xl px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-xl md:text-3xl lg:text-5xl font-bold mb-8 md:mb-12 leading-tight tracking-tight">
              JESTEŚ WSPANIAŁA, WRAŻLIWĄ OSOBĄ, KOCHAM TWOJE CIEPŁE SERDUSZKO, NIEDŁUGO LECIMY
            </h2>

            {/* Countdown Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12 md:mb-16">
              {[
                { label: "Dni", value: timeLeft.days },
                { label: "Godzin", value: timeLeft.hours },
                { label: "Minut", value: timeLeft.minutes },
                { label: "Sekund", value: timeLeft.seconds }
              ].map((item, idx) => (
                <div key={idx} className="glass-card p-4 md:p-8 flex flex-col items-center justify-center border-white/10">
                  <span className="text-3xl md:text-5xl lg:text-6xl font-black mb-1 md:mb-2">{item.value}</span>
                  <span className="text-xs md:text-sm uppercase tracking-[0.1em] md:tracking-[0.2em] opacity-60 font-black">{item.label}</span>
                </div>
              ))}
            </div>

            <footer className="flex flex-col items-center gap-6">
              <motion.div
                animate={{ scale: [1, 1.3, 1], filter: ["blur(0px)", "blur(2px)", "blur(0px)"] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Heart className="w-[clamp(40px,8vw,80px)] aspect-square text-red-500 fill-current drop-shadow-[0_0_20px_rgba(239,68,68,0.5)]" />
              </motion.div>
              <p className="text-[clamp(0.8rem,2vw,1.2rem)] opacity-60 font-black tracking-[0.4em] uppercase">TWÓJ MATEŁUSZ</p>
            </footer>
          </motion.div>
        </div>
      </section>

    </motion.div>
  );
}
