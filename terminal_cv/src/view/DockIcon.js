import React, { useState } from 'react';
import '../styles/view/DockIcon.css';


const DockIcon = ({ icon }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div
      className="dock-icon"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      onClick={() => icon.onclick && icon.onclick()}
    >
      <img src={icon.src} alt={icon.alt} />
      {showTooltip && <div className="tooltip">{icon.alt}</div>}
    </div>
  );
};

export default DockIcon;
