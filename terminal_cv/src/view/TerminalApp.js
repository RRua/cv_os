
import TerminalBar from "./WindowAppBar";
import '../styles/view/TerminalWindowFrame.css';
import React, { useState, useRef } from 'react';
import Draggable from 'react-draggable';


function TerminalApp({onWindowClose, inputRef}) {
    const promptString = 'cv@RuiRua:~$ ';
    const [input, setInput] = useState('');
    const [output, setOutput] = useState([]);
  

    const handleInputChange = (e) => {
      setInput(e.target.value);
    };
  
    const handleInputSubmit = (e) => {
      if (e.key === 'Enter') {
        setOutput([...output, `> ${input}`]);
        processCommand(input);
        setInput('');
      }
    };

  
    const processCommand = (command) => {
      if (command === 'help') {
        setOutput((prevOutput) => [...prevOutput, 'Available commands: help, clear']);
      } else if (command === 'clear') {
        setOutput([]);
      } else {
        setOutput((prevOutput) => [...prevOutput, `Unknown command: ${command}`]);
      }
    };
    return(
        <div className="term_content" >
            <div className="output">
            {output.map((line, index) => (
                <div className="output_line" key={index}>{line}</div>
            ))}
            </div>
            <div className="prompt_line">
                <div>{promptString}</div>
                <input
                type="text"
                value={input}
                onChange={handleInputChange}
                onKeyDown={handleInputSubmit}
                className="input"
                autoFocus
                ref={inputRef}
                />
            </div>
        </div>
    )    
}

export default TerminalApp;

