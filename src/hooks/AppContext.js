import React, { createContext, useState, useEffect, useCallback, cloneElement} from 'react';
import AppWindow from '../view/apps/AppWindow.js';
import { data } from '../data/data.js';

const AppContext = createContext();

const AppProvider = ({ children }) => {

  const [state, setState] = useState({
    theme: 'light',
    fs: data,
    windowApps: [],
    suspended: false,
    openWindowCount: 0,
    isOnline: navigator.onLine,
    os_feel: 'ubuntu'
  });

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setState((prevState) => ({
      ...prevState,
      theme: savedTheme,
    }));

    const savedfeel = localStorage.getItem('os_feel') || 'macos';
    setState((prevState) => ({
      ...prevState,
      os_feel: savedfeel,
    }));
    
    document.documentElement.setAttribute('data-theme', savedTheme);
    // Add event listeners for network status changes
    const updateNetworkStatus = () => {
      setState((prevState) => ({
        ...prevState,
        isOnline: navigator.onLine,
      }));
    };

    window.addEventListener('online', updateNetworkStatus);
    window.addEventListener('offline', updateNetworkStatus);

    // Cleanup event listeners on unmount
    return () => {
      window.removeEventListener('online', updateNetworkStatus);
      window.removeEventListener('offline', updateNetworkStatus);
    };
  }, []);

  const toggleTheme = () => {
    const newTheme = state.theme === 'light' ? 'dark' : 'light';
    setState((prevState) => ({
      ...prevState,
      theme: newTheme,
    }));
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const toggleFeel = (feel) => {
    setState((prevState) => ({
      ...prevState,
      os_feel: feel,
    }));
    document.documentElement.setAttribute('os-feel', feel);
    localStorage.setItem('os_feel', feel);
  };

  const setFS = (fs) => {
    setState((prevState) => ({
      ...prevState,
      fs: fs,
    }));
  };

  const addApp = (title, app) => {
    setState((prevState) => {
      const newApp = (
        <AppWindow
          key={prevState.openWindowCount}
          itemKey={prevState.openWindowCount}
          title={title}
          onWindowClose={popApp}
        >
          {cloneElement(app, { ...app.props, windowKey: prevState.openWindowCount})}
        </AppWindow>
      );

      return {
        ...prevState,
        windowApps: [...prevState.windowApps, newApp],
        openWindowCount: prevState.openWindowCount + 1,
      };
    });
  };

  const replaceApp = (itemKey, title, app) => {
    console.log('replaceApp', itemKey, title, app);
    setState((prevState) => {
      const newApp = (
        <AppWindow
          key={itemKey} // use the same key to replace the app
          itemKey={itemKey}
          title={title}
          onWindowClose={popApp}
        >
          {app}
        </AppWindow>
      );

      const updatedApps = prevState.windowApps.map((window) =>
        window.props.itemKey === itemKey ? newApp : window
      );

      return {
        ...prevState,
        windowApps: updatedApps,
      };
    });
  };



  const popApp = useCallback((_, itemKey) => {
    setState((prevState) => {
      const updatedApps = prevState.windowApps.filter((window) => window.props.itemKey !== itemKey);
      return {
        ...prevState,
        windowApps: updatedApps,
      };
    });
  }, []);

  const setSuspend = (suspended) => {
    setState((prevState) => ({
      ...prevState,
      suspended: suspended,
    }));
  };

  const onShutdown = (e) => {
    setSuspend(true);
    setState((prevState) => ({
      ...prevState,
      windowApps: [],
    }));
  };

  const onSuspend = (e) => {
    setSuspend(true);
  };

  return (
    <AppContext.Provider
      value={{
        state,
        toggleTheme,
        toggleFeel,
        setFS,
        addApp,
        popApp,
        onShutdown,
        onSuspend,
        setSuspend,
        replaceApp,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
