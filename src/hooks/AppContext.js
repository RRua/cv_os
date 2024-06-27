import React, { createContext, useEffect, useReducer, useCallback, cloneElement } from 'react';
import AppWindow from '../view/apps/AppWindow';
import { data } from '../data/data';
import useNetworkStatus from '../hooks/useNetworkStatus';
import useTheme from './useTheme';
import useOsFeel from './useOSFeel';

const AppContext = createContext();

const initialState = {
  fs: data,
  windowApps: [],
  suspended: false,
  openWindowCount: 0,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_THEME':
      return { ...state, theme: action.theme };
    case 'SET_FS':
      return { ...state, fs: action.fs };
    case 'ADD_APP':
      const newApp = (
        <AppWindow
          key={state.openWindowCount}
          itemKey={state.openWindowCount}
          title={action.title}
          onWindowClose={action.popApp}
        >
          {cloneElement(action.app, { ...action.app.props, windowKey: state.openWindowCount })}
        </AppWindow>
      );
      return {
        ...state,
        windowApps: [...state.windowApps, newApp],
        openWindowCount: state.openWindowCount + 1,
      };
    case 'REPLACE_APP':
      const replacedApp = (
        <AppWindow
          key={action.itemKey}
          itemKey={action.itemKey}
          title={action.title}
          onWindowClose={action.popApp}
        >
          {action.app}
        </AppWindow>
      );
      const updatedApps = state.windowApps.map((window) =>
        window.props.itemKey === action.itemKey ? replacedApp : window
      );
      return { ...state, windowApps: updatedApps };
    case 'POP_APPS':
      return { ...state, windowApps: [] };
    case 'POP_APP':
      const remainingApps = state.windowApps.filter((window) => window.props.itemKey !== action.itemKey);
      return { ...state, windowApps: remainingApps };
    case 'SET_SUSPEND':
      return { ...state, suspended: action.suspended };
    default:
      return state;
  }
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const isOnline = useNetworkStatus();
  const [theme, toggleTheme] = useTheme();
  const [feel, toggleFeel, windowFactory] = useOsFeel();


  useEffect(() => {
    dispatch({ type: 'SET_ONLINE_STATUS', isOnline });
  }, [isOnline]);

  const setFS = (fs) => {
    dispatch({ type: 'SET_FS', fs });
  };

  const addApp = (title, app) => {
    dispatch({
      type: 'ADD_APP',
      title,
      app,
      popApp,
    });
  };

  const replaceApp = (itemKey, title, app) => {
    dispatch({
      type: 'REPLACE_APP',
      itemKey,
      title,
      app,
      popApp,
    });
  };

  const popApp = useCallback((_, itemKey) => {
    dispatch({ type: 'POP_APP', itemKey });
  }, []);

  const setSuspend = (suspended) => {
    dispatch({ type: 'SET_SUSPEND', suspended });
  };

  const onShutdown = () => {
    setSuspend(true);
    dispatch({ type: 'POP_APPS'});
  };

  const onSuspend = () => {
    setSuspend(true);
  };

  const onChangeFeel = (feel) => {
    toggleFeel(feel);
  };

  return (
    <AppContext.Provider
      value={{
        state,
        isOnline,
        theme,
        windowFactory,
        feel,
        toggleTheme,
        onChangeFeel,
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
