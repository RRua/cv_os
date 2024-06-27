import React from 'react';
import '../../styles/view/Dock.css';
import DockIcon from './DockIcon';
import { AppContext } from '../../hooks/AppContext';

const Dock = ({icons}) => {
  
  const {feel, theme} = React.useContext(AppContext);

  const feel_style = (feel) => {
    if (feel.isMacOs()){
      return '';
    }
    else if (feel.isWindows()){
      return 'windows_dock';
    }
    else if (feel.isUbuntu()){
      return 'ubuntu_dock';
    }
    return '';
  };

  return (
    <div className={`dock ${feel_style(feel)} ${theme.name.toLowerCase()}`}>
      {icons.map((icon, index) => (
        <DockIcon key={index} icon={icon}/>
      ))}
    </div>
  );
};

export default Dock;
