
import WindowAppBar from "./WindowAppBar";
import '../styles/view/TerminalWindowFrame.css';
import React, { useState, useRef, cloneElement, useEffect } from 'react';
import Draggable from 'react-draggable';
import { ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css';


function AppWindowTest({title, onWindowClose, children}) {
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
        cloneElement(child, { ...child.props, inputRef}),
    )
  
    return(
      
        <Draggable handle=".term_window" cancel=".bar_button .term_content .file_line" >
            <ResizableBox
              axis="both"
              width={size.width}
              height={size.height}
              minConstraints={[size.width, size.height]}
              maxConstraints={[size.width * 100, size.height * 100]}
              resizeHandles={["sw" , "nw" , "se" , "ne"]} 
              style={{ padding: '3px', border: '1px solid black', boxSizing: 'border-box' }}
            >
              <div className="term_window" ref={contentRef} style={{width: '100%', height: '100%', backgroundColor: 'blue'}}>
                batata
              </div>
            </ResizableBox>
        </Draggable>
     
    )    
}

export default AppWindowTest;

