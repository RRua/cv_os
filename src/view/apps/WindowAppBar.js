import '../../styles/view/AppWindow.css';


function MacOsAppBar({title, isMaximized, onClose, onMinimize, onMaximize}) {
    return (
        <div className="buttons need_interaction">
                <div className="bar_button mac_button mac_button_close" onClick={onClose}>
                    <div>x</div>
                </div>
                <div className={`bar_button mac_button ${isMaximized ? 'button_disabled' : 'mac_button_minimize'}`} 
                        onClick={onMinimize}>
                    <div>{isMaximized? '': '-'}</div>
                </div>
                <div className="bar_button mac_button mac_button_maximize" onClick={onMaximize}>
                    <div>⥯</div>
                </div>
            </div>
    )
}

function UbuntuAppBar({title, isMaximized, onClose, onMinimize, onMaximize}) {
    return (
        <div className="app_bar" style={{alignItems: 'center'}}>
            <div className="bar_header">{title}</div>
            <div className="buttons need_interaction">
                <div className={`ubuntu_button ${isMaximized ? 'button_disabled' : ''}`} 
                        onClick={onMinimize}>
                    <div>{isMaximized? '': '-'}</div>
                </div>
                <div className="ubuntu_button" onClick={onMaximize}>
                    <div>□</div>
                </div>
                <div className="ubuntu_button" onClick={onClose}>
                    <div>x</div>
                </div>
            </div>
        </div>
    )
}




function WindowsAppBar({title, isMaximized, onClose, onMinimize, onMaximize, file_type='folder'}) {
    
    return (
        <div className="app_bar">
            <div className='windows_bar_header'>
                <img src={file_type === 'folder' ? require('../../assets/folder-icon.png'): require('../../assets/file-icon.png') } alt="Windows Icon" />
                <div>{title}</div>
            </div>
            <div className="buttons need_interaction">
                
                <button className={`windows_bar_button ${isMaximized ? 'disabled' : 'minimize'}`} onClick={onMinimize}>
                -
                </button>
                <button className="windows_bar_button maximize" onClick={onMaximize}>□</button>
                <button className="windows_bar_button windows_button_close" onClick={onClose}>
                    x
                </button>
            </div>
        </div>
    )
}

export {MacOsAppBar, WindowsAppBar, UbuntuAppBar};

