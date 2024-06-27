import { useState, useEffect } from 'react';
import {AppTheme} from '../constants/enums.js';

const useTheme = () => {
  const [theme, setTheme] = useState( new AppTheme(localStorage.getItem('theme') || AppTheme.Light.name));

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme.name.toLowerCase());
    localStorage.setItem('theme', theme.name);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme.isDark() ? AppTheme.Light : AppTheme.Dark));
  };

  return [theme, toggleTheme];
};

export default useTheme;
