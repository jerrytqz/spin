import React from 'react';
import YesNoButton from '../../shared/UI/Buttons/YesNoButton/YesNoButton'; 
import LoadingSpinner from '../../shared/UI/LoadingSpinner/LoadingSpinner'; 
import classes from './ListForm.module.css'; 
import Modal from '../../shared/UI/Modal/Modal'; 

const listForm = (props) => (
    <Modal 
        style={{borderRadius: '0'}} 
        show={props.show} 
        clicked={props.clicked} 
        backdropStyle={{opacity: '0.5'}}
    >
        {!props.listItemLoading 
            ? 
                <>
                    <div className={classes.Title}>{props.currentItemName}</div>
                    {props.children}
                    <YesNoButton 
                        btnType="Yes" 
                        disabled={props.disabled}
                        onClick={props.submitHandler}
                        style={{width: '100%'}}
                    >
                        {props.buttonText}
                    </YesNoButton>
                    {props.error ? <div className={classes.Error}>{props.error}</div> : null}
                </>
            : <LoadingSpinner/>
        }
    </Modal> 
);

export default listForm; 
