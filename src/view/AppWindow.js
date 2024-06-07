
import WindowAppBar from "./WindowAppBar";
import '../styles/view/TerminalWindowFrame.css';
import React, { useState, useRef, cloneElement, useEffect } from 'react';
import Draggable from 'react-draggable';
import { ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css';


function AppWindow({title, onWindowClose, children}) {
    const [isMinimized, setIsMinimized] = useState(false);
    const [isMaximized, setIsMaximized] = useState(false);
    const contentRef = useRef(null);
    const [size, setSize] = useState({ width: 400, height: 400 });
    const [prev_size, prev_setSize] = useState({ width: 400, height: 400 });
    const inputRef = useRef(null);

    useEffect(() => {
      if (contentRef.current) {
        const { offsetWidth, offsetHeight } = contentRef.current;
        setSize({ width: offsetWidth, height: offsetHeight });
      }
    }, [children]);

    const toggleMinimize = () => {
        if (!isMaximized) {
          setIsMinimized(!isMinimized);
        }
     };
      
      const toggleMaximize = () => {
        if (!isMaximized){
          prev_setSize(size);
          setSize({ width: window.innerWidth, height: window.innerHeight });
        }
        else{
          setSize(prev_size);
        }
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
        cloneElement(child, { ...child.props, inputRef, onWindowClose}),
    )
  
    return(
      
        <Draggable handle=".term_window" cancel=".bar_button .term_content .file_line folder_content" >
            <ResizableBox
              axis="both"
              width={size.width}
              height={size.height}
              minConstraints={[size.width, size.height]}
              maxConstraints={[size.width * 100, size.height * 100]}
              resizeHandles={["sw" , "se" , "ne"]} 
            >
              <div ref={contentRef} className="term_window" style={{height: isMinimized? 'fit-content' : '100%'}}  onClick={handleContainerClick}>
                  <WindowAppBar title={title} 
                      onMinimize={toggleMinimize}
                      onMaximize={toggleMaximize}
                      onClose={onWindowClose}
                      isMaximized={isMaximized}
                  />
                  {!isMinimized && ChildrenWithProps}
              </div>
            </ResizableBox>
        </Draggable>
     
    )    
}

export default AppWindow;

