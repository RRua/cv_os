import React, {useState} from 'react';
import '../../styles/view/Desktop.css';
import Draggable from 'react-draggable';
import { iconImgFromType } from '../../utils/utils';
import { AppContext } from '../../hooks/AppContext';

const DesktopIcon = ({ icon}) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const {feel} = React.useContext(AppContext);

  const handleClick = (e, f) => {
    if (f){
      f();
    } 
  }

  return (
    <Draggable cancel='.need_interaction'
       handle=".desktop_icon" onMouseDown={(e)=> e.stopPropagation()}>
        <div className="desktop_icon need_interaction"
             onMouseEnter={() => setShowTooltip(true)}
             onMouseLeave={() => setShowTooltip(false)}
            onClick={(e) => handleClick(e, icon.onclick)}>
            <img src={iconImgFromType(icon.icon_type, feel.name)} alt={icon.name} />
            <p>{icon.name.replace("_", " ")}</p>
            {showTooltip && <div className="tooltip">{icon.name}</div>}
        </div>
    </Draggable>
  );
};

export default DesktopIcon;
