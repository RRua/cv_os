import '../styles/view/Desktop.css';
import DesktopIcon from './DesktopIcon';
import TerminalApp from './TerminalApp';
import AppFolder from './AppFolder';
import ReadOnlyTextFileApp from './ReadOnlyTextFileApp';

function DesktopArea({onAppOpen, data}) {

    const data_to_icon = (key, value) => { 
        if (Array.isArray(value)) {
            return {   
                icon_type: 'folder',
                name: key,
                onclick: () => { onAppOpen(key, key, <AppFolder name={key} openApp={onAppOpen} data={value}/>) }
            }
        } 
        else {
            return {   
                icon_type: 'file',
                name: key,
                onclick: () => { onAppOpen(key, key, <ReadOnlyTextFileApp content={value}/>) }
            }
        }
    }
    
    return(
        <div className="desktop">
           {Object.keys(data).map(key => {
                return <DesktopIcon key={1} icon={data_to_icon(key, data[key])}/>
})}
        </div>
    )    
}

export default DesktopArea;

