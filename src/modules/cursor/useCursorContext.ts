import { useContext, createContext } from 'react';

export type CursorContextType = {
  pointer: React.RefObject<HTMLDivElement | null>;
  currTarget: React.RefObject<HTMLElement | null>;
  enabled: boolean;
  onTarget: <T extends HTMLElement>(e: React.MouseEvent<T>) => void;
  onLeaveTarget: () => void;
  onVanish: () => void;
  onLeaveVanish: () => void;
} | null;

export const CursorContext = createContext<CursorContextType>(null);

export const useCursorContext = () => {
  const context = useContext(CursorContext);
  if (context === null) {
    throw new Error('useCursorContext must be used within a CursorProvider');
  }
  return context;
};
