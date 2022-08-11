import React, { useEffect } from 'react';
import ReactPortal from '../../ReactPortal';
import classes from './Modal.module.css'; 
import Backdrop from '../Backdrop/Backdrop'; 

const Modal = (props) => {
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {document.body.style.overflow = 'unset';}
     }, []);

    const modalClasses = [classes.Modal];
    if (props.animation === 'openPrize') {
        modalClasses.push(classes.OpenPrize);
    }

    return (
        <ReactPortal wrapperID="react-portal-modal-container">
            <Backdrop clicked={props.clicked} style={props.backdropStyle}/>
            {props.background}
            <div className={modalClasses.join(' ')} style={props.style}>{props.children}</div> 
        </ReactPortal>
    );
}; 

export default Modal; 
