import '../../styles/view/AppFolder.css';
import React, { useState } from 'react';

const Listbox = ({ options, onSelect, default_text="Select attribute"}) => {
    const [selectedOption, setSelectedOption] = useState('');
    
    const handleChange = (e) => {
        const value = e.target.value;
        setSelectedOption(value);
        onSelect(value);
    };

    return (
        <select className='top_bar_select'
            id="select_attribute"
            onClick={(e) => e.stopPropagation()}
            value={selectedOption} onChange={handleChange}>
            <option value="">{default_text}</option>
            {options.map((option, index) => (
                <option key={index} value={option}>
                {option}
                </option>
            ))}
        </select>
    );
};

export default Listbox;
