import '../styles/view/TerminalWindowFrame.css';


function WindowAppBar({text, isMaximized, onClose, onMinimize, onMaximize}) {
    
    return(
        <div className="term_bar">
            <div className="buttons">
                <div className="bar_button close" onClick={onClose}></div>
                <div className={`bar_button ${isMaximized? 'disabled': 'minimize'}`} onClick={onMinimize}></div>
                <div className="bar_button maximize" onClick={onMaximize}></div>
            </div>
            
            <div className="bar_header">{text}</div>
        </div>
    )    
}

export default WindowAppBar;

