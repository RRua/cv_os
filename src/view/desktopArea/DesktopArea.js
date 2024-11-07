import '../../styles/view/Desktop.css';
import React from 'react';
import DesktopIcon from './DesktopIcon';
import AppFolder from '../apps/AppFolder';
import FileApp from '../apps/FileApp';
import { Directory } from '../../data/data';
import { getFilesURL } from '../../utils/utils';
import { AppContext } from '../../hooks/AppContext';


function DesktopArea({data}) {

    const {addApp} = React.useContext(AppContext);

    const data_to_icon = (key, value) => { 
        return {   
                icon_type: value instanceof Directory ? 'folder' : 'file',
                name: value.name,
                onclick: () => { 
                    if (value instanceof Directory){
                        addApp(key, 
                            <AppFolder name={key} openApp={addApp} data={value}/>
                        )
                    }
                    else {
                        addApp(key, <FileApp file={value} 
                            buttonInfo={ (value.content.url || value.content.filename)? {
                                text: "Open",
                                onclick: () => {
                                    window.open(value.content.url ? value.content.url 
                                        : `${getFilesURL()}/${value.getFilePath()}`, "_blank")}
                                }
                            : null
                            }
                            />)
                    }
                }
            }
    }
    return(
        <div className="desktop">
           {data && Object.keys(data).length > 0 && data.content.map((key, index) => {
                return <DesktopIcon key={data.content[index].name} 
                            icon={data_to_icon(data.content[index].name, key)}/>
})}
        </div>
    )    
}

export default DesktopArea;

