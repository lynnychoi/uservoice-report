import { useEffect, useState } from 'react';

export function useResponsiveToast() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);

    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  const toastPosition = isMobile ? 'top-center' : 'top-right';

  return { isMobile, toastPosition };
}