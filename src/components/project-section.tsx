import type { ComponentProps } from 'react';

import { cn } from '@/lib/utils';
import type { Project } from '@/types';
import { useCursorContext } from '@/modules/cursor';
import { SectionTitle } from './section-title';
import { QuoteSection } from './quote-section';
import { ProjectCard } from './project-card';
import styles from './project-section.module.css';

type ProjectSectionProps = ComponentProps<'section'> & {
  projects: Project[];
};

export function ProjectSection({ projects, className }: ProjectSectionProps) {
  const { onTarget, onLeaveTarget } = useCursorContext();

  return (
    <>
      <SectionTitle id='Projects'>{`Projects`}</SectionTitle>
      <QuoteSection>
        I build things that
        <span
          className='mx-1.5 animate-pulse text-(--accent) hover:underline hover:underline-offset-4 active:underline active:underline-offset-4'
          onMouseEnter={onTarget}
          onMouseLeave={onLeaveTarget}
        >
          matter
        </span>
        .
      </QuoteSection>
      <section className={cn('flex flex-wrap', className)}>
        {projects.map((project, i) => (
          <div key={i} className={styles.projectCtr}>
            <ProjectCard project={project} />
          </div>
        ))}
      </section>
    </>
  );
}
