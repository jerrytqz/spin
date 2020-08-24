import React from 'react'; 
import classes from './YesNoButton.module.css';

const yesNoButton = (props) => (
    <button 
        disabled={props.disabled}
        className={[classes.YesNoButton, classes[props.btnType]].join(' ')}
        onClick={props.onClick}>
    {props.children}
    </button>
); 

export default yesNoButton; 