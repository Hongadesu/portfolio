import { CheckIcon, Loader2, XIcon } from 'lucide-react';
import { useState } from 'react';

import { cn } from '@/lib/utils';

function FeedbackButton({
  className,
  duration = 1000,
  children,
  successIcon = <CheckIcon />,
  loadingIcon = <Loader2 className='animate-spin' />,
  errorIcon = <XIcon />,
  onClick,
  ...props
}: React.ComponentProps<'button'> & {
  asChild?: boolean;
  duration?: number;
  successIcon?: React.ReactNode;
  loadingIcon?: React.ReactNode;
  errorIcon?: React.ReactNode;
}) {
  const [status, setStatus] = useState<
    'idle' | 'loading' | 'success' | 'error'
  >('idle');

  const handleClick = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.stopPropagation();
    if (status === 'loading') return;

    try {
      setStatus('loading');
      await Promise.resolve();

      if (onClick) {
        // 若原本 onClick 是 async function，就 await 它
        await Promise.resolve(onClick(e));
      }

      setStatus('success');
    } catch (err) {
      setStatus('error');
      console.error('FeedbackButton error:', err);
    } finally {
      await new Promise((resolve) => setTimeout(resolve, duration));
      setStatus('idle');
    }
  };

  let content: React.ReactNode = children;
  if (status === 'loading') {
    content = loadingIcon;
  } else if (status === 'success') {
    content = successIcon;
  } else if (status === 'error') {
    content = errorIcon;
  }

  return (
    <button
      tabIndex={0}
      className={cn('flex items-center justify-center', className)}
      disabled={status !== 'idle' || props.disabled}
      onClick={handleClick}
      {...props}
    >
      {content}
    </button>
  );
}

export { FeedbackButton };
