import React, { useState } from 'react';
import './styles/App.css';
import TerminalWindowFrame from './view/TerminalWindowFrame';
import Dock from './view/Dock';

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
    { src: require('./assets/academic-icon.png'), alt: 'Academic Personal Website' }
  ];

  return (
    <div className="App">
      {isWindowVisible && <TerminalWindowFrame onWindowClose={handleWindowVisible}/>}
      <Dock icons={defaultIcons}/>
    </div>
  );
}

export default App;
