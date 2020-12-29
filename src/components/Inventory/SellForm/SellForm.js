import React from 'react';
import classes from './SellForm.module.css'; 
import Backdrop from '../../../shared/UI/Backdrop/Backdrop';
import YesNoButton from '../../../shared/UI/Buttons/YesNoButton/YesNoButton'; 
import LoadingSpinner from '../../../shared/UI/LoadingSpinner/LoadingSpinner'; 

const sellForm = (props) => (
    <div> 
        <Backdrop show={props.show} clicked={props.clicked} opacity="0.5"/>
        {
            props.show 
                ?
                    <div className={classes.SellForm}>
                        {
                            !props.listItemLoading 
                                ? 
                                    <>
                                        <div style={{textAlign: "center", fontSize: "1.4em"}}>{props.currentItemName}</div>
                                        {props.children}
                                        <YesNoButton 
                                            btnType="Yes" 
                                            disabled={!props.formIsValid}
                                            onClick={props.submitHandler}
                                        >
                                            {props.buttonText}
                                        </YesNoButton>
                                        <div style={{textAlign: "center", color: "red"}}>{props.listError}</div> 
                                    </>
                                : <LoadingSpinner/>
                        }
                    </div> 
                : null
        } 
    </div>
)

export default sellForm; 
