import type { ComponentProps } from 'react';
import { CheckIcon, Mail } from 'lucide-react';

import { cn } from '@/lib/utils';
import { SectionTitle } from './section-title';
import { Github } from './icons';
import { useCursorContext } from '@/modules/cursor';
import { useData } from '@/hooks/useData';
import { FeedbackButton } from './global';

import styles from './aboutme-section.module.css';

type AboutMeProps = ComponentProps<'section'> & {
  selfDescription: string;
};

export function AboutMe({ selfDescription, className }: AboutMeProps) {
  return (
    <>
      <SectionTitle id='AboutMe'>{`About Me`}</SectionTitle>
      <section className={cn('space-y-6', className)}>
        <p className='rounded-xl border-2 border-(--outline) bg-(--surface) p-4 whitespace-pre-line text-(--on-surface)'>
          {selfDescription}
        </p>
        <div className='flex w-full justify-center'>
          <div className='flex w-fit items-center gap-4 rounded-xl border border-(--outline) p-3'>
            <GithubLink />
            <GMailLink />
          </div>
        </div>
      </section>
    </>
  );
}

function GithubLink() {
  const { info } = useData();
  const { onTarget, onLeaveTarget } = useCursorContext();

  return (
    <a
      className={
        'flex size-8 cursor-pointer items-center justify-center rounded-full'
      }
      onMouseEnter={onTarget}
      onMouseLeave={onLeaveTarget}
      href={info.githubHome}
      target='_blank'
    >
      <Github />
    </a>
  );
}

function GMailLink() {
  const { info } = useData();
  const { onTarget, onLeaveTarget } = useCursorContext();

  return (
    <FeedbackButton
      className='relative size-8 cursor-pointer rounded-full'
      onMouseEnter={onTarget}
      onMouseLeave={onLeaveTarget}
      onClick={async () => await navigator.clipboard.writeText(info.email)}
      successIcon={
        <>
          <div className='pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2'>
            <div className='relative flex items-center justify-center'>
              <span
                className={cn(
                  styles.copyPop,
                  'rounded-full bg-(--accent) px-3 py-1 text-xs font-medium text-(--on-accent) shadow-lg backdrop-blur',
                )}
              >
                Copied!
              </span>
              <span className={`${styles.particle} ${styles.particle1}`} />
              <span className={`${styles.particle} ${styles.particle2}`} />
              <span className={`${styles.particle} ${styles.particle3}`} />
              <span className={`${styles.particle} ${styles.particle4}`} />
              <span className={`${styles.particle} ${styles.particle5}`} />
              <span className={`${styles.particle} ${styles.particle6}`} />
            </div>
          </div>
          <CheckIcon />
        </>
      }
    >
      <Mail />
    </FeedbackButton>
  );
}
