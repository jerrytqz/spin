import React from 'react';
import classes from './Spinner.module.css'; 
import Modal from '../../shared/UI/Modal/Modal'; 

const spinner = (props) => { 
    let spinnerText = (
        <div>
            <div className={classes.SpinnerText1}>SPIN</div>
            <div className={classes.SpinnerText2}>-500 SP</div>
        </div>
    );
    let disabled = false; 

    if (props.buySpinLoading) {
        spinnerText = (
            <div className={classes.SpinnerText4}>PURCHASING...</div>
        );
    }

    if (!props.authenticated) {
        spinnerText = (
            <div className={classes.SpinnerText3}>LOG IN TO SPIN</div>
        );
        disabled = true; 
    } else if (props.sp < 500) {
        spinnerText = (
            <div className={classes.SpinnerText3}>NOT ENOUGH SP</div>
        ); 
        disabled = true; 
    }

    let spinDegree = props.degree + 1800; 
    let transition = 'transform 0.7s cubic-bezier(0, 0, 0.001, 1)';  
    
    if (props.degree === 0) {
        spinDegree = 0; 
    } 
    if (props.resetting) {
        spinDegree = 1800;
    } 
    if (!props.startButtonPressed) {
        transition = 'transform 0s cubic-bezier(0, 0, 0.001, 1)'; 
        spinDegree = 0; 
    }

    return (
        <div className={classes.Spinner}>
            <button 
                className={classes.SpinnerButton}
                onClick={props.startSpinHandler} 
                disabled={disabled ? disabled : props.startButtonPressed}
                style={{transform: `rotate(${spinDegree}deg)`, transition: transition}}
                onTransitionEnd={(event) => props.onSpinFinish(event)}
            > 
                {(props.degree === 0 && props.showSpinnerText) ? spinnerText : null}
                <div className={classes.Pointer}/>
            </button>
            <ul className={classes.RarityCircle}>
                <li className={classes.liCustom}/>
                <li className={classes.liCustom}/>
                <li className={classes.liCustom}/>
                <li className={classes.liCustom}/>
                <li className={classes.liCustom}/>
                <li className={classes.liCustom}/>
                <li className={classes.liCustom}/>
                <li className={classes.liCustom}/>
                <li className={classes.liCustom}/>
                <li className={classes.liCustom}/>
                <li className={classes.liCustom}/>
            </ul>
            <Modal show={props.buyError} clicked={props.onClickBackdrop}>
                <div style={{color: 'red'}}>{props.buyError}</div>
            </Modal> 
        </div>
    );
};

export default spinner; 
