import '../../styles/view/AppFolder.css';
import React, { useState } from 'react';

const Listbox = ({ options, onSelect, default_text="Select attribute"}) => {

    const [selectedOption, setSelectedOption] = useState(default_text);

    const handleChange = (e) => {
        const value = e.target.value;
        setSelectedOption(value);
        onSelect(value);
    };

    return (
        <select className='top_bar_select'
            id="select_attribute"
            defaultValue={selectedOption}
            onClick={(e) => e.stopPropagation()}
            onChange={handleChange}>
            {options.map((option, index) => (
                <option key={index} value={option}>
                {option}
                </option>
            ))}
        </select>
    );
};

export default Listbox;
