import React from 'react';
import '../../styles/view/Dock.css';
import DockIcon from './DockIcon';

const Dock = ({icons}) => {
 
  return (
    <div className="dock">
      {icons.map((icon, index) => (
        <DockIcon key={index} icon={icon}/>
      ))}
    </div>
  );
};

export default Dock;
