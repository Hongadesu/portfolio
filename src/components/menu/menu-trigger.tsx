import { forwardRef, type ComponentProps } from 'react';
import { Menu } from 'lucide-react';

import { cn } from '@/lib/utils';
import styles from './menu.module.css';

export const MenuTrigger = forwardRef<
  HTMLButtonElement,
  {
    onToggle: () => void;
  } & ComponentProps<'button'>
>(({ onToggle, ...props }, ref) => {
  return (
    <button
      type='button'
      ref={ref}
      className={cn(
        styles.trigger,
        'size-8 cursor-pointer rounded-md border-2 border-transparent p-1 text-(--on-background) hover:border-(--outline)',
      )}
      onClick={onToggle}
      {...props}
    >
      <Menu />
    </button>
  );
});
