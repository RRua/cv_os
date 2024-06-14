import React, { useState } from 'react';
import './styles/App.css';
import AppWindow from './view/AppWindow';
import Dock from './view/dock/Dock';
import DesktopArea from './view/DesktopArea';
import TerminalApp from './view/TerminalApp';
import OpenWindowsSpace from './view/OpenWindowsSpace';
import {data} from './data/data.js';
import SettingsApp from './view/apps/SettingsApp.js';
import { STRINGS } from './constants/strings.js';


const SuspendedScreen = ({onLogin}) => {
  return (
    <div className="suspended_screen">
      <img src={require('./assets/user-icon.png')} alt="user profile"></img>
      <h1>{STRINGS.SUSPENDED_SCREEN.WELCOME_MESSAGE}</h1>
      <button onClick={onLogin}>{STRINGS.SUSPENDED_SCREEN.LOGIN_BUTTON}</button>
    </div>
  )
}


function App() {
  const [windowApps, setWindowApps] = useState([]);
  const [suspended, setSuspended] = useState(false);
 
  const addApp = (id, title, app) => {
    const count = windowApps.length;
    const newApp = (
      <AppWindow key={count} itemKey={windowApps.length} title={title} onWindowClose={popApp}>
        {app}
      </AppWindow>
    );
    setWindowApps([...windowApps, newApp]);
  }

  const popApp = (_, itemKey) => {
    setWindowApps((prevWindowApps) => {
      return prevWindowApps.filter((window) => window.props.itemKey !== itemKey);
    });
  };

  const onShutdown = (e) => {
    setSuspended(true);
    setWindowApps([]);
  };

  const onSuspend  = (e) => {
      setSuspended(true);
  };

  var defaultIcons = [
    {   src: require('./assets/terminal-icon.png'),
        alt: 'Terminal',
        onclick: () => {addApp(windowApps.length, 'Terminal', <TerminalApp fs={data}/>)}
    },
    { src: require('./assets/pdf-icon.png'), alt: 'CV (pdf)',
      onclick: () => window.open('https://rrua.github.io/files/CV_RuiRua_24.pdf') 
     },
    { 
      src: require('./assets/academic-icon.png'),
      alt: 'Academic Personal Website',
      onclick: () => window.open('https://rrua.github.io/') 
    },
    {   src: require('./assets/linktree-icon.png'),
        alt: 'linktree (Links)',
        onclick: () => window.open('https://linktr.ee/ruirua')
    },
    {   src: require('./assets/settings-icon.png'),
      alt: 'Settings',
      onclick: () => addApp(windowApps.length, 'Settings', <SettingsApp onShutdown={onShutdown} onSuspend={onSuspend}/>)
  }
  ];

  return ( 
    suspended ? 
      ( <div className="App">
          <SuspendedScreen onLogin={() => setSuspended(false)}>
          </SuspendedScreen>
        </div>)
      : ( <div className="App">
            <DesktopArea onAppOpen={addApp} data={data} />
            <OpenWindowsSpace>
              {windowApps}
            </OpenWindowsSpace>
            <Dock icons={defaultIcons}/>
          </div>
  
        )
    );

}

export default App;
