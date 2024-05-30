import React, { useState } from 'react';
import logo from './logo.svg';
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
    {   src: require('./terminal-icon.png'),
        alt: 'Terminal',
        onclick: makeWindowVisible
    },
    { src: require('./pdf-icon.png'), alt: 'CV (pdf)' },
    { src: require('./academic-icon.png'), alt: 'Academic Personal Website' }
  ];

  return (
    <div className="App">
      {isWindowVisible && <TerminalWindowFrame onWindowClose={handleWindowVisible}/>}
      <Dock icons={defaultIcons}/>
    </div>
  );
}

export default App;
