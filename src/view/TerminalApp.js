import '../styles/view/TerminalWindowFrame.css';
import React, { useState, useEffect, useRef } from 'react';
import { ExitCommand, ClearCommand, LsCommand, CatCommand, find_key } from '../terminal_commands/NixCommands';

function TerminalApp({ inputRef, onWindowClose, fs }) {
  const promptString = 'cv@RuiRua:~$ ';
  const [input, setInput] = useState('');
  const [output, setOutput] = useState([]);
  const outputRef = useRef(null);
  const [command_history, setCommandHistory] = useState([]);
  const [command_history_index, setCommandHistoryIndex] = useState(-1); // Initialize to -1
  const commands = {
    help: null,
    history: null,
    clear: new ClearCommand(),
    exit: new ExitCommand(),
    ls: new LsCommand(),
    cat: new CatCommand(),
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
      if (!matchingCandidate) {
        matchingCandidate = find_key(input.split(' ')[input.split(' ').length - 1], fs, true);
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
  }, [output]);

  const processCommand = (command) => {
    const called_cmd = command.split(' ')[0];
    if (called_cmd === 'help') {
      setOutput((prevOutput) => [
        ...prevOutput,
        '',
        'Available commands:',
        '',
        ...Object.keys(commands).map((cmd) => `${cmd}: ` + (commands[cmd] ? commands[cmd].describe(): '')),
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
      commands[called_cmd].execute(setOutput, command.split(' '), onWindowClose, fs);
    } else {
      setOutput((prevOutput) => [
        ...prevOutput,
        `Unknown command: ${command.split(' ')[0]}`,
      ]);
    }
  };

  return (
    <div className="term_content">
      <div className="output" ref={outputRef}>
        {output.map((line, index) => (
          <div className="output_line" key={index}>
            {line || <>&nbsp;</>}
          </div>
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
  );
}

export default TerminalApp;
