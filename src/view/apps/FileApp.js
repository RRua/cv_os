
import { STRINGS } from '../../constants/strings';
import '../../styles/view/TextFile.css';
import {React, useState, useEffect} from 'react';
import Markdown from 'react-markdown'
import { getFilesURL } from '../../utils/utils';


const FileTopBar = ({onBackInfo, buttonInfo}) => {
    return (<div className="file_top_buttons">
        {onBackInfo && 
            <button className="file_button need_interaction" 
                onClick={onBackInfo.onclick}
            >
                {onBackInfo.text ? onBackInfo.text : STRINGS.APP_FOLDER.BACK_BUTTON}
            </button>
        }
        {buttonInfo && 
            <button className="file_button need_interaction" 
                onClick={buttonInfo.onclick}
            >
                {buttonInfo.text ? buttonInfo.text :  STRINGS.APP_FOLDER.OPEN_BUTTON}
            </button>
        }
    </div>);
}


function FileApp({file, buttonInfo, onBackInfo}) {
    const [fileContent, setFileContent] = useState("");
    const keysToIgnore = ['filename'];
    const filteredContent = Object.keys(file.content).reduce((acc, key) => {
        if (!keysToIgnore.includes(key)){
            acc[key] = file.content[key];
        }
        return acc;
    }, {});
    
    const handleMouseDown = (event) => {
        event.stopPropagation(); // Prevent the drag event from being triggered
      };

    useEffect(() => {
        const fetchMarkdown = async () => {
            try {
                if(file.content.type && file.content.type === 'markdown'){
                    const fp = file.getFilePath();
                    console.log("fetching markdown file: ", fp);
                    console.log(getFilesURL());
                    const response = await fetch(fp);
                    const text = await response.text();
                    setFileContent(text);
                }
                else{
                    setFileContent("no filepath key provided in json file");
                }
            } catch (error) {
              console.error('Error fetching markdown file:', error);
            }
          };
        fetchMarkdown();
      }, [file]);
    

    return (
        <div className="file_window">
            <FileTopBar onBackInfo={onBackInfo} buttonInfo={buttonInfo}/>
            <div className="file_content need_interaction">
                    {
                    (file.content.type && file.content.type === 'markdown') ?
                    (   <div className="file_output" onMouseDown={handleMouseDown} >
                        <Markdown on>{fileContent}</Markdown> 
                        </div>) 
                    :
                    (
                        <div className="file_output" onMouseDown={handleMouseDown} >
                            {Object.keys(filteredContent).map((key, index) => (
                        <p key={index} className="file_line">
                            <strong>{key}: </strong>{Array.isArray(filteredContent[key]) 
                                ? filteredContent[key].join(", ") : filteredContent[key]}
                        </p>
                    ))}</div>)}
            </div>
        </div> 
    );
}

export default FileApp;

