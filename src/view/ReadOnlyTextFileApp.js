
import '../styles/view/TextFile.css';
import React from 'react';


function ReadOnlyTextFileApp({file, buttonInfo, onBackInfo}) {
    const keysToIgnore = ['filename'];
    console.log("file", file);
    const filteredContent = Object.keys(file.content).reduce((acc, key) => {
        if (!keysToIgnore.includes(key)){
            acc[key] = file.content[key];
        }
        return acc;
    }, {});
    console.log("filteredContent", filteredContent);
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
                {Object.keys(filteredContent).map((key, index) => (
                    <p key={index} className="file_line">
                        <strong>{key}: </strong>{Array.isArray(filteredContent[key]) 
                            ? filteredContent[key].join(", ") : filteredContent[key]}
                    </p>
                  
                ))}
            </div>
        </div>
    );
}

export default ReadOnlyTextFileApp;

