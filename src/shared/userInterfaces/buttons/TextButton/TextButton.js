import React from 'react'; 
import classes from './TextButton.module.css';

const TextButton = (props) => (
    <button 
        className={classes.TextButton}
        onClick={props.onClick}
        style={props.style}
    >
        {props.children}
    </button>
); 

export default TextButton; 