import type { ComponentProps } from 'react';

import { cn } from '@/lib/utils';
import styles from './quote-section.module.css';

type QuoteSectionProps = ComponentProps<'section'>;

export function QuoteSection({
  className,
  children,
  ...props
}: QuoteSectionProps) {
  return (
    <section
      className={cn('relative overflow-visible select-none', className)}
      {...props}
    >
      <p
        className={cn(
          styles.quote,
          'rounded-xl border-2 border-(--outline) bg-(--surface) text-center text-(--on-surface)',
        )}
        style={{ fontFamily: `'Lora'` }}
      >
        {children}
      </p>
      <span className='absolute -top-2 left-4 font-serif text-5xl'>
        &ldquo;
      </span>
      <span className='absolute right-4 -bottom-9 font-serif text-5xl'>
        &rdquo;
      </span>
    </section>
  );
}
