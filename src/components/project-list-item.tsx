import type { ComponentProps } from 'react';
import { ArrowRight, Link2 } from 'lucide-react';

import { cn } from '@/lib/utils';
import type { Project } from '@/types';
import { Github } from './icons';
import { useCursorContext } from '@/modules/cursor';
import { basename, DetailFinished } from '@/constant';

type ProjectListItemProps = {
  project: Project;
  direction: 'left' | 'right';
  size: 'lg' | 'sm';
  className?: string;
};

export function ProjectListItem({
  project,
  size,
  direction,
  className,
}: ProjectListItemProps) {
  return (
    <div
      className={cn(
        'flex overflow-hidden rounded-xl border-2 border-(--outline) bg-(--surface) text-(--on-surface)',
        size === 'lg' ? 'h-60' : 'h-72',
        className,
      )}
    >
      {size === 'lg' ? (
        <LargeItem project={project} direction={direction} />
      ) : (
        <SmallItem project={project} />
      )}
    </div>
  );
}

function LargeItem({
  project,
  direction,
}: {
  project: Project;
  direction: 'left' | 'right';
}) {
  const { onTarget, onLeaveTarget, onVanish, onLeaveVanish } =
    useCursorContext();

  return (
    <>
      {direction === 'left' && <ImageAreaLeft project={project} />}
      <div className='flex h-full w-full flex-col gap-4'>
        <div
          className='flex-1 space-y-3 pt-3'
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
        <div className='relative flex h-10 shrink-0 items-center bg-(--surface) px-4 select-none'>
          {project.isPrivate && (
            <div
              className='group absolute top-0 left-0 z-0 h-full w-full'
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
              className='text-(--on-surface) hover:text-(--secondary)'
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
              className='z-1 ml-auto'
              onMouseEnter={onTarget}
              onMouseLeave={onLeaveTarget}
            >
              <ArrowRight />
            </Button>
          )}
        </div>
      </div>
      {direction === 'right' && <ImageAreaRight project={project} />}
    </>
  );
}

function SmallItem({ project }: { project: Project }) {
  const { onTarget, onLeaveTarget, onVanish, onLeaveVanish } =
    useCursorContext();

  return (
    <div className='flex h-full w-full flex-col gap-4'>
      <div
        className='flex-1 space-y-3 pt-3'
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
      <div className='relative flex h-10 shrink-0 items-center bg-(--surface) px-4 select-none'>
        {project.isPrivate && (
          <div
            className='group absolute top-0 left-0 z-0 h-full w-full'
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
            className='text-(--on-surface) hover:text-(--secondary)'
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
            className='z-1 ml-auto'
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

function ImageAreaLeft({ project }: { project: Project }) {
  return (
    <div
      className='h-full w-2/5 shrink-0 overflow-hidden select-none'
      style={{
        clipPath: 'polygon(0 0, 90% 0%, 100% 100%, 0% 100%)',
      }}
    >
      <ImageContent imgSrc={project.imgSrc} projName={project.projName} />
    </div>
  );
}

function ImageAreaRight({ project }: { project: Project }) {
  return (
    <div
      className='h-full w-2/5 shrink-0 overflow-hidden select-none'
      style={{
        clipPath: 'polygon(0 0, 100% 0%, 100% 100%, 10% 100%)',
      }}
    >
      <ImageContent imgSrc={project.imgSrc} projName={project.projName} />
    </div>
  );
}

function ImageContent({
  imgSrc,
  projName,
}: {
  imgSrc: Project['imgSrc'];
  projName: Project['projName'];
}) {
  if (imgSrc) {
    return (
      <img
        className='pointer-events-none h-full w-full object-cover transition-transform duration-200 hover:scale-110 active:scale-110'
        style={{
          backgroundPosition: 'center',
        }}
        src={basename + imgSrc}
        alt={projName}
        loading='lazy'
      />
    );
  }

  return (
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
