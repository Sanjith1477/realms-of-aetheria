interface Props {
  classId: string;
  size?: number;
  className?: string;
}

export function ClassEmblem({ classId, size = 48, className }: Props) {
  const common = {
    width: size,
    height: size,
    viewBox: '0 0 64 64',
    fill: 'none',
    stroke: 'currentColor',
    className,
  };
  switch (classId) {
    case 'kensei':
      return (
        <svg {...common}>
          <circle cx="32" cy="25" r="7" fill="currentColor" opacity="0.35" stroke="none" />
          <path d="M9 20 Q32 11 55 20" strokeWidth="4" strokeLinecap="round" />
          <path d="M14 27 H50" strokeWidth="3" strokeLinecap="round" />
          <path d="M20 27 V53 M44 27 V53" strokeWidth="4" strokeLinecap="round" />
          <path d="M32 27 V37" strokeWidth="3" strokeLinecap="round" />
          <path d="M12 53 H27 M37 53 H52" strokeWidth="3" strokeLinecap="round" opacity="0.55" />
        </svg>
      );
    case 'shieldthane':
      return (
        <svg {...common}>
          <circle cx="32" cy="32" r="21" strokeWidth="3.5" />
          <circle cx="32" cy="32" r="12.5" strokeWidth="2.5" opacity="0.85" />
          <path d="M32 11 V53 M11 32 H53" strokeWidth="2.5" opacity="0.6" />
          <circle cx="32" cy="32" r="4" fill="currentColor" stroke="none" />
          <circle cx="32" cy="14.5" r="1.9" fill="currentColor" stroke="none" />
          <circle cx="32" cy="49.5" r="1.9" fill="currentColor" stroke="none" />
          <circle cx="14.5" cy="32" r="1.9" fill="currentColor" stroke="none" />
          <circle cx="49.5" cy="32" r="1.9" fill="currentColor" stroke="none" />
        </svg>
      );
    case 'jaguar':
      return (
        <svg {...common}>
          <circle cx="32" cy="15" r="5.5" fill="currentColor" opacity="0.4" strokeWidth="2.5" />
          <path d="M32 4 V8 M41.5 7.5 L39.5 10.5 M22.5 7.5 L24.5 10.5 M45 15 H41 M23 15 H19" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M15 56 V49 H21 V42 H26.5 V35 H37.5 V42 H43 V49 H49 V56 Z" strokeWidth="3" strokeLinejoin="round" />
          <path d="M29 56 V49 H35 V56" strokeWidth="2.5" opacity="0.8" />
        </svg>
      );
    case 'tidecaller':
      return (
        <svg {...common}>
          <path d="M32 4 C25 13 18 19 18 29 A14 14 0 0 0 46 29 C46 19 39 13 32 4Z" strokeWidth="3" />
          <path d="M10 43 Q20 35 32 43 T54 43" strokeWidth="3" strokeLinecap="round" />
          <path d="M17 51 Q25 45 32 51 T47 51" strokeWidth="2.5" opacity="0.7" />
          <circle cx="32" cy="27" r="3" fill="currentColor" stroke="none" />
        </svg>
      );
    case 'riftblade':
      return (
        <svg {...common}>
          <path d="M35 5 L27 27 L34 31 L25 58" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M14 17 L23 25 M50 17 L41 25 M14 47 L23 39 M50 47 L41 39" strokeWidth="2.5" strokeLinecap="round" opacity="0.8" />
          <circle cx="32" cy="31" r="7" strokeWidth="2" strokeDasharray="2 3" />
        </svg>
      );
    case 'stormwarden':
      return (
        <svg {...common}>
          <path d="M36 4 L20 34 H30 L26 60 L46 26 H35 L40 4 Z" strokeWidth="3" strokeLinejoin="round" />
          <circle cx="32" cy="32" r="22" strokeWidth="2" opacity="0.4" strokeDasharray="3 5" />
        </svg>
      );
    case 'drakewarden':
      return (
        <svg {...common}>
          <path d="M32 56 C20 44 14 32 18 16 C24 24 28 26 32 26 C36 26 40 24 46 16 C50 32 44 44 32 56 Z" strokeWidth="3" strokeLinejoin="round" />
          <circle cx="32" cy="36" r="5" fill="currentColor" opacity="0.4" stroke="none" />
          <path d="M26 12 L32 4 L38 12" strokeWidth="2.5" strokeLinecap="round" opacity="0.8" />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <path d="M44 12 A24 24 0 1 0 44 52 A21 21 0 0 1 44 12 Z" strokeWidth="3" strokeLinejoin="round" />
          <path d="M8 57 Q18 49 30 57 T55 56" strokeWidth="3" strokeLinecap="round" opacity="0.8" />
          <path
            d="M50 18 L52.2 23 L57 25 L52.2 27 L50 32 L47.8 27 L43 25 L47.8 23 Z"
            fill="currentColor"
            stroke="none"
          />
        </svg>
      );
  }
}
