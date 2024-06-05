
import '../styles/view/TextFile.css';
import React from 'react';


function ReadOnlyTextFileApp({content, buttonInfo, onBackInfo}) {
    const keysToIgnore = ['filename'];
    const filteredContent = Object.keys(content).filter(key => !keysToIgnore.includes(key));
    return (
        <div className="file_content" style={{ backgroundColor: 'white' }}>
            <div className="file_top_buttons">
            {onBackInfo && 
                    <button className="file_buttons" onClick={onBackInfo.onclick}>{onBackInfo.text ? onBackInfo.text : "Back"}</button>
                }
                {buttonInfo && 
                    <button className="file_buttons" onClick={buttonInfo.onclick}>{buttonInfo.text ? buttonInfo.text : "Open"}</button>
                }
            </div>
            <div className="file_output">
                {filteredContent.map((key, index) => (
                    <p key={index} className="file_line"><strong>{key}:</strong>  {Array.isArray(content[key]) ? content[key].join(", ") : content[key]}</p>
                  
                ))}
            </div>
        </div>
    );
}

export default ReadOnlyTextFileApp;

