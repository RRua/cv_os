import React, {useState} from 'react';
import '../../styles/view/AppFolder.css';
import '../../styles/view/TextFile.css';
import FileApp from './FileApp';
import { iconImgFromType, getFilesURL} from '../../utils/utils';
import { Directory } from '../../data/data';
import { STRINGS } from '../../constants/strings';
import { AppContext } from '../../hooks/AppContext';
import Listbox from '../misc/Listbox';

class ViewType {
    static Grid = new ViewType("grid")
    static List = new ViewType("list")
    constructor(name) {
      this.name = name
    }
  }

const FolderEntry = ({fkey, icon, name, onclick}) => {
    const [showTooltip, setShowTooltip] = useState(false);
    return  (
        <div key={fkey} className="folder_entry_linear tooltip-container"
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            onClick={onclick}  
            >
            <img src={iconImgFromType(icon)} alt={name} />
            <p>{name}</p>
            {showTooltip && <div className="line_tooltip">{name}</div>}
        </div>
    );
};


const AppFolder = ({itemKey, name, openApp, data, view_type=ViewType.List, searchBar=true}) => {
    const [dataToShow, setDataToShow] = useState(data.content);
    const [currData, setCurrData] = useState(data);
    const [inputValue, setInputValue] = useState('');
    const [selectedOption, setSelectedOption] = useState('');
    const [options, setOptions] = useState([]);
    const {replaceApp} = React.useContext(AppContext);

    const getOptionsOnData = (data) => {
        if (data.content.length === 0) {
                return options;
        }
        let keys = new Set();
        data.content.forEach((file) => {
            if (file instanceof Directory){
                keys.add('name');
            }
            else {
                Object.keys(file.content).forEach((key) => {
                    keys.add(key);
                });
            }
        });
        const opt = Array.from(keys);
        if (options.length !== opt.length){
            setOptions(opt);
        }
        return options;
    };


    const handleSelect = (value) => {
        setSelectedOption(value);
        handleInputChange({target: {value: inputValue}});
      };

    const handleInputChange = (value) => {
        setInputValue(value.target.value);
        const filteredData = currData.content.filter((file) => {
            if (file.name.toString().toLowerCase().includes(value.target.value.toString().toLowerCase())){    
                return true;
            }
            return Object.keys(file.content).some((key) => {
                return key === selectedOption && file.content[key].toString().toLowerCase().includes(value.target.value.toLowerCase());
                });
        });
        setDataToShow(filteredData);
    }

    return (
        <div className="folder_content need_interaction">
           {searchBar && 
                <div className="folder_top_bar">
                    <button className="file_button" 
                        disabled={!currData.parentDirectory}
                        onClick={() => {
                            setDataToShow(currData.parentDirectory ? currData.parentDirectory.content : dataToShow);
                            setCurrData(currData.parentDirectory? currData.parentDirectory : currData);
                            }
                        }>
                    {STRINGS.APP_FOLDER.BACK_BUTTON}
                    </button>
                    <Listbox options={getOptionsOnData(currData)} onSelect={handleSelect} default_text={STRINGS.APP_FOLDER.SELECT_TEXT} />
                    <input id="search" value={inputValue} type="text" placeholder={STRINGS.APP_FOLDER.SEARCH_PLACEHOLDER} onChange={handleInputChange} />
                </div>  
            }
            <div className="folder_content">
                {   dataToShow &&
                    dataToShow.map((file, index) => (
                        <FolderEntry key={index} fkey={index} icon={file instanceof Directory ? 'folder': 'file'} name={file.name} 
                            onclick={() => {
                                if (file instanceof Directory){
                                    setDataToShow(file.content);
                                    setCurrData(file);
                                    replaceApp(itemKey, file.name,
                                        <AppFolder name={file.name} openApp={openApp} 
                                        data={file}/>)
                                }
                                else {
                                   
                                    replaceApp(itemKey, file.name,
                                        <FileApp file={file} 
                                        buttonInfo={ file.content.url? {
                                            text: STRINGS.APP_FOLDER.OPEN_BUTTON,
                                            onclick: () => {window.open(file.content.url? file.content.url : `${getFilesURL()}/${file.content.filename}`, "_blank")}
                                        }: null}
                                        onBackInfo={{
                                            text: STRINGS.APP_FOLDER.BACK_BUTTON,
                                            onclick: () => {replaceApp(itemKey, name, <AppFolder name={name} openApp={openApp} data={currData} view_type={ViewType.List}/>)}
                                        }}/>)
                                    }
                                }}>
                        </FolderEntry>))
                }
            </div>
        </div>
    );
};

export default AppFolder;