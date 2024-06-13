import React from 'react';
import { useTheme } from '../hooks/ThemeContext.js';
import '../styles/view/Settings.css';


function SettingsApp({onSuspend, onShutdown}) {
    const { theme, toggleTheme } = useTheme();

    const handleShutdown = (e) => {
       onShutdown(e);
      };

      const handleSuspend = (e) => {
        onSuspend(e);
      };

    return (
        <div className="settings">
            <div className='settings_line'>
                <span>Dark Mode</span>
                <label className="toggle-switch">
                    <input type="checkbox" checked={theme === 'dark'} onChange={toggleTheme} />
                    <span className="slider"></span>
                </label>
            </div>
            <div className='settings_line'>
                <span>Shutdown</span>
                <button className='settings_button' onClick={handleShutdown} >
                    <img src={require("../assets/shutdown-icon.png")} alt="Shutdown"/>
                </button>
            </div>
            <div className='settings_line'>
                <span>Suspend</span>
                <button className='settings_button' onClick={handleSuspend} >
                    <img src={require("../assets/pause-icon.png")} alt="Shutdown"/>
                </button>
            </div>
        </div>
       
    );
  }
  
  export default SettingsApp;