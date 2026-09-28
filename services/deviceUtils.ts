/**
 * Utility to detect touch/mobile devices for hardware volume control behavior
 * and mobile-specific viewport adjustments.
 */
export const isMobileDevice = (): boolean => {
  if (typeof window === 'undefined') return false;
  const userAgent = navigator.userAgent || '';
  const isMobileUA = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
  const isTouchScreen = navigator.maxTouchPoints > 0 && window.innerWidth <= 820;
  return isMobileUA || isTouchScreen;
};
