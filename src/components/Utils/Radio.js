import React from 'react';
import '../../assets/styles/radio.scss';

const RadioButton = (props) => {

    return (
        <label className="radio_wrapper">
            <input type="radio" value={props.value}
                onChange={props.onChange} 
                checked={props.selected === props.name} />
            <span>{props.name}</span>
        </label>
    )

}

export default RadioButton;
