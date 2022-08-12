import React from 'react'; 
import classes from './LoadingSpinner.module.css';

const LoadingSpinner = (props) => {
    return (
        <div style={props.style} className={classes.LoadingSpinner}/>
    );
};



export default LoadingSpinner; 
