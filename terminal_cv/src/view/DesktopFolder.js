import React, { useState } from 'react';
import '../styles/view/Desktop.css';
import Draggable from 'react-draggable';


const DesktopFolder = ({ folder }) => {

  return (
    <Draggable handle=".desktop_folder">
        <div className="desktop_folder"
            onClick={() => folder.onclick && folder.onclick()}>
            <img src={folder.src} alt={folder.alt} />
            <p>{folder.alt}</p>
        </div>
    </Draggable>
  );
};

export default DesktopFolder;
