import React from 'react';
import classes from './Spinner.module.css'; 
import Backdrop from '../../shared/UI/Backdrop/Backdrop';
import Modal from '../../shared/UI/Modal/Modal'; 

const Spinner = (props) => { 
    const INITIAL_SPIN_DEGREE = 360 * 35; // Degrees that spinner goes through before props.degree

    let spinnerText = (
        <div>
            <div className={classes.SpinnerText1}>SPIN</div>
            <div className={classes.SpinnerText2}>-{props.spinPrice} SP</div>
        </div>
    );
    let disabled = props.spinInSession; 

    if (props.buySpinLoading) {
        spinnerText = <div className={classes.SpinnerText4}>PURCHASING...</div>;
        disabled = true;
    } else if (!props.authenticated) {
        spinnerText = <div className={classes.SpinnerText3}>LOG IN TO SPIN</div>;
        disabled = true; 
    } else if (props.sp < props.spinPrice) {
        spinnerText = <div className={classes.SpinnerText3}>NOT ENOUGH SP</div>;
        disabled = true; 
    }

    let transition = 'transform 0s'; 
    let spinDegree = 0; 
    let transitionEndFunc = () => {};

    if (props.spinInSession) {
        spinDegree = props.degree + INITIAL_SPIN_DEGREE;
        transition = 'transform 10s cubic-bezier(0, 1, 0, 1)';  
        transitionEndFunc = !props.resetting ? props.onShowPrize : props.onFinishResettingSpin;
    }
    if (props.resetting) {
        transition = 'transform 0.5s';
        spinDegree = INITIAL_SPIN_DEGREE;
        // If props.degree === 0, a full 360-degree CCW rotation will be the resetting transition.
        if (props.degree === 0) {
            spinDegree = INITIAL_SPIN_DEGREE - 360;
        }
    } 

    return (
        <>
            <div className={classes.Spinner}>
                <button 
                    className={classes.SpinnerButton}
                    onClick={props.onStartSpin} 
                    disabled={disabled}
                    style={{transform: `rotate(${spinDegree}deg)`, transition: transition}}
                    onTransitionEnd={transitionEndFunc}
                > 
                    {(!props.spinInSession) ? spinnerText : null}
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
            </div>
            {props.buySpinLoading || (props.spinInSession && !props.showPrize)
                ? <Backdrop portal style={{opacity: '0'}}/> 
                : null
            }
            {props.buySpinError 
                ?
                    <Modal clicked={props.onClickBackdrop}>
                        <div style={{color: 'red'}}>{props.buySpinError}</div>
                    </Modal> 
                : null 
            }
        </>
    );
};

export default Spinner; 
