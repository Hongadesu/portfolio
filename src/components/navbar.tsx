import { useEffect, useRef, useState } from 'react';

import { cn } from '@/lib/utils';
import { useIsWide } from '@/hooks';
import {
  ThemeControls,
  ThemeControllerSingle,
} from '@/modules/theme-controller';
import { useCursorContext } from '@/modules/cursor';
import { Logo } from '@/modules/logo';
import { useMenu, MenuItems, MenuItemsDrawer, MenuTrigger } from './menu';

export function Navbar() {
  const [show, setShow] = useState(true);
  const lastScrollY = useRef(0);
  const {
    isActive: isMenuActive,
    onClose: onMenuClose,
    onBlurClose: onMenuBlurClose,
    onToggle: onMenuToggle,
    menuTriggerRef,
    menuRef,
  } = useMenu();

  useEffect(() => {
    const threshold = 10; // 滾動多少才觸發

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // 避免微小抖動
      if (Math.abs(currentScrollY - lastScrollY.current) < threshold) {
        return;
      }

      if (currentScrollY > lastScrollY.current) {
        // 向下滾，隱藏
        setShow(false);
      } else {
        // 向上滾，顯示
        setShow(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const { isWide } = useIsWide(768);
  const { onTarget, onLeaveTarget } = useCursorContext();

  return (
    <nav
      className={cn(
        'sticky top-0 left-0 flex h-16 w-full items-center justify-center bg-(--background) px-4 select-none',
        isWide ? 'gap-6' : 'gap-2',
      )}
      style={{
        transform: show ? 'translateY(0)' : 'translateY(-100%)',
        transition: 'transform 0.3s ease',
        zIndex: 10,
      }}
    >
      <HomeButton />
      {isWide && <MenuItems />}
      {isWide ? (
        <ThemeControls
          className='ml-auto'
          onMouseEnter={onTarget}
          onMouseLeave={onLeaveTarget}
        />
      ) : (
        <ThemeControllerSingle
          className='ml-auto'
          onMouseEnter={onTarget}
          onMouseLeave={onLeaveTarget}
        />
      )}
      {!isWide && (
        <MenuTrigger
          onToggle={onMenuToggle}
          ref={menuTriggerRef}
          onMouseEnter={onTarget}
          onMouseLeave={onLeaveTarget}
        />
      )}
      {!isWide && isMenuActive && (
        <MenuItemsDrawer
          onBlurClose={onMenuBlurClose}
          onClose={onMenuClose}
          ref={menuRef}
        />
      )}
    </nav>
  );
}

function HomeButton() {
  const { onTarget, onLeaveTarget } = useCursorContext();

  return (
    <div
      className='flex h-2/3 basis-24 cursor-pointer items-center justify-center'
      onMouseEnter={onTarget}
      onMouseLeave={onLeaveTarget}
      onClick={() => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
      }}
    >
      <Logo scale={0.35} />
    </div>
  );
}
