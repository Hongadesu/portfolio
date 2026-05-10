import { cn } from '@/lib/utils';
import styles from './logo.module.css';
import { useState, type ComponentProps } from 'react';

type LogoProps = ComponentProps<'div'> & {
  scale: number;
};

export function Logo({ scale = 1, className }: LogoProps) {
  const [isActive, setIsActive] = useState(false);

  return (
    <div
      className={cn(styles.ctr, className, isActive && styles.active)}
      style={{ transform: `scale(${scale})` }}
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => setIsActive(false)}
    >
      <div className={cn(styles.line, styles.top)}></div>
      <svg
        className={styles.name}
        version='1.1'
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 600 161.80831538885832'
        width='250'
        height='72'
      >
        <path
          className={cn(styles.word, styles.wordH)}
          d='M0 0 L0 -140 L20 -140 L20 -80 L80 -80 L80 -140 L100 -140 L100 0 L80 0 L80 -60 L20 -60 L20 0 L0 0'
          stroke='currentColor'
          strokeWidth='1'
          fill='currentColor'
          fillRule='evenodd'
          transform='translate(10 150) rotate(0 50 -70)'
        ></path>
        <path
          className={cn(styles.word, styles.wordO)}
          d='M0 0 L0 140 L100 140 L100 0 L20 0 L20 20 L80 20 L80 120 L20 120 L20 0 L0 0'
          stroke='currentColor'
          strokeWidth='1'
          fill='currentColor'
          fillRule='evenodd'
          transform='translate(131.07422317001402 11.299668319523335) rotate(0 50 70)'
        ></path>
        <path
          className={cn(styles.word, styles.wordN)}
          d='M0 0 L0 100 L20 100 L20 -40 L0 -40 L-60 60 L-60 -40 L-80 -40 L-80 100 L-60 100 L0 0'
          stroke='currentColor'
          strokeWidth='1'
          fill='currentColor'
          fillRule='evenodd'
        ></path>
        <path
          className={cn(styles.word, styles.wordG)}
          d='M0 0 L60 0 L60 -20 L-40 -20 L-40 120 L60 120 L60 40 L0 40 L0 60 L40 60 L40 100 L-20 100 L-20 0 L0 0'
          stroke='currentColor'
          strokeWidth='1'
          fill='currentColor'
          fillRule='evenodd'
          transform='translate(411.88314581662416 31.80831538885832) rotate(0 10 50)'
        ></path>
        <path
          className={cn(styles.word, styles.wordA)}
          d='M0 0 L0 20 L60 20 L60 80 L80 80 L80 -60 L-20 -60 L-20 80 L0 80 L0 -40 L60 -40 L60 0 L0 0'
          stroke='currentColor'
          strokeWidth='1'
          fill='currentColor'
          fillRule='evenodd'
          transform='translate(510 70) rotate(0 30 10)'
        ></path>
      </svg>
      <div className={cn(styles.line, styles.bottom)}></div>
    </div>
  );
}
