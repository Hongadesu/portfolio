import { forwardRef, useEffect } from 'react';

import { cn } from '@/lib/utils';
import styles from './menu.module.css';

export const MenuItemsDrawer = forwardRef<
  HTMLDivElement,
  { onBlurClose: (e: MouseEvent) => void; onClose: () => void }
>(({ onBlurClose, onClose }, ref) => {
  useEffect(() => {
    window.addEventListener('click', onBlurClose);
    return () => {
      window.removeEventListener('click', onBlurClose);
    };
  }, [onBlurClose]);

  return (
    <div ref={ref} className={cn(styles.navLinkDrawerCtr)}>
      <a
        className='block h-full w-full cursor-pointer py-2 text-center'
        onClick={onClose}
        href='#AboutMe'
      >
        About Me
      </a>
      <a
        className='block h-full w-full cursor-pointer py-2 text-center'
        href='#Projects'
        onClick={onClose}
      >
        Projects
      </a>
      <a
        className='block h-full w-full cursor-pointer py-2 text-center'
        href='#Experiments'
        onClick={onClose}
      >
        Experiments
      </a>
    </div>
  );
});
