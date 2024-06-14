import {React, useState} from 'react';
import '../../styles/view/Desktop.css';
import Draggable from 'react-draggable';
import { iconImgFromType } from '../../utils/utils';

const DesktopIcon = ({ icon}) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const handleClick = (e, f) => {
    if (f){
      f();
    } 
  }

  return (
    <Draggable handle=".desktop_icon">
        <div className="desktop_icon"
             onMouseEnter={() => setShowTooltip(true)}
             onMouseLeave={() => setShowTooltip(false)}
            onClick={(e) => handleClick(e, icon.onclick)}>
            <img src={iconImgFromType(icon.icon_type)} alt={icon.name} />
            <p>{icon.name.replace("_", " ")}</p>
            {showTooltip && <div className="tooltip">{icon.name}</div>}
        </div>
    </Draggable>
  );
};

export default DesktopIcon;
