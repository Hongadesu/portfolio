import type { ComponentProps } from 'react';
import { Moon, Sun, SunMoon } from 'lucide-react';

import { cn } from '@/lib/utils';
import { useThemeStore, type ThemeMode } from './useThemeStore';

const BUTTON_STYLE_DEFAULT =
  'flex size-8 cursor-pointer items-center justify-center rounded-md border-2 border-transparent p-1 text-(--on-background) hover:border-(--outline)';

type ThemeControlsProps = ComponentProps<'button'>;

export function ThemeControllerSingle({
  className,
  ...props
}: ThemeControlsProps) {
  const { mode, setMode } = useThemeStore();

  return (
    <button
      className={cn(BUTTON_STYLE_DEFAULT, className)}
      onClick={() => {
        switch (mode) {
          case 'light':
            setMode('dark');
            break;
          case 'dark':
            setMode('system');
            break;
          default:
            setMode('light');
            break;
        }
      }}
      {...props}
    >
      <Icon mode={mode} />
    </button>
  );
}

function Icon({ mode }: { mode: ThemeMode }) {
  switch (mode) {
    case 'light':
      return <Sun />;
    case 'dark':
      return <Moon />;
    default:
      return <SunMoon />;
  }
}
