import React from 'react';
import DefaultButton from '../../../shared/UI/Buttons/DefaultButton/DefaultButton'; 
import classes from './SpinButtons.module.css'; 

const spinButtons = (props) => (
    <div className={classes.SpinButtons}>
        <DefaultButton 
            onClick={props.onClickReset}
            disabled={props.disabled}>Reset
        </DefaultButton> 
        <div className={classes.InfoButton}>
            <DefaultButton 
                onClick={props.onClickInfo}
                width="25px">?
            </DefaultButton> 
        </div>
    </div>
)

export default spinButtons; 
