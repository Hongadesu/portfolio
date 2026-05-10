import { useCallback, useEffect, useMemo, useRef, type ReactNode } from 'react';
import { CursorContext } from './useCursorContext';

const DEFAULT_CURSOR_H = '3rem';
const DEFAULT_CURSOR_W = '3rem';
const RECT_PADDING = 16;

export function CursorProvider({ children }: { children: ReactNode }) {
  const pointer = useRef<HTMLDivElement>(null);
  const currTarget = useRef<HTMLElement>(null);

  const enabled = useMemo(() => {
    return (
      typeof window !== 'undefined' &&
      window.matchMedia('(hover: hover) and (pointer: fine)').matches
    );
  }, []);

  const onTarget = useCallback(
    <T extends HTMLElement>(e: React.MouseEvent<T>) => {
      const p = pointer.current;
      if (!p) {
        return;
      }
      const ele = e.currentTarget as HTMLElement;
      currTarget.current = ele;
      const rect = ele.getBoundingClientRect();
      p.style.setProperty('--width', `${rect.width + RECT_PADDING}px`);
      p.style.setProperty('--height', `${rect.height + RECT_PADDING}px`);
    },
    [],
  );

  const onLeaveTarget = useCallback(() => {
    const p = pointer.current;
    if (!p) {
      return;
    }
    currTarget.current = null;
    p.style.setProperty('--width', DEFAULT_CURSOR_W);
    p.style.setProperty('--height', DEFAULT_CURSOR_H);
  }, []);

  const onVanish = useCallback(() => {
    const p = pointer.current;
    if (!p) {
      return;
    }
    p.style.setProperty('--display', 'none');
  }, []);

  const onLeaveVanish = useCallback(() => {
    const p = pointer.current;
    if (!p) {
      return;
    }
    p.style.setProperty('--display', 'block');
  }, []);

  useEffect(() => {
    if (!pointer.current) {
      return;
    }

    const move = (e: MouseEvent) => {
      const ele = pointer.current;
      if (!ele) {
        return;
      }
      let x = e.clientX;
      let y = e.clientY;

      if (currTarget.current) {
        const rect = currTarget.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        x = centerX + (x - centerX) * 0.2;
        y = centerY + (y - centerY) * 0.2;
      }

      ele.style.transform = `translate(${x}px, ${y}px)`;
    };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, [enabled]);

  return (
    <CursorContext.Provider
      value={{
        pointer,
        currTarget,
        enabled,
        onTarget,
        onLeaveTarget,
        onVanish,
        onLeaveVanish,
      }}
    >
      {children}
    </CursorContext.Provider>
  );
}
