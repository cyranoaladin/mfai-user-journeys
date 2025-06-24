import { useEffect } from 'react';

interface KeyboardNavigationOptions {
  onNext: () => void;
  onPrevious: () => void;
  enabled?: boolean;
}

/**
 * Hook to handle keyboard navigation (left/right arrows)
 * for navigating between journey phases
 */
export function useKeyboardNavigation({
  onNext,
  onPrevious,
  enabled = true,
}: KeyboardNavigationOptions) {
  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      // Only handle arrow keys
      switch (event.key) {
        case 'ArrowRight':
          onNext();
          break;
        case 'ArrowLeft':
          onPrevious();
          break;
        default:
          return;
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onNext, onPrevious, enabled]);
}

export default useKeyboardNavigation;
