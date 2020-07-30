import React from 'react';
import classes from './Spinner.module.css'; 

const spinner = (props) => { 
    return(
        <div>
            <button 
                className = {classes.spinner} 
                onClick = {props.startSpin} 
                disabled = {props.spinNeedsReset || props.startButtonPressed}
                style = {{transform: `rotate(${props.spinDegree}deg)`}}> 
                {props.spinnerText1}
                {props.spinnerText2}
                <span 
                    className = {classes.pointer} 
                    style = {{transform: `rotate(0 - ${props.spinDegree}deg)`}}/>
            </button>
            <ul className = {classes.rarityCircle}>
                <li className = {classes.liCustom}/>
                <li className = {classes.liCustom}/>
                <li className = {classes.liCustom}/>
                <li className = {classes.liCustom}/>
                <li className = {classes.liCustom}/>
                <li className = {classes.liCustom}/>
                <li className = {classes.liCustom}/>
                <li className = {classes.liCustom}/>
                <li className = {classes.liCustom}/>
                <li className = {classes.liCustom}/>
            </ul>
        </div>
    )
}

export default spinner; 