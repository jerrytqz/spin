import React from 'react'; 
import classes from './Backdrop.module.css';

const backdrop = (props) => (
	props.show ? <div className={classes.Backdrop} style={{opacity: props.opacity}} onClick={props.clicked}/> : null 
);

export default backdrop; 
