
import { useEffect, useCallback } from 'react';

interface KeyboardNavigationOptions {
  onArrowUp?: () => void;
  onArrowDown?: () => void;
  onArrowLeft?: () => void;
  onArrowRight?: () => void;
  onEnter?: () => void;
  onEscape?: () => void;
  onTab?: (event: KeyboardEvent) => void;
  onSpace?: () => void;
  disabled?: boolean;
  keys?: Record<string, () => void>;
}

/**
 * Hook para facilitar navegação por teclado em componentes
 */
export function useKeyboardNavigation({
  onArrowUp,
  onArrowDown,
  onArrowLeft,
  onArrowRight,
  onEnter,
  onEscape,
  onTab,
  onSpace,
  disabled = false,
  keys = {},
}: KeyboardNavigationOptions) {
  
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (disabled) return;
    
    // Mapeando teclas comuns
    switch (event.key) {
      case 'ArrowUp':
        onArrowUp?.();
        break;
      case 'ArrowDown':
        onArrowDown?.();
        break;
      case 'ArrowLeft':
        onArrowLeft?.();
        break;
      case 'ArrowRight':
        onArrowRight?.();
        break;
      case 'Enter':
        onEnter?.();
        break;
      case 'Escape':
        onEscape?.();
        break;
      case 'Tab':
        onTab?.(event);
        break;
      case ' ':
        onSpace?.();
        break;
      default:
        // Para teclas customizadas
        const handler = keys[event.key];
        if (handler) {
          handler();
        }
        break;
    }
  }, [
    disabled,
    onArrowUp,
    onArrowDown,
    onArrowLeft,
    onArrowRight,
    onEnter,
    onEscape,
    onTab,
    onSpace,
    keys,
  ]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);
}

export default useKeyboardNavigation;
