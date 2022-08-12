import React from 'react'; 
import ReactPortal from '../../ReactPortal';
import classes from './Backdrop.module.css';

const Backdrop = (props) => (props.portal 
    ? 
        <ReactPortal wrapperID="react-portal-backdrop-container">
            <div className={classes.Backdrop} style={props.style} onClick={props.clicked}/>
        </ReactPortal>
    : <div className={classes.Backdrop} style={props.style} onClick={props.clicked}/>
);

export default Backdrop; 
