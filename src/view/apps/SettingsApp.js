import React from 'react';
import '../../styles/view/Settings.css';
import { STRINGS } from '../../constants/strings.js';
import { AppContext } from '../../hooks/AppContext';
import Listbox from '../misc/Listbox.js';
import { OSFeel } from '../../constants/enums.js';

function SettingsApp({onSuspend, onShutdown}) {

    const {theme, feel, isOnline, onChangeFeel, toggleTheme} = React.useContext(AppContext);

    const handleShutdown = (e) => {
       onShutdown(e);
      };

      const handleSuspend = (e) => {
        onSuspend(e);
      };

    const osOptions = () => {
        let keys = new Set();
        for (let option in OSFeel) {
            keys.add(option);
        }
        keys.add(feel.name);
        return Array.from(keys);
    };

    return (
        <div className="settings">
            <div className="settings_header">
                <div>
                    <img src={require('../../assets/user-icon.png')} alt="user profile"></img>
                    <h3>{STRINGS.SETTINGS.DEFAULT_USERNAME}</h3>
                </div>
                <div className="settings_header_line">
                    <h3>{STRINGS.SETTINGS.STATUS}:</h3>
                    <h3>{isOnline ? STRINGS.SETTINGS.ONLINE : STRINGS.SETTINGS.OFFLINE}</h3>
                    <div className="status_circle" style={{backgroundColor: isOnline ? 'green' : 'red'}}></div>
                </div>
            </div>
            <div className="settings_list need_interaction">
                <div className='settings_line'>
                    <span>{STRINGS.SETTINGS.OS_FEEL}</span>
                    <Listbox options={osOptions()} 
                        onSelect={(value) => {onChangeFeel(value)}}
                        default_text={feel.name}
                    />
                </div>
                <div className='settings_line'>
                    <span>{STRINGS.SETTINGS.DARK_MODE}</span>
                    <label className="toggle-switch">
                        <input name="theme_slider" type="checkbox" checked={theme.isDark()} onChange={toggleTheme} />
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