import '../styles/view/AppWindow.css';


function WindowAppBar({title, isMaximized, onClose, onMinimize, onMaximize}) {
    
    return (
        <div className="app_bar">
            <div className="buttons">
                <div className="bar_button close" onClick={onClose}></div>
                <div className={`bar_button ${isMaximized ? 'disabled' : 'minimize'}`} onClick={onMinimize}></div>
                <div className="bar_button maximize" onClick={onMaximize}></div>
            </div>
            <div className="bar_header">{title}</div>
        </div>
    )
}

export default WindowAppBar;

