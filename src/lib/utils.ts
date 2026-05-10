import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type DebouncedFunction<T extends (...args: any[]) => void> = {
  (...args: Parameters<T>): void;
  cancel: () => void;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function debounce<T extends (...args: any[]) => void>(
  func: T,
  delay: number,
): DebouncedFunction<T> {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;

  const debounce = (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };

  debounce.cancel = () => {
    if (timeoutId !== undefined) {
      clearTimeout(timeoutId);
    }

    timeoutId = undefined;
  };

  return debounce;
}

