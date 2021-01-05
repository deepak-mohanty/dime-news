import React from 'react';
import PropType from 'prop-types';

import '../../assets/styles/checkbox.scss';

const Checkbox = ({label, onChange, checked, value, name, id}) => {

    return (
  
        <li>
            <input className="styled-checkbox" 
                id={`styled-checkbox-${id}`} 
                type="checkbox" 
                onChange={onChange}
                name={name}
                checked={checked}
                value={value}
            />
            <label htmlFor={`styled-checkbox-${id}`} >{label}</label>
        </li>
    )
};

Checkbox.PropType = {
    checked: PropType.bool.isRequired,
    onChange: PropType.func.isRequired,
    label: PropType.string.isRequired
}

export default Checkbox;