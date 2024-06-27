import React from 'react';
import './styles/App.css';
import Dock from './view/dock/Dock';
import DesktopArea from './view/desktopArea/DesktopArea.js';
import TerminalApp from './view/apps/TerminalApp.js';
import OpenWindowsSpace from './view/desktopArea/OpenWindowsSpace.js';

import SettingsApp from './view/apps/SettingsApp.js';
import { STRINGS } from './constants/strings.js';
import { AppContext } from './hooks/AppContext';


const SuspendedScreen = ({onLogin}) => {
  return (
    <div className="suspended_screen">
      <img src={require('./assets/user-icon.png')} alt="user profile"></img>
      <h1>{STRINGS.SUSPENDED_SCREEN.WELCOME_MESSAGE}</h1>
      <button onClick={onLogin}>{STRINGS.SUSPENDED_SCREEN.LOGIN_BUTTON}</button>
    </div>
  )
}

const Octocat = () => {
  return (
    <a className="octocat" href="https://github.com/RRua/cv_os">
      <img className="octocat" src={require('./assets/octocat.png')} alt="GitHub repo"></img>
    </a>);
}


function App() {
  const {state, addApp, onShutdown, onSuspend, setSuspend} = React.useContext(AppContext);

  var defaultIcons = [
    {   src: require('./assets/terminal-icon.png'),
        alt: 'Terminal',
        onclick: () => {
          addApp('Terminal', <TerminalApp fs={state.fs}/>)
        }
    },
    {   src: require('./assets/settings-icon.png'),
      alt: 'Settings',
      onclick: () => addApp('Settings',
         <SettingsApp onShutdown={onShutdown} onSuspend={onSuspend}/>
        )
    },
    { src: require('./assets/pdf-icon.png'), alt: 'CV (pdf)',
      onclick: () => window.open(STRINGS.DOCK.CV_LINK) 
     },
    { 
      src: require('./assets/academic-icon.png'),
      alt: 'Personal Website',
      onclick: () => window.open(STRINGS.DOCK.PERSONAL_WEBSITE_LINK) 
    },
    {   src: require('./assets/linktree-icon.png'),
        alt: 'Linktree (Other Links)',
        onclick: () => window.open(STRINGS.DOCK.LINKTREE_LINK)
    },
  ];

  return ( 
    state.suspended ? 
      ( <div className="App">
          <SuspendedScreen onLogin={() => setSuspend(false)} />
        </div>)
    : ( <div className="App">
          <DesktopArea data={state.fs} onAppOpen={addApp}/>
          <OpenWindowsSpace>
            {state.windowApps}
          </OpenWindowsSpace>
          <Octocat/>
          <Dock icons={defaultIcons}/>
        </div>
      )
  );
}
export default App;
