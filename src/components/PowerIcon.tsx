interface Props {
  icon: string;
  size?: number;
  className?: string;
}

export function PowerIcon({ icon, size = 28, className }: Props) {
  const common = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    className,
  };
  switch (icon) {
    case 'blade':
      return <svg {...common} strokeLinecap="round" strokeLinejoin="round"><path d="M4 20 15.8 8.2M14 4.4l5.6 5.6M14.7 5.5l1.1-3 2.2 2.2 3-1.1-1.1 3 2.2 2.2-3 1.1" /><path d="m3 21 3.2-3.2" strokeWidth="3" /></svg>;
    case 'heart':
      return <svg {...common} strokeLinejoin="round"><path d="M20.7 4.8a5.2 5.2 0 0 0-7.4 0L12 6.1l-1.3-1.3a5.2 5.2 0 0 0-7.4 7.4L12 21l8.7-8.8a5.2 5.2 0 0 0 0-7.4Z" /><path d="M12 8.5v6M9 11.5h6" /></svg>;
    case 'boot':
      return <svg {...common} strokeLinecap="round" strokeLinejoin="round"><path d="M8 3v9.2L4.5 16c-1 1.1-.2 3 1.3 3h12.7c1.2 0 2.1-1 2-2.2-.1-1-1-1.8-2-1.8H14l-2-4.4V3" /><path d="M8 12h6" /></svg>;
    case 'eye':
      return <svg {...common} strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 12s3.4-6 9.5-6 9.5 6 9.5 6-3.4 6-9.5 6-9.5-6-9.5-6Z" /><circle cx="12" cy="12" r="2.6" /></svg>;
    case 'reach':
      return <svg {...common} strokeLinecap="round" strokeLinejoin="round"><path d="M3 18 18 3M14 3h4v4M6 21h3v-3" /><path d="M4 10H2M10 4V2M20 14h2M14 20v2" /></svg>;
    case 'drop':
      return <svg {...common} strokeLinecap="round" strokeLinejoin="round"><path d="M12 2.5s6.5 7.1 6.5 12A6.5 6.5 0 1 1 5.5 14.5c0-4.9 6.5-12 6.5-12Z" /><path d="M9 15c.5 1.3 1.5 2 3 2" /></svg>;
    case 'bolt':
      return <svg {...common} strokeLinecap="round" strokeLinejoin="round"><path d="M13.6 2 5.2 13h6.2l-.9 9L18.8 11h-6.1L13.6 2Z" /></svg>;
    case 'sun':
      return <svg {...common} strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></svg>;
    case 'coin':
      return <svg {...common} strokeLinejoin="round"><circle cx="12" cy="12" r="8.5" /><path d="M14.7 8.4c-.6-.6-1.5-1-2.7-1-1.7 0-2.8.9-2.8 2.2 0 3.2 5.7 1.4 5.7 4.7 0 1.3-1.2 2.3-3 2.3-1.2 0-2.3-.4-3-1.1M12 5.7v12.6" /></svg>;
    case 'shield':
      return <svg {...common} strokeLinejoin="round"><path d="M12 2.5c2.7 2 5.6 2.4 8 2.5v5.7c0 5.1-3.3 8.6-8 10.8-4.7-2.2-8-5.7-8-10.8V5c2.4-.1 5.3-.5 8-2.5Z" /><path d="M12 7v9M8.5 11.5h7" /></svg>;
    default:
      return <svg {...common} strokeLinecap="round" strokeLinejoin="round"><path d="m12 2 1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8L12 2Z" /><path d="m19 16 .8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8L19 16Z" /></svg>;
  }
}