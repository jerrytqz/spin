import React from 'react';
import YesNoButton from '../../shared/UI/Buttons/YesNoButton/YesNoButton'; 
import LoadingSpinner from '../../shared/UI/LoadingSpinner/LoadingSpinner'; 
import classes from './ListForm.module.css'; 
import Modal from '../../shared/UI/Modal/Modal'; 

const ListForm = (props) => (
    <Modal 
        style={{borderRadius: '0'}} 
        show={props.show} 
        clicked={props.clicked} 
        backdropStyle={{opacity: '0.5'}}
    >
        {!props.loading
            ? 
                <>
                    <div className={classes.Title}>{props.name}</div>
                    {props.children}
                    {props.error ? <div className={classes.Error}>{props.error}</div> : null}
                    <YesNoButton 
                        btnType="Yes" 
                        disabled={props.disabled}
                        onClick={props.submitHandler}
                        style={{width: '100%'}}
                    >
                        {props.buttonText}
                    </YesNoButton>
                </>
            : <LoadingSpinner/>
        }
    </Modal> 
);

export default ListForm; 
