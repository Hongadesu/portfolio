import { useRef, useState } from 'react';

export function useMenu() {
  const menuRef = useRef<HTMLDivElement>(null);
  const menuTriggerRef = useRef<HTMLButtonElement>(null);
  const [isActive, setIsActive] = useState(false);

  const onBlurClose = (e: MouseEvent) => {
    const target = e.target as Node;
    if (
      menuRef.current?.contains(target) ||
      menuTriggerRef.current?.contains(target)
    ) {
      return;
    }
    setIsActive(false);
  };
  const onClose = () => setIsActive(false);
  const onOpen = () => setIsActive(true);
  const onToggle = () => setIsActive((prev) => !prev);

  return {
    menuRef,
    menuTriggerRef,
    isActive,
    setIsActive,
    onBlurClose,
    onClose,
    onOpen,
    onToggle,
  };
}
