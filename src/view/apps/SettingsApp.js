import React from 'react';
import '../../styles/view/Settings.css';
import { STRINGS } from '../../constants/strings.js';
import { AppContext } from '../../hooks/AppContext';

function SettingsApp({onSuspend, onShutdown}) {

    const {state, toggleTheme} = React.useContext(AppContext);

    const handleShutdown = (e) => {
       onShutdown(e);
      };

      const handleSuspend = (e) => {
        onSuspend(e);
      };

    return (
        <div className="settings need_interaction">
            <div className='settings_line'>
                <span>{STRINGS.SETTINGS.DARK_MODE}</span>
                <label className="toggle-switch">
                    <input type="checkbox" checked={state.theme === 'dark'} onChange={toggleTheme} />
                    <span className="slider"></span>
                </label>
            </div>
            <div className='settings_line'>
                <span>{STRINGS.SETTINGS.SHUTDOWN}</span>
                <button className='settings_button' onClick={handleShutdown} >
                    <img src={require("../../assets/shutdown-icon.png")} alt={STRINGS.SETTINGS.SHUTDOWN}/>
                </button>
            </div>
            <div className='settings_line'>
                <span>{STRINGS.SETTINGS.SUSPEND}</span>
                <button className='settings_button' onClick={handleSuspend} >
                    <img src={require("../../assets/pause-icon.png")} alt={STRINGS.SETTINGS.SUSPEND}/>
                </button>
            </div>
        </div>
       
    );
  }
  
  export default SettingsApp;