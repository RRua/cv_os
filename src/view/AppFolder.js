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

const Listbox = ({ options, onSelect, default_text="Select attribute"}) => {
    const [selectedOption, setSelectedOption] = useState('');
    const handleChange = (e) => {
        const value = e.target.value;
        setSelectedOption(value);
        onSelect(value);
    };

    return (
        <select className='top_bar_select' value={selectedOption} onChange={handleChange}>
            <option value="">{default_text}</option>
            {options.map((option, index) => (
                <option key={index} value={option}>
                {option}
                </option>
            ))}
        </select>
    );
};

const FolderEntry = ({key, icon, name, onclick}) => {
    const [showTooltip, setShowTooltip] = useState(false);
    return  (
        <div key={key} className="folder_entry_linear tooltip-container"
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


const AppFolder = ({name, openApp, data, view_type=ViewType.List, searchBar=true}) => {
    const [dataToShow, setDataToShow] = useState(data);
    const [inputValue, setInputValue] = useState('');
    const [selectedOption, setSelectedOption] = useState('');
    const default_text = "Select attribute";

    const getOptionsOnData = (data) => {
        let keys = new Set();
        data.forEach((file) => {
            Object.keys(file).forEach((key) => keys.add(key));
        });
        return Array.from(keys);
    };

    const handleSelect = (value) => {
        setSelectedOption(value);
        handleInputChange({target: {value: inputValue}});
      };

    const handleInputChange = (value) => {
        setInputValue(value.target.value);
        if (value.target.value === '') {
            setDataToShow(data);
            return;
        }
        const filteredData = data.filter((file) => {
            return Object.keys(file).some((key) => {
                const search_val = (selectedOption === ''|| selectedOption === default_text || !file[selectedOption]) ? key : selectedOption;
                return typeof file === 'object' ? 
                        file[search_val].toString().toLowerCase().includes(value.target.value.toLowerCase()) 
                            : (Array.isArray(file) ? file[search_val].join(", ").toLowerCase().includes(value.target.value.toLowerCase()) 
                                : false);
            });
        });
        setDataToShow(filteredData);
    }

    return (
        <div className="folder_content">
           {searchBar && 
                <div className="folder_top_bar">
                    <Listbox options={getOptionsOnData(data)} onSelect={handleSelect} default_text={default_text} />
                    <input value={inputValue} type="text" placeholder="Search..." onChange={handleInputChange} />
                    {/*<button><img className='top_bar_img' src={require("../assets/search-icon.png")}></img></button>*/}
                </div>  
            }
            {dataToShow.map((file, index) => (
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