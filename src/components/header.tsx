import type { ComponentProps } from 'react';

import { useCursorContext } from '@/modules/cursor';
import { basename } from '@/constant';
import { cn } from '@/lib/utils';
import styles from '@/components/header.module.css';

type HeaderProps = ComponentProps<'section'> & {
  headImg: string;
  headBgImg: string;
  name: string;
  label: string;
  tags: string[];
};

export function Header({
  headImg,
  headBgImg,
  name,
  label,
  tags,
  className,
}: HeaderProps) {
  const { onVanish, onLeaveVanish } = useCursorContext();

  return (
    <>
      {/** hero */}
      <section
        className={cn(styles.header, className)}
        onMouseEnter={onVanish}
        onMouseLeave={onLeaveVanish}
      >
        <img
          className='absolute top-0 left-0 z-0 h-full w-full object-cover'
          src={basename + headBgImg}
          alt='header background'
          fetchPriority='high'
        />
        <div className={cn(styles.headerGrid, 'p-6')}>
          <img
            className={styles.headerGridCellOne}
            src={basename + headImg}
            alt='hero-head'
            draggable={false}
          />
          {/** title */}
          <div className={styles.headerGridCellTwo}>
            <div className={styles.headerTitle}>
              <span className={styles.name}>{name}</span>
              <span className={styles.label}>{label}</span>
            </div>
            {/** tags */}
            {!!tags.length && (
              <div className={styles.headerTags}>
                {tags.map((tag, i) => (
                  <span key={`${tag}-${i}`} className={styles.tag}>
                    # {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
