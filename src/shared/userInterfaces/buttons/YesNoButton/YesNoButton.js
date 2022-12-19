import React from 'react'; 
import classes from './YesNoButton.module.css';

const YesNoButton = (props) => (
    <button 
        disabled={props.disabled}
        className={[classes.YesNoButton, classes[props.btnType]].join(' ')}
        onClick={props.onClick}
        style={props.style}
    >
        {props.children}
    </button>
); 

export default YesNoButton; 