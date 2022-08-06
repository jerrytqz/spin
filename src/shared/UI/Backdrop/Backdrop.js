import React from 'react'; 
import classes from './Backdrop.module.css';

const Backdrop = (props) => (
    props.show ? <div className={classes.Backdrop} style={props.style} onClick={props.clicked}/> : null 
);

export default Backdrop; 
