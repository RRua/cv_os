import '../styles/view/TerminalWindowFrame.css';
import React, { useState, useEffect, useRef } from 'react';
import { find_key } from '../terminal_commands/Commands';
import { nixCommands } from '../terminal_commands/NixCommands';
import {replaceLastOccurrence} from '../utils/utils';
import { SocialsCommand } from '../terminal_commands/CustomCommands';

function TerminalApp({itemKey, inputRef, onWindowClose, fs }) {
  const promptStringPrefix = 'cv@rrua:';
  const welcomeMessage = "Welcome to the Terminal interface of the CV OS, built by Rui Rua. To know which commands are available, use the help command.";
  const [currDir, setcurrDir] = useState('~');
  const [promptString, setPromptString] = useState( promptStringPrefix + currDir + '$ ' );
  const [input, setInput] = useState('');
  const [data, setData] = useState(fs);
  const [output, setOutput] = useState([welcomeMessage]);
  const outputRef = useRef(null);
  const [command_history, setCommandHistory] = useState([]);
  const [command_history_index, setCommandHistoryIndex] = useState(-1); // Initialize to -1
  const [cursorPosition, setCursorPosition] = useState(0);
  const commands = {
    help: 'Display available commands and their descriptions',
    history: 'Display command history',
    clear: new nixCommands.ClearCommand(),
    exit: new nixCommands.ExitCommand(),
    ls: new nixCommands.LsCommand(),
    cat: new nixCommands.CatCommand(),
    cd : new nixCommands.CdCommand(),
    pwd: new nixCommands.PwdCommand(),
    socials : new SocialsCommand(),
  };

  const updateData = (newData, currDirName) => {
    setData(newData);
    const currDir = currDirName ? currDirName : '~ ';
    setcurrDir(currDir);
    setPromptString(promptStringPrefix + currDir + '$ ');
  };

  const updateCursorPosition = () => {
    if (inputRef.current) {
      setCursorPosition(inputRef.current.selectionStart);
    }
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleInputSubmit = (e) => {
    if (e.key === 'Enter') {
      setOutput((prevOutput) => [...prevOutput, `> ${input}`]);
      processCommand(input);
      setInput('');
      setCommandHistory((prevHistory) => [...prevHistory, input]);
      setCommandHistoryIndex(-1); // Reset index
    
    } else if (e.key === 'Tab') {
      e.preventDefault();
      var matchingCandidate = Object.keys(commands).find((c) =>
        c.startsWith(input.split(' ')[input.split(' ').length - 1])
      );
      console.log('match candidate', matchingCandidate);
      if (!matchingCandidate) {
        const str_to_complete = input.slice(0, cursorPosition).split(' ')[input.slice(0, cursorPosition).split(' ').length - 1];
        const candidate = find_key(str_to_complete, data, true);
        if (!candidate){
          return;
        }
        console.log('candidate', candidate);
        const completedInput = replaceLastOccurrence(input.slice(0, cursorPosition),str_to_complete, candidate);
        const remainingInput = input.slice(cursorPosition+1);
        const modifiedInput = completedInput + remainingInput;
        setInput(modifiedInput);
      }
      if (matchingCandidate) {
        setInput(input.replace(input.split(' ')[input.split(' ').length - 1], matchingCandidate));
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (command_history_index > 0) {
        setCommandHistoryIndex((prevIndex) => Math.max(0, prevIndex - 1));
        setInput(command_history[Math.max(0, command_history_index - 1)]);
      } else if (command_history_index === -1 && command_history.length > 0) {
        setCommandHistoryIndex(command_history.length - 1);
        setInput(command_history[command_history.length - 1]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (command_history_index < command_history.length - 1 && command_history_index !== -1) {
        setCommandHistoryIndex((prevIndex) => Math.min(command_history.length - 1, prevIndex + 1));
        setInput(command_history[Math.min(command_history.length - 1, command_history_index + 1)]);
      } else if (command_history_index === command_history.length - 1) {
        setCommandHistoryIndex(-1);
        setInput('');
      }
    }
  };

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [input]);

  const processCommand = (command) => {
    const args = command.trim().split(' ')
    const called_cmd = args[0];
    if (called_cmd === 'help') {
      setOutput((prevOutput) => [
        ...prevOutput,
        '',
        'Available commands:',
        '',
        ...Object.keys(commands).map((cmd) => `${cmd}: ` + ((commands[cmd] && typeof commands[cmd] !== 'string') ? commands[cmd].describe(): commands[cmd])),
      ]);
    } else if (called_cmd === 'history') {
      setOutput((prevOutput) => [
        ...prevOutput,
        '',
        'Command history:',
        '',
        ...command_history.map((cmd) => cmd),
        ''
      ]);
    } else if (commands[called_cmd]) {
        commands[called_cmd].execute({output: setOutput, args: args, onWindowClose: onWindowClose, itemKey: itemKey,
           fs: data, updateFs: updateData, rootFs: fs, currDir: currDir});
    } else {
      setOutput((prevOutput) => [
        ...prevOutput,
        `Unknown command: ${command.split(' ')[0]}`,
      ]);
    }
  };

  const handleMouseDown = (event) => {
    event.stopPropagation(); // Prevent the drag event from being triggered
  };

  return (
    <div className="term_content" ref={outputRef}>
      <div className="output" onMouseDown={handleMouseDown} >
        {output.map((line, index) => (
          <div className="output_line selectable" key={index} onMouseDown={handleMouseDown}>
            {line || <>&nbsp;</>}
          </div>
        ))}
      </div>
      <div className="prompt_line">
        <div className="prompt_string">{promptString}</div>
        <input
          type="text"
          value={input}
          onClick={updateCursorPosition}
          onKeyUp={updateCursorPosition}
          onChange={handleInputChange}
          onKeyDown={handleInputSubmit}
          className="input"
          autoFocus
          ref={inputRef}
        />
      </div>
    </div>
  );
}

export default TerminalApp;
