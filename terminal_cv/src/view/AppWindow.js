
import WindowAppBar from "./WindowAppBar";
import '../styles/view/TerminalWindowFrame.css';
import React, { useState, useRef, cloneElement } from 'react';
import Draggable from 'react-draggable';


function AppWindow({onWindowClose, children}) {
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

    const handleContainerClick = () => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      };

    const ChildrenWithProps = React.Children.map(children, child =>
        cloneElement(child, { ...child.props, inputRef}),
    )
  
    return(
        <Draggable handle=".term_window" cancel=".term_bar .bar_button" >
            <div className="term_window" style={isMaximized && {height: '99%', width:'99%'}} onClick={handleContainerClick}>
                <WindowAppBar text="Terminal CV" 
                    onMinimize={toggleMinimize}
                    onMaximize={toggleMaximize}
                    onClose={onWindowClose}
                    isMaximized={isMaximized}
                />
                {!isMinimized && ChildrenWithProps}
            </div>
        </Draggable>
    )    
}

export default AppWindow;

