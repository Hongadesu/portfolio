import type { ComponentProps } from 'react';

import { cn } from '@/lib/utils';
import styles from './section-title.module.css';

type SectionTitleProps = ComponentProps<'h1'>;

export function SectionTitle({ children, className, id }: SectionTitleProps) {
  return (
    <h1 id={id} className={cn(styles.title, 'text-4xl select-none', className)}>
      {children}
    </h1>
  );
}
