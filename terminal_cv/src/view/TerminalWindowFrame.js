
import TerminalBar from "./TerminalBar";
import '../styles/view/TerminalWindowFrame.css';
import React, { useState, useRef } from 'react';
import Draggable from 'react-draggable';
function TerminalWindowFrame({onWindowClose}) {
    const promptString = 'cv@RuiRua:~$ ';
    const [input, setInput] = useState('');
    const [output, setOutput] = useState([]);
    const [isMinimized, setIsMinimized] = useState(false);
    const [isMaximized, setIsMaximized] = useState(false);
    const inputRef = useRef(null);

    const toggleMinimize = () => {
        if (!isMaximized) {
          setIsMinimized(!isMinimized);
        }
      };
      
      const toggleMaximize = () => {
        setIsMaximized(!isMaximized);
        if (isMinimized) {
          setIsMinimized(false);
        }
      };

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

    const handleContainerClick = () => {
        if (inputRef.current) {
          inputRef.current.focus();
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
        <Draggable handle=".term_window">
            <div className="term_window" style={isMaximized && {height: '99%', width:'99%'}} onClick={handleContainerClick}>
                <TerminalBar text="Terminal CV" 
                    onMinimize={toggleMinimize}
                    onMaximize={toggleMaximize}
                    onClose={onWindowClose}
                    isMaximized={isMaximized}
                />
                {!isMinimized && 
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
                </div>}
            </div>
        </Draggable>
    )    
}

export default TerminalWindowFrame;

