import React, { useState } from 'react';
import './styles/App.css';
import AppWindow from './view/AppWindow';
import Dock from './view/dock/Dock';
import DesktopArea from './view/DesktopArea';
import TerminalApp from './view/TerminalApp';
import OpenWindowsSpace from './view/OpenWindowsSpace';
import {data} from './data/data.js';

function App() {
  const [windowApps, setWindowApps] = useState([]);
 
  const addApp = (id, title, app) => {
    const newApp = (
      <AppWindow key={windowApps.length} itemKey={windowApps.length} title={title} onWindowClose={popApp}>
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

  const defaultIcons = [
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
    }
  ];
  return (
  <div className="App">
    <DesktopArea onAppOpen={addApp} data={data} />
    <OpenWindowsSpace>
      {windowApps}
    </OpenWindowsSpace>
    <Dock icons={defaultIcons}/>
  </div>
);

}

export default App;
