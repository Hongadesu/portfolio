import type { ComponentProps } from 'react';
import { ArrowRight, Link2 } from 'lucide-react';

import { cn } from '@/lib/utils';
import type { Project } from '@/types';
import { basename, DetailFinished } from '@/constant';
import { Github } from './icons';
import { useCursorContext } from '@/modules/cursor';

type ProjectCardProps = {
  project: Project;
};

export function ProjectCard({ project }: ProjectCardProps) {
  const { onTarget, onLeaveTarget, onVanish, onLeaveVanish } =
    useCursorContext();

  return (
    <div className='flex h-108 flex-col overflow-hidden rounded-xl border-2 border-(--outline) bg-(--surface) text-(--on-surface)'>
      <div
        className='h-5/12 w-full overflow-hidden'
        onMouseEnter={onVanish}
        onMouseLeave={onLeaveVanish}
      >
        {!project.imgSrc ? (
          <div
            className='h-full w-full transition-transform duration-200 hover:scale-110 active:scale-110'
            style={{
              backgroundImage:
                'repeating-conic-gradient(var(--background) 0% 25%, var(--surface) 0% 50%)',
              backgroundPosition: '0 0, 1rem 1rem',
              backgroundSize: '2rem 2rem',
              backgroundColor: 'var(--background)',
            }}
          />
        ) : (
          <img
            className='h-full w-full object-cover transition-transform duration-200 hover:scale-110 active:scale-110'
            style={{
              backgroundPosition: 'center',
            }}
            src={basename + project.imgSrc}
            alt={project.projName}
            loading='lazy'
          />
        )}
      </div>
      <div
        className='flex-1 space-y-3 bg-(--background) pt-4'
        onMouseEnter={onVanish}
        onMouseLeave={onLeaveVanish}
      >
        {!!project.tags.length && (
          <div className='flex flex-wrap items-center gap-2 px-3 select-none'>
            {project.tags.map((tag, t) => (
              <span
                key={t}
                className='rounded-md bg-(--accent)/80 px-1.5 py-1 text-xs font-semibold text-(--on-accent)'
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        <h3 className='px-3 text-lg font-bold'>{project.projName}</h3>
        <p className='px-3 text-sm'>{project.description}</p>
      </div>
      <div className='relative flex h-12 items-center bg-(--surface) p-3 select-none'>
        {project.isPrivate && (
          <div
            className='absolute top-0 left-0 z-0 h-full w-full'
            style={{
              background:
                'repeating-linear-gradient(-60deg, var(--background), var(--background) 10px, transparent 10px, transparent 20px)',
            }}
          >
            <div className='flex h-full items-center justify-center'>
              <span className='font-bold tracking-widest text-(--on-background)/50'>
                PRIVATE
              </span>
            </div>
          </div>
        )}
        {project.link && (
          <Link
            className='size-6 text-(--on-surface) hover:text-(--secondary)'
            onMouseEnter={onTarget}
            onMouseLeave={onLeaveTarget}
            href={project.link}
            target='_blank'
          >
            {isGithub(project.link) ? <Github /> : <Link2 />}
          </Link>
        )}
        {project.isWorking && (
          <span className='rounded-md bg-(--secondary)/80 px-1.5 py-1 text-xs font-semibold text-(--on-secondary)'>
            {`working`}
          </span>
        )}
        {DetailFinished && (
          <Button
            className='z-1 ml-auto size-6'
            onMouseEnter={onTarget}
            onMouseLeave={onLeaveTarget}
          >
            <ArrowRight />
          </Button>
        )}
      </div>
    </div>
  );
}

function Button({ className, ...props }: ComponentProps<'button'>) {
  return (
    <button
      type='button'
      className={cn(
        'flex size-6 cursor-pointer items-center justify-center rounded-full',
        className,
      )}
      {...props}
    />
  );
}

function Link({ className, ...props }: ComponentProps<'a'>) {
  return (
    <a
      className={cn(
        'flex size-5 cursor-pointer items-center justify-center rounded-full',
        className,
      )}
      {...props}
    />
  );
}

function isGithub(link: string): boolean {
  // check if prefix is https://github.com
  return link.startsWith('https://github.com');
}
