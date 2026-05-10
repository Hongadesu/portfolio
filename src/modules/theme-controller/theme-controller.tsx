import type { ComponentProps } from 'react';
import { Moon, Sun, SunMoon } from 'lucide-react';

import { cn } from '@/lib/utils';
import { useThemeStore } from './useThemeStore';

const BUTTON_STYLE_DEFAULT =
  'flex size-8 cursor-pointer items-center justify-center rounded-md border-2 border-transparent p-1 text-(--on-background) hover:border-(--outline)';

type ThemeControlsProps = ComponentProps<'div'>;

export function ThemeControls({ className, ...props }: ThemeControlsProps) {
  const { mode, setMode } = useThemeStore();

  return (
    <div className={cn('flex gap-2', className)} {...props}>
      <button
        className={cn(
          BUTTON_STYLE_DEFAULT,
          mode === 'light' && 'bg-(--accent) text-(--on-accent)',
        )}
        onClick={() => setMode('light')}
      >
        <Sun />
      </button>
      <button
        className={cn(
          BUTTON_STYLE_DEFAULT,
          mode === 'dark' && 'bg-(--accent) text-(--on-accent)',
        )}
        onClick={() => setMode('dark')}
      >
        <Moon />
      </button>
      <button
        className={cn(
          BUTTON_STYLE_DEFAULT,
          mode === 'system' && 'bg-(--accent) text-(--on-accent)',
        )}
        onClick={() => setMode('system')}
      >
        <SunMoon />
      </button>
    </div>
  );
}
