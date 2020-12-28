import React from 'react';
import classes from './SellForm.module.css'; 
import Backdrop from '../../../shared/UI/Backdrop/Backdrop';

const sellForm = (props) => (
    <div> 
        <Backdrop show={props.show} clicked={props.clicked} opacity="0.5"/>
        {props.show ?
        <div className={classes.SellForm}>
            {props.children}
        </div> : null} 
    </div>
)

export default sellForm; 
