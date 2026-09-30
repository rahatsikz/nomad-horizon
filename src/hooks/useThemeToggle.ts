'use client';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export const useThemeToggle = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = mounted ? resolvedTheme === 'dark' : false;

  return {
    mounted,
    isDark,
    toggleTheme: () => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark'),
  };
};
