
import { STRINGS } from '../constants/strings';
import '../styles/view/TextFile.css';
import React from 'react';


function ReadOnlyTextFileApp({file, buttonInfo, onBackInfo}) {
    const keysToIgnore = []; //['filename'];
    const filteredContent = Object.keys(file.content).reduce((acc, key) => {
        if (!keysToIgnore.includes(key)){
            acc[key] = file.content[key];
        }
        return acc;
    }, {});
    
    const handleMouseDown = (event) => {
        event.stopPropagation(); // Prevent the drag event from being triggered
      };

    return (
        <div className="file_window">
            <div className="file_top_buttons">
                {onBackInfo && 
                    <button className="file_button" 
                        onClick={onBackInfo.onclick}>{onBackInfo.text ? onBackInfo.text : STRINGS.APP_FOLDER.BACK_BUTTON}
                    </button>
                }
                {buttonInfo && 
                    <button className="file_button" 
                        onClick={buttonInfo.onclick}>{buttonInfo.text ? buttonInfo.text :  STRINGS.APP_FOLDER.OPEN_BUTTON}
                    </button>
                }
            </div>
            <div className="file_content">
                <div className="file_output" onMouseDown={handleMouseDown} >
                    {Object.keys(filteredContent).map((key, index) => (
                        <p key={index} className="file_line">
                            <strong>{key}: </strong>{Array.isArray(filteredContent[key]) 
                                ? filteredContent[key].join(", ") : filteredContent[key]}
                        </p>
                    
                    ))}
                </div>
            </div>
        </div> 
    );
}

export default ReadOnlyTextFileApp;

