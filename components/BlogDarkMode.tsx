'use client';

import { useEffect } from 'react';
import * as Utilities from '@common/utilities';

export default function BlogDarkMode({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    if (darkModeMediaQuery.matches) {
      Utilities.onHandleThemeChange('theme-dark');
    } else {
      Utilities.onHandleThemeChange('');
    }

    const themeChangeHandler = (e: MediaQueryListEvent) => {
      Utilities.onHandleThemeChange(e.matches ? 'theme-dark' : '');
    };

    darkModeMediaQuery.addEventListener('change', themeChangeHandler);

    return () => {
      darkModeMediaQuery.removeEventListener('change', themeChangeHandler);
    };
  }, []);

  return <>{children}</>;
}
