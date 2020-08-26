import React from 'react';
import classes from './Modal.module.css'; 
import Backdrop from '../Backdrop/Backdrop'; 
import fireworkClasses from './Fireworks.module.css'; 

const modal = (props) => {
    let modalClasses = [classes.Modal];
    if (props.animation === 'openPrize') {
        modalClasses.push(classes.OpenPrize);
    }

    return (
        <div> 
            <Backdrop show={props.show} clicked={props.clicked}/>
            {props.show ?
            <div className={modalClasses.join(' ')}>
                {props.children}
            </div> : null}
            {props.animation === 'openPrize' ? 
            <div className={fireworkClasses.Pyro}>
                <div className={fireworkClasses.Before}></div>
                <div className={fireworkClasses.After}></div>
            </div> : null}
        </div>
    )
} 

export default modal; 
