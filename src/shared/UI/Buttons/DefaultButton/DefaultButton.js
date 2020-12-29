import React from 'react';
import classes from './DefaultButton.module.css'; 

const defaultButton = (props) => (
	<button 
		className={classes.DefaultButton}
		onClick={props.onClick} 
		disabled={props.disabled}
		style={{width: props.width}}>{props.children}
	</button>
);

export default defaultButton; 
