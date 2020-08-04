import React from 'react';
import classes from './Spinner.module.css'; 

const spinner = (props) => { 
    let spinnerText = (
        <div>
            <div className={classes.SpinnerText1}>SPIN</div>
            <div className={classes.SpinnerText2}>-500 SP</div>
        </div>
    );
    let spinDegree = props.spinDegree; 
    let transition = 'transform 0.7s cubic-bezier(0, 0, 0.001, 1)';  
    
    if (props.resetting) {
        spinDegree = 1800;
    }

    if (!props.startButtonPressed) {
        transition = 'transform 0s cubic-bezier(0, 0, 0.001, 1)'; 
        spinDegree = 0; 
    }
    return(
        <div>
            <button 
                className={classes.Spinner}
                onClick={props.startSpinHandler} 
                disabled={props.startButtonPressed}
                style={{transform: `rotate(${spinDegree}deg)`, transition: transition}}> 
                    {!props.startButtonPressed ? spinnerText : null}
                    <span 
                        className={classes.Pointer} 
                        style={{transform: `rotate(0 - ${spinDegree}deg)`, transition: transition}}/>
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
            </ul>
        </div>
    )
}

export default spinner; 
