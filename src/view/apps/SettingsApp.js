import React from 'react';
import '../../styles/view/Settings.css';
import { STRINGS } from '../../constants/strings.js';
import { AppContext } from '../../hooks/AppContext';
import Listbox from '../misc/Listbox.js';

function SettingsApp({onSuspend, onShutdown}) {

    const {state, toggleTheme, toggleFeel} = React.useContext(AppContext);
    const {isOnline} = state;

    const handleShutdown = (e) => {
       onShutdown(e);
      };

      const handleSuspend = (e) => {
        onSuspend(e);
      };

    return (
        <div className="settings">
            <div className="settings_header">
                <div>
                    <img src={require('../../assets/user-icon.png')} alt="user profile"></img>
                    <h3>Guest</h3>
                </div>
                <div className="settings_header_line">
                    <h3>Status: </h3>
                    <h3>{isOnline ? "Online " : "Offline "}</h3>
                    <div className="status_circle" style={{backgroundColor: isOnline ? 'green' : 'red'}}></div>
                </div>
            </div>
            <div className="settings_list need_interaction">
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
        </div>
       
    );
  }
  
  export default SettingsApp;