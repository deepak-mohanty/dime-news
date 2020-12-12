import React from 'react';
import PropType from 'prop-types';

import '../../assets/styles/checkbox.scss';

const Checkbox = ({label, onChange, checked, name, id}) => {

    return (
      <ul className="unstyled centered">
        <li>
            <input className="styled-checkbox" 
                id={`styled-checkbox-${id}`} 
                type="checkbox" 
                onChange={onChange}
                name={name}
                checked={checked}
            />
            <label htmlFor={`styled-checkbox-${id}`} >{label}</label>
        </li>
      </ul>
    )
};

Checkbox.PropType = {
    checked: PropType.bool.isRequired,
    onChange: PropType.func.isRequired,
    label: PropType.string.isRequired
}

export default Checkbox;