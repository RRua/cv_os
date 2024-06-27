
import '../../styles/view/AppWindow.css';
import React, { useState, useRef, cloneElement, useEffect } from 'react';
import Draggable from 'react-draggable';
import { ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css';
import { AppContext } from '../../hooks/AppContext';

function AppWindow({itemKey, title, onWindowClose, children}) {
    const [isMinimized, setIsMinimized] = useState(false);
    const [isMaximized, setIsMaximized] = useState(false);
    const contentRef = useRef(null);
    const [size, setSize] = useState({ width: 400, height: 300 });
    const [prev_size, prev_setSize] = useState({ width: 400, height: 300 });
    const inputRef = useRef(null);
    const {feel, windowFactory} = React.useContext(AppContext);
    
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
        cloneElement(child, { ...child.props, inputRef, onWindowClose, itemKey}),
    )

    const onCloseWindow = (e) => {
      onWindowClose(e, itemKey);
    }

    const getBar = () => {
      return windowFactory.createAppBar(
        {title, isMaximized, onClose: onCloseWindow,
           onMinimize: toggleMinimize, onMaximize: toggleMaximize}
      );
    }
    const getCorners = () => {
      if (isMinimized){
        return [];
      }
      const top_corner = feel.isMacOs() ? "ne" : "nw";
      return [top_corner, "se" , "sw"];
    }
    
    return(
      
        <Draggable handle=".app_window" 
          cancel=".need_interaction"
          bounds="parent"
          >
            <ResizableBox
              axis="both"
              width={isMinimized ? 'fit-content' : size.width}
              height={size.height}
              onMouseDown={(e) => e.stopPropagation()}
              minConstraints={[size.width, size.height]}
              maxConstraints={[size.width * 100, size.height * 100]}
              resizeHandles={getCorners()} 
              style={{border: '2px solid #0000', position: 'relative', 'pointerEvents': 'auto'}}
            >
              <div ref={contentRef} className="app_window" style={{height: isMinimized? 'fit-content' : '100%'}}  onClick={handleContainerClick}>
                  {getBar()}
                  {!isMinimized && ChildrenWithProps}
              </div>
            </ResizableBox>
        </Draggable>
     
    )    
}

export default AppWindow;

