'use client';

import { useTheme } from '../../context/ThemeContext';

interface ThemeContainerProps {
  children: React.ReactNode;
}

const ThemeContainer = ({ children }: ThemeContainerProps) => {
  const { theme } = useTheme();
  return (
    <main style={{ position: 'relative' }}>
      <div className={`app app-${theme}`}>{children}</div>
    </main>
  );
};

export default ThemeContainer;
