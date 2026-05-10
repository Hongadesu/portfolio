import type { ComponentProps } from 'react';

import type { Project } from '@/types';
import { cn } from '@/lib/utils';
import { useIsWide } from '@/hooks';
import { useCursorContext } from '@/modules/cursor';
import { QuoteSection } from './quote-section';
import { SectionTitle } from './section-title';
// import styles from './experiment-section.module.css';
import { ProjectListItem } from './project-list-item';

type ExperimentSectionProps = ComponentProps<'section'> & {
  experiments: Project[];
};

export function ExperimentSection({
  experiments,
  className,
}: ExperimentSectionProps) {
  const { onTarget, onLeaveTarget } = useCursorContext();
  const { isWide } = useIsWide(768);

  return (
    <>
      <SectionTitle id='Experiments'>{`Experiments`}</SectionTitle>
      <QuoteSection>
        I also explore and
        <span
          className='mx-1.5 animate-pulse text-(--accent) hover:underline hover:underline-offset-4 active:underline active:underline-offset-4'
          onMouseEnter={onTarget}
          onMouseLeave={onLeaveTarget}
        >
          experiment
        </span>
        .
      </QuoteSection>
      <section className={cn('space-y-4', className)}>
        {experiments.map((project, i) => (
          <ProjectListItem
            key={i}
            direction={i % 2 === 0 ? 'left' : 'right'}
            size={isWide ? 'lg' : 'sm'}
            project={project}
          />
        ))}
      </section>
    </>
  );
}
