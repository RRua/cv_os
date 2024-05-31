import '../styles/view/Desktop.css';
import DesktopFolder from './DesktopFolder';

function DesktopArea() {

    const default_folders = [
        {   src: require('../assets/folder-icon.png'),
            alt: 'Publications',
        },
        {   src: require('../assets/folder-icon.png'),
            alt: 'Projects',
        },
        {   src: require('../assets/folder-icon.png'),
        alt: 'Batata',
        },
        {   src: require('../assets/folder-icon.png'),
            alt: 'Tremoco',
        },

      ];
    
    return(
        <div className="desktop">
            {default_folders.map((folder, index) => (
                <DesktopFolder key={index} folder={folder}/>
            ))}
        </div>
    )    
}

export default DesktopArea;

