import { useCursorContext } from '@/modules/cursor';
import styles from './menu.module.css';

export function MenuItems() {
  const { onTarget, onLeaveTarget } = useCursorContext();

  return (
    <div className={styles.navLinkCtr}>
      <a
        className='block h-full cursor-pointer py-2 text-center'
        onMouseEnter={onTarget}
        onMouseLeave={onLeaveTarget}
        href='#AboutMe'
      >
        About Me
      </a>
      <a
        className='block h-full cursor-pointer py-2 text-center'
        onMouseEnter={onTarget}
        onMouseLeave={onLeaveTarget}
        href='#Projects'
      >
        Projects
      </a>
      <a
        className='block h-full cursor-pointer py-2 text-center'
        onMouseEnter={onTarget}
        onMouseLeave={onLeaveTarget}
        href='#Experiments'
      >
        Experiments
      </a>
    </div>
  );
}
