import type { ReactNode } from 'react';

interface TileProps {
  children: ReactNode;
  className?: string;
}

export function Tile({ children, className = '' }: TileProps) {
  return <div className={`bg-cream-50 rounded-lg border border-mist-200 overflow-hidden ${className}`}>{children}</div>;
}
