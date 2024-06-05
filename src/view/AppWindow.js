
import WindowAppBar from "./WindowAppBar";
import '../styles/view/TerminalWindowFrame.css';
import React, { useState, useRef, cloneElement } from 'react';
import Draggable from 'react-draggable';


function AppWindow({title, onWindowClose, children}) {
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
        
        <Draggable handle=".term_window" cancel=".bar_button .term_content .file_line" >
            <div className="term_window" style={isMaximized && {height: '99vh', width:'99vw'}} onClick={handleContainerClick}>
                <WindowAppBar title={title} 
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

