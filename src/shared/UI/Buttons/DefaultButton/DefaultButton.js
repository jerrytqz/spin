import React from 'react';
import classes from './DefaultButton.module.css'; 

const DefaultButton = (props) => (
    <button 
        className={classes.DefaultButton}
        onClick={props.onClick} 
        disabled={props.disabled}
    >
        {props.children}
    </button>
);

export default DefaultButton; 
