import React, { useState } from 'react';
import './styles/App.css';
import AppWindow from './view/AppWindow';
import Dock from './view/Dock';
import DesktopArea from './view/DesktopArea';
import TerminalApp from './view/TerminalApp';
import OpenWindowsSpace from './view/OpenWindowsSpace';

function App() {
  const [isWindowVisible, setIsWindowVisible] = useState(true);

  const handleWindowVisible = () => {
    setIsWindowVisible(!isWindowVisible);
  }

  const makeWindowVisible = () => {
    setIsWindowVisible(true);
  }


  const defaultIcons = [
    {   src: require('./assets/terminal-icon.png'),
        alt: 'Terminal',
        onclick: makeWindowVisible
    },
    { src: require('./assets/pdf-icon.png'), alt: 'CV (pdf)' },
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
      <DesktopArea></DesktopArea>
      {isWindowVisible && 
       <OpenWindowsSpace>
          <AppWindow onWindowClose={handleWindowVisible}>
              <TerminalApp></TerminalApp>
          </AppWindow>
       </OpenWindowsSpace>}
      <Dock icons={defaultIcons}/>
    </div>
  );
}

export default App;
