import {React, useState} from 'react';
import DesktopIcon from './DesktopIcon';
import '../styles/view/AppFolder.css';
import ReadOnlyTextFileApp from './ReadOnlyTextFileApp';
import { iconImgFromType, getFilesURL} from '../utils/utils';


class ViewType {
    static Grid = new ViewType("grid")
    static List = new ViewType("list")
    constructor(name) {
      this.name = name
    }
  }

const FolderEntry = ({key, icon, name, onclick}) => {
    const [showTooltip, setShowTooltip] = useState(false);
    return  (
        <div key={key} className="folder_entry_linear"
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            onClick={onclick}>
            <img src={iconImgFromType(icon)} alt={name} />
            <p>{name}</p>
            {showTooltip && <div className="line_tooltip">{name}</div>}
        </div>
    );
};


const AppFolder = ({name, openApp, data, view_type=ViewType.List}) => {
    return (
        <div className="folder_content">
            {data.map((file, index) => (
                view_type === ViewType.Grid ?
                    <DesktopIcon  key={index} 
                    icon={{
                            icon_type: 'file',
                            name: file.title,
                            onclick: () => {
                                openApp(file.filename, file.filename,
                                    <ReadOnlyTextFileApp content={file} buttonInfo={{
                                            text: "Open File",
                                            onclick: () => {window.open(file.url? file.url : `${getFilesURL()}/${file.filename}`, "_blank")}
                                    }
                                    }/>)
                            }
                    }}/>
                : <FolderEntry key={index} icon={file.icon} name={file.title} 
                        onclick={() => {
                                openApp(file.filename, file.filename,
                                    <ReadOnlyTextFileApp content={file} 
                                    buttonInfo={{
                                        text: "Open File",
                                        onclick: () => {window.open(file.url? file.url : `${getFilesURL()}/${file.filename}`, "_blank")}
                                    }}
                                    onBackInfo={{
                                        text: "Back",
                                        onclick: () => {openApp(name, name, <AppFolder name={name} openApp={openApp} data={data} view_type={ViewType.List}/>)}
                                    }}/>)
                            }}>
                            </FolderEntry>

            ))}
        </div>
    );
};

export default AppFolder;