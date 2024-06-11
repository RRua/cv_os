import '../styles/view/Desktop.css';
import DesktopIcon from './DesktopIcon';
import AppFolder from './AppFolder';
import ReadOnlyTextFileApp from './ReadOnlyTextFileApp';
import { Directory } from '../data/data';
import { getFilesURL } from '../utils/utils';

function DesktopArea({onAppOpen, data}) {
    const data_to_icon = (key, value) => { 
        console.log("value", value);
        return {   
                icon_type: value instanceof Directory ? 'folder' : 'file',
                name: value.name,
                onclick: () => { 
                    if (value instanceof Directory){
                        onAppOpen(key, key, <AppFolder name={key} openApp={onAppOpen} data={value}/>)
                    }
                    else {
                        onAppOpen(key, key, <ReadOnlyTextFileApp file={value} 
                            buttonInfo={ value.content.url? {
                                text: "Open",
                                onclick: () => {window.open(`${getFilesURL()}/${key}`, "_blank")}
                                }
                            : null
                            }/>)
                    }
                }
            }
    }
    return(
        <div className="desktop">
           {data.content.map((key, index) => {
                return <DesktopIcon key={data.content[index].name} 
                            icon={data_to_icon(data.content[index].name, key)}/>
})}
        </div>
    )    
}

export default DesktopArea;

