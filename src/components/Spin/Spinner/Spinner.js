import React from 'react';
import classes from './Spinner.module.css'; 

const spinner = (props) => { 
    let spinnerText = 
        <div>
            <div className={classes.SpinnerText1}>SPIN</div>
            <div className={classes.SpinnerText2}>-500 SP</div>
        </div>

    return(
        <div>
            <button 
                className={classes.Spinner} 
                onClick={props.startSpin} 
                disabled={props.spinNeedsReset || props.startButtonPressed}
                style={{transform: `rotate(${props.spinDegree}deg)`}}> 
                    {!props.startButtonPressed ? spinnerText : null}
                <span 
                    className={classes.Pointer} 
                    style={{transform: `rotate(0 - ${props.spinDegree}deg)`}}/>
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
