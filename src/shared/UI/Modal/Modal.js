import React from 'react';
import classes from './Modal.module.css'; 
import Backdrop from '../Backdrop/Backdrop'; 

const Modal = (props) => {
    const modalClasses = [classes.Modal];
    if (props.animation === 'openPrize') {
        modalClasses.push(classes.OpenPrize);
    }

    return (
        <div> 
            <Backdrop show={props.show} clicked={props.clicked} style={props.backdropStyle}/>
            {props.show 
                ? <div className={modalClasses.join(' ')} style={props.style}>{props.children}</div> 
                : null
            }
        </div>
    );
}; 

export default Modal; 
