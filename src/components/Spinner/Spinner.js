import React from 'react';
import classes from './Spinner.module.css'; 

const spinner = (props) => { 
    return(
        <div>
            <button 
                className={classes.Spinner} 
                onClick={props.startSpin} 
                disabled={props.spinNeedsReset || props.startButtonPressed}
                style={{transform: `rotate(${props.spinDegree}deg)`}}> 
                {props.spinnerText1}
                {props.spinnerText2}
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
