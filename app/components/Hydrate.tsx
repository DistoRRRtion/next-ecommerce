'use client';

import { useThemeStore } from '@/store';
import { ReactNode, useEffect, useState } from 'react';

export default function Hydrate({ children }: { children: ReactNode }) {
  const [isHydrated, setIsHydrated] = useState(false);
  const themeStore = useThemeStore();

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  return (
    <>
      {isHydrated ? (
        <body className="px-6 xl:px-64" data-theme={themeStore.mode}>
          {children}
        </body>
      ) : (
        <body></body>
      )}
    </>
  );
}
