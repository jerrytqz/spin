import React from 'react'; 
import classes from './Backdrop.module.css';

const Backdrop = (props) => (
    <div className={classes.Backdrop} style={props.style} onClick={props.clicked}/>
);

export default Backdrop; 
