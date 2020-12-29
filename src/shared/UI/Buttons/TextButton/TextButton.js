import React from 'react'; 
import classes from './TextButton.module.css';

const textButton = (props) => (
	<button 
		className={classes.TextButton}
		onClick={props.onClick}>
		{props.children}
	</button>
); 

export default textButton; 